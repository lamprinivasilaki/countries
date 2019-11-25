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

    let existingItems: string[] = [];

    Object.keys(existingColumns).forEach((columnKey: string) => {
        existingItems.push(...existingColumns[columnKey].itemsIds);
    });

    const intersection: string[] = existingCountryCodes.filter(x =>
        existingItems.includes(x),
    );

    Object.keys(existingColumns).forEach((columnKey: string) => {
        intersection.forEach((itemKey: string) => {
            if (existingColumns[columnKey].itemsIds.includes(itemKey)) {
                columns[columnKey] = existingColumns[columnKey];
            }
        });
    });

    const foundOld: string | undefined = existingItems.find(
        c => !intersection.includes(c),
    );
    const foundNew: string | undefined = existingCountryCodes.find(
        c => !intersection.includes(c),
    );

    if (!foundOld || !foundNew) {
        return;
    }

    Object.keys(existingColumns).forEach((columnKey: string) => {
        if (existingColumns[columnKey].itemsIds.includes(foundOld)) {
            const index: number = existingColumns[columnKey].itemsIds.findIndex(
                c => c === foundOld,
            );

            const newItems: string[] = existingColumns[columnKey].itemsIds
                .slice(0, index)
                .concat(foundNew)
                .concat(
                    existingColumns[columnKey].itemsIds.slice(
                        index + 1,
                        existingColumns[columnKey].itemsIds.length,
                    ),
                );
            columns[columnKey] = {
                id: existingColumns[columnKey].id,
                title: existingColumns[columnKey].title,
                itemsIds: newItems,
            };
        }
    });

    const columnsOrder: string[] = Object.keys(columns);

    return { items, columns, columnsOrder };
}
