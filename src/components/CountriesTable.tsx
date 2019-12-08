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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

// getObjProperty(a, "x.y.z") => a[x][y][z]
function getObjProperty(obj, prop) {
    const [curr, ...rest] = prop.split('.');
    const res = obj[curr];
    if (rest.length === 0 || typeof res !== 'object') {
        return res;
    }
    return getObjProperty(res, rest.join('.'));
}

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (getObjProperty(b, orderBy) < getObjProperty(a, orderBy)) {
        return -1;
    }
    if (getObjProperty(b, orderBy) > getObjProperty(a, orderBy)) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: CountryEntity[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map(
        (el, index) => [el, index] as [any, number],
    );
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting<K extends keyof any>(
    order: SortOrder,
    orderBy: K,
): (
    a: { [key in K]: number | string },
    b: { [key in K]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const CountriesTable: FunctionComponent<Props> = ({ countries }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [countriesPerPage, setCountriesPerPage] = useState(5);
    const [order, setOrder] = React.useState<SortOrder>('asc');
    const [orderBy, setOrderBy] = React.useState('name');

    const headCells: HeadCell[] = [
        {
            id: 'emoji',
            label: 'Flag',
        },
        {
            id: 'name',
            label: 'Country',
        },
        { id: 'continent.name', label: 'Continent' },
        {
            id: 'currency',
            label: 'Currency',
        },
        {
            id: 'languages',
            label: 'Language',
        },
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCountriesPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (
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
                                        handleRequestSort(event, headCell.id)
                                    }
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <span
                                            className={classes.visuallyHidden}
                                        >
                                            {order === 'desc'
                                                ? 'sorted descending'
                                                : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(countries, getSorting(order, orderBy))
                        .slice(
                            page * countriesPerPage,
                            page * countriesPerPage + countriesPerPage,
                        )
                        .map((country: any, index: number) => (
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
