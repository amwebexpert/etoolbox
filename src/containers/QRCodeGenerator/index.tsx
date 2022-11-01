import { Box, Button, Card, CardContent, Grid, Link, TextField, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QRCodeIcon from '@mui/icons-material/QrCode';
import PictureIcon from '@mui/icons-material/Photo';
import QRCode from 'qrcode';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { AppState } from '../../reducers';
import * as services from './services';
import { useIsWidthUp } from '../../theme';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    toolbar: {
        margin: 0,
        padding: 0,
    },
    qrOptions: {
        fontFamily: 'monospace',
    },
    generatedQR: {
        padding: theme.spacing(2),
    },
}));

interface Props {
    inputText?: string;
    inputOptions?: string;
    storeInputText: (name: string, value: string) => void;
}

const QRCodeGenerator: React.FC<Props> = (props: Props) => {
    const title = 'QR Code generator';
    const classes = useStyles();
    const isMdUp = useIsWidthUp('md');
    const { inputText, inputOptions, storeInputText } = props;
    const [imgDataURL, setImgDataURL] = React.useState('');
    const { setToasterState } = useToasterUpdate();

    const copyImage = async () => {
        try {
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

    function generate() {
        if (!inputText) {
            return;
        }

        const opts = inputOptions ? JSON.parse(inputOptions) : services.DEFAULT_OPTIONS;
        QRCode.toDataURL(inputText, opts, (err, url) => {
            if (err) {
                throw err;
            }

            setImgDataURL(url);
            storeInputText('lastQRCodeOptions', JSON.stringify(opts, null, 2));
        });
    }

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={QRCodeIcon} title={title} />

                <form noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                autoFocus={isMdUp}
                                label="Text to store into QR Code"
                                placeholder="Paste or type the content here"
                                multiline
                                minRows={12}
                                maxRows={isMdUp ? 20 : 12}
                                variant="outlined"
                                margin="normal"
                                fullWidth={true}
                                value={inputText}
                                onChange={e => storeInputText('lastQRCodeTextValue', e.target.value)}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                label="QR Code generation options"
                                multiline
                                minRows={12}
                                maxRows={isMdUp ? 20 : 12}
                                variant="outlined"
                                margin="normal"
                                fullWidth={true}
                                InputProps={{
                                    classes: {
                                        input: classes.qrOptions,
                                    },
                                }}
                                value={inputOptions}
                                onChange={e => storeInputText('lastQRCodeOptions', e.target.value)}
                                helperText={
                                    <Link
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://www.npmjs.com/package/qrcode#qr-code-options">
                                        Options documentation available here!
                                    </Link>
                                }
                            />
                        </Grid>
                    </Grid>
                </form>

                <Toolbar className={classes.toolbar}>
                    <Box display="flex" flexGrow={1}></Box>
                    <CopyButton hoverMessage="Copy image data URL" data={imgDataURL} sx={{ mr: 1 }} />
                    <Button
                        disabled={!imgDataURL}
                        variant="contained"
                        title="Copy the QR Code image into the clipboard"
                        color="primary"
                        onClick={copyImage}
                        endIcon={<PictureIcon />}
                        sx={{ mr: 1 }}>
                        Copy Image
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        title="Generate the QR code using the info and encoding parameters"
                        onClick={generate}
                        disabled={!inputText}
                        endIcon={<QRCodeIcon />}>
                        Generate
                    </Button>
                </Toolbar>

                {imgDataURL && (
                    <Card className={classes.generatedQR}>
                        <Box display="flex" alignItems="center" justifyContent="center" p={1}>
                            <img id="imgQrCode" src={imgDataURL} alt="QR Code" />
                        </Box>
                        <CardContent>
                            <TextField
                                label="Full img tag"
                                fullWidth
                                value={`<img alt="QR Code" src="${imgDataURL}"/>`}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="QR Code. Copy-paste into 'src' attribute"
                                fullWidth
                                value={imgDataURL}
                                margin="normal"
                                variant="outlined"
                                multiline
                                minRows="8"
                            />
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastQRCodeTextValue'],
        inputOptions: state.textInputs['lastQRCodeOptions'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeGenerator);
