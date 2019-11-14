import gql from 'graphql-tag';

const CountriesPerContinent = gql`
    query getCountriesPerContinent($code: String!) {
        continent(code: $code) {
            countries {
                name
                code
            }
        }
    }
`;

export default CountriesPerContinent;
