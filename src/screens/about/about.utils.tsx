import React from "react";

import { APP_VERSION_INFO } from "~/constants";

const PRIVACY_POLICY_URL = "https://amwebexpert.github.io/etoolbox/privacy-policy.html";
const ICON_CREDITS_URL = "https://therealjerrylow.com/";

export const VERSION_DATA = [
  { key: "version", property: "Version", value: `${APP_VERSION_INFO.VERSION} (${APP_VERSION_INFO.VERSION_DATE})` },
  {
    key: "repository",
    property: "Repository",
    value: (
      <a href={APP_VERSION_INFO.REPOSITORY} target="_blank" rel="noopener noreferrer">
        {APP_VERSION_INFO.REPOSITORY}
      </a>
    ),
  },
  {
    key: "privacyPolicy",
    property: "Privacy Policy",
    value: (
      <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </a>
    ),
  },
  {
    key: "iconCredits",
    property: "Icon Credits",
    value: (
      <a href={ICON_CREDITS_URL} target="_blank" rel="noopener noreferrer">
        Jerry Low
      </a>
    ),
  },
  {
    key: "reactVersion",
    property: "React Version",
    value: (
      <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
        {React.version}
      </a>
    ),
  },
];

export const COLUMNS = [
  { title: "Property", dataIndex: "property", key: "property", width: 140 },
  { title: "Value", dataIndex: "value", key: "value" },
];
