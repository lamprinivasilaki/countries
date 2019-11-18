import React from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { getRandomCountries } from '../services/getRandomCountries';
import BoardColumn from './BoardColumn';

const Quiz = () => {
    const { loading, error, data } = useQuery(CountriesQuery);

    if (!data) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const randomCountries: CountryEntity[] = getRandomCountries(
        data.countries,
        2
    );

    return <BoardColumn items={randomCountries} />;
};

export default Quiz;
