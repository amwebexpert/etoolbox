import { FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import { isNotBlank } from '../../services/string-utils';
import {
    CardsListingCategoryName,
    CARDS_LISTING_CATEGORIES,
    DEFAULT_CARDS_LISTING_CATEGORY,
    SocketState,
} from './model';
import { useStyles } from './styles';

type PokerSettingsProps = {
    socketState: SocketState;
    lastPokerPlanningRoomName?: string;
    lastPokerPlanningUsername?: string;
    lastPokerPlanningHostName?: string;
    lastPokerCardsListingCategoryName?: CardsListingCategoryName;
    storeInputText: (name: string, value: string) => void;
};

const PokerOptionsForm: React.FC<PokerSettingsProps> = ({
    lastPokerPlanningRoomName,
    lastPokerPlanningUsername,
    lastPokerPlanningHostName,
    lastPokerCardsListingCategoryName,
    storeInputText,
    socketState,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { hostName, roomUUID, roomName } = useParams();

    // computing
    const isReadyToStartSession = isNotBlank(roomName) && isNotBlank(hostName) && isNotBlank(roomUUID);
    const cardsListingCategoryName: CardsListingCategoryName = lastPokerCardsListingCategoryName
        ? lastPokerCardsListingCategoryName
        : DEFAULT_CARDS_LISTING_CATEGORY;

    return (
        <Grid container spacing={1}>
            <Grid item md={4} xs={6}>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                        label={`Serveur (channel ${socketState})`}
                        placeholder="Type the poker plannind hostname here"
                        variant="outlined"
                        fullWidth={true}
                        margin="normal"
                        value={lastPokerPlanningHostName}
                        title={lastPokerPlanningHostName}
                        disabled={isReadyToStartSession}
                        onChange={e => storeInputText('lastPokerPlanningHostName', e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        title="Instruction to setup a poker planning server"
                                        target="_blank"
                                        href="https://github.com/amwebexpert/ws-poker-planning#wspokerplanning-server-production-deployment">
                                        <HelpIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item md={2} xs={6}>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                        label="Team name"
                        placeholder="Type the team name here"
                        variant="outlined"
                        fullWidth={true}
                        margin="normal"
                        value={lastPokerPlanningRoomName}
                        title={lastPokerPlanningRoomName}
                        disabled={isReadyToStartSession}
                        onChange={e => storeInputText('lastPokerPlanningRoomName', e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item md={2} xs={6}>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                        label="Your name"
                        placeholder="Type your name here"
                        variant="outlined"
                        fullWidth={true}
                        margin="normal"
                        value={lastPokerPlanningUsername}
                        onChange={e => storeInputText('lastPokerPlanningUsername', e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item md={4} xs={6}>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                        select={true}
                        label="Poker card types"
                        style={{ marginTop: theme.spacing(2) }}
                        variant="outlined"
                        fullWidth={true}
                        title={cardsListingCategoryName}
                        value={cardsListingCategoryName}
                        onChange={(e: any) => storeInputText('lastPokerCardsListingCategoryName', e.target.value)}>
                        {Object.entries(CARDS_LISTING_CATEGORIES).map(([name, category]) => (
                            <MenuItem key={name} value={name} title={name}>
                                {category.displayValue}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Grid>
        </Grid>
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

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokerOptionsForm);
