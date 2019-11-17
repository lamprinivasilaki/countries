import gql from 'graphql-tag';

const Countries = gql`
    {
        countries {
            name
            code
        }
    }
`;

export default Countries;
