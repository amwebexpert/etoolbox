import ReconnectingWebSocket from 'reconnecting-websocket';
import { v4 } from 'uuid';
import {
    DEFAULT_HOSTNAME,
    DEFAULT_ROOM_NAME,
    EstimatesStats,
    PokerPlanningSession,
    SocketState,
    SOCKET_STATES,
    UserEstimate,
} from './model';

type CreateSocketParams = {
    hostname?: string;
    roomUUID?: string;
    onSocketStateUpdate: (socketState: SocketState) => void;
    onSessionUpdate: (session: PokerPlanningSession) => void;
};

export const createSocket = ({
    hostname = DEFAULT_HOSTNAME,
    roomUUID = v4(),
    onSocketStateUpdate,
    onSessionUpdate,
}: CreateSocketParams): ReconnectingWebSocket => {
    const protocol = document.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${protocol}://${hostname}/ws?roomUUID=${roomUUID}`;

    const socket = new ReconnectingWebSocket(url);
    socket.onopen = () => onSocketStateUpdate(getSocketState(socket.readyState));
    socket.onerror = () => onSocketStateUpdate(getSocketState(socket.readyState));
    socket.onclose = () => onSocketStateUpdate(getSocketState(socket.readyState));
    socket.onmessage = (ev: MessageEvent<string>) => {
        const session = JSON.parse(ev.data) as PokerPlanningSession;
        onSessionUpdate(session);
    };

    return socket;
};

export const parseEstimates = (estimates: UserEstimate[], username?: string): EstimatesStats => {
    const values = estimates
        .map(e => e.estimate)
        .filter(e => e !== null && e !== undefined && e !== '?')
        .map(e => Number(e));
    const estimatesSum = values.reduce((acc, val) => acc + Number(val), 0);
    const average = values.length > 0 ? estimatesSum / values.length : 0;
    const estimatesAverage = Math.round(average * 10 + Number.EPSILON) / 10;
    const isEstimatesCleared = estimates.length > 0 && estimates.every(e => e.estimate === undefined);
    const isUsernameProvided = !!username?.trim();
    const isUserMemberOfRoom = isUsernameProvided && estimates.some(e => e.username === username);

    return {
        values,
        estimatesSum,
        estimatesAverage,
        isEstimatesCleared,
        isUserMemberOfRoom,
    };
};

export const getSocketState = (state: number): SocketState => SOCKET_STATES.get(state) ?? 'closed';

type BuildRouteURLParams = {
    hostname?: string;
    roomUUID?: string;
    roomName?: string;
};

export const buildRouteURL = ({
    hostname = DEFAULT_HOSTNAME,
    roomName = DEFAULT_ROOM_NAME,
    roomUUID = v4(),
}: BuildRouteURLParams) => `/PokerPlanning/${hostname}/${roomUUID}/${roomName}`;

export const extractSinglePageAppHostnameAndPath = () => document.location.href.split('/#/')[0];

export const buildFullRouteURL = (params: BuildRouteURLParams) =>
    extractSinglePageAppHostnameAndPath() + '/#' + buildRouteURL(params);
