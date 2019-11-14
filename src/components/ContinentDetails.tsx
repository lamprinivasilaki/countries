import React, { memo } from 'react';
import CountriesPerContinentQuery from '../api/queries/countries_per_continent';
import { useQuery } from '@apollo/react-hooks';
import CountryDetails from './CountryDetails';

interface PropsType {
    code: string;
}

const ContinentDetails: any = ({ code }: PropsType) => {
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
        <div>
            {data.continent.countries.map(country => (
                <CountryDetails code={country.code} />
            ))}
        </div>
        // <pre>
        //     <code>{JSON.stringify(data)}</code>
        // </pre>
    );
};

export default memo(ContinentDetails);
