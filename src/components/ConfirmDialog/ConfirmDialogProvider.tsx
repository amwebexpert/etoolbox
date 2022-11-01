import React, { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';

import { NO_OP, VoidType } from '../../types/common-types';
import { ConfirmDialog } from './ConfirmDialog';

type ConfirmDialogParams = {
  title: React.ReactNode;
  description: React.ReactNode;
  onConfirm: VoidType;
};

type ConfirmDialogProviderProps = PropsWithChildren<unknown>;

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [description, setDescription] = useState<React.ReactNode>();
  const [title, setTitle] = useState<React.ReactNode>();
  const onConfirmRef = useRef<VoidType>(NO_OP);

  const showConfirmationDialog = ({ title, description, onConfirm }: ConfirmDialogParams) => {
    setTitle(title);
    setDescription(description);
    onConfirmRef.current = onConfirm;

    setIsVisible(true);
  };

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmationDialog }}>
      <>
        {children}

        {isVisible && (
          <ConfirmDialog title={title} isOpen={isVisible} setIsOpen={setIsVisible} onConfirm={onConfirmRef.current}>
            {description}
          </ConfirmDialog>
        )}
      </>
    </ConfirmDialogContext.Provider>
  );
};

type ConfirmDialogContextType = {
  showConfirmationDialog: (params: ConfirmDialogParams) => void;
};

const ConfirmDialogContext = createContext<ConfirmDialogContextType>({ showConfirmationDialog: NO_OP });

export const useConfirmDialogContext = () => useContext(ConfirmDialogContext);
