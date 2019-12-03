import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import CountriesPerContinentQuery from '../api/queries/countries_per_continent';
import Selector from './Selector';
import Alert from './Alert';

interface Props {
    continentCode: string;
    code: string;
    onCodeSelected: (option: string) => void;
}

const CountriesPerContinent: FunctionComponent<Props> = ({
    continentCode,
    code,
    onCodeSelected,
}) => {
    const { loading, error, data } = useQuery(CountriesPerContinentQuery, {
        variables: { code: continentCode },
    });

    if (!data) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    return (
        <Selector
            data={data.continent.countries}
            text="Countries"
            code={code}
            onCodeSelected={onCodeSelected}
        />
    );
};

export default CountriesPerContinent;
