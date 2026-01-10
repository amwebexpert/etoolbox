import { NumberOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Divider, Flex, Modal } from "antd";
import { createStyles } from "antd-style";
import { useCallback } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";

import { PokerPlanningCards } from "./components/poker-planning-cards";
import { PokerPlanningOptions } from "./components/poker-planning-options";
import { PokerPlanningQRCode } from "./components/poker-planning-qrcode";
import { PokerPlanningTable } from "./components/poker-planning-table";
import { PokerPlanningToolbar } from "./components/poker-planning-toolbar";
import { useCleanupSocketOnUnmount } from "./hooks/use-cleanup-socket-on-unmount";
import { useRouteParamsSync } from "./hooks/use-route-params-sync";
import { useSessionSync } from "./hooks/use-session-sync";
import { usePokerPlanningStore } from "./poker-planning.store";
import { parseEstimates } from "./poker-planning.utils";

export const PokerPlanning = () => {
  const { styles } = useStyles();
  const [modal, contextHolder] = Modal.useModal();

  const { roomName, roomUUID, username, socketState, session, clearVotes, removeUser } = usePokerPlanningStore();

  // Sync URL params and session state
  useRouteParamsSync();
  useSessionSync();
  useCleanupSocketOnUnmount();

  const estimates = session?.estimates ?? [];
  const { isUserMemberOfRoom } = parseEstimates({ estimates, username });

  const isConnected = socketState === "open";
  const isSessionActive = isConnected && isNotBlank(roomUUID);
  const canVote = isSessionActive && isNotBlank(username) && isUserMemberOfRoom;

  const title = isNotBlank(roomName) ? `Poker Planning - ${roomName}` : "Poker Planning";

  const handleClearVotes = useCallback(() => {
    modal.confirm({
      title: "Clear All Votes",
      content: "Are you sure you want to clear all votes? This action cannot be undone.",
      okText: "Clear",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: clearVotes,
    });
  }, [modal, clearVotes]);

  const handleRemoveUser = useCallback(
    (userToRemove: string) => {
      modal.confirm({
        title: "Remove User",
        content: `Are you sure you want to remove "${userToRemove}" from the room?`,
        okText: "Remove",
        okButtonProps: { danger: true },
        cancelText: "Cancel",
        onOk: () => removeUser(userToRemove),
      });
    },
    [modal, removeUser]
  );

  return (
    <ScreenContainer>
      {contextHolder}
      <Flex vertical gap="middle" className={styles.container}>
        <ScreenHeader
          icon={<NumberOutlined />}
          title={title}
          description="Real-time collaborative story point estimation for agile teams"
        />

        <PokerPlanningOptions isSessionActive={isSessionActive} />

        <PokerPlanningToolbar isUserMemberOfRoom={isUserMemberOfRoom} onClearVotes={handleClearVotes} />

        <Divider className={styles.divider} />

        <PokerPlanningCards isDisabled={!canVote} />

        <Divider className={styles.divider} />

        <PokerPlanningTable isUserMemberOfRoom={isUserMemberOfRoom} onRemoveUser={handleRemoveUser} />

        <PokerPlanningQRCode />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  container: {
    width: "100%",
  },
  divider: {
    margin: "8px 0",
  },
}));
