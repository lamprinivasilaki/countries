import React, { FunctionComponent, useState, useEffect } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Button, Box } from '@material-ui/core';
import Alert from './Alert';
import { getRandomCountries } from '../services/getRandomCountries';
import Board from './Board';
import { ContinentEntity } from '../interfaces/continent.interface';
import { getBoardData } from '../services/getBoardData';
import { ColumnEntity } from '../interfaces/column.interface';
import { checkResults } from '../services/checkResults';
import { updateSelectedCountry } from '../services/updateSelectedCountry';
import { updateBoardData } from '../services/updateBoardData';
import { getFiftyFiftyHelp } from '../services/getFiftyFiftyHelp';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TouchAppIcon from '@material-ui/icons/TouchAppOutlined';
import PossibleContinentsDialog from './PossibleContinentsDialog';
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
    const [dialogState, setDialogState] = React.useState(false);
    const [
        selectedFiftyFiftyCountryCode,
        setSelectedFiftyFiftyCountryCode,
    ] = React.useState();
    const [replacedCountryCode, setReplacedCountryCode] = React.useState();

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

    const onItemSelected = (id: string, help: string) => {
        switch (help) {
            case 'replace':
                const newRandomCountries: CountryEntity[] = updateSelectedCountry(
                    data.countries,
                    randomCountries,
                    id,
                    1,
                );

                const newRandomCountryCode: string = newRandomCountries
                    .filter(
                        (country: CountryEntity) =>
                            !randomCountries.includes(country),
                    )
                    .map((country: CountryEntity) => country.code)
                    .join();

                setReplacedCountryCode(newRandomCountryCode);
                setRandomCountries(newRandomCountries);
                setBoardRefreshButtonsDisabled(true);
                break;

            case 'fifty-fifty':
                setSelectedFiftyFiftyCountryCode(id);
                setPossibleContinents(
                    getFiftyFiftyHelp(id, data.countries, continents),
                );
                setBoardFiftyFiftyButtonsDisabled(true);
                openDialog();
                break;

            case 'hint':
                openDialog();
                break;
        }
    };

    const replaceCountryHelp = () => {
        setHelpReplaceCountry(true);
    };

    const fiftyFiftyHelp = () => {
        setHelpFiftyFifty(true);
    };

    const openDialog = () => {
        setDialogState(true);
    };

    const handleDialogClose = (dialogState: boolean) => {
        setDialogState(dialogState);
    };

    return (
        <div style={{ marginTop: 30 }}>
            {dialogState && (
                <PossibleContinentsDialog
                    continents={possibleContinents}
                    isOpen={dialogState}
                    onDialogClosed={handleDialogClose}
                ></PossibleContinentsDialog>
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
                    <AutorenewIcon style={{ marginRight: 7 }} />
                    Replace Country
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={fiftyFiftyHelp}
                    disabled={helpFiftyFifty}
                >
                    <TouchAppIcon style={{ marginRight: 7 }} />
                    50 - 50
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
                fiftyFiftyHints={possibleContinents}
                selectedCountryCode={selectedFiftyFiftyCountryCode}
                replacedCountryCode={replacedCountryCode}
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
