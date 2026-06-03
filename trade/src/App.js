// ============================================================
// App.js — Example: Integrating DraftPickSelector into a trade
// ============================================================
//
// This file shows the RECOMMENDED data flow pattern:
//   JSON (picks library)
//     → DraftPickSelector (interactive selection)
//       → selectedPicks state (trade package)
//         → calculateTrade (validation, picks as attachment)
//
// To use, import draftPicksData from your JSON file.
// ============================================================

import React, { useState, useCallback } from 'react';
import DraftPickSelector from './components/DraftPickSelector.js';

// ── Mock trade validation (replace with your real validator) ──
function calculateTrade(teamAQuery, teamBQuery) {
  const salaryA = (teamAQuery.players || []).reduce((s, p) => s + (p.salary || 0), 0);
  const salaryB = (teamBQuery.players || []).reduce((s, p) => s + (p.salary || 0), 0);

  // Picks are metadata — validated separately by the CBA engine
  const picksA = teamAQuery.picks || [];
  const picksB = teamBQuery.picks || [];

  // 125% salary matching rule (standard apron)
  const maxIncomingA = salaryA * 1.25 + 100000;
  const maxIncomingB = salaryB * 1.25 + 100000;

  const errors = [];
  if (salaryB > maxIncomingA) {
    errors.push(`Team A receives $${(salaryB / 1e6).toFixed(1)}M but can only take $${(maxIncomingA / 1e6).toFixed(1)}M (125% rule)`);
  }
  if (salaryA > maxIncomingB) {
    errors.push(`Team B receives $${(salaryA / 1e6).toFixed(1)}M but can only take $${(maxIncomingB / 1e6).toFixed(1)}M (125% rule)`);
  }

  return {
    valid: errors.length === 0,
    errors,
    summary: {
      teamA: { salaryOut: salaryA, picksOut: picksA.length },
      teamB: { salaryOut: salaryB, picksOut: picksB.length },
    },
  };
}

// ── App Shell ──────────────────────────────────────────────
export default function App({ picksData }) {
  // ── Team selection state ────────────────────────────────
  const [teamA, setTeamA] = useState('Los Angeles Lakers');
  const [teamB, setTeamB] = useState('Boston Celtics');
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);

  // ── Draft pick selection state ──────────────────────────
  const [teamAPicks, setTeamAPicks] = useState([]);
  const [teamBPicks, setTeamBPicks] = useState([]);

  // ── Validation state ────────────────────────────────────
  const [tradeResult, setTradeResult] = useState(null);

  const handleExecuteTrade = useCallback(() => {
    const result = calculateTrade(
      { players: teamAPlayers, picks: teamAPicks },
      { players: teamBPlayers, picks: teamBPicks }
    );
    setTradeResult(result);
  }, [teamAPlayers, teamAPicks, teamBPlayers, teamBPicks]);

  // ── Team list for selectors ─────────────────────────────
  const teamNames = picksData
    ? picksData.map((t) => t.team)
    : [];

  // ── Render ──────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px', color: '#e0e0e0' }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>🏀 NBA 交易模拟器 — 选秀权管理</h1>

      {/* ── Team Selectors ─────────────────────────────── */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {/* Team A */}
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>
            球队 A（送出）
          </label>
          <select
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 8,
              background: '#1a1a2e', color: '#e0e0e0', border: '1px solid rgba(255,255,255,0.12)',
              fontSize: 14,
            }}
          >
            {teamNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Team B */}
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>
            球队 B（接收）
          </label>
          <select
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 8,
              background: '#1a1a2e', color: '#e0e0e0', border: '1px solid rgba(255,255,255,0.12)',
              fontSize: 14,
            }}
          >
            {teamNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Draft Pick Selectors ───────────────────────── */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, marginBottom: 10, color: '#64ffda' }}>🏠 {teamA}</h3>
          <DraftPickSelector
            teamName={teamA}
            picksData={picksData}
            selectedPicks={teamAPicks}
            onSelectionChange={setTeamAPicks}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, marginBottom: 10, color: '#ffab40' }}>🏠 {teamB}</h3>
          <DraftPickSelector
            teamName={teamB}
            picksData={picksData}
            selectedPicks={teamBPicks}
            onSelectionChange={setTeamBPicks}
          />
        </div>
      </div>

      {/* ── Execute Trade ──────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <button
          onClick={handleExecuteTrade}
          style={{
            padding: '12px 48px', fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg, #00c853, #00e676)',
            color: '#000', border: 'none', borderRadius: 10,
            cursor: 'pointer', letterSpacing: 1,
          }}
        >
          ⚡ 执行交易验证
        </button>
      </div>

      {/* ── Trade Result ───────────────────────────────── */}
      {tradeResult && (
        <div
          style={{
            padding: 16, borderRadius: 10,
            background: tradeResult.valid ? 'rgba(0,200,83,0.1)' : 'rgba(255,23,68,0.1)',
            border: `1px solid ${tradeResult.valid ? 'rgba(0,200,83,0.3)' : 'rgba(255,23,68,0.3)'}`,
          }}
        >
          <h3 style={{ marginBottom: 8 }}>
            {tradeResult.valid ? '✅ 交易有效' : '❌ 交易无效'}
          </h3>
          {tradeResult.errors.length > 0 && (
            <ul style={{ marginLeft: 20, fontSize: 13, color: '#ff5252' }}>
              {tradeResult.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
            {teamA}: 送出 {tradeResult.summary.teamA.picksOut} 个选秀权 &nbsp;|&nbsp;
            {teamB}: 送出 {tradeResult.summary.teamB.picksOut} 个选秀权
          </div>
        </div>
      )}
    </div>
  );
}
