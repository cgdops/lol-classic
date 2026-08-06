import React, { useState } from 'react';
import { CHAMPIONS } from '../data/champions';
import { LEGACY_ITEMS } from '../data/items';
import { CLASSIC_SUMMONER_SPELLS } from '../data/summonerSpells';
import { Sparkles, CheckCircle2, Shield, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GuideBuilder({ initialChampion, onPublishGuide }) {
  const [selectedChampion, setSelectedChampion] = useState(initialChampion || CHAMPIONS[0]);
  const [guideTitle, setGuideTitle] = useState('');
  const [role, setRole] = useState(selectedChampion ? selectedChampion.primaryRole : 'Top');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSpells, setSelectedSpells] = useState(['flash', 'ignite']);
  const [skillMatrix, setSkillMatrix] = useState(Array(18).fill('Q'));
  const [offensePts, setOffensePts] = useState(21);
  const [defensePts, setDefensePts] = useState(9);
  const [utilityPts, setUtilityPts] = useState(0);
  const [guideSummary, setGuideSummary] = useState('');

  const handleLevelSkill = (levelIndex, key) => {
    const nextMatrix = [...skillMatrix];
    nextMatrix[levelIndex] = key;
    setSkillMatrix(nextMatrix);
  };

  const handleAddItem = (item) => {
    if (selectedItems.length < 6) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (index) => {
    const next = [...selectedItems];
    next.splice(index, 1);
    setSelectedItems(next);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!guideTitle) return alert('Please enter a guide title!');

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });

    const newGuide = {
      id: `guide-${Date.now()}`,
      championId: selectedChampion.id,
      title: guideTitle,
      author: 'Summoner (You)',
      votes: 1,
      role: role,
      summary: guideSummary || 'Custom Classic Rift champion guide strategy.',
      items: selectedItems.map(i => i.id),
      spells: selectedSpells,
      maxOrder: ['Q', 'W', 'E', 'R']
    };

    onPublishGuide(newGuide);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <form onSubmit={handlePublish} className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F0E6D2', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles color="#0AC8B9" /> Classic Guide Creator
            </h2>
            <p style={{ color: '#A09B8C', margin: 0 }}>Publish high-elo strategy guides for Season 1-3 League of Legends Classic.</p>
          </div>

          <button type="submit" className="btn-gold" style={{ fontSize: '1rem' }}>
            <CheckCircle2 size={18} /> Publish Guide to Community
          </button>
        </div>

        {/* Basic Guide Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', color: '#C8AA6E', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>Guide Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Challenger Dodge God Jax Top Guide"
              value={guideTitle}
              onChange={e => setGuideTitle(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(9, 11, 16, 0.8)',
                border: '1px solid #785A28',
                borderRadius: '4px',
                padding: '0.6rem',
                color: '#F0E6D2'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#C8AA6E', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>Target Champion</label>
            <select
              value={selectedChampion.id}
              onChange={e => {
                const champ = CHAMPIONS.find(c => c.id === e.target.value);
                setSelectedChampion(champ);
              }}
              style={{
                width: '100%',
                background: 'rgba(9, 11, 16, 0.8)',
                border: '1px solid #785A28',
                borderRadius: '4px',
                padding: '0.6rem',
                color: '#F0E6D2'
              }}
            >
              {CHAMPIONS.map(champ => (
                <option key={champ.id} value={champ.id}>{champ.name} ({champ.role})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: '#C8AA6E', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>Primary Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(9, 11, 16, 0.8)',
                border: '1px solid #785A28',
                borderRadius: '4px',
                padding: '0.6rem',
                color: '#F0E6D2'
              }}
            >
              <option value="Top">Top Lane</option>
              <option value="Mid">Mid Lane</option>
              <option value="Jungle">Jungle</option>
              <option value="ADC">ADC / Marksman</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        {/* Summoner Spells Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#C8AA6E', marginBottom: '0.75rem' }}>Classic Summoner Spells (Pick 2)</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {CLASSIC_SUMMONER_SPELLS.map(spell => {
              const isPicked = selectedSpells.includes(spell.id);
              return (
                <button
                  type="button"
                  key={spell.id}
                  onClick={() => {
                    if (isPicked) {
                      setSelectedSpells(selectedSpells.filter(s => s !== spell.id));
                    } else if (selectedSpells.length < 2) {
                      setSelectedSpells([...selectedSpells, spell.id]);
                    }
                  }}
                  style={{
                    background: isPicked ? 'rgba(10, 200, 185, 0.2)' : 'rgba(9, 11, 16, 0.6)',
                    border: isPicked ? '1px solid #00F0FF' : '1px solid #785A28',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    color: isPicked ? '#00F0FF' : '#A09B8C'
                  }}
                >
                  <img src={spell.icon} alt={spell.name} style={{ width: '28px', height: '28px', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.85rem' }}>{spell.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Item Build Slots */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#C8AA6E', marginBottom: '0.75rem' }}>Core Item Build (Max 6 Items)</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {[0, 1, 2, 3, 4, 5].map(idx => {
              const item = selectedItems[idx];
              return (
                <div
                  key={idx}
                  style={{
                    width: '64px',
                    height: '64px',
                    border: item ? '2px solid #C8AA6E' : '2px dashed #785A28',
                    borderRadius: '6px',
                    background: 'rgba(9, 11, 16, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {item ? (
                    <>
                      <img src={item.icon} alt={item.name} style={{ width: '100%', height: '100%', borderRadius: '4px' }} />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: '#FF4D4D',
                          border: 'none',
                          color: '#FFF',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#785A28' }}>Slot {idx + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: '0.8rem', color: '#A09B8C', marginBottom: '0.5rem' }}>Click below to quickly add legacy items:</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {LEGACY_ITEMS.map(item => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleAddItem(item)}
                style={{
                  background: 'rgba(9, 11, 16, 0.6)',
                  border: '1px solid #785A28',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '4px',
                  color: '#F0E6D2',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <img src={item.icon} alt={item.name} style={{ width: '20px', height: '20px', borderRadius: '3px' }} />
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* 21/9/0 Masteries Allocation */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#C8AA6E', marginBottom: '0.75rem' }}>Classic Mastery Tree Allocation (30 Pts)</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <span style={{ color: '#FF4D4D', fontWeight: 700 }}>Offense: {offensePts} Pts</span>
              <input
                type="range" min="0" max="30"
                value={offensePts}
                onChange={e => setOffensePts(Number(e.target.value))}
                style={{ display: 'block', marginTop: '0.5rem' }}
              />
            </div>
            <div>
              <span style={{ color: '#0AC8B9', fontWeight: 700 }}>Defense: {defensePts} Pts</span>
              <input
                type="range" min="0" max="30"
                value={defensePts}
                onChange={e => setDefensePts(Number(e.target.value))}
                style={{ display: 'block', marginTop: '0.5rem' }}
              />
            </div>
            <div>
              <span style={{ color: '#FFD700', fontWeight: 700 }}>Utility: {utilityPts} Pts</span>
              <input
                type="range" min="0" max="30"
                value={utilityPts}
                onChange={e => setUtilityPts(Number(e.target.value))}
                style={{ display: 'block', marginTop: '0.5rem' }}
              />
            </div>
          </div>
        </div>

        {/* Skill Order Leveling Matrix */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#C8AA6E', marginBottom: '0.75rem' }}>Skill Max Order Matrix (Levels 1-18)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, 1fr)', gap: '0.2rem', overflowX: 'auto' }}>
            {Array.from({ length: 18 }).map((_, lvlIdx) => (
              <div key={lvlIdx} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#A09B8C' }}>L{lvlIdx + 1}</span>
                <select
                  value={skillMatrix[lvlIdx]}
                  onChange={e => handleLevelSkill(lvlIdx, e.target.value)}
                  style={{
                    width: '100%',
                    background: '#090B10',
                    border: '1px solid #785A28',
                    color: '#0AC8B9',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0'
                  }}
                >
                  <option value="Q">Q</option>
                  <option value="W">W</option>
                  <option value="E">E</option>
                  <option value="R">R</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Written Strategy */}
        <div>
          <label style={{ display: 'block', color: '#C8AA6E', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>Written Strategy & Matchup Notes</label>
          <textarea
            rows="4"
            placeholder="Explain laning phase, wave control, teamfighting targets, and power spikes..."
            value={guideSummary}
            onChange={e => setGuideSummary(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(9, 11, 16, 0.8)',
              border: '1px solid #785A28',
              borderRadius: '4px',
              padding: '0.75rem',
              color: '#F0E6D2',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </form>
    </div>
  );
}
