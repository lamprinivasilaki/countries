import React, { FunctionComponent, useState } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Button } from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { getRandomCountries } from '../services/getRandomCountries';
import Board from './Board';
import { ContinentEntity } from '../interfaces/continent.interface';
import { getBoardData } from '../services/getBoardData';
import { ColumnEntity } from '../interfaces/column.interface';
import { checkResults } from '../services/checkResults';

interface Props {
    continents: ContinentEntity[];
}

const Quiz: FunctionComponent<Props> = ({ continents }) => {
    const { loading, error, data } = useQuery(CountriesQuery);
    const [updatedColumns, setUpdatedColumns] = useState();

    if (!data) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const randomCountries: CountryEntity[] = getRandomCountries(data.countries, 4);

    const { items, columns, columnsOrder } = getBoardData(continents, randomCountries);

    const getUpdatedColumns = (updatedColumns: { [id: string]: ColumnEntity }) => {
        const helloThere = checkResults(randomCountries, updatedColumns);

        console.log('helloThere!', helloThere);
        // setUpdatedColumns(updatedColumns);
    };

    return (
        <>
            <div style={{ marginTop: 30 }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                >
                    Check Results
                </Button>
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
