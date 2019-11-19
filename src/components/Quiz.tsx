import React, { FunctionComponent, useState, useEffect } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Button } from '@material-ui/core';
import Alert from './Alert';
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
    const [randomCountries, setRandomCountries] = useState();
    const [boardData, setBoardData] = useState();

    useEffect(() => {
        if (!data || !data.countries) {
            return;
        }
        const randomCountries = getRandomCountries(data.countries, 4);
        setRandomCountries(randomCountries);
        setBoardData(getBoardData(continents, randomCountries));
    }, [data, continents]);

    if (!boardData) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const getUpdatedColumns = (updatedColumns: {
        [id: string]: ColumnEntity;
    }) => {
        setUpdatedColumns(updatedColumns);
    };

    const handleCheckResults = () => {
        const helloThere = checkResults(randomCountries, updatedColumns);
        console.log('helloThere!', helloThere);
    };

    return (
        <>
            <div style={{ marginTop: 30 }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={handleCheckResults}
                >
                    Check Results
                </Button>
                <Board
                    columnsOrder={boardData.columnsOrder}
                    columns={boardData.columns}
                    items={boardData.items}
                    onItemMoved={getUpdatedColumns}
                />
            </div>
        </>
    );
};

export default Quiz;
