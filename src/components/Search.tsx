import React, { FunctionComponent } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { CountryEntity } from '../interfaces/country.interface';

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
