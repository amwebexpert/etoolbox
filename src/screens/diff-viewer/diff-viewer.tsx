import { DiffOutlined } from "@ant-design/icons";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

export const DiffViewer = () => {
  return (
    <ScreenContainer>
      <ScreenHeader icon={<DiffOutlined />} title="Diff Viewer" description="Compare two texts side by side" />
      <p>Coming soon</p>
    </ScreenContainer>
  );
};
