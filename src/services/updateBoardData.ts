import { CountryEntity } from '../interfaces/country.interface';
import { ColumnEntity } from '../interfaces/column.interface';

export function updateBoardData(
    countries: CountryEntity[],
    existingColumns: { [id: string]: ColumnEntity },
) {
    const items: { [name: string]: CountryEntity } = {};
    countries.forEach((country: CountryEntity) => {
        items[country.code] = {
            ...country,
        };
    });

    const columns: { [id: string]: ColumnEntity } = {};

    // create columns keys and empty itemsIds
    Object.keys(existingColumns).forEach((columnKey: string) => {
        columns[columnKey] = {
            id: existingColumns[columnKey].id,
            title: existingColumns[columnKey].title,
            itemsIds: [],
        };
    });

    const existingCountryCodes: string[] = countries.map(
        (country: CountryEntity) => country.code,
    );

    const existingItemCodes: string[] = Object.keys(existingColumns)
        .map((columnKey: string) => existingColumns[columnKey].itemsIds)
        .reduce((array: string[], subArray: string[]) =>
            array.concat(subArray),
        );

    const countryCodesIntersection: string[] = existingCountryCodes.filter(
        (code: string) => existingItemCodes.includes(code),
    );

    const oldCountryCode: string | undefined = existingItemCodes.find(
        (code: string) => !countryCodesIntersection.includes(code),
    );
    const newCountryCode: string | undefined = existingCountryCodes.find(
        (code: string) => !countryCodesIntersection.includes(code),
    );

    if (!oldCountryCode || !newCountryCode) {
        return;
    }

    Object.keys(existingColumns).forEach((columnKey: string) => {
        countryCodesIntersection.forEach((itemKey: string) => {
            if (existingColumns[columnKey].itemsIds.includes(itemKey)) {
                columns[columnKey] = existingColumns[columnKey];
            }
        });

        if (existingColumns[columnKey].itemsIds.includes(oldCountryCode)) {
            const index: number = existingColumns[columnKey].itemsIds.findIndex(
                (code: string) => code === oldCountryCode,
            );

            const newItemIds: string[] = existingColumns[columnKey].itemsIds
                .slice(0, index)
                .concat(newCountryCode)
                .concat(
                    existingColumns[columnKey].itemsIds.slice(
                        index + 1,
                        existingColumns[columnKey].itemsIds.length,
                    ),
                );
            columns[columnKey] = {
                id: existingColumns[columnKey].id,
                title: existingColumns[columnKey].title,
                itemsIds: newItemIds,
            };
        }
    });

    const columnsOrder: string[] = Object.keys(columns);

    return { items, columns, columnsOrder };
}
