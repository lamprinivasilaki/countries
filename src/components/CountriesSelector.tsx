import React, { useState } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';

const CountriesSelector = () => {
	const [country, setCountry] = useState('Andorra');
	const { loading, error, data } = useQuery(CountriesQuery);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<div>
			<h1>{country}</h1>
			<select value={country} onChange={e => setCountry(e.target.value)}>
				{data.countries.map(country => (
					<option key={country.name} value={country.name}>
						{country.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default CountriesSelector;
