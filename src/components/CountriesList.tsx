import React, { FunctionComponent } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import {
    CircularProgress,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        margin: 10,
        flexGrow: 1,
    },
    content: {
        padding: '30px !important',
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

    console.log('data: ', data);
    return (
        <>
            <div className={classes.container}>
                {data &&
                    data.countries.map((country: CountryEntity) => (
                        <Card className={classes.card} key={country.code}>
                            <CardContent className={classes.content}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    style={{ marginBottom: 15 }}
                                >
                                    {country.emoji} {country.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    <b>{country.name}</b> is a country located
                                    in <b>{country.continent.name}</b>.
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </>
    );
};

export default CountriesList;
