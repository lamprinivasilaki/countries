import React from 'react';
import ContinentsQuery from '../api/queries/continents';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Select, CircularProgress } from '@material-ui/core';
import { IContinent } from '../interfaces/continent.interface';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: '12px',
    },
}));

const ContinentsSelector: any = ({ code, onOptionSelected }) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(ContinentsQuery);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="continents">Continents</InputLabel>
            <Select
                native
                value={code}
                onChange={e => onOptionSelected(e.target.value)}
                inputProps={{
                    name: 'continents',
                    id: 'continents',
                }}
            >
                <option key="0" value=""></option>
                {data.continents.map((continent: IContinent) => (
                    <option key={continent.name} value={continent.code}>
                        {continent.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default ContinentsSelector;
