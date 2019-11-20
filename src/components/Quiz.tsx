import React, { FunctionComponent, useState, useEffect } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Button, Box, Tooltip } from '@material-ui/core';
import Alert from './Alert';
import { getRandomCountries } from '../services/getRandomCountries';
import Board from './Board';
import { ContinentEntity } from '../interfaces/continent.interface';
import { getBoardData } from '../services/getBoardData';
import { ColumnEntity } from '../interfaces/column.interface';
import { checkResults } from '../services/checkResults';
import { CountryEntity } from '../interfaces/country.interface';

interface Props {
    continents: ContinentEntity[];
}

const Quiz: FunctionComponent<Props> = ({ continents }) => {
    const { loading, error, data } = useQuery(CountriesQuery);
    const [updatedColumns, setUpdatedColumns] = useState();
    const [randomCountries, setRandomCountries] = useState();
    const [boardData, setBoardData] = useState();
    const [results, setResults] = useState();

    useEffect(() => {
        if (!data || !data.countries) {
            return;
        }
        const randomCountries = getRandomCountries(data.countries, 4);
        setRandomCountries(randomCountries);
        setBoardData(getBoardData(continents, randomCountries));
    }, [data, continents]);

    useEffect(() => {
        if (!continents || !randomCountries) {
            return;
        }
        setBoardData(getBoardData(continents, randomCountries));
    }, [continents, randomCountries]);

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
        setResults(checkResults(randomCountries, updatedColumns));
    };

    const handleHelp = () => {
        const newRandomCountry: CountryEntity[] = getRandomCountries(
            data.countries,
            1,
        );
        const randomIndex: number = Math.floor(
            Math.random() * randomCountries.length,
        );
        const newRandomCountries: CountryEntity[] = randomCountries
            .slice(0, randomIndex)
            .concat(newRandomCountry)
            .concat(
                randomCountries.slice(randomIndex + 1, randomCountries.length),
            );

        setRandomCountries(newRandomCountries);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <Box display="flex" flexGrow={1} justifyContent="space-between">
                <Tooltip
                    title="Replace randomly one country with another one"
                    placement="top-start"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20, marginBottom: 20 }}
                        onClick={handleHelp}
                    >
                        Help
                    </Button>
                </Tooltip>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={handleCheckResults}
                >
                    Check Results
                </Button>
            </Box>

            <Board
                columnsOrder={boardData.columnsOrder}
                columns={boardData.columns}
                items={boardData.items}
                onItemMoved={getUpdatedColumns}
            />

            {results && (
                <Alert
                    variant={results.result ? 'success' : 'error'}
                    message={results.message}
                    position={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                ></Alert>
            )}
        </div>
    );
};

export default Quiz;
