import React from 'react';

export const SkeletonDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-6">
      {/* Header skeleton */}
      <div className="h-24 bg-gray-200 rounded-2xl w-full" />
      {/* 4 Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-2xl w-full" />
        ))}
      </div>
      {/* Large chart skeleton */}
      <div className="h-64 bg-gray-200 rounded-2xl w-full" />
    </div>
  );
};
