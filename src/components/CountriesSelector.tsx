import React, { useState } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import Country from './Country';

const CountriesSelector = () => {
	const [countryCode, setCountryCode] = useState();
	const { loading, error, data } = useQuery(CountriesQuery);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<div>
			<h1>{countryCode}</h1>
			<select
				value={countryCode}
				onChange={e => setCountryCode(e.target.value)}
			>
				{data.countries.map(country => (
					<option key={country.name} value={country.code}>
						{country.name}
					</option>
				))}
			</select>
			{countryCode && <Country code={countryCode} />}
		</div>
	);
};

export default CountriesSelector;
