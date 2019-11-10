import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// initialize a GraphQL client
const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com',
});

// write a GraphQL query that asks for names and codes for all countries
const GET_COUNTRIES = gql`
    {
        countries {
            name
            code
        }
    }
`;

const App = () => {
    const [country, setCountry] = useState('Andorra');

    return (
        <Router basename='/countries'>
            <h1>{country}</h1>
            <Query query={GET_COUNTRIES} client={client}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>{error.message}</p>;
                    return (
                        <div>
                            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                {data.countries.map((country) => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                }}
            </Query>

            <Link to='hello'>Hello</Link>
        </Router>
    );
};

export default App;
