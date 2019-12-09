import React, { FunctionComponent, useState } from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Grid } from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { makeStyles } from '@material-ui/styles';
import CountriesTable from './CountriesTable';
import Details from './Details';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

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

const CountriesList: FunctionComponent = () => {
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
                    justify="flex-end"
                    alignItems="center"
                    className={classes.viewToggler}
                >
                    <ToggleButtonGroup exclusive onChange={onViewToggled}>
                        <ToggleButton key={1} value="table">
                            <TableChartOutlinedIcon />
                        </ToggleButton>
                        <ToggleButton key={2} value="list">
                            <FormatListBulletedIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>

                {data && view === 'table' && (
                    <CountriesTable countries={data.countries}></CountriesTable>
                )}
                {data &&
                    view === 'list' &&
                    data.countries.map((country: CountryEntity) => (
                        <Details
                            country={country}
                            showDetails={true}
                            key={country.name}
                        ></Details>
                    ))}
            </div>
        </>
    );
};

export default CountriesList;
