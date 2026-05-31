// ============================================================
// NBA Trade Simulator — Validation Engine
// Reference: 2026-27 CBA Collective Bargaining Agreement
// ============================================================

/**
 * @typedef {import('./schema.js').Player} Player
 * @typedef {import('./schema.js').Team} Team
 * @typedef {import('./schema.js').DraftPick} DraftPick
 * @typedef {import('./schema.js').TradeResult} TradeResult
 */

// ---- Helper: sum of salaries for a player array ----
function totalSalary(players) {
  // Defensive: guard against null/undefined players
  if (!players || !Array.isArray(players)) return 0;
  return players.reduce((sum, p) => sum + (p && p.salary ? p.salary : 0), 0);
}

// ---- Helper: determine max incoming multiplier based on apron status ----
function getSalaryMatchRatio(apronStatus) {
  // CBA Rule: Salary matching thresholds per apron tier
  switch (apronStatus) {
    case 'SECOND_APRON':
      return 1.00; // 100% Rule: incoming must be <= outgoing
    case 'FIRST_APRON':
      return 1.10; // 110% Rule: incoming <= outgoing * 1.10
    case 'BELOW_APRON':
    default:
      return 1.25; // 125% Rule: standard non-taxpayer matching
  }
}

// ---- Helper: get the $X cushion for salary matching ----
function getSalaryCushion(apronStatus) {
  // CBA Rule: $100k or $0 cushion depending on apron tier
  // 2nd Apron teams get no cushion
  return apronStatus === 'SECOND_APRON' ? 0 : 100_000;
}

// ---- Helper: compute total TPE available (sum of non-expired amounts) ----
function getAvailableTPE(tradeExceptions) {
  // Defensive: guard against null/undefined
  if (!tradeExceptions || !Array.isArray(tradeExceptions)) return 0;
  const now = new Date();
  return tradeExceptions.reduce((sum, tpe) => {
    // CBA Rule: TPE expires 1 year after generation date
    if (!tpe || !tpe.expiry) return sum;
    const expiry = new Date(tpe.expiry);
    return sum + (expiry >= now ? (tpe.amount || 0) : 0);
  }, 0);
}

export class TradeValidator {
  // ========================================================
  // Public API: validateTrade
  // ========================================================

  /**
   * Validate a trade between two teams.
   * This is the single entry point for UI integration.
   *
   * @param {Team}      teamA            - First team
   * @param {Team}      teamB            - Second team
   * @param {Player[]}  tradePackageA    - Players teamA sends TO teamB
   * @param {Player[]}  tradePackageB    - Players teamB sends TO teamA
   * @param {Object}    [options]
   * @param {DraftPick[]} [options.draftPicksA] - Draft picks teamA sends to teamB
   * @param {DraftPick[]} [options.draftPicksB] - Draft picks teamB sends to teamA
   * @param {number}    [options.tpeUsedA]      - TPE amount teamA uses
   * @param {number}    [options.tpeUsedB]      - TPE amount teamB uses
   * @returns {TradeResult}
   */
  validateTrade(teamA, teamB, tradePackageA, tradePackageB, options = {}) {
    const errors = [];
    const salaryOutA = totalSalary(tradePackageA);
    const salaryOutB = totalSalary(tradePackageB);

    const tpeUsedA = options.tpeUsedA || 0;
    const tpeUsedB = options.tpeUsedB || 0;

    // --- 1. Check player trade restrictions (FROZEN status) ---
    // CBA Concept: "Trade Restriction Period" — newly signed/extended players frozen
    this._checkPlayerRestrictions(tradePackageA, teamA, 'A', errors);
    this._checkPlayerRestrictions(tradePackageB, teamB, 'B', errors);

    // --- 2. Trade Exception (TPE) validation — run before salary matching ---
    // TPE increases a team's effective outgoing salary for matching purposes.
    // CBA Concept: "Traded Player Exception" — allows a team to acquire a player
    // without sending matching salary by using a previously generated exception.
    this._applyTradeException(teamA, salaryOutA, salaryOutB, tpeUsedA, errors);
    this._applyTradeException(teamB, salaryOutB, salaryOutA, tpeUsedB, errors);

    // --- 3. Salary matching (with TPE-adjusted outgoing) ---
    // TPE effectively increases the "outgoing" for matching — if a team uses a TPE,
    // the TPE amount counts toward their outgoing salary for the ratio calculation.
    const effectiveOutA = salaryOutA + tpeUsedA;
    const effectiveOutB = salaryOutB + tpeUsedB;
    this._checkSalaryMatching(teamA, teamB, effectiveOutA, effectiveOutB, salaryOutA, salaryOutB, errors);

    // --- 4. Aggregation restriction (2nd Apron only) ---
    // CBA Concept: "Aggregation Restriction" — 2nd Apron teams cannot combine
    // multiple player salaries to acquire a higher-paid player
    this._checkAggregationRestriction(teamA, tradePackageA, tradePackageB, salaryOutB, errors);
    this._checkAggregationRestriction(teamB, tradePackageB, tradePackageA, salaryOutA, errors);

    // --- 5. Stepien Rule (draft pick continuity) ---
    // CBA Concept: "Ted Stepien Rule" — cannot trade future first-round picks consecutively
    this._checkStepienRule(teamA, options.draftPicksA || [], errors);
    this._checkStepienRule(teamB, options.draftPicksB || [], errors);

    // --- 6. TPE Creation check — if a team sends out more salary than it receives ---
    // and no TPE was explicitly used, a new TPE is generated automatically
    // (informational only; actual creation is up to the frontend)

    // --- Compute new salaries ---
    const newSalaryA = teamA.payroll - salaryOutA + salaryOutB;
    const newSalaryB = teamB.payroll - salaryOutB + salaryOutA;

    // --- TPE Creation: if a team sends out more than it receives, a new TPE can be generated ---
    const tpeGeneratedA = (salaryOutA > salaryOutB && tpeUsedA === 0)
      ? { amount: salaryOutA - salaryOutB, description: `差额 from ${teamA.name} ↔ ${teamB.name}` }
      : null;
    const tpeGeneratedB = (salaryOutB > salaryOutA && tpeUsedB === 0)
      ? { amount: salaryOutB - salaryOutA, description: `差额 from ${teamB.name} ↔ ${teamA.name}` }
      : null;

    return {
      success: errors.length === 0,
      errors,
      newSalaryA,
      newSalaryB,
      tpeGeneratedA,
      tpeGeneratedB,
    };
  }

  // ========================================================
  // 1. Player Trade Restrictions
  // ========================================================

  /**
   * Check that no player in the package has a FROZEN trade status.
   * CBA Concept: "Trade Restriction Period" — newly signed / extended
   * players are frozen for 3 months (or until Dec 15).
   *
   * @param {Player[]} players
   * @param {Team}     team
   * @param {string}   sideLabel  - 'A' or 'B' for error messages
   * @param {string[]} errors
   */
  _checkPlayerRestrictions(players, team, sideLabel, errors) {
    for (const player of players) {
      if (player.tradeStatus === 'FROZEN') {
        // CBA Concept: "Trade Restriction Period" / "Freeze Date"
        errors.push(
          `球队 ${team.name} 的球员 ${player.name} 正处于交易冻结期（FROZEN），不可交易。`
        );
      }
    }
  }

  // ========================================================
  // 2. Salary Matching
  // ========================================================

  /**
   * Verify that both sides comply with salary matching rules based on apron status.
   * CBA Concepts:
   *   - "125% Match Rule" (BELOW_APRON)
   *   - "110% Match Rule" (FIRST_APRON)
   *   - "100% Match Rule" (SECOND_APRON / No Cushion)
   *
   * @param {Team}     teamA
   * @param {Team}     teamB
   * @param {number}   effOutA  - Effective outgoing for teamA (actual salary + TPE)
   * @param {number}   effOutB  - Effective outgoing for teamB (actual salary + TPE)
   * @param {number}   actualOutA - Actual salary teamA sends (without TPE, for display)
   * @param {number}   actualOutB - Actual salary teamB sends (without TPE, for display)
   * @param {string[]} errors
   */
  _checkSalaryMatching(teamA, teamB, effOutA, effOutB, actualOutA, actualOutB, errors) {
    // Use effective outgoing (with TPE factored in) for ratio calculations,
    // but display actual outgoing in error messages.
    this._validateSalarySide(teamA, effOutA, effOutB, actualOutA, errors);
    this._validateSalarySide(teamB, effOutB, effOutA, actualOutB, errors);
  }

  /**
   * Validate salary matching from one team's perspective.
   * @param {Team}   team          - The team being checked
   * @param {number} effOutgoing   - Effective outgoing (salary + TPE, used for ratio calc)
   * @param {number} incoming      - Salary this team receives
   * @param {number} actualOutgoing - Actual salary sent (without TPE, for display)
   * @param {string[]} errors
   */
  _validateSalarySide(team, effOutgoing, incoming, actualOutgoing, errors) {
    const ratio = getSalaryMatchRatio(team.apronStatus);
    const cushion = getSalaryCushion(team.apronStatus);
    // CBA Rule: incoming <= outgoing * ratio + cushion
    const maxAllowed = Math.floor(effOutgoing * ratio) + cushion;

    if (incoming > maxAllowed) {
      const apronLabel = this._apronLabel(team.apronStatus);
      errors.push(
        `球队 ${team.name} 薪资未配平（${apronLabel}）：` +
        `送出 $${(actualOutgoing / 1_000_000).toFixed(1)}M` +
        `${effOutgoing > actualOutgoing ? ` + TPE $${((effOutgoing - actualOutgoing) / 1_000_000).toFixed(1)}M` : ''}，` +
        `接收 $${(incoming / 1_000_000).toFixed(1)}M，` +
        `最大允许接收 $${(maxAllowed / 1_000_000).toFixed(1)}M。`
      );
    }

    // 2nd Apron specific: incoming must be strictly <= actual outgoing
    // (TPE cannot bypass the 2nd apron's no-growth restriction)
    if (team.apronStatus === 'SECOND_APRON' && incoming > actualOutgoing) {
      errors.push(
        `球队 ${team.name} 违反二层围裙限制（Second Apron）：` +
        `接收薪资 $${(incoming / 1_000_000).toFixed(1)}M ` +
        `超出送出薪资 $${(actualOutgoing / 1_000_000).toFixed(1)}M，不允许任何薪资增长。`
      );
    }
  }

  // ========================================================
  // 3. Aggregation Restriction (2nd Apron)
  // ========================================================

  /**
   * Second Apron teams cannot aggregate (combine) multiple player salaries
   * to acquire a single player whose salary exceeds each individual outgoing player.
   * CBA Concept: "Aggregation Restriction"
   *
   * Simplified logic: If the sending team is 2nd Apron and they send >1 player,
   * the largest incoming player's salary must not exceed the largest outgoing player's salary.
   *
   * @param {Team}     team             - The team being checked
   * @param {Player[]} outgoingPlayers  - Players this team sends out
   * @param {Player[]} incomingPlayers  - Players this team receives
   * @param {number}   totalIncoming    - Total incoming salary
   * @param {string[]} errors
   */
  _checkAggregationRestriction(team, outgoingPlayers, incomingPlayers, totalIncoming, errors) {
    // Aggregation Restriction only applies to Second Apron teams
    if (team.apronStatus !== 'SECOND_APRON') return;

    // If they're sending out multiple players, check aggregation
    if (outgoingPlayers.length > 1) {
      const maxOutgoing = Math.max(...outgoingPlayers.map(p => p.salary));
      const maxIncoming = incomingPlayers.length > 0
        ? Math.max(...incomingPlayers.map(p => p.salary))
        : 0;

      // CBA Concept: "Aggregation Restriction" — a 2nd apron team
      // cannot combine salaries to take back a player who makes more
      // than any single player they send out.
      if (maxIncoming > maxOutgoing) {
        errors.push(
          `球队 ${team.name} 违反聚合限制（Aggregation Restriction）：` +
          `作为二层围裙球队，不能合并多名球员薪资以换取 ` +
          `薪资高于其送出的任何单一球员的球员。` +
          `最高送出薪资 $${(maxOutgoing / 1_000_000).toFixed(1)}M，` +
          `最高接收薪资 $${(maxIncoming / 1_000_000).toFixed(1)}M。`
        );
      }
    }

    // Also: 2nd Apron teams cannot aggregate in 3+ team trades or
    // send out multiple players for one player generally.
    // The rule is: a 2nd apron team cannot "aggregate" — meaning they
    // cannot trade multiple players for a single player with a higher salary
    // than any one of those outgoing players. Already covered above.
  }

  // ========================================================
  // 4. Stepien Rule — Draft Pick Continuity
  // ========================================================

  /**
   * The Stepien Rule prohibits teams from trading away first-round picks
   * in consecutive future years. This prevents a team from being without
   * a first-round pick for multiple years.
   *
   * CBA Concept: "Stepien Rule" / "Ted Stepien Rule"
   *
   * This implementation checks a simplified flag: if the team is trading
   * away first-round picks in consecutive future drafts, flag an error.
   *
   * @param {Team}        team
   * @param {DraftPick[]} tradedPicks   - Draft picks this team is sending out
   * @param {string[]}    errors
   */
  _checkStepienRule(team, tradedPicks, errors) {
    // Stepien Rule: A team cannot trade away its first-round pick in consecutive future years.
    // CBA Concept: "Ted Stepien Rule" — prohibits trading first-round picks
    // in back-to-back years to prevent long-term roster stripping.

    // Combine team's existing outgoing picks + newly traded picks
    // Defensive: treat missing fields gracefully
    const teamExistingOutgoing = (team.draftPicks || [])
      .filter(p => p && p.round === 1 && p.currentOwner === team.id)
      .map(p => p.year || 0);

    const newOutgoing = (tradedPicks || [])
      .filter(p => p && p.round === 1 && p.currentOwner === team.id)
      .map(p => p.year || 0);

    const allOutgoing = [...new Set([...teamExistingOutgoing, ...newOutgoing])].sort((a, b) => a - b);

    if (allOutgoing.length < 2) return;

    // Check for consecutive years
    for (let i = 0; i < allOutgoing.length - 1; i++) {
      if (allOutgoing[i + 1] - allOutgoing[i] === 1) {
        errors.push(
          `球队 ${team.name} 违反 Stepien 规则：` +
          `不能交易连续未来年份的首轮选秀权（${allOutgoing[i]}-${allOutgoing[i + 1]}）。`
        );
        return;
      }
    }
  }

  // ========================================================
  // 5. Trade Exception (TPE) Handling
  // ========================================================

  /**
   * Apply (deduct) a Traded Player Exception if one is being used.
   * Also marks whether a new TPE should be created from the difference.
   *
   * CBA Concept: "Traded Player Exception (TPE)"
   *   - When a team trades away more salary than it receives, the difference
   *     can become a TPE (valid for 1 year).
   *   - A team can also use an existing TPE to "absorb" salary without
   *     sending out matching salary.
   *
   * @param {Team}     team
   * @param {number}   outgoing
   * @param {number}   incoming
   * @param {number}   tpeUsed       - Amount of TPE the team intends to use
   * @param {string[]} errors
   */
  _applyTradeException(team, outgoing, incoming, tpeUsed, errors) {
    if (tpeUsed > 0) {
      // CBA Rule: TPE covers incoming salary — the incoming player's salary
      // must not exceed the TPE amount being applied.
      if (incoming > tpeUsed) {
        errors.push(
          `球队 ${team.name} 的 TPE $${(tpeUsed / 1_000_000).toFixed(1)}M ` +
          `不足以覆盖接收球员薪资 $${(incoming / 1_000_000).toFixed(1)}M。`
        );
        return;
      }

      // Validate that the team has enough TPE available (only counting non-expired)
      const availableTPE = getAvailableTPE(team.tradeExceptions);
      if (tpeUsed > availableTPE) {
        // Check if expiry is the cause
        const totalRaw = team.tradeExceptions.reduce((a, b) => a + (b.amount || 0), 0);
        if (totalRaw > availableTPE) {
          errors.push(
            `球队 ${team.name} 的交易特例（TPE）已过期：` +
            `原始总额 $${(totalRaw / 1_000_000).toFixed(1)}M，` +
            `未过期可用 $${(availableTPE / 1_000_000).toFixed(1)}M。`
          );
        } else {
          errors.push(
            `球队 ${team.name} 没有足够的交易特例（TPE）：` +
            `需要 $${(tpeUsed / 1_000_000).toFixed(1)}M，` +
            `可用 $${(availableTPE / 1_000_000).toFixed(1)}M。`
          );
        }
        return;
      }

      // CBA Concept: "TPE Absorption" — when a team uses a TPE,
      // the TPE is consumed by the amount used. The remaining balance
      // stays available for future trades within the 1-year window.
    }

    // CBA Concept: "TPE Creation" — when a team sends out more salary
    // than it receives without using an existing TPE, the difference
    // generates a new TPE that the team can use within 1 year.
    // (Validation only — actual creation is handled by the caller.)
  }

  // ========================================================
  // Internal utilities
  // ========================================================

  /**
   * Get a human-readable label for apron status.
   * @param {string} status
   * @returns {string}
   */
  _apronLabel(status) {
    switch (status) {
      case 'SECOND_APRON': return '二层围裙（Second Apron）— 100% 匹配规则';
      case 'FIRST_APRON':  return '一层围裙（First Apron）— 110% 匹配规则';
      default:             return '非围裙球队 — 125% 匹配规则';
    }
  }
}

// Export helper functions for external use (e.g., by UI)
export { totalSalary, getSalaryMatchRatio, getSalaryCushion, getAvailableTPE };
