import React, { FunctionComponent } from 'react';
import { Dialog, DialogTitle, List, ListItem } from '@material-ui/core';

export interface Props {
    continents: (string | null)[];
    isOpen: boolean;
    onDialogClosed: (state: boolean) => void;
}

const PossibleContinentsDialog: FunctionComponent<Props> = ({
    continents,
    isOpen,
    onDialogClosed,
}) => {
    const handleClose = () => {
        onDialogClosed(!isOpen);
    };
    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>Possible Continents</DialogTitle>
            <List>
                {continents.map((continent: string | null, index: number) => (
                    <ListItem key={index}>{continent}</ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export default PossibleContinentsDialog;
