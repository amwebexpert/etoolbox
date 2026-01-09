import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

const TAB_ITEMS = [
  { key: "/json/formatter", label: "Formatter" },
  { key: "/json/converter", label: "Converter" },
  { key: "/json/repair", label: "Repair" },
];

export const Json = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
