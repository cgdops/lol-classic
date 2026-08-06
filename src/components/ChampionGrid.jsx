import React, { useState } from 'react';
import { Search, Shield, Zap, Sparkles } from 'lucide-react';
import { CHAMPIONS } from '../data/champions';

const ROLES = ['All', 'Marksman', 'Assassin', 'Mage', 'Fighter', 'Tank', 'Support', 'Top', 'Mid', 'Jungle'];

export default function ChampionGrid({ onSelectChampion }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredChampions = CHAMPIONS.filter(champ => {
    const matchesSearch = champ.name.toLowerCase().includes(search.toLowerCase()) || 
                          champ.title.toLowerCase().includes(search.toLowerCase());
    
    let matchesRole = roleFilter === 'All';
    if (!matchesRole) {
      if (roleFilter === 'Marksman' || roleFilter === 'ADC') {
        matchesRole = (champ.tags && champ.tags.includes('Marksman')) || champ.role.includes('ADC');
      } else {
        const matchTag = champ.tags && champ.tags.some(t => t.toLowerCase() === roleFilter.toLowerCase());
        const matchRoleStr = champ.role.toLowerCase().includes(roleFilter.toLowerCase());
        matchesRole = matchTag || matchRoleStr;
      }
    }
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
      {/* Search & Role Filter Header */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          {/* Top Row: Title & Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#F0E6D2', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="#C8AA6E" /> Champions Roster
              </h2>
              <p style={{ color: '#949084', fontSize: '0.8rem', margin: '0.1rem 0 0 0' }}>
                Showing <strong style={{ color: '#0AC8B9' }}>{filteredChampions.length}</strong> of {CHAMPIONS.length} Classic Champions
              </p>
            </div>

            <div style={{ position: 'relative', flex: '1', maxWidth: '360px', minWidth: '220px' }}>
              <Search size={16} color="#C8AA6E" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search champion..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(5, 7, 12, 0.8)',
                  border: '1px solid #785A28',
                  borderRadius: '6px',
                  padding: '0.5rem 0.6rem 0.5rem 2.2rem',
                  color: '#F0E6D2',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Role Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem',
            scrollbarWidth: 'none'
          }}>
            {ROLES.map(role => {
              const active = roleFilter === role;
              return (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  style={{
                    background: active ? '#C8AA6E' : 'rgba(7, 9, 14, 0.6)',
                    color: active ? '#07090E' : '#949084',
                    border: active ? '1px solid #F0E6D2' : '1px solid rgba(120, 90, 40, 0.5)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                    flexShrink: 0
                  }}
                >
                  {role}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Champion Grid Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '0.75rem'
      }}>
        {filteredChampions.map((champ, index) => (
          <div
            key={champ.id}
            onClick={() => onSelectChampion(champ, index, filteredChampions)}
            className="glass-panel"
            style={{
              padding: '0.75rem',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, border-color 0.15s ease',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#0AC8B9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#785A28';
            }}
          >
            {/* Top row: Avatar & Role */}
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '8px',
                border: '1.5px solid #C8AA6E',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#090b10'
              }} className="img-shimmer">
                <img
                  src={champ.avatar}
                  alt={champ.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ fontSize: '0.95rem', color: '#F0E6D2', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {champ.name}
                </h3>
                <span style={{
                  fontSize: '0.65rem',
                  color: '#0AC8B9',
                  background: 'rgba(10, 200, 185, 0.12)',
                  border: '1px solid rgba(10, 200, 185, 0.4)',
                  padding: '0.05rem 0.4rem',
                  borderRadius: '10px',
                  display: 'inline-block',
                  marginTop: '0.2rem'
                }}>
                  {champ.primaryRole || champ.role.split('/')[0].trim()}
                </span>
              </div>
            </div>

            {/* Title / Era */}
            <p style={{
              fontSize: '0.725rem',
              color: '#949084',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '0.5rem'
            }}>
              {champ.title}
            </p>

            {/* Bottom Base Stats bar */}
            <div style={{
              display: 'flex',
              justify: 'space-between',
              fontSize: '0.65rem',
              color: '#C8AA6E',
              borderTop: '1px solid rgba(120, 90, 40, 0.3)',
              paddingTop: '0.4rem',
              fontWeight: 500
            }}>
              <span>HP {champ.stats.hp}</span>
              <span>AD {champ.stats.attackDamage}</span>
              <span>RNG {champ.stats.attackRange || 125}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
