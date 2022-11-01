import { UserEstimate } from './common.model';

export const POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED: string[] = [
  '?',
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
];

export const POKER_PLANNING_RATINGS_FIBONNACI: string[] = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40', '100'];

export const POKER_PLANNING_RATINGS_T_SHIRT_SIZES: string[] = ['?', 'S', 'M', 'L', 'XL'];

export const POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED: string[] = ['?', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export type CardsListingCategoryName = 'fibonnacy' | 'fibonnacy-variant-1' | 't-shirt' | 't-shirt-variant-1';

export type CardsListingCategory = {
  values: string[];
  displayValue: string;
  sorter: (a: UserEstimate, b: UserEstimate) => number;
};

type PokerVotesSorter = (a: UserEstimate, b: UserEstimate) => number;
const sorterFactory = (valuesArray: string[]): PokerVotesSorter => {
  return (a: UserEstimate, b: UserEstimate) =>
    valuesArray.indexOf(a.estimate ?? '?') - valuesArray.indexOf(b.estimate ?? '?');
};

export const CARDS_LISTING_CATEGORIES: Record<CardsListingCategoryName, CardsListingCategory> = {
  fibonnacy: {
    values: POKER_PLANNING_RATINGS_FIBONNACI,
    displayValue: POKER_PLANNING_RATINGS_FIBONNACI.slice(2).join(' '),
    sorter: sorterFactory(POKER_PLANNING_RATINGS_FIBONNACI),
  },
  'fibonnacy-variant-1': {
    values: POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED,
    displayValue: POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED.slice(2)
      .map(v => v.replace('0.5', '½'))
      .map(v => v.replace('.5', '½'))
      .join(' '),
    sorter: sorterFactory(POKER_PLANNING_RATINGS_FIBONNACI_ENHANCED),
  },
  't-shirt': {
    values: POKER_PLANNING_RATINGS_T_SHIRT_SIZES,
    displayValue: POKER_PLANNING_RATINGS_T_SHIRT_SIZES.slice(1).join(' '),
    sorter: sorterFactory(POKER_PLANNING_RATINGS_T_SHIRT_SIZES),
  },
  't-shirt-variant-1': {
    values: POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED,
    displayValue: POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED.slice(1).join(' '),
    sorter: sorterFactory(POKER_PLANNING_RATINGS_T_SHIRT_SIZES_ENHENCED),
  },
};

export const DEFAULT_CARDS_LISTING_CATEGORY: CardsListingCategoryName = 'fibonnacy';
export const DEFAULT_ROOM_UUID = 'default';
export const DEFAULT_ROOM_NAME = 'default';
export const DEFAULT_HOSTNAME = 'localhost';

export type SocketState = 'open' | 'closed' | 'closing' | 'connecting';

export const SOCKET_STATES: Map<number, SocketState> = new Map([
  [WebSocket.CLOSED, 'closed'],
  [WebSocket.OPEN, 'open'],
  [WebSocket.CLOSING, 'closing'],
  [WebSocket.CONNECTING, 'connecting'],
]);

export type EstimatesStats = {
  values: number[];
  estimatesSum: number;
  estimatesAverage: number;
  isEstimatesCleared: boolean;
  isUserMemberOfRoom: boolean;
};
