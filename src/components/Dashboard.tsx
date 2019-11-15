import React, { memo, FunctionComponent, Dispatch, useState } from 'react';
import ContinentsSelector from './ContinentsSelector';
import Details from './Details';
import { ICountry } from '../interfaces/country.interface';
import CountriesSelector from './CountriesSelector';
import Country from '../api/queries/country';

const Dashboard: FunctionComponent = () => {
    const country: ICountry = {
        name: 'Greece',
        code: 'GR',
        native: 'Ελλάδα',
        currency: 'EUR',
        emoji: '🇬🇷',
        continent: {
            code: 'EU',
            name: 'Europe',
        },
        languages: [
            {
                code: 'el',
                name: 'Greek',
            },
        ],
    };
    const [continentCode, setContinentCode]: [string | undefined, Dispatch<any>] = useState();
    const [countryCode, setCountryCode]: [string | undefined, Dispatch<any>] = useState();

    const onContinentSelected = (option: string) => {
        setContinentCode(option);
    };

    const onCountrySelected = (option: string) => {
        setContinentCode(option);
    };

    return (
        <>
            <Details country={country}></Details>
            <ContinentsSelector code={continentCode} onOptionSelected={onContinentSelected} />
            {continentCode && (
                <CountriesSelector
                    continentCode={continentCode}
                    code={countryCode}
                    onOptionSelected={onCountrySelected}
                />
            )}
            {countryCode && <Country code={countryCode} />}
        </>
    );
};

export default memo(Dashboard);
