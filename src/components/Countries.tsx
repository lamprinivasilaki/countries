import React, { FunctionComponent, useState, useMemo } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Grid } from '@material-ui/core';
import Alert from './Alert';
import { makeStyles } from '@material-ui/styles';
import CountriesTable from './CountriesTable';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CountriesList from './CountriesList';
import Search from './Search';
import { CountryEntity } from '../interfaces/country.interface';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    viewToggler: {
        marginTop: 20,
        marginBottom: 10,
    },
});

const getProperty = (obj: { [k: string]: any }, property: string): any => {
    if (!obj || typeof obj !== 'object') {
        return undefined;
    }
    if (!property.includes('.')) {
        return obj[property];
    }
    const tokens: string[] = property.split('.');
    const nestedObj: any = obj[tokens[0]];
    const nestedProperty: string = tokens.slice(1).join('.');
    if (Array.isArray(nestedObj)) {
        return nestedObj.map(entry => getProperty(entry, nestedProperty));
    }
    return getProperty(nestedObj, nestedProperty);
};

const filterCountries = (
    keyword: string,
    properties: string[] = ['name', 'code'],
) => {
    const lowercaseKeyword: string = keyword.toLowerCase();

    return (country: CountryEntity): boolean => {
        const values: string[] = properties
            .map(property => getProperty(country, property))
            .flat()
            .filter(value => typeof value === 'string')
            .map(value => value.toLowerCase());

        return values.some(value => value.includes(lowercaseKeyword));
    };
};

const Countries: FunctionComponent = () => {
    const classes = useStyles();
    const { loading, error, data = { countries: [] } } = useQuery<{
        countries: CountryEntity[];
    }>(CountriesQuery);
    const [view, setView] = useState('table');
    const [inputValue, setInputValue] = useState<string>('');

    const countries: CountryEntity[] = useMemo(() => {
        return inputValue
            ? data.countries.filter(
                  filterCountries(inputValue, [
                      'name',
                      'code',
                      'currency',
                      'continent.name',
                      'continent.code',
                      'languages.name',
                  ]),
              )
            : data.countries;
    }, [inputValue, data.countries]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const onViewToggled = (
        event: React.MouseEvent<HTMLElement>,
        view: string,
    ): void => {
        setView(view);
    };

    const handleInputChange = (input: string) => {
        setInputValue(input);
    };

    return (
        <>
            <div className={classes.container}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.viewToggler}
                >
                    <Search
                        value={inputValue}
                        onValueChanged={handleInputChange}
                    ></Search>
                    <ToggleButtonGroup exclusive onChange={onViewToggled}>
                        <ToggleButton
                            key="table"
                            value="table"
                            selected={view === 'table'}
                        >
                            <TableChartOutlinedIcon />
                        </ToggleButton>
                        <ToggleButton
                            key="list"
                            value="list"
                            selected={view === 'list'}
                        >
                            <FormatListBulletedIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>

                {data && view === 'table' && (
                    <CountriesTable countries={countries}></CountriesTable>
                )}
                {data && view === 'list' && (
                    <CountriesList countries={countries}></CountriesList>
                )}
            </div>
        </>
    );
};

export default Countries;
