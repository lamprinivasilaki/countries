import React, { FunctionComponent, useState } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, FormControlLabel, Switch } from '@material-ui/core';
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
    switch: {
        display: 'block',
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
    },
});

const CountriesList: FunctionComponent = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(CountriesQuery);
    const [isTableViewChecked, setTableView] = useState(true);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const toggleView = () => {
        setTableView(!isTableViewChecked);
    };

    return (
        <>
            <div className={classes.container}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isTableViewChecked}
                            onChange={toggleView}
                        />
                    }
                    label={isTableViewChecked ? 'Table' : 'List'}
                    className={classes.switch}
                />
                {data && isTableViewChecked && (
                    <CountriesTable countries={data.countries}></CountriesTable>
                )}
                {data &&
                    !isTableViewChecked &&
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
