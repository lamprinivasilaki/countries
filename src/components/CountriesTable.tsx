import React, { FunctionComponent } from 'react';
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CountryEntity } from '../interfaces/country.interface';

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
});

const CountriesTable: FunctionComponent<Props> = ({ countries }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Flag</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Continent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countries.map((country: CountryEntity) => (
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CountriesTable;
