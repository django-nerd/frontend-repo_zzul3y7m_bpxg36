import React from 'react';
import { User, Grid3x3 } from 'lucide-react';

const ProfileHeader = ({ count = 0 }) => {
  return (
    <div className="mx-auto -mt-14 mb-6 w-full max-w-6xl px-6">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Your Profile</h2>
            <p className="text-sm text-white/60">{count} saved references</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Grid3x3 className="h-5 w-5" />
          <span className="text-sm">Grid view</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
