import React, { FunctionComponent, useState } from 'react';
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CountryEntity } from '../interfaces/country.interface';
import theme from '../theming/theme';

interface Props {
    countries: CountryEntity[];
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    header: {
        backgroundColor: theme.palette.primary.main,
    },
    headerText: {
        color: '#fff',
    },
});

const CountriesTable: FunctionComponent<Props> = ({ countries }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [countriesPerPage, setCountriesPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCountriesPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={classes.headerText}>
                            Flag
                        </TableCell>
                        <TableCell className={classes.headerText}>
                            Country
                        </TableCell>
                        <TableCell className={classes.headerText}>
                            Continent
                        </TableCell>
                        <TableCell className={classes.headerText}>
                            Currency
                        </TableCell>
                        <TableCell className={classes.headerText}>
                            Language
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countries
                        .slice(
                            page * countriesPerPage,
                            page * countriesPerPage + countriesPerPage,
                        )
                        .map((country: CountryEntity) => (
                            <TableRow key={country.name}>
                                <TableCell component="th" scope="row">
                                    {country.emoji}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {country.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {country.continent.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {country.currency}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {country.languages.length !== 0
                                        ? country.languages
                                              .map(language => language.name)
                                              .join()
                                        : null}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={countries.length}
                rowsPerPage={countriesPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default CountriesTable;
