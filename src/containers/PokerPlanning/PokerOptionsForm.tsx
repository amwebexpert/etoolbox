import { FormControl, Grid, MenuItem, Select, useTheme, withWidth } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import {
    CardsListingCategoryName,
    CARDS_LISTING_CATEGORIES,
    DEFAULT_CARDS_LISTING_CATEGORY,
    SocketState,
} from './model';
import { useStyles } from './styles';

type PokerSettingsProps = {
    width: Breakpoint;
    socketState: SocketState;
    lastPokerPlanningRoomName?: string;
    lastPokerPlanningUsername?: string;
    lastPokerPlanningRoomUUID?: string;
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

    // computing
    const cardsListingCategoryName: CardsListingCategoryName = lastPokerCardsListingCategoryName
        ? lastPokerCardsListingCategoryName
        : DEFAULT_CARDS_LISTING_CATEGORY;

    return (
        <Grid container spacing={1}>
            <Grid item md={3} xs={6}>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                        label={`Serveur (channel ${socketState})`}
                        placeholder="Type the poker plannind hostname here"
                        variant="outlined"
                        fullWidth={true}
                        margin="normal"
                        value={lastPokerPlanningHostName}
                        onChange={e => storeInputText('lastPokerPlanningHostName', e.target.value)}
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
            <Grid item md={5} xs={6}>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <Select
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
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        lastPokerPlanningHostName: state.textInputs['lastPokerPlanningHostName'],
        lastPokerPlanningRoomUUID: state.textInputs['lastPokerPlanningRoomUUID'],
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

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PokerOptionsForm));
