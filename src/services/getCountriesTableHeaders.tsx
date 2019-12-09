import { HeadCell } from '../interfaces/head-cell.interface';

export function getCountriesTableHeaders(): HeadCell[] {
    return [
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
}
