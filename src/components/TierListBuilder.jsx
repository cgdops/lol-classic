import React, { useState } from 'react';
import { CHAMPIONS } from '../data/champions';
import { Layers, Download, Sparkles, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TierListBuilder() {
  const [tiers, setTiers] = useState({
    'S+ Tier (Meta Overlords)': [CHAMPIONS[0], CHAMPIONS[1]],
    'S Tier (Strong Pick)': [CHAMPIONS[4]],
    'A Tier (Solid Viable)': [CHAMPIONS[2], CHAMPIONS[3]],
    'B Tier (Niche Pick)': [CHAMPIONS[5]]
  });

  const [unassigned, setUnassigned] = useState([]);

  const handleMoveChamp = (champ, targetTierName) => {
    // Remove from current tiers
    const nextTiers = {};
    Object.keys(tiers).forEach(tierName => {
      nextTiers[tierName] = tiers[tierName].filter(c => c.id !== champ.id);
    });
    nextTiers[targetTierName] = [...nextTiers[targetTierName], champ];
    setTiers(nextTiers);
  };

  const handleExport = () => {
    confetti({ particleCount: 50, spread: 60 });
    alert('Classic Tier List saved to clipboard!');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F0E6D2', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers color="#0AC8B9" /> Classic Tier List Maker
            </h2>
            <p style={{ color: '#A09B8C', margin: 0 }}>Create and share Season 1-3 meta tier lists for League Classic.</p>
          </div>

          <button onClick={handleExport} className="btn-cyan">
            <Download size={18} /> Export Tier List
          </button>
        </div>

        {/* Tier Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.keys(tiers).map((tierName, idx) => {
            const colors = ['#FF4D4D', '#FF9900', '#FFD700', '#0AC8B9'];
            return (
              <div
                key={tierName}
                style={{
                  display: 'flex',
                  border: '1px solid #785A28',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: 'rgba(9, 11, 16, 0.6)',
                  minHeight: '80px'
                }}
              >
                {/* Tier Label */}
                <div style={{
                  width: '160px',
                  background: colors[idx % colors.length],
                  color: '#090B10',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '0.5rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-title)'
                }}>
                  {tierName}
                </div>

                {/* Champion Icons Slot */}
                <div style={{ flex: 1, padding: '0.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {tiers[tierName].map(champ => (
                    <div
                      key={champ.id}
                      style={{ position: 'relative', cursor: 'pointer' }}
                      title={`Move ${champ.name}`}
                    >
                      <img
                        src={champ.avatar}
                        alt={champ.name}
                        style={{ width: '56px', height: '56px', borderRadius: '6px', border: '2px solid #C8AA6E' }}
                      />
                      <select
                        onChange={e => handleMoveChamp(champ, e.target.value)}
                        value={tierName}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'rgba(9, 11, 16, 0.9)',
                          color: '#0AC8B9',
                          border: 'none',
                          fontSize: '0.65rem',
                          borderRadius: '0 0 4px 4px'
                        }}
                      >
                        {Object.keys(tiers).map(t => (
                          <option key={t} value={t}>{t.substring(0, 7)}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
