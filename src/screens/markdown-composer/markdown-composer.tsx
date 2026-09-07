import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

import { TAB_ITEMS } from "./markdown-composer.constants";

export const MarkdownComposer = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
