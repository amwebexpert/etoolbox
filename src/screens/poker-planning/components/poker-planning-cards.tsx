import { Button, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { CARDS_LISTING_CATEGORIES } from "../poker-planning.constants";
import { usePokerPlanningStore } from "../poker-planning.store";

const { Text } = Typography;

interface PokerPlanningCardsProps {
  isDisabled: boolean;
}

export const PokerPlanningCards = ({ isDisabled }: PokerPlanningCardsProps) => {
  const { styles, cx } = useStyles();
  const { isMobile, isTablet } = useResponsive();
  const { cardsCategory, myEstimate, vote } = usePokerPlanningStore();

  const cardValues = CARDS_LISTING_CATEGORIES[cardsCategory].values;

  const getCardSize = (): number => {
    if (isMobile) return 44;
    if (isTablet) return 56;
    return 70;
  };

  const cardSize = getCardSize();

  return (
    <div className={styles.container}>
      <Text type="secondary" className={styles.label}>
        Select your estimate:
      </Text>
      <div className={styles.cardsGrid}>
        {cardValues.map((value) => {
          const isSelected = myEstimate === value;
          return (
            <Button
              key={value}
              type={isSelected ? "primary" : "default"}
              disabled={isDisabled}
              onClick={() => vote(value)}
              className={cx(styles.card, isSelected && styles.cardSelected)}
              style={{
                width: cardSize,
                height: cardSize,
                minWidth: cardSize,
                minHeight: cardSize,
              }}
              title={`Estimate as: ${value}`}
            >
              <span className={styles.cardValue}>{value}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  label: {
    fontSize: 14,
  },
  cardsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontWeight: 600,
    transition: "all 0.2s ease",
    "&:hover:not(:disabled)": {
      transform: "translateY(-2px)",
      boxShadow: token.boxShadowSecondary,
    },
  },
  cardSelected: {
    transform: "translateY(-4px)",
    boxShadow: token.boxShadow,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 700,
  },
}));
