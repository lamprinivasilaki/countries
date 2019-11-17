import gql from 'graphql-tag';

const Countries = gql`
    {
        countries {
            name
            code
            emoji
            continent {
                name
                code
            }
        }
    }
`;

export default Countries;
