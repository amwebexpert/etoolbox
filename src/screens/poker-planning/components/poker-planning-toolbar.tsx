import { ClearOutlined, CopyOutlined, DisconnectOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { isBlank } from "@lichens-innovation/ts-common";
import { Button, Space, Tooltip } from "antd";
import { createStyles } from "antd-style";

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
  const { styles } = useStyles();
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
    copyTextToClipboard({ text: url, successMessage: "Room link copied to clipboard!" });
  };

  return (
    <div className={styles.toolbar}>
      <Space size="small" wrap>
        <Tooltip title="Create a new room and start the session">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!canCreateRoom || isConnecting}
            loading={isConnecting}
            onClick={createRoom}
          >
            {!isMobile && "New Room"}
          </Button>
        </Tooltip>

        <Tooltip title="Join the current room">
          <Button icon={<TeamOutlined />} disabled={!canJoin} onClick={joinRoom}>
            {!isMobile && "Join"}
          </Button>
        </Tooltip>

        <Tooltip title="Copy room link to clipboard">
          <Button icon={<CopyOutlined />} disabled={!canShareLink} onClick={handleCopyLink}>
            {!isMobile && "Copy Link"}
          </Button>
        </Tooltip>
      </Space>

      <div className={styles.spacer} />

      <Space size="small" wrap>
        <Tooltip title="Clear all votes">
          <Button icon={<ClearOutlined />} danger disabled={!isUserMemberOfRoom} onClick={onClearVotes}>
            {!isMobile && "Clear Votes"}
          </Button>
        </Tooltip>

        {isConnected && (
          <Tooltip title="Disconnect from the room">
            <Button icon={<DisconnectOutlined />} onClick={disconnect}>
              {!isMobile && "Disconnect"}
            </Button>
          </Tooltip>
        )}
      </Space>
    </div>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  spacer: {
    flex: 1,
  },
}));
