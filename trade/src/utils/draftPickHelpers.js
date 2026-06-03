// ============================================================
// Draft Pick Helpers — UID generation & display formatting
// ============================================================

/**
 * Generate a unique identifier for a draft pick.
 * Combines year + round + original_team to create a stable key.
 * @param {Object} pick - Draft pick object
 * @param {number} pick.year
 * @param {number} pick.round
 * @param {string} pick.original_team
 * @returns {string} e.g. "2027-1-Atlanta Hawks"
 */
export function getPickUid(pick) {
  if (!pick) return '';
  const team = pick.original_team || pick.owner || 'unknown';
  return `${pick.year}-${pick.round}-${team.replace(/\s+/g, '_')}`;
}

/**
 * Format a draft pick for display.
 * @param {Object} pick
 * @returns {string} e.g. "2027 首轮 - Unprotected (原属: Atlanta Hawks)"
 */
export function formatPickLabel(pick) {
  if (!pick) return '';
  const roundLabel = pick.round === 1 ? '首轮' : '次轮';
  const protection = pick.protection || 'Unprotected';
  const origin = pick.original_team || pick.owner || '未知';
  return `${pick.year} ${roundLabel} - ${protection} (原属: ${origin})`;
}

/**
 * Check if a pick has any protection (not "Unprotected").
 * @param {Object} pick
 * @returns {boolean}
 */
export function isProtectedPick(pick) {
  if (!pick || !pick.protection) return false;
  const p = pick.protection.toLowerCase();
  return p !== 'unprotected' && !p.includes('unprotected');
}

/**
 * Get a CSS class name for a pick based on its protection status.
 * @param {Object} pick
 * @returns {string}
 */
export function getPickProtectionClass(pick) {
  if (isProtectedPick(pick)) return 'pick--protected';
  if (pick.protection && pick.protection.toLowerCase().includes('frozen')) return 'pick--frozen';
  return 'pick--unprotected';
}
