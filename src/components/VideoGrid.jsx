import React from 'react';

const VideoTile = ({ embedUrl }) => {
  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-black/40">
      <iframe
        src={embedUrl}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full scale-[1.01] transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

const VideoGrid = ({ items }) => {
  if (!items?.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
        Paste a video link above to see your references here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <VideoTile key={item.createdAt + item.url} embedUrl={item.embedUrl} />
      ))}
    </div>
  );
};

export default VideoGrid;
