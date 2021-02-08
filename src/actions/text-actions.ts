export enum TextInputActionTypes {
    SET_INPUT_TEXT = 'TextInputActionTypes.SET_INPUT_TEXT'
}

export interface SetTextInputAction {
    type: TextInputActionTypes.SET_INPUT_TEXT;
    name: string;
    value: string;
}

export function setTextAction(name: string, value: string): SetTextInputAction {
    return {
        type: TextInputActionTypes.SET_INPUT_TEXT,
        name,
        value
    }
}

export type TextInputsAction = SetTextInputAction;
