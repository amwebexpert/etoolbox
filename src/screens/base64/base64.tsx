import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

const TAB_ITEMS = [
  { key: "/base64/string", label: "String" },
  { key: "/base64/file", label: "File" },
];

export const Base64 = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
