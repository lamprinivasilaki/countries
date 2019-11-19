import React, { FunctionComponent } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { getRandomCountries } from '../services/getRandomCountries';
import Board from './Board';
import { ContinentEntity } from '../interfaces/continent.interface';
import { getBoardData } from '../services/getBoardData';

interface Props {
    continents: ContinentEntity[];
}

const Quiz: FunctionComponent<Props> = ({ continents }) => {
    const { loading, error, data } = useQuery(CountriesQuery);

    if (!data) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const randomCountries: CountryEntity[] = getRandomCountries(data.countries, 10);

    const { items, columns, columnsOrder } = getBoardData(continents, randomCountries);

    const getUpdatedColumns = (updatedColumns: { [id: string]: ColumnEntity }) => {
        const helloThere = checkResults(randomCountries, updatedColumns);

        console.log('helloThere!', helloThere);
        // setUpdatedColumns(updatedColumns);
    };

    return (
        <>
            <div style={{ marginTop: 30 }}>
                <Board
                    columnsOrder={columnsOrder}
                    columns={columns}
                    items={items}
                    onItemMoved={getUpdatedColumns}
                />
            </div>
        </>
    );
};

export default Quiz;
