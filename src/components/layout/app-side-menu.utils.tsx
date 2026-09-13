import { HomeOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import type { MenuProps } from "antd";

import { PinStarButton } from "~/tools/pin-star-button";
import { type Tool, TOOLS } from "~/tools/tools-registry";
import { selectPinnedTools, selectUnpinnedTools } from "~/tools/tools-registry.utils";

type MenuItem = Required<MenuProps>["items"][number];

const HOME_MENU_ITEM: MenuItem = {
  key: "/",
  icon: <HomeOutlined />,
  label: <Link to="/">Home</Link>,
};

interface BuildMenuItemsArgs {
  pinnedPaths: string[];
  onTogglePinned: (path: string) => void;
}

interface ToMenuItemArgs {
  tool: Tool;
  pinned: boolean;
  onTogglePinned: (path: string) => void;
}

const toMenuItem = ({ tool, pinned, onTogglePinned }: ToMenuItemArgs): MenuItem => ({
  key: tool.path,
  icon: tool.icon,
  label: (
    <span className="menu-row">
      <Link to={tool.path} className="menu-row-link">
        {tool.name}
      </Link>
      <PinStarButton
        toolName={tool.name}
        toolPath={tool.path}
        pinned={pinned}
        onToggle={onTogglePinned}
        className="pin-star"
      />
    </span>
  ),
});

export const buildMenuItems = ({ pinnedPaths, onTogglePinned }: BuildMenuItemsArgs): MenuItem[] => {
  const pinnedTools = selectPinnedTools({ tools: TOOLS, pinnedPaths });
  const unpinnedTools = selectUnpinnedTools({ tools: TOOLS, pinnedPaths });

  const pinnedGroup: MenuItem[] =
    pinnedTools.length === 0
      ? []
      : [
          {
            type: "group",
            key: "pinned-group",
            label: "Pinned",
            children: pinnedTools.map((tool) => toMenuItem({ tool, pinned: true, onTogglePinned })),
          },
          { type: "divider", key: "pinned-divider" },
        ];

  return [
    HOME_MENU_ITEM,
    ...pinnedGroup,
    ...unpinnedTools.map((tool) => toMenuItem({ tool, pinned: false, onTogglePinned })),
  ];
};
