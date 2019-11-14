import React, { memo } from 'react';
import CountriesPerContinentQuery from '../api/queries/countries_per_continent';
import { useQuery } from '@apollo/react-hooks';
import CountryDetails from './CountryDetails';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface PropsType {
    code: string;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        // backgroundColor: '#aaa',
    },
    inline: {
        display: 'inline',
    },
}));

const ContinentDetails: any = ({ code }: PropsType) => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(CountriesPerContinentQuery, {
        variables: { code },
    });
    if (!data) {
        return;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <List className={classes.root}>
            {data.continent.countries.map(country => (
                <CountryDetails code={country.code} key={country.code} />
            ))}
        </List>
    );
};

export default memo(ContinentDetails);
