import React, { useState, Dispatch } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Select, CircularProgress } from '@material-ui/core';
import Country from './Country';
import { ICountry } from '../interfaces/country.interface';
import { useQuery } from '@apollo/react-hooks';
import CountriesPerContinentQuery from '../api/queries/countries_per_continent';

interface PropsType {
    continentCode: string;
    code: string;
    onOptionSelected: any;
}

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: '12px',
    },
}));

const CountriesSelector: any = ({ continentCode, code, onOptionSelected }: PropsType) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(CountriesPerContinentQuery, {
        variables: { continentCode },
    });

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="countries">Countries</InputLabel>
            <Select
                native
                value={code}
                onChange={e => onOptionSelected(e.target.value)}
                inputProps={{
                    name: 'countries',
                    id: 'countries',
                }}
            >
                {data.continent.countries.map((country: ICountry) => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default CountriesSelector;
