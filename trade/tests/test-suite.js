// ============================================================
// NBA Trade Simulator — 高级测试套件
// 三个核心场景 + 扩展场景：
//   A. 跨层级合法交易（2nd Apron → Below Apron）
//   B. 违规交易（触发 2nd Apron 多项限制）
//   C. 使用 TPE 进行补差的合法交易
// ============================================================

import { TradeValidator } from '../src/core/TradeValidator.js';
import { createPlayer, createTeam, createDraftPick, createTradeException } from '../src/core/schema.js';

// ---- 简易断言工具 ----
let passCount = 0;
let failCount = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✅ PASS: ${label}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${label}`);
    failCount++;
  }
}

function summary() {
  console.log(`\n========================================`);
  console.log(`总计: ${passCount + failCount}  |  通过: ${passCount}  |  失败: ${failCount}`);
  console.log(`========================================`);
}

// ============================================================
// 测试数据 — Players
// ============================================================

const KLAY_THOMPSON  = createPlayer('P002', 'Klay Thompson',   15_800_000, 'TRADABLE');
const DRAYMOND_GREEN = createPlayer('P003', 'Draymond Green',  24_100_000, 'TRADABLE');
const JON_KUMINGA    = createPlayer('P004', 'Jonathan Kuminga', 7_600_000,  'TRADABLE');
const BRANDIN_PODZ   = createPlayer('P005', 'Brandin Podziemski', 4_500_000, 'FROZEN');
const GPII           = createPlayer('P006', 'Gary Payton II',   9_100_000,  'TRADABLE');
const MOSES_MOODY    = createPlayer('P007', 'Moses Moody',      5_800_000,  'TRADABLE');
const KYRIE_IRVING   = createPlayer('P009', 'Kyrie Irving',     43_500_000, 'TRADABLE');
const DEREK_LIVELY   = createPlayer('P010', 'Derek Lively II',  5_500_000,  'TRADABLE');
const PJ_WASHINGTON  = createPlayer('P011', 'P.J. Washington',  14_000_000, 'TRADABLE');

const validator = new TradeValidator();

// ============================================================
// 场景 A: 跨层级合法交易
//   DAL (2nd Apron) 送出 Kyrie → 接收 Klay + Kuminga + GPII + Moody
//   GSW (Below Apron) 送出上述四人 → 接收 Kyrie
//
// 校验逻辑:
//   DAL (SECOND_APRON): out=$43.5M, in=$38.3M
//     100% Rule: $38.3M <= $43.5M ✅
//     聚合检查: 仅送出1名球员, 不触发聚合限制 ✅
//   GSW (BELOW_APRON): out=$38.3M, in=$43.5M
//     125% Rule: floor(38.3M*1.25)+100K = $47.975M, 43.5M <= 47.975M ✅
// ============================================================
const LABEL_A = 'A: 跨层级合法交易（2nd Apron DAL → Below Apron GSW）';
console.log(`\n========== ${LABEL_A} ==========`);

const teamDAL_A = createTeam(
  'DAL', 'Dallas Mavericks',
  204_000_000, 'SECOND_APRON',
  [KYRIE_IRVING, DEREK_LIVELY, PJ_WASHINGTON],
  []
);

const teamGSW_A = createTeam(
  'GSW', 'Golden State Warriors',
  178_000_000, 'BELOW_APRON',
  [KLAY_THOMPSON, GPII, MOSES_MOODY, JON_KUMINGA, DRAYMOND_GREEN],
  []
);

// DAL -> GSW: Kyrie ($43.5M)
// GSW -> DAL: Klay ($15.8M) + Kuminga ($7.6M) + GPII ($9.1M) + Moody ($5.8M) = $38.3M
const resultA = validator.validateTrade(
  teamDAL_A, teamGSW_A,
  [KYRIE_IRVING],
  [KLAY_THOMPSON, JON_KUMINGA, GPII, MOSES_MOODY]
);

console.log(`  Result:`, resultA);
assert(resultA.success === true,     `${LABEL_A}: 交易应被批准`);
assert(resultA.errors.length === 0,  `${LABEL_A}: 不应有任何错误`);
assert(resultA.newSalaryA === 204_000_000 - 43_500_000 + 38_300_000,
  `${LABEL_A}: DAL 薪资: $204M - $43.5M + $38.3M = $198.8M`);
assert(resultA.newSalaryB === 178_000_000 - 38_300_000 + 43_500_000,
  `${LABEL_A}: GSW 薪资: $178M - $38.3M + $43.5M = $183.2M`);

// ============================================================
// 场景 B1: 违规交易 — 2nd Apron 薪资增长违规
//   DAL (2nd Apron) 送出 Kyrie ($43.5M) + Lively ($5.5M) = $49M
//   接收  Draymond + Klay + Kuminga + GPII + Moody = $62.4M
//
//   DAL (SECOND_APRON): out=$49M, in=$62.4M
//     100% Rule: $62.4M > $49M ❌
//   GSW (FIRST_APRON): out=$62.4M, in=$49M
//     110% Rule: floor(62.4M*1.1)+100K = $68.74M, $49M <= $68.74M ✅
// ============================================================
const LABEL_B1 = 'B1: 违规交易 — 2nd Apron 薪资增长违规';
console.log(`\n========== ${LABEL_B1} ==========`);

const teamDAL_B = createTeam(
  'DAL', 'Dallas Mavericks',
  204_000_000, 'SECOND_APRON',
  [KYRIE_IRVING, DEREK_LIVELY, PJ_WASHINGTON],
  []
);

const teamGSW_B = createTeam(
  'GSW', 'Golden State Warriors',
  178_000_000, 'FIRST_APRON',
  [KLAY_THOMPSON, DRAYMOND_GREEN, JON_KUMINGA, GPII, MOSES_MOODY],
  []
);

const resultB = validator.validateTrade(
  teamDAL_B, teamGSW_B,
  [KYRIE_IRVING, DEREK_LIVELY],
  [DRAYMOND_GREEN, KLAY_THOMPSON, JON_KUMINGA, GPII, MOSES_MOODY]
);

console.log(`  Result:`, resultB);
assert(resultB.success === false,           `${LABEL_B1}: 交易应被拒绝`);
assert(resultB.errors.length > 0,           `${LABEL_B1}: 应包含错误信息`);
assert(resultB.errors.some(e => e.includes('二层围裙') || e.includes('Second Apron')),
  `${LABEL_B1}: 应包含二层围裙限制错误`);

// ============================================================
// 场景 B2: 违规交易 — 2nd Apron 聚合限制违规
//   DAL (2nd Apron) 送出 Kyrie ($43.5M) + PJ Washington ($14M) = $57.5M
//   换取 Giannis ($51M)
//
//   DAL (SECOND_APRON):
//     100% Rule: $51M <= $57.5M ✅
//     聚合限制: 送出2人, 最高送出 $43.5M, 最高接收 $51M
//       $51M > $43.5M ❌ 违规
// ============================================================
const LABEL_B2 = 'B2: 违规交易 — 2nd Apron 聚合限制违规';
console.log(`\n========== ${LABEL_B2} ==========`);

const GIANNIS = createPlayer('P020', 'Giannis Antetokounmpo', 51_000_000, 'TRADABLE');
const teamMIL = createTeam(
  'MIL', 'Milwaukee Bucks',
  200_000_000, 'BELOW_APRON',
  [GIANNIS],
  []
);

const resultB2 = validator.validateTrade(
  teamDAL_B, teamMIL,
  [KYRIE_IRVING, PJ_WASHINGTON],
  [GIANNIS]
);

console.log(`  Result:`, resultB2);
assert(resultB2.success === false,           `${LABEL_B2}: 交易应被拒绝`);
assert(resultB2.errors.some(e => e.includes('聚合限制') || e.includes('Aggregation')),
  `${LABEL_B2}: 应包含聚合限制错误`);

// ============================================================
// 场景 B3: 违规交易 — 冻结球员参与
// ============================================================
const LABEL_B3 = 'B3: 违规交易 — 冻结期球员参与交易';
console.log(`\n========== ${LABEL_B3} ==========`);

const teamGSW_FROZEN = createTeam(
  'GSW', 'Golden State Warriors',
  178_000_000, 'BELOW_APRON',
  [BRANDIN_PODZ, KLAY_THOMPSON],
  []
);

const teamLAL_FROZEN = createTeam(
  'LAL', 'Los Angeles Lakers',
  170_000_000, 'BELOW_APRON',
  [],
  []
);

const resultB3 = validator.validateTrade(
  teamGSW_FROZEN, teamLAL_FROZEN,
  [BRANDIN_PODZ],
  []
);

console.log(`  Result:`, resultB3);
assert(resultB3.success === false,       `${LABEL_B3}: 交易应被拒绝`);
assert(resultB3.errors.some(e => e.includes('冻结期') || e.includes('FROZEN')),
  `${LABEL_B3}: 应包含冻结期错误`);

// ============================================================
// 场景 B4: 违规交易 — Stepien 规则
// ============================================================
const LABEL_B4 = 'B4: 违规交易 — Stepien 规则（连续首轮签交易）';
console.log(`\n========== ${LABEL_B4} ==========`);

const teamOKC = createTeam('OKC', 'Oklahoma City Thunder', 170_000_000, 'BELOW_APRON', [], []);
const teamHOU = createTeam('HOU', 'Houston Rockets', 160_000_000, 'BELOW_APRON', [], []);

const pick2027 = createDraftPick(2027, 1, 'OKC', false, 'Unprotected', 'OKC', 'OKC');
const pick2028 = createDraftPick(2028, 1, 'OKC', false, 'Unprotected', 'OKC', 'OKC');

const resultB4 = validator.validateTrade(
  teamOKC, teamHOU,
  [], [],
  { draftPicksA: [pick2027, pick2028] }
);

console.log(`  Result:`, resultB4);
assert(resultB4.success === false,    `${LABEL_B4}: 交易应被拒绝`);
assert(resultB4.errors.some(e => e.includes('Stepien')),
  `${LABEL_B4}: 应包含 Stepien 规则错误`);

// ============================================================
// 场景 C: 使用 TPE 进行补差的合法交易
//   LAL (Below Apron) $12M TPE → 吸收 Pritchard ($11M)
//
//   LAL (BELOW_APRON): out=$0, TPE=$11M, effOut=$11M, in=$11M
//     125% Rule: floor(11M*1.25)+100K = $13.85M, $11M <= $13.85M ✅
//   BOS (FIRST_APRON): out=$11M, in=$0
//     110% Rule: floor(11M*1.1)+100K = $12.2M, $0 <= $12.2M ✅
// ============================================================
const LABEL_C = 'C: 使用 TPE 进行补差的合法交易';
console.log(`\n========== ${LABEL_C} ==========`);

const PAYTON_PRITCHARD = createPlayer('P030', 'Payton Pritchard', 11_000_000, 'TRADABLE');

const lalTPE = createTradeException(12_000_000, '2027-06-30', 'From Westbrook trade');
const teamLAL_C = createTeam(
  'LAL', 'Los Angeles Lakers',
  175_000_000, 'BELOW_APRON',
  [PAYTON_PRITCHARD],
  [lalTPE]  // $12M TPE with expiry
);

const teamBOS_C = createTeam(
  'BOS', 'Boston Celtics',
  190_000_000, 'FIRST_APRON',
  [],
  []
);

const resultC = validator.validateTrade(
  teamLAL_C, teamBOS_C,
  [],                       // LAL sends no players
  [PAYTON_PRITCHARD],       // BOS sends Pritchard ($11M)
  { tpeUsedA: 11_000_000 }  // LAL uses $11M TPE
);

console.log(`  Result:`, resultC);
assert(resultC.success === true,    `${LABEL_C}: 交易应被批准`);
assert(resultC.errors.length === 0, `${LABEL_C}: 不应有任何错误`);
assert(resultC.newSalaryA === 175_000_000 + 11_000_000,
  `${LABEL_C}: LAL 薪资: $175M + $11M = $186M`);
assert(resultC.newSalaryB === 190_000_000 - 11_000_000,
  `${LABEL_C}: BOS 薪资: $190M - $11M = $179M`);

// ============================================================
// 场景 C2: TPE 不足的违规交易
// ============================================================
const LABEL_C2 = 'C2: TPE 不足以覆盖球员薪资';
console.log(`\n========== ${LABEL_C2} ==========`);

const JALEN_BROWN = createPlayer('P031', 'Jaylen Brown', 30_000_000, 'TRADABLE');
const teamBOS_C2 = createTeam(
  'BOS', 'Boston Celtics',
  220_000_000, 'FIRST_APRON',
  [JALEN_BROWN],
  []
);

const resultC2 = validator.validateTrade(
  teamLAL_C, teamBOS_C2,
  [],
  [JALEN_BROWN],
  { tpeUsedA: 30_000_000 }
);

console.log(`  Result:`, resultC2);
assert(resultC2.success === false, `${LABEL_C2}: 交易应被拒绝`);
assert(resultC2.errors.some(e => e.includes('TPE')),
  `${LABEL_C2}: 应包含 TPE 不足错误`);

// ============================================================
// 场景 C3: TPE 过期违规交易
//   LAL 有一个已过期的 TPE（2025-01-01），试图吸收 $5M 球员
//   CBA Concept: TPE 有效期为 1 年，过期后不可使用
// ============================================================
const LABEL_C3 = 'C3: TPE 已过期交易被拒';
console.log(`\n========== ${LABEL_C3} ==========`);

const expiredTPE = createTradeException(10_000_000, '2025-01-01', 'Expired TPE');
const SOME_PLAYER = createPlayer('P040', 'Some Player', 5_000_000, 'TRADABLE');
const teamLAL_C3 = createTeam(
  'LAL', 'Los Angeles Lakers',
  175_000_000, 'BELOW_APRON',
  [SOME_PLAYER],
  [expiredTPE]
);

const teamBOS_C3 = createTeam(
  'BOS', 'Boston Celtics',
  190_000_000, 'BELOW_APRON',
  [],
  []
);

const resultC3 = validator.validateTrade(
  teamLAL_C3, teamBOS_C3,
  [],
  [SOME_PLAYER],
  { tpeUsedA: 5_000_000 }
);

console.log(`  Result:`, resultC3);
assert(resultC3.success === false, `${LABEL_C3}: 交易应被拒绝`);
assert(resultC3.errors.some(e => e.includes('过期') || e.includes('expir')),
  `${LABEL_C3}: 应包含 TPE 过期错误`);

// ============================================================
// 汇总
// ============================================================
summary();
