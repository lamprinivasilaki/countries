import React, { memo } from 'react';
import CountryQuery from '../api/queries/country';
import { useQuery } from '@apollo/react-hooks';

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
        <div>
            <h1>{data.country.name}</h1>
            <h2>{`${data.country.emoji} — ${data.country.native} — ${data.country.currency}`}</h2>
        </div>
    );
};

export default memo(CountryDetails);
