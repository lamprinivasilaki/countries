import React, { FunctionComponent } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import { ContinentEntity } from '../interfaces/continent.interface';
import { CountryEntity } from '../interfaces/country.interface';
import { makeStyles } from '@material-ui/styles';

interface Props {
    data: (ContinentEntity | CountryEntity)[];
    text: string;
    code: string;
    onCodeSelected: (newCode: string) => void;
}

const useStyles = makeStyles(() => ({
    formControl: {
        margin: 5,
    },
}));

const Selector: FunctionComponent<Props> = ({
    data,
    text,
    code,
    onCodeSelected,
}) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor={text.toLowerCase()}>{text}</InputLabel>
            <Select
                native
                value={code}
                onChange={e => onCodeSelected(e.target.value as string)}
                inputProps={{
                    name: text.toLowerCase(),
                    id: text.toLowerCase(),
                }}
            >
                <option key="0" value=""></option>
                {data.map((entity: ContinentEntity | CountryEntity) => (
                    <option key={entity.name} value={entity.code}>
                        {entity.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default Selector;
