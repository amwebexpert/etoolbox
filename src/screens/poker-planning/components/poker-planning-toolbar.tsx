import { ClearOutlined, CopyOutlined, DisconnectOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { isBlank } from "@lichens-innovation/ts-common";
import { Button, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { usePokerPlanningStore } from "../poker-planning.store";
import { buildFullRouteURL } from "../poker-planning.utils";

interface PokerPlanningToolbarProps {
  isUserMemberOfRoom: boolean;
  onClearVotes: () => void;
}

export const PokerPlanningToolbar = ({ isUserMemberOfRoom, onClearVotes }: PokerPlanningToolbarProps) => {
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  const { hostName, roomName, roomUUID, username, socketState, createRoom, joinRoom, disconnect } =
    usePokerPlanningStore();

  const isConnected = socketState === "open";
  const isConnecting = socketState === "connecting";
  const canCreateRoom = !isBlank(hostName) && !isBlank(roomName);
  const canJoin = isConnected && !isBlank(username) && !isUserMemberOfRoom;
  const canShareLink = isConnected && !isBlank(roomUUID);

  const handleCopyLink = () => {
    const url = buildFullRouteURL({ hostName, roomUUID, roomName });
    void copyTextToClipboard({ text: url, successMessage: "Room link copied to clipboard!" });
  };

  return (
    <ScreenToolbar
      leading={
        <Space size="small" wrap>
          <Tooltip title="Create a new room and start the session">
            <Button
              type="primary"
              aria-label="New Room"
              icon={<PlusOutlined />}
              disabled={!canCreateRoom || isConnecting}
              loading={isConnecting}
              onClick={createRoom}
            >
              {!isMobile && "New Room"}
            </Button>
          </Tooltip>

          <Tooltip title="Join the current room">
            <Button aria-label="Join" icon={<TeamOutlined />} disabled={!canJoin} onClick={joinRoom}>
              {!isMobile && "Join"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy room link to clipboard">
            <Button aria-label="Copy Link" icon={<CopyOutlined />} disabled={!canShareLink} onClick={handleCopyLink}>
              {!isMobile && "Copy Link"}
            </Button>
          </Tooltip>
        </Space>
      }
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear all votes">
            <Button
              aria-label="Clear Votes"
              icon={<ClearOutlined />}
              danger
              disabled={!isUserMemberOfRoom}
              onClick={onClearVotes}
            >
              {!isMobile && "Clear Votes"}
            </Button>
          </Tooltip>

          {isConnected ? (
            <Tooltip title="Disconnect from the room">
              <Button aria-label="Disconnect" icon={<DisconnectOutlined />} onClick={disconnect}>
                {!isMobile && "Disconnect"}
              </Button>
            </Tooltip>
          ) : null}
        </Space>
      }
    />
  );
};
