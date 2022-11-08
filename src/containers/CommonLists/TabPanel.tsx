import React from 'react';

type Props = {
  children: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel: React.FC<Props> = ({ children, value, index }) => {
  const isTabSelected = value === index;

  return (
    <div
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      hidden={!isTabSelected}
      role="tabpanel">
      {isTabSelected && <>{children}</>}
    </div>
  );
};
