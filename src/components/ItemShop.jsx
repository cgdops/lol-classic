import React, { useState } from 'react';
import { LEGACY_ITEMS, ITEM_CATEGORIES, STAT_FILTERS } from '../data/items';
import { ShoppingBag, Filter, Sparkles, PlusCircle } from 'lucide-react';

export default function ItemShop({ onSelectItem }) {
  const [category, setCategory] = useState('All');
  const [selectedStat, setSelectedStat] = useState(null);
  const [search, setSearch] = useState('');

  const filteredItems = LEGACY_ITEMS.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesStat = !selectedStat || item.tags.includes(selectedStat);
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.stats.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesStat && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <ShoppingBag color="#C8AA6E" size={32} />
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F0E6D2', margin: 0 }}>Classic Item Shop & Vault</h2>
            <p style={{ color: '#A09B8C', margin: 0 }}>Retired & Season 1-3 League of Legends items with original stat shop filters.</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {ITEM_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  background: category === cat ? 'linear-gradient(180deg, #C8AA6E 0%, #785A28 100%)' : 'rgba(9, 11, 16, 0.6)',
                  color: category === cat ? '#090B10' : '#A09B8C',
                  border: category === cat ? '1px solid #F0E6D2' : '1px solid #785A28',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stat Tags Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid rgba(120,90,40,0.3)', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#C8AA6E', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={14} /> In-Game Stat Filter:
            </span>
            {STAT_FILTERS.map(stat => {
              const isSelected = selectedStat === stat;
              return (
                <button
                  key={stat}
                  onClick={() => setSelectedStat(isSelected ? null : stat)}
                  style={{
                    background: isSelected ? 'rgba(10, 200, 185, 0.25)' : 'transparent',
                    color: isSelected ? '#00F0FF' : '#A09B8C',
                    border: isSelected ? '1px solid #00F0FF' : '1px solid rgba(120, 90, 40, 0.4)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {stat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '6px',
                    border: '2px solid #C8AA6E',
                    background: '#090B10'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#F0E6D2', margin: 0 }}>{item.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: '#FFD700', fontWeight: 600 }}>{item.price} Gold</span>
                </div>
              </div>

              {/* Stats */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem 0', fontSize: '0.825rem', color: '#0AC8B9' }}>
                {item.stats.map((s, idx) => (
                  <li key={idx}>• {s}</li>
                ))}
              </ul>

              <p style={{ fontSize: '0.8rem', color: '#A09B8C', marginBottom: '0.75rem' }}>
                {item.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(120, 90, 40, 0.3)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#C8AA6E', fontStyle: 'italic' }}>
                {item.category}
              </span>
              {onSelectItem && (
                <button
                  className="btn-cyan"
                  style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                  onClick={() => onSelectItem(item)}
                >
                  <PlusCircle size={14} /> Add to Build
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
