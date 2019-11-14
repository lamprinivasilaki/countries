import gql from 'graphql-tag';

const Country = gql`
    query getCountry($code: String!) {
        country(code: $code) {
            name
            native
            emoji
            currency
            continent {
                code
                name
            }
            languages {
                code
                name
            }
        }
    }
`;

export default Country;
