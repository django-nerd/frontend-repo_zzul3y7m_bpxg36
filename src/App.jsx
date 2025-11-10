import React, { useEffect, useState } from 'react';
import HeroCover from './components/HeroCover';
import ProfileHeader from './components/ProfileHeader';
import VideoForm from './components/VideoForm';
import VideoGrid from './components/VideoGrid';

function App() {
  const [items, setItems] = useState([]);

  // Load and persist locally for convenience
  useEffect(() => {
    try {
      const raw = localStorage.getItem('reels_refs');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('reels_refs', JSON.stringify(items));
    } catch {}
  }, [items]);

  const handleAdd = (item) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      <HeroCover />

      <main className="mx-auto w-full max-w-6xl px-6">
        <ProfileHeader count={items.length} />

        <div className="mb-6">
          <VideoForm onAdd={handleAdd} />
        </div>

        <VideoGrid items={items} />

        <p className="mt-10 text-center text-xs text-white/40">
          Paste a YouTube, Vimeo, TikTok, Instagram, or similar link. Your links are stored locally in your browser.
        </p>
      </main>
    </div>
  );
}

export default App;
