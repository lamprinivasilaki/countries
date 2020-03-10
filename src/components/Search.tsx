import React, { FunctionComponent } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { CountryEntity } from '../interfaces/country.interface';

interface Props {
    countries: CountryEntity[];
}

const Search: FunctionComponent<Props> = ({ countries }) => {
    return (
        <Autocomplete
            id="search"
            options={countries}
            getOptionLabel={country => country.name}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Search Country"
                    variant="outlined"
                />
            )}
        />
    );
};

export default Search;
