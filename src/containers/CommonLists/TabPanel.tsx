import PropTypes from 'prop-types';

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
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
