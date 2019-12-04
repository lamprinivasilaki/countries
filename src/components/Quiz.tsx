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
import { makeStyles } from '@material-ui/styles';

interface Props {
    continents: ContinentEntity[];
}

const useStyles = makeStyles(() => ({
    container: { marginTop: 30 },
    button: { marginTop: 20, marginBottom: 20 },
    helpButton: { marginTop: 20, marginBottom: 20, marginLeft: 20 },
    icon: {
        marginRight: 7,
    },
}));

const Quiz: FunctionComponent<Props> = ({ continents }) => {
    const classes = useStyles();
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
    const [selectedCountryForReplace, setCountryForReplace] = React.useState();
    const [
        newReplacedCountryCode,
        setNewReplacedCountryCode,
    ] = React.useState();

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
                const replacedCountry: CountryEntity = randomCountries.find(
                    (country: CountryEntity) => country.code === id,
                );
                if (!replacedCountry) {
                    return;
                }

                setCountryForReplace(replacedCountry.name);
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

                setNewReplacedCountryCode(newRandomCountryCode);
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
        <div className={classes.container}>
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
                    className={classes.button}
                    onClick={handleCheckResults}
                >
                    Check Results
                </Button>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.helpButton}
                        onClick={replaceCountryHelp}
                        disabled={helpReplaceCountry}
                    >
                        <AutorenewIcon className={classes.icon} />
                        Replace Country
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.helpButton}
                        onClick={fiftyFiftyHelp}
                        disabled={helpFiftyFifty}
                    >
                        <TouchAppIcon className={classes.icon} />
                        50 - 50
                    </Button>
                </div>
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
                replacedCountry={selectedCountryForReplace}
                newReplacedCountryCode={newReplacedCountryCode}
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
