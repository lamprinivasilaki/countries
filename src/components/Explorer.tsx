import React, { memo, FunctionComponent, useState } from 'react';
import Continents from './Continents';
import CountriesPerContinent from './CountriesPerContinent';
import Country from './Country';
import { FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    formGroup: {
        margin: 12,
        width: 400,
    },
}));

const Explorer: FunctionComponent = () => {
    const classes = useStyles();
    const [continentCode, setContinentCode] = useState();
    const [countryCode, setCountryCode] = useState();

    const onContinentSelected = (option: string) => {
        setContinentCode(option);
    };

    const onCountrySelected = (option: string) => {
        setCountryCode(option);
    };

    return (
        <>
            <FormGroup className={classes.formGroup}>
                <Continents
                    code={continentCode}
                    onCodeSelected={onContinentSelected}
                />
                {continentCode && (
                    <CountriesPerContinent
                        continentCode={continentCode}
                        code={countryCode}
                        onCodeSelected={onCountrySelected}
                    />
                )}
            </FormGroup>
            {countryCode && <Country code={countryCode} />}
        </>
    );
};

export default memo(Explorer);
