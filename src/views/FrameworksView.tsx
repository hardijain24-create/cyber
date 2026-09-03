import React from 'react';
import { ComplianceView } from './ComplianceView';

export const FrameworksView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F4] text-[#192837] py-10 px-5 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-6">
        <ComplianceView />
      </div>
    </div>
  );
};
