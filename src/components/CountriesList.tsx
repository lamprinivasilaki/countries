import React, { FunctionComponent } from 'react';
import { CountryEntity } from '../interfaces/country.interface';
import Details from './Details';

interface Props {
    countries: CountryEntity[];
}

const CountriesList: FunctionComponent<Props> = ({ countries }) => {
    return (
        <>
            {countries.map((country: CountryEntity) => (
                <Details
                    country={country}
                    showDetails={true}
                    key={country.name}
                ></Details>
            ))}
        </>
    );
};

export default CountriesList;
