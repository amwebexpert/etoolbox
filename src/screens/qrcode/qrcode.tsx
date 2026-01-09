import { AppLayoutTabs } from "~/components/layout/app-layout-tabs";

const TAB_ITEMS = [
  { key: "/qrcode/generator", label: "Generator" },
  { key: "/qrcode/decoder", label: "Decoder" },
];

export const Qrcode = () => {
  return <AppLayoutTabs items={TAB_ITEMS} />;
};
