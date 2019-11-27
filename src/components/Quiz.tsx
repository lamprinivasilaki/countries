import React, { FunctionComponent, useState, useEffect } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Button, Box, Typography } from '@material-ui/core';
import Alert from './Alert';
import { getRandomCountries } from '../services/getRandomCountries';
import Board from './Board';
import { ContinentEntity } from '../interfaces/continent.interface';
import { getBoardData } from '../services/getBoardData';
import { ColumnEntity } from '../interfaces/column.interface';
import { checkResults } from '../services/checkResults';
import Helper from './Helper';
import { Position } from '../types/position.type';
import { updateRandomCountries } from '../services/updateRandomCountries';
import { HelperItem } from '../interfaces/helper-item.interface';
import { PositionState } from '../interfaces/position-state.interface';
import { updateSelectedCountry } from '../services/updateSelectedCountry';
import { updateBoardData } from '../services/updateBoardData';
import { CountryEntity } from '../interfaces/country.interface';

interface Props {
    continents: ContinentEntity[];
}

const Quiz: FunctionComponent<Props> = ({ continents }) => {
    const { loading, error, data } = useQuery(CountriesQuery);
    const helperPosition: Position = 'right';
    const helperItems: HelperItem[] = [
        { title: 'Replace one country', id: 1 },
        { title: 'Rgdfgdfg country', id: 2 },
        { title: 'fdgdfgdfgdfgy', id: 3 },
    ];
    const [updatedColumns, setUpdatedColumns] = useState();
    const [randomCountries, setRandomCountries] = useState();
    const [boardData, setBoardData] = useState();
    const [results, setResults] = useState();
    const [helperState, setHelperState] = useState(false);
    const [helpReplaceCountry, setHelpReplaceCountry] = useState(false);
    const [
        boardRefreshButtonsDisabled,
        setBoardRefreshButtonsDisabled,
    ] = useState(false);
    const [helpFiftyFifty, setHelpFiftyFifty] = useState(false);
    const [
        boardFiftyFiftyButtonsDisabled,
        setBoardFiftyFiftyButtonsDisabled,
    ] = useState(false);

    const [possibleContinents, setPossibleContinents] = useState<
        (string | null)[]
    >([]);

    useEffect(() => {
        if (!data || !data.countries) {
            return;
        }
        const randomCountries = getRandomCountries(data.countries, 4);
        setRandomCountries(randomCountries);
    }, [data]);

    useEffect(() => {
        if (!continents || !randomCountries) {
            return;
        }
        setBoardData(getBoardData(continents, randomCountries));
    }, [continents, randomCountries]);

    useEffect(() => {
        if (!randomCountries || !updatedColumns) {
            return;
        }
        setBoardData(updateBoardData(randomCountries, updatedColumns));
    }, [randomCountries]);

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

    const onAlertClosed = () => {
        setResults(undefined);
    };

    const handleCheckResults = () => {
        setResults(checkResults(randomCountries, updatedColumns));
    };

    const openHelper = () => {
        setHelperState(true);
    };

    const handleHelperClose = (helperState: PositionState) => {
        setHelperState(helperState[helperPosition]);
    };

    const handleHelperClick = (id: number) => {
        const help: HelperItem | undefined = helperItems.find(
            (item: HelperItem) => item.id === id,
        );

        if (!help) {
            return;
        }

        switch (help.id) {
            case 1:
                setRandomCountries(
                    updateRandomCountries(data.countries, randomCountries, 1),
                );
                break;
            case 2:
                console.log('help case 2');
                break;
            case 3:
                console.log('help case 3');
                break;
        }
    };

    const onItemSelected = (id: string) => {
        setRandomCountries(
            updateSelectedCountry(data.countries, randomCountries, id, 1),
        );
        setBoardRefreshButtonsDisabled(true);
    };

    const replaceCountryHelp = () => {
        setHelpReplaceCountry(true);
    };

    const fiftyFiftyHelp = () => {
        setHelpFiftyFifty(true);
    };

    const onItemSelectedForFiftyFifty = (id: string) => {
        // get continent code
        const continentCode: string = data.countries
            .filter((country: CountryEntity) => country.code === id)
            .map((country: CountryEntity) => country.continent.code)[0];

        // get remaining continent codes
        const remainingContinentCodes: string[] = continents
            .filter(continent => continent.code !== continentCode)
            .map(continent => continent.code);

        let continentsLengthAfterHelp: number =
            remainingContinentCodes.length / 2;

        let randomRemainingContinentCodes: string[] = remainingContinentCodes;
        for (let i = 0; i < continentsLengthAfterHelp; i++) {
            const rand =
                randomRemainingContinentCodes[
                    Math.floor(
                        Math.random() * randomRemainingContinentCodes.length,
                    )
                ];

            const idx = randomRemainingContinentCodes.indexOf(rand);
            randomRemainingContinentCodes = randomRemainingContinentCodes
                .slice(0, idx)
                .concat(
                    randomRemainingContinentCodes.slice(
                        idx + 1,
                        randomRemainingContinentCodes.length,
                    ),
                );
        }

        const randomRemainingContinents = randomRemainingContinentCodes.map(
            code => continents.find(continent => continent.code === code),
        );

        const randomRemainingContinentNames = randomRemainingContinents.map(
            continent => (continent ? continent.name : null),
        );
        setPossibleContinents(randomRemainingContinentNames);
        setBoardFiftyFiftyButtonsDisabled(true);
    };

    return (
        <div style={{ marginTop: 30 }}>
            {helperState && (
                <Helper
                    items={helperItems}
                    position={helperPosition}
                    open={helperState}
                    onHelperClosed={handleHelperClose}
                    onHelpClicked={handleHelperClick}
                ></Helper>
            )}
            {possibleContinents.map(
                (continent: string | null, index: number) => (
                    <Typography key={index}>{continent}</Typography>
                ),
            )}
            <Box display="flex" flexGrow={1} justifyContent="space-between">
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={handleCheckResults}
                >
                    Check Results
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={replaceCountryHelp}
                    disabled={helpReplaceCountry}
                >
                    Replace Country
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={fiftyFiftyHelp}
                    disabled={helpFiftyFifty}
                >
                    50 - 50
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={openHelper}
                >
                    Help
                </Button>
            </Box>

            <Board
                columnsOrder={boardData.columnsOrder}
                columns={boardData.columns}
                items={boardData.items}
                onItemMoved={getUpdatedColumns}
                onItemSelected={onItemSelected}
                isReplaceCountryHelpEnabled={helpReplaceCountry}
                isBoardRefreshButtonDisabled={boardRefreshButtonsDisabled}
                isFiftyFiftyHelpEnabled={helpFiftyFifty}
                isBoardFiftyFiftyButtonDisabled={boardFiftyFiftyButtonsDisabled}
                onItemSelectedForFiftyFifty={onItemSelectedForFiftyFifty}
            />

            {results && (
                <Alert
                    variant={results.result ? 'success' : 'error'}
                    message={results.message}
                    position={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    onAlertClosed={onAlertClosed}
                ></Alert>
            )}
        </div>
    );
};

export default Quiz;
