import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Empty, Table, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { createStyles } from "antd-style";

import { CARDS_LISTING_CATEGORIES } from "../poker-planning.constants";
import { usePokerPlanningStore } from "../poker-planning.store";
import type { UserEstimate } from "../poker-planning.types";
import { parseEstimates } from "../poker-planning.utils";

const { Text } = Typography;

interface PokerPlanningTableProps {
  isUserMemberOfRoom: boolean;
  onRemoveUser: (username: string) => void;
}

export const PokerPlanningTable = ({ isUserMemberOfRoom, onRemoveUser }: PokerPlanningTableProps) => {
  const { styles } = useStyles();
  const { session, isEstimatesVisible, cardsCategory, username, toggleEstimatesVisibility } = usePokerPlanningStore();

  const estimates = session?.estimates ?? [];
  const sorter = CARDS_LISTING_CATEGORIES[cardsCategory].sorter;
  const sortedEstimates = [...estimates].sort(sorter);
  const { estimatesAverage } = parseEstimates({ estimates, username });

  const columns: ColumnsType<UserEstimate> = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_, record) => (
        <Tooltip title={`Remove ${record.username}`}>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            disabled={!isUserMemberOfRoom}
            onClick={() => onRemoveUser(record.username)}
            danger
          />
        </Tooltip>
      ),
    },
    {
      title: "Team Member",
      dataIndex: "username",
      key: "username",
      render: (value: string) => <Text strong={value === username}>{value}</Text>,
    },
    {
      title: (
        <div className={styles.pointsHeader}>
          <span>Points</span>
          <Tooltip title="Toggle estimate visibility">
            <Button
              type="text"
              size="small"
              icon={isEstimatesVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              disabled={!isUserMemberOfRoom}
              onClick={toggleEstimatesVisibility}
            />
          </Tooltip>
        </div>
      ),
      dataIndex: "estimate",
      key: "estimate",
      width: 120,
      align: "center",
      render: (value: string | undefined) => {
        if (isEstimatesVisible) {
          return <Text strong>{value ?? "…"}</Text>;
        }
        return <Text type="secondary">{value ? "✔" : "…"}</Text>;
      },
    },
  ];

  if (sortedEstimates.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Empty description="No team members yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <Text type="secondary" className={styles.emptyHint}>
          Create a new room and join to start planning
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Table
        dataSource={sortedEstimates}
        columns={columns}
        rowKey="username"
        pagination={false}
        size="small"
        bordered
        className={styles.table}
        footer={() => (
          <div className={styles.footer}>
            <Text strong>Story Points Average:</Text>
            <Text strong className={styles.average}>
              {isEstimatesVisible ? estimatesAverage : "—"}
            </Text>
          </div>
        )}
      />
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    width: "100%",
  },
  table: {
    width: "100%",
    "& .ant-table": {
      borderRadius: token.borderRadius,
    },
  },
  pointsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px",
  },
  average: {
    fontSize: 16,
    color: token.colorPrimary,
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 16px",
    gap: 16,
  },
  emptyHint: {
    fontSize: 14,
  },
}));
