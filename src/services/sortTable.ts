import { CountryEntity } from '../interfaces/country.interface';
import { SortOrder } from '../types/sort-order.type';

export function sortTable(
    countries: CountryEntity[],
    cmp: (a: CountryEntity, b: CountryEntity) => number,
) {
    const stabilizedThis = countries.map(
        (country, index) => [country, index] as [CountryEntity, number],
    );
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

export function getSorting(
    order: SortOrder,
    orderBy: string,
): (a: CountryEntity, b: CountryEntity) => number {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

// getObjProperty(a, "x.y.z") => a[x][y][z]
function getObjProperty(obj: Object, property: string) {
    const [curr, ...rest] = property.split('.');
    const res = obj[curr];
    if (rest.length === 0 || typeof res !== 'object') {
        return res;
    }
    return getObjProperty(res, rest.join('.'));
}

function desc(a: CountryEntity, b: CountryEntity, orderBy: string): number {
    if (getObjProperty(b, orderBy) < getObjProperty(a, orderBy)) {
        return -1;
    }
    if (getObjProperty(b, orderBy) > getObjProperty(a, orderBy)) {
        return 1;
    }
    return 0;
}
