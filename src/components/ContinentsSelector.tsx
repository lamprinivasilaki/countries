import React, { useState } from 'react';
import ContinentsQuery from '../api/queries/continents';
import { useQuery } from '@apollo/react-hooks';
import ContinentDetails from './ContinentDetails';

const ContinentsSelector = () => {
    const [continentCode, setContinentCode] = useState();
    const { loading, error, data } = useQuery(ContinentsQuery);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <h1>{continentCode}</h1>
            <select value={continentCode} onChange={e => setContinentCode(e.target.value)}>
                {data.continents.map(continent => (
                    <option key={continent.name} value={continent.code}>
                        {continent.name}
                    </option>
                ))}
            </select>

            {continentCode && <ContinentDetails code={continentCode} />}
        </div>
    );
};

export default ContinentsSelector;
