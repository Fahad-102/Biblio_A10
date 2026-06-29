import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-50 flex flex-col justify-center items-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute w-7 h-7 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}></div>
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-slate-800 tracking-wide animate-pulse">Loading Platform...</p>
        <p className="text-xs text-slate-400">Please wait a moment</p>
      </div>
    </div>
  );
}