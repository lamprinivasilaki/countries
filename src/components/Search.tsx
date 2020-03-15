import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
    value: string | undefined;
    onValueChanged: (input: string) => void;
}

const Search: FunctionComponent<Props> = ({ value, onValueChanged }) => {
    return (
        <TextField
            label="Search"
            variant="standard"
            value={value}
            onChange={event => onValueChanged(event.target.value)}
        />
    );
};

export default Search;
