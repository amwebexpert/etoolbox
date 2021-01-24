import PropTypes from 'prop-types';
import { Box } from "@material-ui/core";

export function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
    const isTabSelected = value === index;

    return (
        <div role="tabpanel"
            hidden={!isTabSelected}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {isTabSelected && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
