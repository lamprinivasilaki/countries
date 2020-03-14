import React, { FunctionComponent } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { CountryEntity } from '../interfaces/country.interface';

interface Props {
    countries: CountryEntity[];
    onCountrySelected: (selectedCountry: string) => void;
}

const Search: FunctionComponent<Props> = ({ countries, onCountrySelected }) => {
    return (
        <Autocomplete
            id="search"
            options={countries}
            getOptionLabel={country => country.name}
            onChange={event => onCountrySelected(event.target['innerText'])}
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
