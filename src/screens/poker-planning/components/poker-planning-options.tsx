import { QuestionCircleOutlined } from "@ant-design/icons";
import { Badge, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { createStyles } from "antd-style";

import { CARD_CATEGORY_OPTIONS } from "../poker-planning.constants";
import { usePokerPlanningStore } from "../poker-planning.store";
import type { CardsListingCategoryName } from "../poker-planning.types";
import { getSocketStateColor } from "../poker-planning.utils";

interface PokerPlanningOptionsProps {
  isSessionActive: boolean;
}

export const PokerPlanningOptions = ({ isSessionActive }: PokerPlanningOptionsProps) => {
  const { styles } = useStyles();

  const {
    hostName,
    roomName,
    username,
    cardsCategory,
    socketState,
    setHostName,
    setRoomName,
    setUsername,
    setCardsCategory,
  } = usePokerPlanningStore();

  const connectionStatus = getSocketStateColor(socketState);

  return (
    <Form layout="vertical" className={styles.form}>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            label={
              <span>
                Connection{" "}
                <Badge status={connectionStatus as "success" | "processing" | "warning" | "error"} text={socketState} />
              </span>
            }
            className={styles.formItem}
          >
            <Input
              placeholder="e.g. poker.example.com"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              disabled={isSessionActive}
              suffix={
                <Tooltip title="See setup instructions on GitHub">
                  <a
                    href="https://github.com/amwebexpert/ws-poker-planning#wspokerplanning-server-production-deployment"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
              }
            />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={4}>
          <Form.Item label="Team name" className={styles.formItem}>
            <Input
              placeholder="e.g. my-team"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              disabled={isSessionActive}
            />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={4}>
          <Form.Item label="Your name" className={styles.formItem}>
            <Input placeholder="e.g. John" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={10}>
          <Form.Item label="Card type" className={styles.formItem}>
            <Select
              value={cardsCategory}
              onChange={(value: CardsListingCategoryName) => setCardsCategory(value)}
              options={CARD_CATEGORY_OPTIONS}
              className={styles.select}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const useStyles = createStyles(() => ({
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
}));
