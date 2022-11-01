/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';

import { IS_DEV_MODE } from './services/utils';

if (IS_DEV_MODE) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
