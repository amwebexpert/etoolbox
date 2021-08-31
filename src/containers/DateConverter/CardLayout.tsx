import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import CopyButton from '../../components/CopyButton';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';
import { SAMPLE_DATEFNS_FORMAT, SAMPLE_DATEFNS_TZ_CONVERT } from './constants';
import { useStyles } from './styles';

interface Props {
    date: Date | null;
    epochString?: string;
}

export const CardLayout: React.FC<Props> = ({ date, epochString }: Props) => {
    const classes = useStyles();
    const syntaxTheme = useSyntaxHighlightTheme();

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle1'>ISO string / JSON</Typography>
                    <span className={classes.value}>{date?.toISOString()}</span>
                </CardContent>
                <CardActions>
                    <CopyButton data={date?.toISOString()} />
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle1'>Locale date string</Typography>
                    <div className={classes.value}>
                        {date?.toLocaleDateString()} {date?.toLocaleTimeString()}
                    </div>
                    <Typography variant='subtitle1' className={classes.otherSubtitle}>
                        Timezone offset:{' '}
                    </Typography>
                    <div className={classes.value}>
                        {date?.getTimezoneOffset()} min ({(date?.getTimezoneOffset() ?? 0) / 60} hrs)
                    </div>
                </CardContent>
                <CardActions>
                    <CopyButton data={date?.toLocaleDateString() + ' ' + date?.toLocaleTimeString()} />
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle1'>Js code using epoch:</Typography>
                    <SyntaxHighlighter style={syntaxTheme} language='javascript' className={classes.formatted}>
                        {`const date = new Date(${epochString});`}
                    </SyntaxHighlighter>
                </CardContent>
                <CardActions>
                    <CopyButton data={`const date = new Date(${epochString});`} />
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle1'>Js code using ISO 8601:</Typography>
                    <SyntaxHighlighter style={syntaxTheme} language='javascript' className={classes.formatted}>
                        {`const date = new Date('${date?.toISOString()}');`}
                    </SyntaxHighlighter>
                </CardContent>
                <CardActions>
                    <CopyButton data={`const date = new Date(${epochString});`} />
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle1'>date-fns timezone convertion example:</Typography>
                    <SyntaxHighlighter style={syntaxTheme} language='javascript' className={classes.formatted}>
                        {SAMPLE_DATEFNS_TZ_CONVERT.replace('#utc_value#', date?.toISOString() ?? '')}
                    </SyntaxHighlighter>
                </CardContent>
                <CardActions>
                    <CopyButton data={SAMPLE_DATEFNS_TZ_CONVERT.replace('#utc_value#', date?.toISOString() ?? '')} />
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='subtitle1'>date-fns format example:</Typography>
                    <SyntaxHighlighter style={syntaxTheme} language='javascript' className={classes.formatted}>
                        {SAMPLE_DATEFNS_FORMAT.replace('#utc_value#', date?.toISOString() ?? '')}
                    </SyntaxHighlighter>
                </CardContent>
                <CardActions>
                    <CopyButton data={SAMPLE_DATEFNS_FORMAT.replace('#utc_value#', date?.toISOString() ?? '')} />
                </CardActions>
            </Card>
        </>
    );
};
