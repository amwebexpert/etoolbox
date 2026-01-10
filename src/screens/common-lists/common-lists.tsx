import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

const TAB_ITEMS = [
  { key: "/common-lists/mime-types", label: "Mime-types" },
  { key: "/common-lists/html-entities", label: "HTML Entities" },
  { key: "/common-lists/http-status-codes", label: "HTTP Status Codes" },
];

export const CommonLists = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
