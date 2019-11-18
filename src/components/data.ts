export const initialBoardData = {
    items: {
        'item-1': { code: 'item-1', name: 'Content of item 1.' },
        'item-2': { code: 'item-2', name: 'Content of item 2.' },
        'item-3': { code: 'item-3', name: 'Content of item 3.' },
        'item-4': { code: 'item-4', name: 'Content of item 4.' },
        'item-5': { code: 'item-5', name: 'Content of item 5.' },
        'item-6': { code: 'item-6', name: 'Content of item 6.' },
        'item-7': { code: 'item-7', name: 'Content of item 7.' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Column 1',
            itemsIds: [
                'item-1',
                'item-2',
                'item-3',
                'item-4',
                'item-5',
                'item-6',
                'item-7'
            ]
        },
        'column-2': {
            id: 'column-2',
            title: 'Column 2',
            itemsIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Column 3',
            itemsIds: []
        },
        'column-4': {
            id: 'column-4',
            title: 'Column 4',
            itemsIds: []
        }
    },
    columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4']
};
