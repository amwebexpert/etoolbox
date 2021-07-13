import { Badge, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth from '@material-ui/core/withWidth';
import PaletteIcon from '@material-ui/icons/Palette';
import * as copy from 'copy-to-clipboard';
import React from 'react';
import { Helmet } from 'react-helmet';
import FeatureTitle from '../../components/FeatureTitle';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import * as services from './services';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    colorCell: {
        cursor: 'pointer',
    },
}));

interface Props {
    width: Breakpoint;
}

const NamedColors = (props: Props) => {
    const title = 'Color categories';
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();

    const handleCopy = (data: string) => {
        const feedback = data.substr(0, 20);
        const message = `Content copied into clipboard: ${feedback} …`;

        copy.default(data, { format: 'text/plain' });
        setToasterState({ open: true, message, type: 'success', autoHideDuration: 2000 });
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={PaletteIcon} title={title} />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell component="th" scope="row">RGB</TableCell>
                                <TableCell component="th" scope="row">HEX</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.NAMED_COLORS.map(colorsGroup =>
                                colorsGroup.names.map(c => {
                                    const name = c.htmlName;
                                    const hexCode = '#' + c.hexCode.split(' ').join('').toLowerCase();
                                    const rgbCode = `rgb(${c.rgbDecimal.split(' ').join(',')})`;

                                    return (
                                        <TableRow key={c.htmlName + c.hexCode}>
                                            <TableCell className={classes.colorCell} onClick={() => handleCopy(name)} title="Copy name to clipboard">
                                                <strong>{name}</strong><br />({colorsGroup.family})
                                            </TableCell>
                                            <TableCell className={classes.colorCell} style={{ backgroundColor: hexCode, width: '30%' }}
                                                onClick={() => handleCopy(rgbCode)} title="Copy RGB code to clipboard">
                                                <Badge badgeContent={rgbCode} color="primary" />
                                            </TableCell>
                                            <TableCell className={classes.colorCell} style={{ backgroundColor: hexCode, width: '30%' }}
                                                onClick={() => handleCopy(hexCode)} title="Copy HEX code to clipboard">
                                                <Badge badgeContent={hexCode} color="primary" />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default withWidth()(NamedColors);
