import { SearchOutlined } from "@ant-design/icons";
import { Empty, Input, Row, Typography } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { usePinnedPaths, useTogglePinned } from "~/stores/pinned-tools.store";
import { type Tool, TOOLS } from "~/tools/tools-registry";
import { selectPinnedTools } from "~/tools/tools-registry.utils";

import { filterTools } from "./home.utils";
import { ToolCard } from "./tool-card";

const { Title } = Typography;

export const Home = () => {
  const { styles } = useStyles();
  const [query, setQuery] = useState("");
  const pinnedPaths = usePinnedPaths();
  const togglePinned = useTogglePinned();

  const filteredTools: Tool[] = filterTools({ tools: TOOLS, query });
  const pinnedTools: Tool[] = selectPinnedTools({ tools: TOOLS, pinnedPaths });
  const filteredPinnedTools: Tool[] = filterTools({ tools: pinnedTools, query });

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <ScreenContainer>
      <section className={styles.section}>
        <Input
          value={query}
          onChange={handleQueryChange}
          placeholder="Search tools by name or description..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.search}
        />

        {filteredPinnedTools.length > 0 && (
          <div className={styles.pinnedSection}>
            <Title level={5} className={styles.pinnedTitle}>
              Pinned
            </Title>
            <Row gutter={[16, 16]}>
              {filteredPinnedTools.map((tool) => (
                <ToolCard
                  key={tool.path}
                  tool={tool}
                  pinned={pinnedPaths.includes(tool.path)}
                  onTogglePinned={togglePinned}
                />
              ))}
            </Row>
          </div>
        )}

        {filteredTools.length === 0 ? (
          <Empty description="No tools found" />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.path}
                tool={tool}
                pinned={pinnedPaths.includes(tool.path)}
                onTogglePinned={togglePinned}
              />
            ))}
          </Row>
        )}
      </section>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  section: {
    marginBottom: 48,
  },
  search: {
    marginBottom: 24,
  },
  pinnedSection: {
    marginBottom: 32,
  },
  pinnedTitle: {
    marginBottom: 16,
  },
}));
