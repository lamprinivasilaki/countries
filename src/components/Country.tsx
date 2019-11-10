import React, { memo } from 'react';
import CountryQuery from '../api/queries/country';
import { useQuery } from '@apollo/react-hooks';

interface PropsType {
	code: string;
}

const Country = ({ code }: PropsType) => {
	const { loading, error, data } = useQuery(CountryQuery, {
		variables: { code },
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<pre>
			<code>{JSON.stringify(data)}</code>
		</pre>
	);
};

export default memo(Country);
