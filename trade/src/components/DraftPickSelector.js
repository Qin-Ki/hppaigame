// ============================================================
// DraftPickSelector — Draft pick asset management component
// ============================================================
//
// Props:
//   teamName     – string, name of the currently selected team
//   picksData    – array of { team, picks: [...] } from JSON
//   selectedPicks – array of currently selected pick objects
//   onSelectionChange – (updatedPicksArray) => void
//
// State (internal):
//   searchFilter – string to filter available picks by year/team
//
// Layout:
//   ┌──────────────────────┐  ┌──────────────────────┐
//   │  Available Picks      │  │  Trade Package Picks  │
//   │  [search input]       │  │  [pick item]    [✕]  │
//   │  ☐ 2027 首轮 - ...    │  │  [pick item]    [✕]  │
//   │  ☐ 2028 次轮 - ...    │  │  [pick item]    [✕]  │
//   └──────────────────────┘  └──────────────────────┘
// ============================================================

import React, { useState, useMemo, useCallback } from 'react';
import { getPickUid, formatPickLabel, isProtectedPick, getPickProtectionClass } from '../utils/draftPickHelpers.js';

// ── Styling (inline for zero-config deployment) ──────────────
const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '16px',
    background: '#1a1a2e',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: '#e0e0e0',
    minHeight: '320px',
  },
  panel: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  panelTitle: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '10px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.06)',
    color: '#e0e0e0',
    fontSize: '13px',
    outline: 'none',
  },
  pickList: {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingRight: '4px',
  },
  pickItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.15s',
    fontSize: '13px',
    lineHeight: '1.4',
    userSelect: 'none',
    border: '1px solid transparent',
  },
  pickItemAvailable: {
    background: 'rgba(255,255,255,0.04)',
  },
  pickItemSelected: {
    background: 'rgba(0,200,83,0.1)',
    borderColor: 'rgba(0,200,83,0.25)',
  },
  checkbox: {
    accentColor: '#00c853',
    width: '16px',
    height: '16px',
    flexShrink: 0,
    cursor: 'pointer',
  },
  pickLabel: {
    flex: 1,
    minWidth: 0,
    wordBreak: 'break-word',
  },
  protectedBadge: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    marginLeft: '6px',
    flexShrink: 0,
  },
  protectedBadgeYellow: {
    background: 'rgba(255,193,7,0.2)',
    color: '#ffc107',
    border: '1px solid rgba(255,193,7,0.3)',
  },
  frozenBadge: {
    background: 'rgba(156,39,176,0.2)',
    color: '#ce93d8',
    border: '1px solid rgba(156,39,176,0.3)',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ef5350',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: '4px',
    lineHeight: 1,
    flexShrink: 0,
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '13px',
    fontStyle: 'italic',
  },
  note: {
    marginTop: '8px',
    padding: '6px 10px',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.04)',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
  },
  count: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 400,
  },
};

// ── Sub-component: Single draft pick row ─────────────────────
function PickRow({ pick, isSelected, onToggle, showRemove, onRemove }) {
  const uid = getPickUid(pick);
  const protectedPick = isProtectedPick(pick);
  const frozenPick = pick.protection && pick.protection.toLowerCase().includes('frozen');
  const itemStyle = {
    ...styles.pickItem,
    ...(isSelected ? styles.pickItemSelected : styles.pickItemAvailable),
  };

  const badgeStyle = frozenPick
    ? { ...styles.protectedBadge, ...styles.frozenBadge }
    : protectedPick
      ? { ...styles.protectedBadge, ...styles.protectedBadgeYellow }
      : null;

  const badgeText = frozenPick ? '❄ 冻结' : protectedPick ? '⚠ 受保护' : null;

  return (
    <div
      style={itemStyle}
      onClick={() => onToggle(pick)}
      title={pick.note || formatPickLabel(pick)}
    >
      {!showRemove && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(pick)}
          style={styles.checkbox}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <span style={styles.pickLabel}>
        {formatPickLabel(pick)}
        {badgeText && <span style={badgeStyle}>{badgeText}</span>}
      </span>
      {pick.note && pick.note.length > 0 && (
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', flexShrink: 0, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {pick.note}
        </span>
      )}
      {showRemove && (
        <button
          style={styles.removeBtn}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(pick);
          }}
          title="移出交易包"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────
export default function DraftPickSelector({
  teamName,
  picksData = [],
  selectedPicks = [],
  onSelectionChange,
}) {
  const [searchFilter, setSearchFilter] = useState('');

  // ── Compute available picks for this team ────────────────
  const teamData = useMemo(() => {
    if (!picksData || picksData.length === 0) return null;
    // Find by full name or abbreviation
    return picksData.find(
      (t) => t.team === teamName || t.team?.toLowerCase() === teamName?.toLowerCase()
    );
  }, [picksData, teamName]);

  // Build a Set of selected UIDs for fast lookup
  const selectedUids = useMemo(() => {
    const s = new Set();
    (selectedPicks || []).forEach((p) => s.add(getPickUid(p)));
    return s;
  }, [selectedPicks]);

  // ── Filter available picks ──────────────────────────────
  const availablePicks = useMemo(() => {
    if (!teamData || !teamData.picks) return [];
    const filtered = teamData.picks.filter((pick) => {
      // Exclude picks that are already selected
      if (selectedUids.has(getPickUid(pick))) return false;
      // Apply search filter
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const label = formatPickLabel(pick).toLowerCase();
        return label.includes(q);
      }
      return true;
    });
    // Sort: by year desc, then round asc
    return filtered.sort((a, b) => b.year - a.year || a.round - b.round);
  }, [teamData, selectedUids, searchFilter]);

  // ── Handlers ────────────────────────────────────────────
  const handleToggle = useCallback(
    (pick) => {
      const uid = getPickUid(pick);
      const exists = selectedUids.has(uid);
      let updated;
      if (exists) {
        updated = selectedPicks.filter((p) => getPickUid(p) !== uid);
      } else {
        updated = [...selectedPicks, pick];
      }
      if (onSelectionChange) onSelectionChange(updated);
    },
    [selectedPicks, selectedUids, onSelectionChange]
  );

  const handleRemove = useCallback(
    (pick) => {
      const uid = getPickUid(pick);
      const updated = selectedPicks.filter((p) => getPickUid(p) !== uid);
      if (onSelectionChange) onSelectionChange(updated);
    },
    [selectedPicks, onSelectionChange]
  );

  // ── Render ──────────────────────────────────────────────
  return (
    <div style={styles.container}>
      {/* ── Left Panel: Available Picks ──────────────────── */}
      <div style={styles.panel}>
        <div style={styles.panelTitle}>
          <span>📦 可选选秀权</span>
          <span style={styles.count}>{availablePicks.length}</span>
        </div>

        <input
          type="text"
          placeholder="搜索年份 / 球队..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.pickList}>
          {!teamData ? (
            <div style={styles.emptyState}>
              {teamName ? `未找到 ${teamName} 的选秀权数据` : '请先选择球队'}
            </div>
          ) : availablePicks.length === 0 ? (
            <div style={styles.emptyState}>
              {selectedUids.size > 0 ? '✅ 所有选秀权已加入交易包' : '该队暂无可用选秀权'}
            </div>
          ) : (
            availablePicks.map((pick) => (
              <PickRow
                key={getPickUid(pick)}
                pick={pick}
                isSelected={false}
                onToggle={handleToggle}
                showRemove={false}
              />
            ))
          )}
        </div>

        {teamData && teamData.picks && (
          <div style={styles.note}>
            该队共有 {teamData.picks.length} 个未来选秀权，
            已选 {selectedUids.size} 个
          </div>
        )}
      </div>

      {/* ── Right Panel: Selected Picks ─────────────────── */}
      <div style={styles.panel}>
        <div style={styles.panelTitle}>
          <span>📋 交易包选秀权</span>
          <span style={styles.count}>{selectedPicks.length}</span>
        </div>

        <div style={styles.pickList}>
          {selectedPicks.length === 0 ? (
            <div style={styles.emptyState}>
              左侧勾选选秀权加入交易包
            </div>
          ) : (
            selectedPicks.map((pick) => (
              <PickRow
                key={getPickUid(pick)}
                pick={pick}
                isSelected={true}
                onToggle={handleRemove}
                showRemove={true}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>

        {selectedPicks.length > 0 && (
          <div style={styles.note}>
            共 {selectedPicks.length} 个选秀权将随交易送出
          </div>
        )}
      </div>
    </div>
  );
}
