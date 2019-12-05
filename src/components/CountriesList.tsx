import React, { FunctionComponent } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { makeStyles } from '@material-ui/styles';
import CountriesTable from './CountriesTable';
import Details from './Details';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

const CountriesList: FunctionComponent = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(CountriesQuery);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    return (
        <>
            <div className={classes.container}>
                {data && (
                    <CountriesTable countries={data.countries}></CountriesTable>
                )} */}
                {data &&
                    data.countries.map((country: CountryEntity) => (
                        <Details
                            country={country}
                            showDetails={true}
                            key={country.name}
                        ></Details>
                    ))}
            </div>
        </>
    );
};

export default CountriesList;
