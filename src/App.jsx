import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChampionGrid from './components/ChampionGrid';
import ChampionModal from './components/ChampionModal';
import ItemShop from './components/ItemShop';
import GuideBuilder from './components/GuideBuilder';
import CommunityGuides from './components/CommunityGuides';
import TierListBuilder from './components/TierListBuilder';
import PatchChangelog from './components/PatchChangelog';
import { COMMUNITY_GUIDES } from './data/summonerSpells';

export default function App() {
  const [activeTab, setActiveTab] = useState('champions');
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [selectedChampionIndex, setSelectedChampionIndex] = useState(0);
  const [activeChampionList, setActiveChampionList] = useState([]);
  const [builderChampion, setBuilderChampion] = useState(null);
  const [guidesList, setGuidesList] = useState(COMMUNITY_GUIDES);

  const handleSelectChampion = (champ, index = 0, list = []) => {
    setSelectedChampion(champ);
    setSelectedChampionIndex(index);
    setActiveChampionList(list);
  };

  const handleNavigateChampion = (newIndex) => {
    if (activeChampionList && activeChampionList[newIndex]) {
      setSelectedChampion(activeChampionList[newIndex]);
      setSelectedChampionIndex(newIndex);
    }
  };

  const handlePublishGuide = (newGuide) => {
    setGuidesList([newGuide, ...guidesList]);
    setActiveTab('guides');
  };

  const handleBuildForChampion = (champion) => {
    setBuilderChampion(champion);
    setActiveTab('builder');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1 }}>
        {activeTab === 'champions' && (
          <ChampionGrid onSelectChampion={handleSelectChampion} />
        )}

        {activeTab === 'guides' && (
          <CommunityGuides
            guides={guidesList}
            onSelectChampion={champ => handleSelectChampion(champ, 0, [champ])}
          />
        )}

        {activeTab === 'builder' && (
          <GuideBuilder
            initialChampion={builderChampion}
            onPublishGuide={handlePublishGuide}
          />
        )}

        {activeTab === 'items' && (
          <ItemShop />
        )}

        {activeTab === 'tierlist' && (
          <TierListBuilder />
        )}

        {activeTab === 'patchnotes' && (
          <PatchChangelog />
        )}
      </main>

      {/* Full-Screen Champion Detail View Overlay */}
      {selectedChampion && (
        <ChampionModal
          champion={selectedChampion}
          currentIndex={selectedChampionIndex}
          championList={activeChampionList}
          onClose={() => setSelectedChampion(null)}
          onNavigate={handleNavigateChampion}
          onBuildGuide={handleBuildForChampion}
        />
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #785A28',
        background: '#05070C',
        padding: '1.25rem',
        textAlign: 'center',
        color: '#949084',
        fontSize: '0.75rem',
        marginTop: '2rem'
      }}>
        <p>RIFT CLASSIC VAULT • Season 1–3 League of Legends Reference & Community Portal</p>
        <p style={{ marginTop: '0.2rem', color: '#785A28' }}>Not affiliated with Riot Games. Built for classic MOBA fans.</p>
      </footer>
    </div>
  );
}

