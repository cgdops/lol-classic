import React from 'react';
import { ScrollText, Calendar, ShieldAlert } from 'lucide-react';
import { PATCH_NOTES } from '../data/summonerSpells';

export default function PatchChangelog() {
  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <ScrollText color="#C8AA6E" size={32} />
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F0E6D2', margin: 0 }}>Classic Rift Balance Changelog</h2>
            <p style={{ color: '#A09B8C', margin: 0 }}>Track patch balance adjustments, retro mechanics, and champion fixes for League Classic.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {PATCH_NOTES.map(patch => (
            <div
              key={patch.patch}
              style={{
                background: 'rgba(9, 11, 16, 0.6)',
                border: '1px solid #785A28',
                borderRadius: '6px',
                padding: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(120,90,40,0.3)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#0AC8B9', margin: 0 }}>{patch.patch}</h3>
                <span style={{ color: '#A09B8C', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> {patch.date}
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {patch.highlights.map((h, i) => (
                  <li key={i} style={{ color: '#F0E6D2', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <ShieldAlert size={16} color="#C8AA6E" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
