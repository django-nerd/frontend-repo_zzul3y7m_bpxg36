import React, { useState } from 'react';

const isEmbeddable = (url) => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');
    return [
      'youtube.com',
      'youtu.be',
      'vimeo.com',
      'twitter.com',
      'x.com',
      'tiktok.com',
      'instagram.com',
      'cdn.cloudflarestream.com',
      'streamable.com',
      'dailymotion.com',
    ].some((h) => host.endsWith(h));
  } catch {
    return false;
  }
};

const normalizeToEmbed = (url) => {
  // Attempt to convert common video links to embed form
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');

    // YouTube
    if (host.endsWith('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo
    if (host.endsWith('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    // Streamable
    if (host.endsWith('streamable.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://streamable.com/e/${id}`;
    }

    // Cloudflare Stream direct player link preserved
    if (host.endsWith('cdn.cloudflarestream.com')) return url;

    // Dailymotion
    if (host.endsWith('dailymotion.com')) {
      const parts = u.pathname.split('/').filter(Boolean);
      const id = parts.find((p) => p.startsWith('video'))?.replace('video/', '') || parts[1];
      if (id) return `https://www.dailymotion.com/embed/video/${id}`;
    }

    // Fallback for platforms that allow direct oEmbed in iframe
    return url;
  } catch {
    return url;
  }
};

const VideoForm = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!input.trim()) return;

    if (!isEmbeddable(input)) {
      setError('That link may not be embeddable. Try a YouTube, Vimeo, TikTok, Instagram, or similar link.');
      return;
    }

    const embed = normalizeToEmbed(input.trim());
    onAdd({ url: input.trim(), embedUrl: embed, createdAt: Date.now() });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <label htmlFor="videoUrl" className="block text-sm font-medium text-white/80">Paste a video link</label>
      <div className="mt-2 flex gap-2">
        <input
          id="videoUrl"
          type="url"
          required
          placeholder="https://www.youtube.com/watch?v=..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </form>
  );
};

export default VideoForm;
