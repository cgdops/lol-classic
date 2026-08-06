import React from 'react';
import { Shield, BookOpen, Layers, ShoppingBag, Award, Sparkles, ScrollText } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'champions', label: 'Champions', icon: Shield },
    { id: 'guides', label: 'Community Guides', icon: BookOpen },
    { id: 'builder', label: 'Guide Builder', icon: Sparkles },
    { id: 'items', label: 'Legacy Item Shop', icon: ShoppingBag },
    { id: 'tierlist', label: 'Tier List Maker', icon: Layers },
    { id: 'patchnotes', label: 'Patch Notes', icon: ScrollText }
  ];

  return (
    <nav style={{
      borderBottom: '2px solid #785A28',
      background: 'rgba(9, 11, 16, 0.95)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.8rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('champions')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: '2px solid #C8AA6E',
            background: 'radial-gradient(circle, #0AC8B9 0%, #090B10 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(10, 200, 185, 0.5)'
          }}>
            <Award color="#F0E6D2" size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.3rem', color: '#F0E6D2', margin: 0, lineHeight: 1 }}>RIFT CLASSIC</h1>
            <span style={{ fontSize: '0.75rem', color: '#0AC8B9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Vault & Guides</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: isActive ? 'linear-gradient(180deg, rgba(200, 170, 110, 0.2) 0%, rgba(120, 90, 40, 0.4) 100%)' : 'transparent',
                  color: isActive ? '#F0E6D2' : '#A09B8C',
                  border: isActive ? '1px solid #C8AA6E' : '1px solid transparent',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#0AC8B9' : '#A09B8C'} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
