import React from 'react';

interface SideJourneyRailProps {
  activeSection: number;
  onNavigate: (sectionIndex: number) => void;
}

export const CHAPTERS = [
  { index: 0, label: '01 START', title: 'Goal' },
  { index: 1, label: '02 CONNECT', title: 'Network' },
  { index: 2, label: '03 UNDERSTAND', title: 'Intelligence' },
  { index: 3, label: '04 IMPROVE', title: 'Roadmap' },
  { index: 4, label: '05 OPPORTUNITY', title: 'Matches' },
  { index: 5, label: '06 FUTURE', title: 'Horizon' },
];

export const SideJourneyRail: React.FC<SideJourneyRailProps> = ({ activeSection, onNavigate }) => {
  return (
    <aside className="journey-rail" aria-label="Career Journey Stages">
      {CHAPTERS.map((ch) => {
        const isActive = activeSection === ch.index;
        return (
          <button
            key={ch.index}
            onClick={() => onNavigate(ch.index)}
            className={`journey-step-btn ${isActive ? 'active' : ''}`}
            title={`${ch.label}: ${ch.title}`}
          >
            <div className="journey-step-dot" />
            <span className="journey-step-label">
              {ch.label} • {ch.title}
            </span>
          </button>
        );
      })}
    </aside>
  );
};
