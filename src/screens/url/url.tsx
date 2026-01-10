import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

const TAB_ITEMS = [
  { key: "/url/encoder", label: "Encoder" },
  { key: "/url/curl", label: "cURL" },
  { key: "/url/parser", label: "Parser" },
];

export const Url = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
