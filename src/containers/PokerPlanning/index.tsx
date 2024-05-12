import React, { useEffect, useRef, useState } from 'react';

import { default as RemoveEstimates, default as RemoveUser } from '@mui/icons-material/DeleteOutline';
import PockerPlanningIcon from '@mui/icons-material/Filter3';
import QRCodeIcon from '@mui/icons-material/QrCode';
import ShareLink from '@mui/icons-material/Share';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import QRCode from 'qrcode';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Dispatch } from 'redux';

import { setTextAction, SetTextInputAction } from '../../actions/text-actions';
import { useConfirmDialogContext } from '../../components/ConfirmDialog/ConfirmDialogProvider';
import CopyButton from '../../components/CopyButton';
import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { AppState } from '../../reducers';
import { isNotBlank } from '../../services/string-utils';
import { IS_DEV_MODE } from '../../services/utils';
import { PokerPlanningSession, UserMessage } from './common.model';
import { buildRemoveUserMessage, buildResetMessage, buildVoteMessage } from './message.factory';
import {
  CARDS_LISTING_CATEGORIES,
  CardsListingCategory,
  CardsListingCategoryName,
  DEFAULT_CARDS_LISTING_CATEGORY,
  SocketState,
} from './model';
import PokerCard from './PokerCard';
import PokerOptionsForm from './PokerOptionsForm';
import { buildFullRouteURL, buildRouteURL, createSocket, parseEstimates } from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

type Props = {
  lastPokerPlanningRoomName?: string;
  lastPokerPlanningUsername?: string;
  lastPokerPlanningHostName?: string;
  lastPokerCardsListingCategoryName?: CardsListingCategoryName;
  storeInputText: (name: string, value: string) => void;
};

const PokerPlanning: React.FC<Props> = ({
  lastPokerPlanningRoomName,
  lastPokerPlanningUsername,
  lastPokerPlanningHostName,
  lastPokerCardsListingCategoryName,
  storeInputText,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { showConfirmationDialog } = useConfirmDialogContext();
  const { setToasterState } = useToasterUpdate();

  // route inputs
  const { hostName, roomUUID, roomName } = useParams();

  // component state
  const socketRef = useRef<ReconnectingWebSocket>();
  const [socketState, setSocketState] = useState<SocketState>('closed');
  const [myEstimate, setMyEstimate] = useState<string>();
  const [postponedMessage, setPostponedMessage] = useState<UserMessage>();
  const [isEstimatesVisible, setIsEstimatesVisible] = useState<boolean>(false);
  const [pokerSession, setPokerSession] = useState<PokerPlanningSession>();

  // computing
  const title = `Poker planning ${lastPokerPlanningRoomName ?? ''}`.trim();
  const estimates = pokerSession?.estimates ?? [];
  const cardsListingCategoryName: CardsListingCategoryName = lastPokerCardsListingCategoryName
    ? lastPokerCardsListingCategoryName
    : DEFAULT_CARDS_LISTING_CATEGORY;
  const pokerCards: CardsListingCategory = CARDS_LISTING_CATEGORIES[cardsListingCategoryName];
  const { estimatesAverage, isEstimatesCleared, isUserMemberOfRoom } = parseEstimates(
    estimates,
    lastPokerPlanningUsername
  );
  const isReadyToStartSession = socketRef && isNotBlank(roomName) && isNotBlank(hostName) && isNotBlank(roomUUID);
  const isReadyToVote = isReadyToStartSession && isNotBlank(lastPokerPlanningUsername);
  const isReadyToCreateNewRoom = isNotBlank(lastPokerPlanningHostName) && isNotBlank(lastPokerPlanningRoomName);

  // keep the store in sync whenever route params are updated
  useEffect(() => {
    if (isReadyToStartSession) {
      storeInputText('lastPokerPlanningRoomName', roomName ?? '');
      storeInputText('lastPokerPlanningHostName', hostName ?? '');
    }
  }, [roomName, hostName, storeInputText, isReadyToStartSession]);

  // update current user vote
  useEffect(() => {
    if (!pokerSession || !lastPokerPlanningUsername) {
      return;
    }

    if (IS_DEV_MODE) {
      console.info('poker session', pokerSession);
    }

    const myUserSessionEstimate = pokerSession.estimates.find((e) => e.username === lastPokerPlanningUsername);
    if (myUserSessionEstimate) {
      setMyEstimate(myUserSessionEstimate.estimate);
    }
  }, [lastPokerPlanningUsername, pokerSession]);

  useEffect(() => {
    if (!isReadyToStartSession) {
      return;
    }

    socketRef.current = createSocket({
      hostName,
      roomUUID,
      onSessionUpdate: setPokerSession,
      onSocketStateUpdate: setSocketState,
    });

    // socket cleanup whenever component unmount
    return () => socketRef.current?.close();
  }, [socketRef, isReadyToStartSession, hostName, roomUUID]);

  const handleCreateNewRoom = () => {
    const url = buildRouteURL({ hostName: lastPokerPlanningHostName, roomName: lastPokerPlanningRoomName });
    navigate(url, { replace: true });
  };

  useEffect(() => {
    if (isEstimatesCleared) {
      setIsEstimatesVisible(false);
      setMyEstimate(undefined);
    }
  }, [isEstimatesCleared]);

  const updateMyEstimate = (value?: string) => {
    if (value !== myEstimate) {
      setMyEstimate(value);
      sendOrPostpone(buildVoteMessage(lastPokerPlanningUsername, value));
    } else {
      setMyEstimate(undefined); // user is un-voting
      sendOrPostpone(buildVoteMessage(lastPokerPlanningUsername));
    }
  };

  const sendOrPostpone = (message: UserMessage) => {
    if (socketRef.current && socketState === 'open') {
      socketRef.current.send(JSON.stringify(message));
    } else {
      setPostponedMessage(message);
    }
  };

  const handleClearAllVotes = () =>
    showConfirmationDialog({
      title: 'Confirmation',
      description: 'Are you sure you want to delete all votes?',
      onConfirm: () => sendOrPostpone(buildResetMessage()),
    });

  // send delayed message (if any)
  useEffect(() => {
    if (socketRef.current && socketState === 'open' && postponedMessage) {
      socketRef.current.send(JSON.stringify(postponedMessage));
      setPostponedMessage(undefined);
    }
  }, [postponedMessage, socketState]);

  const shareAsQRCode = async () => {
    try {
      const data = buildFullRouteURL({ hostName, roomUUID, roomName });
      const imgDataURL = await QRCode.toDataURL(data, { type: 'image/png', width: 200 });
      const response = await fetch(imgDataURL);
      const blob = await response.blob();
      // TODO We may have to do this workaround for Safari: https://stackoverflow.com/a/68241503/704681
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setToasterState({ open: true, message: 'Image copied', type: 'success', autoHideDuration: 2000 });
    } catch (e) {
      console.error(e);
      const errorMessage = `Unexpected copy error, see detail on console`;
      setToasterState({ open: true, message: errorMessage, type: 'warning', autoHideDuration: 2000 });
    }
  };

  return (
    <FeatureScreen iconType={PockerPlanningIcon} title={title}>
      <Grid container>
        <Grid item md={9} xs={12}>
          <PokerOptionsForm socketState={socketState} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Grid container justifyContent='flex-end' alignItems='center' className={classes.toolbar}>
            <Button
              sx={{ mr: 1 }}
              variant='contained'
              title='Register the team and start planning in a new room'
              color='primary'
              disabled={!isReadyToCreateNewRoom}
              onClick={handleCreateNewRoom}
            >
              New
            </Button>
            <Button
              sx={{ mr: 1 }}
              variant='contained'
              title='Enter existing room'
              color='primary'
              disabled={isUserMemberOfRoom || !isReadyToVote}
              onClick={() => sendOrPostpone(buildVoteMessage(lastPokerPlanningUsername))}
            >
              Join
            </Button>
            <CopyButton
              sx={{ mr: 1 }}
              isDisabled={!isReadyToStartSession}
              data={buildFullRouteURL({ hostName, roomUUID, roomName })}
              Icon={ShareLink}
              hoverMessage='Copy link to clipboard for sharing'
              feedbackMessage='Link copied to clipboard, you can now share to all members'
            />
            <Button
              variant='contained'
              title='Copy QRCode for sharing'
              disabled={!isReadyToStartSession}
              onClick={shareAsQRCode}
              color='primary'
            >
              <QRCodeIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.submitEstimate}>
        {pokerCards.values.map((value) => (
          <PokerCard
            key={value}
            isDisabled={!isReadyToVote}
            isSelected={myEstimate === value}
            value={value}
            onClick={() => updateMyEstimate(value)}
          />
        ))}
      </div>

      <TableContainer component={Paper} className={classes.teamEstimates}>
        <Table size='small'>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <StyledTableCell component='th' scope='row' width={30}></StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                Team member
              </StyledTableCell>
              <StyledTableCell component='th' scope='row' align='center'>
                Points
                <IconButton
                  title='Toggle story points visibility'
                  disabled={!isUserMemberOfRoom}
                  onClick={() => setIsEstimatesVisible((v) => !v)}
                >
                  {isEstimatesVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton onClick={handleClearAllVotes} title='Clear all votes' disabled={!isUserMemberOfRoom}>
                  <RemoveEstimates />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimates.sort(pokerCards.sorter).map(({ username, estimate }) => {
              const estimateWhenDisplayON = estimate ?? '…';
              const estimateWhenDisplayOFF = estimate ? '✔' : '…';
              return (
                <StyledTableRow key={username}>
                  <StyledTableCell width={30}>
                    <IconButton
                      disabled={!isUserMemberOfRoom}
                      onClick={() => sendOrPostpone(buildRemoveUserMessage(username))}
                      title={`Remove user "${username}"`}
                    >
                      <RemoveUser />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>{username}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {isEstimatesVisible ? estimateWhenDisplayON : estimateWhenDisplayOFF}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow key='average'>
              <StyledTableCell width={30}></StyledTableCell>
              <StyledTableCell>
                <Typography>Story points average</Typography>
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Typography>{isEstimatesVisible ? estimatesAverage : ''}</Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </FeatureScreen>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    lastPokerPlanningHostName: state.textInputs['lastPokerPlanningHostName'],
    lastPokerPlanningRoomName: state.textInputs['lastPokerPlanningRoomName'],
    lastPokerPlanningUsername: state.textInputs['lastPokerPlanningUsername'],
    lastPokerCardsListingCategoryName: state.textInputs[
      'lastPokerCardsListingCategoryName'
    ] as CardsListingCategoryName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<SetTextInputAction>) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokerPlanning);
