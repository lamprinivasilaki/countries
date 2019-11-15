import React, { useState } from 'react';
import ContinentsQuery from '../api/queries/continents';
import { useQuery } from '@apollo/react-hooks';
import ContinentDetails from './ContinentDetails';
import { makeStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: '12px',
    },
}));

const ContinentsSelector = () => {
    const classes = useStyles();
    const [continentCode, setContinentCode] = useState();
    const { loading, error, data } = useQuery(ContinentsQuery);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="continents">Continents</InputLabel>
                <Select
                    native
                    value={continentCode}
                    onChange={e => setContinentCode(e.target.value)}
                    inputProps={{
                        name: 'continents',
                        id: 'continents',
                    }}
                >
                    <option key="0" value=""></option>
                    {data.continents.map(continent => (
                        <option key={continent.name} value={continent.code}>
                            {continent.name}
                        </option>
                    ))}
                </Select>

                {continentCode && <ContinentDetails code={continentCode} />}
            </FormControl>
        </>
    );
};

export default ContinentsSelector;
