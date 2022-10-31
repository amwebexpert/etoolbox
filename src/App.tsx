import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import EventIcon from '@mui/icons-material/Event';
import GithubIcon from '@mui/icons-material/GitHub';
import CSVParserIcon from '@mui/icons-material/GridOn';
import HomeIcon from '@mui/icons-material/Home';
import HttpUrlIcon from '@mui/icons-material/HttpTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PokerPlanningIcon from '@mui/icons-material/Looks3';
import PaletteIcon from '@mui/icons-material/Palette';
import QRCodeIcon from '@mui/icons-material/QrCode';
import SimCardIcon from '@mui/icons-material/SimCard';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import TocIcon from '@mui/icons-material/Toc';
import WrapTextIcon from '@mui/icons-material/WrapText';
import clsx from 'clsx';
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import { ConfirmDialogProvider } from './components/ConfirmDialog/ConfirmDialogProvider';
import { FullCenteredContent } from './components/FullCenteredContent/FullCenteredContent';
import Home from './components/Home';
import { NavbarButtonLink } from './components/NavbarButtonLink/NavbarButtonLink';
import ToasterProvider from './components/Toaster/ToasterProvider';
import Banner from './images/icon.png';
import { useStyles } from './styles';
import { useIsWidthDown, useIsWidthUp } from './theme';

const App: React.FC = () => {
    const desc = 'Web Toolbox app. A collection of utilities for developers.';
    const classes = useStyles();
    const isMdUp = useIsWidthUp('md');
    const isSmDown = useIsWidthDown('sm');
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(isMdUp);

    const About = lazy(() => import('./components/About/About'));
    const AppPreferences = lazy(() => import('./containers/AppPreferences'));
    const JSONFormatter = lazy(() => import('./containers/JSONFormatter'));
    const RegExTester = lazy(() => import('./containers/RegExTester'));
    const UUIDGenerator = lazy(() => import('./containers/UUIDGenerator'));
    const JWTDecoder = lazy(() => import('./containers/JWTDecoder'));
    const ImageOCR = lazy(() => import('./containers/ImageOCR'));
    const QRCodeGenerator = lazy(() => import('./containers/QRCodeGenerator'));
    const CommonLists = lazy(() => import('./containers/CommonLists'));
    const GithubUserProjects = lazy(() => import('./containers/GithubUserProjects'));
    const JSONConverter = lazy(() => import('./containers/JSONConverter'));
    const DateConverter = lazy(() => import('./containers/DateConverter'));
    const CSVParser = lazy(() => import('./containers/CSVParser'));
    const PokerPlanning = lazy(() => import('./containers/PokerPlanning'));

    const FeaturesGroup = lazy(() => import('./components/FeaturesGroup'));
    const URLParser = lazy(() => import('./containers/URLParser'));
    const URLEncoder = lazy(() => import('./containers/URLEncoder'));
    const Base64Encoder = lazy(() => import('./containers/Base64Encoder'));
    const Base64FileEncoder = lazy(() => import('./containers/Base64FileEncoder'));
    const NamedColors = lazy(() => import('./containers/NamedColors'));
    const ColorPicker = lazy(() => import('./containers/ColorPicker'));

    const featuresGroupJSON = [
        { type: JSONFormatter, path: '/JSONFormatter', label: 'JSON Format' },
        { type: JSONConverter, path: '/JSONConverter', label: 'Convert JSON' },
    ];
    const featuresGroupURL = [
        { type: URLParser, path: '/URLParser', label: 'Parser' },
        { type: URLEncoder, path: '/URLEncoder', label: 'Encoder' },
    ];
    const featuresGroupBase64 = [
        { type: Base64Encoder, path: '/Base64Encoder', label: 'String' },
        { type: Base64FileEncoder, path: '/Base64FileEncoder', label: 'File' },
    ];
    const featuresGroupColors = [
        { type: ColorPicker, path: '/ColorPicker', label: 'Picker' },
        { type: NamedColors, path: '/NamedColors', label: 'Named colors' },
    ];

    React.useEffect(setupIPC, [navigate]);

    function setupIPC() {
        // Will be defined if the React App is running inside Electron
        if (window.require) {
            const ipc = window.require('electron').ipcRenderer;
            ipc.send('rendererAppStarted');
            ipc.on('navigateTo', (_event: any, path: string) => navigate(path));
        }
    }

    const menuClick = () => {
        if (open && isSmDown) {
            setOpen(false);
        }
    };

    return (
        <ConfirmDialogProvider>
            <Helmet titleTemplate="Web Toolbox - %s" defaultTitle="Web Toolbox">
                <meta name="description" content={desc} />
            </Helmet>
            <div className={classes.root}>
                <ApplicationBar open={open} setOpen={setOpen} />
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}>
                    <div className={classes.toolbar}>
                        <div className={classes.toolbarIconContainer}>
                            <NavLink to="/about" title="About Web Toolbox…">
                                <img src={Banner} alt="Web Toolbox" className={classes.toolbarIcon} />
                            </NavLink>
                        </div>
                        <IconButton onClick={() => setOpen(false)} title="Toggle sidebar menu">
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.menu}>
                        <NavbarButtonLink
                            icon={<HomeIcon />}
                            to="/Home"
                            title="Home"
                            detail="Home"
                            onClick={menuClick}
                        />

                        <NavbarButtonLink
                            icon={<HttpUrlIcon />}
                            to="/URL"
                            title="URL parse, encode"
                            detail="URL parsing and url parameters encoding utilities"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<DeveloperBoardIcon />}
                            to="/Base64"
                            title="Base64"
                            detail="Base64 encoders/decoders"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<WrapTextIcon />}
                            to="/JSON"
                            title="JSON utilities"
                            detail="JSON Format & convertion into typed languages"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<PaletteIcon />}
                            to="/Colors"
                            title="Color picker"
                            detail="Image color picker"
                            onClick={menuClick}
                        />

                        <NavbarButtonLink
                            icon={<TextRotationNoneIcon />}
                            to="/RegExTester"
                            title="RegEx tester"
                            detail="Regular expression tester"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<SimCardIcon />}
                            to="/UUIDGenerator"
                            title="UUID generator"
                            detail="UUID generator"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<LockOpenIcon />}
                            to="/JWTDecoder"
                            title="JWT decoder"
                            detail="JSON Web Token decoder"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<QRCodeIcon />}
                            to="/QRCodeGenerator"
                            title="QR Code generator"
                            detail="QR Code generator"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<TextFieldsIcon />}
                            to="/ImageOCR"
                            title="Image OCR"
                            detail="Image text extractor"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<TocIcon />}
                            to="/CommonLists"
                            title="Mime-types, HTML"
                            detail="Html entities, Mime-types, and more…"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<GithubIcon />}
                            to="/GithubUserProjects"
                            title="Github search"
                            detail="Github user projects"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<EventIcon />}
                            to="/DateConverter"
                            title="Date & Epoch"
                            detail="Date and Epoch utilities"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<CSVParserIcon />}
                            to="/CSVParser"
                            title="CSV Parser"
                            detail="CSV utilities"
                            onClick={menuClick}
                        />
                        <NavbarButtonLink
                            icon={<PokerPlanningIcon />}
                            to="/PokerPlanning"
                            title="Pocker planning"
                            detail="Agile pocker planning online tools"
                            onClick={menuClick}
                        />
                    </List>
                </Drawer>
                <ToasterProvider>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Suspense fallback={<FullCenteredContent>Loading…</FullCenteredContent>}>
                            <Routes>
                                <Route path="/Home" element={<Home />} />

                                <Route path="/about" element={<About />} />
                                <Route path="/preferences" element={<AppPreferences />} />

                                <Route path="/URL/*" element={<FeaturesGroup tabs={featuresGroupURL} />} />
                                <Route path="/Base64/*" element={<FeaturesGroup tabs={featuresGroupBase64} />} />
                                <Route path="/JSON/*" element={<FeaturesGroup tabs={featuresGroupJSON} />} />
                                <Route path="/Colors/*" element={<FeaturesGroup tabs={featuresGroupColors} />} />

                                <Route path="/Base64Encoder" element={<Base64Encoder />} />
                                <Route path="/Base64FileEncoder" element={<Base64FileEncoder />} />
                                <Route path="/RegExTester" element={<RegExTester />} />
                                <Route path="/UUIDGenerator" element={<UUIDGenerator />} />
                                <Route path="/JWTDecoder" element={<JWTDecoder />} />
                                <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
                                <Route path="/ImageOCR" element={<ImageOCR />} />
                                <Route path="/CommonLists" element={<CommonLists />} />
                                <Route path="/GithubUserProjects" element={<GithubUserProjects />} />
                                <Route path="/DateConverter" element={<DateConverter />} />
                                <Route path="/CSVParser" element={<CSVParser />} />

                                <Route path="/PokerPlanning" element={<PokerPlanning />} />
                                <Route
                                    path="/PokerPlanning/:hostName/:roomUUID/:roomName"
                                    element={<PokerPlanning />}
                                />

                                {/** Default route is the home */}
                                <Route path="*" element={<Navigate to="/Home" replace />} />
                            </Routes>
                        </Suspense>
                    </main>
                </ToasterProvider>
            </div>
        </ConfirmDialogProvider>
    );
};

export default App;
