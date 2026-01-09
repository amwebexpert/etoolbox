import { Card, Tag, Timeline, Typography } from "antd";
import { createStyles } from "antd-style";

const { Paragraph, Text } = Typography;

export const AboutOriginStory = () => {
  const { styles } = useStyles();

  return (
    <section className={styles.section}>
      <Card>
        <Timeline
          mode="alternate"
          items={[
            {
              color: "blue",
              content: (
                <div>
                  <Tag color="blue" className={styles.timelineTag}>
                    2020
                  </Tag>
                  <Text strong>The Beginning — San Francisco</Text>
                  <Paragraph className={styles.timelineText}>
                    While working for a California-based company in San Francisco, a small tech challenge was launched
                    among developers. Each one had to demonstrate open source utility possibilities. This was the spark
                    that ignited Web Toolbox.
                  </Paragraph>
                </div>
              ),
            },
            {
              color: "green",
              content: (
                <div>
                  <Tag color="green" className={styles.timelineTag}>
                    Early Days
                  </Tag>
                  <Text strong>Humble Beginnings</Text>
                  <Paragraph className={styles.timelineText}>
                    It started with just one or two functions — simple utilities that scratched an itch. A Base64
                    encoder here, a URL parser there. Nothing fancy, but genuinely useful.
                  </Paragraph>
                </div>
              ),
            },
            {
              color: "purple",
              content: (
                <div>
                  <Tag color="purple" className={styles.timelineTag}>
                    Growth
                  </Tag>
                  <Text strong>Organic Evolution</Text>
                  <Paragraph className={styles.timelineText}>
                    Every time a need arose during web or mobile development — "I wish I had a quick tool for this..." —
                    it became a candidate for the toolbox. The collection grew naturally, driven by real-world needs.
                  </Paragraph>
                </div>
              ),
            },
            {
              color: "gold",
              content: (
                <div>
                  <Tag color="gold" className={styles.timelineTag}>
                    Today
                  </Tag>
                  <Text strong>A Complete Developer Companion</Text>
                  <Paragraph className={styles.timelineText}>
                    Now with over 15 tools, Web Toolbox has become a go-to resource. And the best part? It's still
                    growing. The features aren't fixed — if it can be done in a web SPA, it might just be the next
                    addition!
                  </Paragraph>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </section>
  );
};

const useStyles = createStyles(({ token }) => ({
  section: {
    marginBottom: 48,
  },
  timelineText: {
    marginTop: 8,
    marginBottom: "0 !important",
    color: token.colorTextSecondary,
  },
  timelineTag: {
    marginBottom: 8,
    display: "inline-block",
  },
}));
