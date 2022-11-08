import React from 'react';

import ShareLink from '@mui/icons-material/Share';
import { RWebShare } from 'react-web-share';

export default function AppShare() {
  return (
    <RWebShare
      data={{
        title: 'Web Toolbox',
        text: 'Collection of web developer utilities packaged as a desktop app',
        url: 'https://amwebexpert.github.io/etoolbox',
      }}>
      <ShareLink />
    </RWebShare>
  );
}
