import { Button, ButtonProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import * as copy from 'copy-to-clipboard';
import React from 'react';
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
  ...others
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
      {...others}
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
