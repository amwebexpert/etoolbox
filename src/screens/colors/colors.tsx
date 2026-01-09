import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

const TAB_ITEMS = [
  { key: "/colors/picker", label: "Picker" },
  { key: "/colors/named", label: "Named Colors" },
];

export const Colors = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
