// ============================================================
// NBA Trade Simulator — Core Data Schema
// Reference: 2026-27 CBA Collective Bargaining Agreement
// ============================================================

/**
 * @typedef {Object} Player
 * @property {string}   id          - Unique player identifier
 * @property {string}   name        - Full name
 * @property {number}   salary      - Annual salary in dollars
 * @property {string}   tradeStatus - 'TRADABLE' | 'FROZEN' (e.g. newly signed, 3-month lock)
 * @property {number}   [contractYears] - Remaining years on contract (optional, for future use)
 */

/**
 * @typedef {Object} Team
 * @property {string}   id               - Unique team identifier
 * @property {string}   name             - Franchise name
 * @property {number}   payroll          - Current total payroll
 * @property {string}   apronStatus      - 'BELOW_APRON' | 'FIRST_APRON' | 'SECOND_APRON'
 * @property {Player[]} roster           - Array of players under contract
 * @property {TradeException[]} tradeExceptions - Array of TPE objects with amount, expiry, description
 * @property {DraftPick[]} draftPicks    - Array of owned draft picks
 */

/**
 * @typedef {Object} TradeException
 * @property {number}  amount      - TPE amount in dollars
 * @property {string}  expiry      - Expiry date (YYYY-MM-DD)
 * @property {string}  description - Description of TPE origin
 */

/**
 * @typedef {Object} DraftPick
 * @property {number}  year           - Draft year (e.g. 2027)
 * @property {number}  round          - 1 or 2
 * @property {string}  originalTeam   - Team ID of the original owner
 * @property {boolean} isProtected    - Whether the pick has protection
 * @property {string}  protection     - Detailed protection clause (e.g. 'Top-4 protected', 'Unprotected')
 * @property {string}  [currentOwner] - Team ID of the current holder (optional)
 * @property {string}  [origin]       - Original team name for display
 */

/**
 * @typedef {Object} TradeResult
 * @property {boolean} success        - Whether the trade is valid
 * @property {string[]} errors        - List of all violation reasons
 * @property {number}  newSalaryA     - Team A's post-trade salary
 * @property {number}  newSalaryB     - Team B's post-trade salary
 */

// Export empty — these are JSDoc type definitions for IDE support.
// Actual class instantiation is handled by the factory functions below.

/**
 * Creates a Player object.
 * @param {string} id
 * @param {string} name
 * @param {number} salary
 * @param {'TRADABLE'|'FROZEN'} [tradeStatus='TRADABLE']
 * @returns {Player}
 */
export function createPlayer(id, name, salary, tradeStatus = 'TRADABLE') {
  return { id, name, salary, tradeStatus };
}

/**
 * Creates a TradeException (TPE) object.
 * @param {number} amount      - TPE amount in dollars
 * @param {string} expiry      - Expiry date (YYYY-MM-DD)
 * @param {string} description - Origin description
 * @returns {TradeException}
 */
export function createTradeException(amount, expiry, description) {
  return { amount, expiry, description };
}

/**
 * Creates a Team object.
 * @param {string} id
 * @param {string} name
 * @param {number} payroll
 * @param {'BELOW_APRON'|'FIRST_APRON'|'SECOND_APRON'} apronStatus
 * @param {Player[]} [roster=[]]
 * @param {TradeException[]} [tradeExceptions=[]]
 * @param {DraftPick[]} [draftPicks=[]]
 * @returns {Team}
 */
export function createTeam(id, name, payroll, apronStatus, roster = [], tradeExceptions = [], draftPicks = []) {
  return { id, name, payroll, apronStatus, roster, tradeExceptions, draftPicks };
}

/**
 * Creates a DraftPick object.
 * CBA Concept: "Draft Pick Protection" — picks can have various protection levels
 * that affect their trade value and likelihood of conveyance.
 *
 * @param {number} year
 * @param {number} round
 * @param {string} originalTeam
 * @param {boolean} [isProtected=false]
 * @param {string} [protection='Unprotected']
 * @param {string} [currentOwner]
 * @param {string} [origin]
 * @returns {DraftPick}
 */
export function createDraftPick(year, round, originalTeam, isProtected = false, protection = 'Unprotected', currentOwner = null, origin = null) {
  return {
    year,
    round,
    originalTeam,
    isProtected,
    protection: protection || (isProtected ? 'Protected' : 'Unprotected'),
    currentOwner: currentOwner || originalTeam,
    origin: origin || originalTeam,
  };
}
