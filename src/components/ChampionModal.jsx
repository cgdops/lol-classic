import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Shield, Zap, Image as ImageIcon, ArrowLeft } from 'lucide-react';

export default function ChampionModal({ champion, currentIndex, championList, onClose, onNavigate, onBuildGuide }) {
  const [activeSkin, setActiveSkin] = useState(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const prevChampion = championList && currentIndex > 0 ? championList[currentIndex - 1] : null;
  const nextChampion = championList && currentIndex < championList.length - 1 ? championList[currentIndex + 1] : null;

  useEffect(() => {
    if (champion) {
      setActiveSkin(champion.skins[0] || null);
    }
  }, [champion]);

  // Preload adjacent champion splash & avatar images for instant swiping
  useEffect(() => {
    if (prevChampion) {
      const pSplash = new Image(); pSplash.src = prevChampion.splash;
      const pAvatar = new Image(); pAvatar.src = prevChampion.avatar;
    }
    if (nextChampion) {
      const nSplash = new Image(); nSplash.src = nextChampion.splash;
      const nAvatar = new Image(); nAvatar.src = nextChampion.avatar;
    }
  }, [prevChampion, nextChampion]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevChampion) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && nextChampion) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, championList, prevChampion, nextChampion, onClose, onNavigate]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // pixels

    if (diffX > minSwipeDistance && nextChampion) {
      // Swiped Left -> Go Next
      onNavigate(currentIndex + 1);
    } else if (diffX < -minSwipeDistance && prevChampion) {
      // Swiped Right -> Go Previous
      onNavigate(currentIndex - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!champion) return null;

  return (
    <div
      className="fullscreen-overlay"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky Fullscreen Top Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(5, 7, 12, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #785A28',
        padding: '0.6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        gap: '0.5rem'
      }}>
        {/* Left: Back Button */}
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid #785A28',
            borderRadius: '6px',
            color: '#F0E6D2',
            padding: '0.4rem 0.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} color="#0AC8B9" /> Back
        </button>

        {/* Center: Champion Name & Swipe Indicator */}
        <div style={{ textAlign: 'center', flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F0E6D2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {champion.name}
          </div>
          {championList && (
            <div style={{ fontSize: '0.7rem', color: '#949084' }}>
              {currentIndex + 1} of {championList.length} • Swipe ← / →
            </div>
          )}
        </div>

        {/* Right: Next / Previous & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={() => prevChampion && onNavigate(currentIndex - 1)}
            disabled={!prevChampion}
            style={{
              background: 'rgba(13, 17, 26, 0.8)',
              border: '1px solid #785A28',
              borderRadius: '6px',
              color: prevChampion ? '#F0E6D2' : '#504c44',
              padding: '0.4rem',
              cursor: prevChampion ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center'
            }}
            title={prevChampion ? `Previous: ${prevChampion.name}` : ''}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => nextChampion && onNavigate(currentIndex + 1)}
            disabled={!nextChampion}
            style={{
              background: 'rgba(13, 17, 26, 0.8)',
              border: '1px solid #785A28',
              borderRadius: '6px',
              color: nextChampion ? '#F0E6D2' : '#504c44',
              padding: '0.4rem',
              cursor: nextChampion ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center'
            }}
            title={nextChampion ? `Next: ${nextChampion.name}` : ''}
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F0E6D2',
              padding: '0.4rem',
              cursor: 'pointer',
              marginLeft: '0.25rem'
            }}
          >
            <X size={22} />
          </button>
        </div>
      </header>

      {/* Main Fullscreen Scrollable Body */}
      <main style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        
        {/* Champion Header Banner */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <img
              src={champion.avatar}
              alt={champion.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                border: '2px solid #C8AA6E',
                objectFit: 'cover'
              }}
            />
            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#F0E6D2', margin: 0 }}>{champion.name}</h1>
                <span style={{
                  background: 'rgba(10, 200, 185, 0.15)',
                  color: '#0AC8B9',
                  border: '1px solid #0AC8B9',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {champion.classicEra}
                </span>
              </div>
              <p style={{ color: '#C8AA6E', fontSize: '0.9rem', margin: '0.2rem 0' }}>{champion.title}</p>
              <p style={{ color: '#949084', fontSize: '0.8rem', fontStyle: 'italic', margin: 0 }}>"{champion.quote}"</p>
            </div>

            <button
              className="btn-gold"
              onClick={() => {
                onClose();
                onBuildGuide(champion);
              }}
              style={{ width: '100%', maxWidth: '240px', justifyContent: 'center' }}
            >
              <Zap size={16} /> Create Guide
            </button>
          </div>
        </div>

        {/* Responsive 2-Column Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          
          {/* Left Column: Skin Showcase & Base Attributes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Skin Showcase */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#C8AA6E', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ImageIcon size={16} color="#0AC8B9" /> Retro Skin Showcase
              </h3>
              <div
                className="img-shimmer"
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #785A28',
                  marginBottom: '0.65rem',
                  background: '#090b10'
                }}
              >
                <img
                  key={activeSkin?.splash || champion.splash}
                  src={activeSkin ? activeSkin.splash : champion.splash}
                  alt={activeSkin ? activeSkin.name : champion.name}
                  decoding="async"
                  fetchpriority="high"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(0deg, rgba(5,7,12,0.95) 0%, transparent 100%)',
                  padding: '0.75rem',
                  color: '#F0E6D2',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}>
                  {activeSkin ? activeSkin.name : champion.name}
                </div>
              </div>

              {/* Skin Thumbnails Pill Bar */}
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                {champion.skins.map(skin => (
                  <button
                    key={skin.name}
                    onClick={() => setActiveSkin(skin)}
                    style={{
                      background: activeSkin?.name === skin.name ? '#C8AA6E' : 'rgba(7,9,14,0.6)',
                      color: activeSkin?.name === skin.name ? '#07090E' : '#949084',
                      border: activeSkin?.name === skin.name ? '1px solid #F0E6D2' : '1px solid rgba(120,90,40,0.5)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      whiteSpace: 'nowrap',
                      fontWeight: 600,
                      flexShrink: 0
                    }}
                  >
                    {skin.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Attributes Grid */}
            <div className="glass-panel" style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#C8AA6E', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Shield size={16} color="#0AC8B9" /> Classic Base Attributes
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                gap: '0.65rem'
              }}>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Health</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.hp}</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>HP Regen</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.hpRegen}/5s</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Attack Damage</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.attackDamage}</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Attack Speed</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.attackSpeed}</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Armor</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.armor}</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Magic Resist</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.magicResist}</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Attack Range</span>
                  <div style={{ color: '#0AC8B9', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.attackRange || 125}</div>
                </div>
                <div style={{ background: 'rgba(5,7,12,0.6)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(120,90,40,0.3)' }}>
                  <span style={{ color: '#949084', fontSize: '0.75rem' }}>Move Speed</span>
                  <div style={{ color: '#F0E6D2', fontWeight: 700, fontSize: '0.9rem' }}>{champion.stats.ms}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Abilities & Passives */}
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#C8AA6E', marginBottom: '0.75rem' }}>Ability Kit & Tooltips</h3>
            
            {/* Passive */}
            <div style={{
              background: 'rgba(5, 7, 12, 0.7)',
              border: '1px solid rgba(10, 200, 185, 0.4)',
              padding: '0.85rem',
              borderRadius: '6px',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ background: '#0AC8B9', color: '#07090E', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}>PASSIVE</span>
                <h4 style={{ color: '#F0E6D2', margin: 0, fontSize: '0.95rem' }}>{champion.passive.name}</h4>
              </div>
              <p style={{ color: '#949084', fontSize: '0.85rem', marginTop: '0.4rem', lineHeight: '1.4' }}>{champion.passive.description}</p>
            </div>

            {/* QWER Spells */}
            {champion.spells.map(spell => (
              <div
                key={spell.key}
                style={{
                  background: 'rgba(5, 7, 12, 0.7)',
                  border: '1px solid rgba(120, 90, 40, 0.35)',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <span style={{ background: '#C8AA6E', color: '#07090E', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}>{spell.key}</span>
                    <h4 style={{ color: '#F0E6D2', margin: 0, fontSize: '0.95rem' }}>{spell.name}</h4>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#0AC8B9', fontWeight: 600 }}>
                    <span>CD: {spell.cooldown}</span> | <span>Cost: {spell.cost}</span>
                  </div>
                </div>
                <p style={{ color: '#949084', fontSize: '0.85rem', marginTop: '0.4rem', lineHeight: '1.4' }}>{spell.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

