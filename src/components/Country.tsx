import React, { memo, FunctionComponent } from 'react';
import CountryQuery from '../api/queries/country';
import { useQuery } from '@apollo/react-hooks';
import Details from './Details';
import { CircularProgress } from '@material-ui/core';
import Alert from './Alert';

interface Props {
    code: string;
}

const Country: FunctionComponent<Props> = ({ code }) => {
    const { loading, error, data } = useQuery(CountryQuery, {
        variables: { code },
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

    return <Details country={data.country} showDetails={true}></Details>;
};

export default memo(Country);
