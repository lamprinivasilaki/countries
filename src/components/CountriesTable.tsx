import React, { FunctionComponent, useState } from 'react';
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TableSortLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CountryEntity } from '../interfaces/country.interface';
import theme from '../theming/theme';
import { HeadCell } from '../interfaces/head-cell.interface';
import { SortOrder } from '../types/sort-order.type';
import { sortTable, getSorting } from '../services/sortTable';
import { getCountriesTableHeaders } from '../services/getCountriesTableHeaders';
import TextWithTooltip from './TextWithTooltip';
import { LanguageEntity } from '../interfaces/language.interface';

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
});

const headCells: HeadCell[] = getCountriesTableHeaders();

const CountriesTable: FunctionComponent<Props> = ({ countries }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [countriesPerPage, setCountriesPerPage] = useState(5);
    const [order, setOrder] = React.useState<SortOrder>('asc');
    const [orderBy, setOrderBy] = React.useState('name');

    const onPageChanged = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const onRowsPerPageChanged = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCountriesPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onSortClicked = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.header}>
                    <TableRow>
                        {headCells.map((headCell: HeadCell) => (
                            <TableCell
                                key={headCell.id}
                                sortDirection={
                                    orderBy === headCell.id ? order : false
                                }
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    key={headCell.id}
                                    direction={order}
                                    onClick={event =>
                                        onSortClicked(event, headCell.id)
                                    }
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortTable(countries, getSorting(order, orderBy))
                        .slice(
                            page * countriesPerPage,
                            page * countriesPerPage + countriesPerPage,
                        )
                        .map((country: CountryEntity, index: number) => (
                            <TableRow key={country.name}>
                                <TableCell component="th" scope="row">
                                    <span style={{ width: 50 }}>
                                        {country.emoji}
                                    </span>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextWithTooltip
                                        text={country.name}
                                        width="150px"
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextWithTooltip
                                        text={country.continent.name}
                                        width="150px"
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextWithTooltip
                                        text={country.currency}
                                        width="150px"
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextWithTooltip
                                        text={
                                            country.languages.length !== 0
                                                ? country.languages
                                                      .map(
                                                          (
                                                              language: LanguageEntity,
                                                          ) => language.name,
                                                      )
                                                      .join()
                                                : ' '
                                        }
                                        width="200px"
                                    />
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
                onChangePage={onPageChanged}
                onChangeRowsPerPage={onRowsPerPageChanged}
            />
        </Paper>
    );
};

export default CountriesTable;
