import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import CountryDetails from './CountryDetails';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: '12px',
    },
}));

const CountriesSelector = ({ countries }) => {
    const classes = useStyles();
    const [countryCode, setCountryCode] = useState();

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="countries">Countries</InputLabel>
                <Select
                    native
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    inputProps={{
                        name: 'countries',
                        id: 'countries',
                    }}
                >
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </Select>
                {countryCode && <CountryDetails code={countryCode} />}
            </FormControl>
        </>
    );
};

export default CountriesSelector;
