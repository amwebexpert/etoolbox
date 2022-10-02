import { Button, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import * as copy from 'copy-to-clipboard';
import React from 'react';
import { useToasterUpdate } from '../Toaster/ToasterProvider';

interface Props {
    data?: string;
    isDisabled?: boolean;
    hoverMessage?: string;
    feedbackMessage?: string;
    Icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
}

const CopyButton: React.FC<Props> = ({
    data,
    isDisabled,
    hoverMessage,
    feedbackMessage,
    Icon = AssignmentTurnedIn,
}: Props) => {
    const { setToasterState } = useToasterUpdate();

    const handleCopy = () => {
        if (!data) {
            return;
        }

        const message = feedbackMessage ?? `Content copied into clipboard: ${data.substring(0, 25)} …`;

        copy.default(data, { format: 'text/plain' });
        setToasterState({ open: true, message, type: 'success', autoHideDuration: 2000 });
    };

    return (
        <Button
            onClick={handleCopy}
            disabled={!data || isDisabled}
            title={hoverMessage ?? 'Copy to clipboard'}
            variant="contained"
            color="primary">
            <Icon />
        </Button>
    );
};

export default CopyButton;
