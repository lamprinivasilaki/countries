import gql from 'graphql-tag';

const Continents = gql`
    {
        continents {
            name
            code
        }
    }
`;

export default Continents;
