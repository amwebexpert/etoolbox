import React from "react";

import LoadingOverlay from 'react-loading-overlay';

import { useGlobalSpinner } from "./GlobalSpinnerProvider";

import styled from 'styled-components'
 
const StyledLoader = styled(LoadingOverlay)`
  overflow: scroll;
  ._loading_overlay_overlay {
    z-index: 2000;
  }
`
 
export const GlobalSpinner: React.FC = ({ children }) => {
    const { globalSpinnerState } = useGlobalSpinner();

    if (globalSpinnerState.open) {
        return (
            <StyledLoader active={globalSpinnerState.open} spinner text={globalSpinnerState.message}>
                {children}
            </StyledLoader>
        );
    } else {
        return (<>{children}</>);
    }
}
