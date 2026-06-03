// ============================================================
// NBA Trade Simulator — Entry Point
// ============================================================

export { TradeValidator, totalSalary, getSalaryMatchRatio, getSalaryCushion, getAvailableTPE } from './core/TradeValidator.js';
export { createPlayer, createTeam, createDraftPick, createTradeException } from './core/schema.js';

// Draft pick asset management
export { default as DraftPickSelector } from './components/DraftPickSelector.js';
export { getPickUid, formatPickLabel, isProtectedPick, getPickProtectionClass } from './utils/draftPickHelpers.js';
