import gql from 'graphql-tag';

const Countries = gql`
    {
        countries {
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

export default Countries;
