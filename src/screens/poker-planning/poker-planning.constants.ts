import type { CardsListingCategory, CardsListingCategoryName, UserEstimate } from "./poker-planning.types";

// Query keys for TanStack Query cache
export const PokerPlanningQueryKey = {
  all: ["poker-planning"] as const,
  qrcode: (hostName: string, roomUUID: string, roomName: string) =>
    [...PokerPlanningQueryKey.all, "qrcode", hostName, roomUUID, roomName] as const,
} as const;

export const POKER_PLANNING_RATINGS_FIBONACCI: string[] = ["?", "0", "1", "2", "3", "5", "8", "13", "20", "40", "100"];

export const POKER_PLANNING_RATINGS_FIBONACCI_ENHANCED: string[] = [
  "?",
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
];

export const POKER_PLANNING_RATINGS_T_SHIRT_SIZES: string[] = ["?", "S", "M", "L", "XL"];

export const POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHANCED: string[] = ["?", "XS", "S", "M", "L", "XL", "XXL"];

type PokerVotesSorter = (a: UserEstimate, b: UserEstimate) => number;

const createSorter = (valuesArray: string[]): PokerVotesSorter => {
  return (a: UserEstimate, b: UserEstimate) =>
    valuesArray.indexOf(a.estimate ?? "?") - valuesArray.indexOf(b.estimate ?? "?");
};

export const CARDS_LISTING_CATEGORIES: Record<CardsListingCategoryName, CardsListingCategory> = {
  fibonacci: {
    values: POKER_PLANNING_RATINGS_FIBONACCI,
    displayValue: POKER_PLANNING_RATINGS_FIBONACCI.slice(2).join(" "),
    sorter: createSorter(POKER_PLANNING_RATINGS_FIBONACCI),
  },
  "fibonacci-enhanced": {
    values: POKER_PLANNING_RATINGS_FIBONACCI_ENHANCED,
    displayValue: POKER_PLANNING_RATINGS_FIBONACCI_ENHANCED.slice(2)
      .map((v) => v.replace("0.5", "½"))
      .map((v) => v.replace(".5", "½"))
      .join(" "),
    sorter: createSorter(POKER_PLANNING_RATINGS_FIBONACCI_ENHANCED),
  },
  "t-shirt": {
    values: POKER_PLANNING_RATINGS_T_SHIRT_SIZES,
    displayValue: POKER_PLANNING_RATINGS_T_SHIRT_SIZES.slice(1).join(" "),
    sorter: createSorter(POKER_PLANNING_RATINGS_T_SHIRT_SIZES),
  },
  "t-shirt-enhanced": {
    values: POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHANCED,
    displayValue: POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHANCED.slice(1).join(" "),
    sorter: createSorter(POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHANCED),
  },
};

export const DEFAULT_CARDS_LISTING_CATEGORY: CardsListingCategoryName = "fibonacci";
export const DEFAULT_ROOM_UUID = "default";
export const DEFAULT_ROOM_NAME = "default";
export const DEFAULT_HOSTNAME = "ws-poker-planning.onrender.com";

export const SOCKET_STATES: Map<number, string> = new Map([
  [WebSocket.CLOSED, "closed"],
  [WebSocket.OPEN, "open"],
  [WebSocket.CLOSING, "closing"],
  [WebSocket.CONNECTING, "connecting"],
]);

export const CARD_CATEGORY_OPTIONS = Object.entries(CARDS_LISTING_CATEGORIES).map(([name, category]) => ({
  value: name as CardsListingCategoryName,
  label: category.displayValue,
}));
