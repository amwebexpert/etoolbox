import React from 'react';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import { Button } from '@material-ui/core';

import * as copy from 'copy-to-clipboard';
import { useToasterUpdate } from '../Toaster/ToasterProvider';

interface Props {
    data?: string;
}

const CopyButton: React.FC<Props> = (props: Props) => {
    const { data } = props;
    const { setToasterState } = useToasterUpdate();

    const handleCopy = () => {
        if (!data) {
            return;
        }

        const feedback = data.substr(0, 20);
        const message = `Content copied into clipboard: ${feedback} …`;

        copy.default(data, { format: 'text/plain' });
        setToasterState({ open: true, message, type: 'success', autoHideDuration: 2000 });
    }

    return (
        <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
            onClick={handleCopy} disabled={!data}
            variant="contained" color="primary">Copy</Button>
    );
}

export default CopyButton;
