import React, { useState } from 'react';
import { ThumbsUp, BookOpen, Shield, Search, UserCheck } from 'lucide-react';
import { CHAMPIONS } from '../data/champions';
import { LEGACY_ITEMS } from '../data/items';
import { CLASSIC_SUMMONER_SPELLS } from '../data/summonerSpells';

export default function CommunityGuides({ guides, onSelectChampion }) {
  const [roleFilter, setRoleFilter] = useState('All');
  const [search, setSearch] = useState('');

  const roles = ['All', 'Top', 'Mid', 'Jungle', 'ADC', 'Support'];

  const filteredGuides = guides.filter(g => {
    const matchesRole = roleFilter === 'All' || g.role === roleFilter;
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) || 
                          g.author.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <BookOpen color="#C8AA6E" size={32} />
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F0E6D2', margin: 0 }}>Community Guides & Meta Builds</h2>
            <p style={{ color: '#A09B8C', margin: 0 }}>Upvoted classic summoner builds, item rush order, and skill maxing priorities.</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} color="#C8AA6E" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search guides or author..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(9, 11, 16, 0.8)',
                border: '1px solid #785A28',
                borderRadius: '4px',
                padding: '0.5rem 0.5rem 0.5rem 2.2rem',
                color: '#F0E6D2'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  background: roleFilter === r ? '#C8AA6E' : 'rgba(9, 11, 16, 0.6)',
                  color: roleFilter === r ? '#090B10' : '#A09B8C',
                  border: roleFilter === r ? '1px solid #F0E6D2' : '1px solid #785A28',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guide Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredGuides.map(guide => {
          const champ = CHAMPIONS.find(c => c.id === guide.championId) || CHAMPIONS[0];
          return (
            <div
              key={guide.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1, minWidth: '280px' }}>
                <img
                  src={champ.avatar}
                  alt={champ.name}
                  onClick={() => onSelectChampion(champ)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    border: '2px solid #C8AA6E',
                    cursor: 'pointer'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      background: 'rgba(10,200,185,0.2)',
                      color: '#0AC8B9',
                      border: '1px solid #0AC8B9',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }}>
                      {guide.role}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', color: '#F0E6D2', margin: 0 }}>{guide.title}</h3>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#A09B8C', margin: '0.4rem 0' }}>
                    {guide.summary}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#C8AA6E' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <UserCheck size={14} /> {guide.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ThumbsUp size={14} color="#0AC8B9" /> {guide.votes} Upvotes
                    </span>
                  </div>
                </div>
              </div>

              {/* Items & Spells Showcase */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Spells */}
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#A09B8C', display: 'block', marginBottom: '0.3rem' }}>Spells</span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {guide.spells.map(spellId => {
                      const spell = CLASSIC_SUMMONER_SPELLS.find(s => s.id === spellId);
                      return spell ? (
                        <img key={spellId} src={spell.icon} alt={spell.name} style={{ width: '32px', height: '32px', borderRadius: '4px', border: '1px solid #785A28' }} title={spell.name} />
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#A09B8C', display: 'block', marginBottom: '0.3rem' }}>Core Build</span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {guide.items.map(itemId => {
                      const item = LEGACY_ITEMS.find(i => i.id === itemId);
                      return item ? (
                        <img key={itemId} src={item.icon} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '4px', border: '1px solid #C8AA6E' }} title={item.name} />
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
