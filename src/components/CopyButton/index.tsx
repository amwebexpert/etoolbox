import React from 'react';

import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import { Button, ButtonProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import * as copy from 'copy-to-clipboard';

import { useToasterUpdate } from '../Toaster/ToasterProvider';

type Props = {
  data?: string;
  isDisabled?: boolean;
  hoverMessage?: string;
  feedbackMessage?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
} & ButtonProps;

const CopyButton: React.FC<Props> = ({
  data,
  isDisabled,
  hoverMessage,
  feedbackMessage,
  Icon = AssignmentTurnedIn,
  ...otherProps
}) => {
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
      disabled={!data || isDisabled}
      title={hoverMessage ?? 'Copy to clipboard'}
      variant="contained"
      data-testid="copy-to-clipboard"
      color="primary"
      {...otherProps}
      onClick={handleCopy}>
      <Icon />
    </Button>
  );
};

export default CopyButton;
