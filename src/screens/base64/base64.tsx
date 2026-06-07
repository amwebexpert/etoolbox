import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

export const TAB_ITEMS = [
  { key: "/base64/string", label: "String" },
  { key: "/base64/file", label: "File" },
  { key: "/base64/image", label: "Image URI" },
];

export const Base64 = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
