import { ExperimentOutlined } from "@ant-design/icons";
import { Table, Typography } from "antd";
import { createStyles } from "antd-style";
import { COLUMNS, VERSION_DATA } from "../about.utils";

const { Title } = Typography;

export const AboutDeploymentInfo = () => {
  const { styles } = useStyles();

  return (
    <section className={styles.tableSection}>
      <Table
        columns={COLUMNS}
        dataSource={VERSION_DATA}
        pagination={false}
        size="middle"
        bordered
        showHeader={false}
        title={() => (
          <Title level={4} className={styles.tableTitle}>
            <ExperimentOutlined className={styles.sectionIcon} /> Latest Deployment
          </Title>
        )}
      />
    </section>
  );
};

const useStyles = createStyles(({ token }) => ({
  tableSection: {
    marginBottom: 48,
    "@media (min-width: 768px)": {
      maxWidth: 600,
      margin: "0 auto 48px auto",
    },
  },
  sectionIcon: {
    color: token.colorPrimary,
    fontSize: 24,
  },
  tableTitle: {
    margin: "0 !important",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
}));
