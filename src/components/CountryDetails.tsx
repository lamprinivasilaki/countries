import React, { memo } from 'react';
import CountryQuery from '../api/queries/country';
import { useQuery } from '@apollo/react-hooks';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { ListItemText, Typography } from '@material-ui/core';

interface PropsType {
    code: string;
}

const CountryDetails: any = ({ code }: PropsType) => {
    const { loading, error, data } = useQuery(CountryQuery, {
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
        <>
            <ListItem>
                <ListItemText
                    primary={
                        <>
                            <Typography component="span" style={{ marginRight: 12 }}>
                                {data.country.emoji}
                            </Typography>
                            <Typography component="span">{data.country.name}</Typography>
                        </>
                    }
                    secondary={
                        <>
                            {data.country.native && (
                                <Typography component="span">
                                    Native: {data.country.native}
                                </Typography>
                            )}
                            <br />
                            {data.country.currency && (
                                <Typography component="span">
                                    Currency: {data.country.currency}
                                </Typography>
                            )}
                        </>
                    }
                ></ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};

export default memo(CountryDetails);
