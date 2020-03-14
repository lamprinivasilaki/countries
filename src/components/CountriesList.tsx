import React, { FunctionComponent } from 'react';
import { CountryEntity } from '../interfaces/country.interface';
import Details from './Details';

interface Props {
    countries: CountryEntity[];
    selectedCountry: string | undefined;
}

const CountriesList: FunctionComponent<Props> = ({
    countries,
    selectedCountry,
}) => {
    return (
        <>
            {!selectedCountry &&
                countries.map((country: CountryEntity) => (
                    <Details country={country} showDetails={true}></Details>
                ))}
            {selectedCountry &&
                countries
                    .filter(
                        (country: CountryEntity) =>
                            country.name === selectedCountry,
                    )
                    .map((country: CountryEntity) => (
                        <Details country={country} showDetails={true}></Details>
                    ))}
        </>
    );
};

export default CountriesList;
