import React, { useState } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import CountryDetails from './CountryDetails';
import { makeStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: '12px',
    },
}));

const CountriesSelector = () => {
    const classes = useStyles();
    const [countryCode, setCountryCode] = useState();
    const { loading, error, data } = useQuery(CountriesQuery);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <h1>{countryCode}</h1>
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
                    {data.countries.map(country => (
                        <option key={country.name} value={country.code}>
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
