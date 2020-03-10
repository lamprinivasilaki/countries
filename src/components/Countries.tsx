import React, { FunctionComponent, useState } from 'react';
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

const Countries: FunctionComponent = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(CountriesQuery);
    const [view, setView] = useState('table');

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
                    <Search countries={data.countries}></Search>
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
                    <CountriesTable countries={data.countries}></CountriesTable>
                )}
                {data && view === 'list' && (
                    <CountriesList countries={data.countries}></CountriesList>
                )}
            </div>
        </>
    );
};

export default Countries;
