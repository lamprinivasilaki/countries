import React, { useState, FunctionComponent, useEffect } from 'react';
import {
    DragDropContext,
    DropResult,
    OnDragEndResponder,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import BoardColumn from './BoardColumn';
import { CountryEntity } from '../interfaces/country.interface';
import { ColumnEntity } from '../interfaces/column.interface';

interface Props {
    columnsOrder: string[];
    columns: { [id: string]: ColumnEntity };
    items: CountryEntity[];
    onItemMoved: (updatedColumns: { [id: string]: ColumnEntity }) => void;
    onItemSelected: (id: string, help: string) => void;
    isReplaceCountryHelpEnabled: boolean;
    isBoardRefreshButtonDisabled: boolean;
    isFiftyFiftyHelpEnabled: boolean;
    isBoardFiftyFiftyButtonDisabled: boolean;
    fiftyFiftyHints: (string | null)[];
    selectedCountryCode: string;
    replacedCountry: string;
    newReplacedCountryCode: string;
}
const BoardElement = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const Board: FunctionComponent<Props> = ({
    columnsOrder,
    columns,
    items,
    onItemMoved,
    onItemSelected,
    isReplaceCountryHelpEnabled,
    isBoardRefreshButtonDisabled,
    isFiftyFiftyHelpEnabled,
    isBoardFiftyFiftyButtonDisabled,
    fiftyFiftyHints,
    selectedCountryCode,
    replacedCountry,
    newReplacedCountryCode,
}) => {
    const [newColumns, setColumns] = useState(columns);
    const [highlightedColumns, highlightColumns] = useState<{
        [id: string]: ColumnEntity;
    }>({});

    useEffect(() => {
        setColumns(columns);
    }, [columns]);

    useEffect(() => {
        onItemMoved(newColumns);
    }, [newColumns, onItemMoved]);

    const onDragEnd = (result: DropResult): OnDragEndResponder => {
        const { source, destination, draggableId } = result;
        highlightColumns({});

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const columnStart = newColumns[source.droppableId];
        const columnFinish = newColumns[destination.droppableId];

        if (columnStart === columnFinish) {
            const newItemsIds = Array.from(columnStart.itemsIds);
            newItemsIds.splice(source.index, 1);
            newItemsIds.splice(destination.index, 0, draggableId);
            const newColumnStart = {
                ...columnStart,
                itemsIds: newItemsIds,
            };

            setColumns({
                ...newColumns,
                [newColumnStart.id]: newColumnStart,
            });
        } else {
            const newStartItemsIds = Array.from(columnStart.itemsIds);
            newStartItemsIds.splice(source.index, 1);

            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds,
            };

            const newFinishItemsIds = Array.from(columnFinish.itemsIds);
            newFinishItemsIds.splice(destination.index, 0, draggableId);

            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds,
            };

            setColumns({
                ...newColumns,
                [newColumnStart.id]: newColumnStart,
                [newColumnFinish.id]: newColumnFinish,
            });
        }
    };

    const onDragStart = (result: DropResult): OnDragEndResponder => {
        const { draggableId } = result;

        if (fiftyFiftyHints.length > 0 && selectedCountryCode === draggableId) {
            const highlightedColumns: { [id: string]: ColumnEntity } = {};
            for (const [key, value] of Object.entries(newColumns)) {
                if (fiftyFiftyHints.includes(value.title)) {
                    highlightedColumns[key] = value;
                }
            }
            highlightColumns(highlightedColumns);
        }
    };

    return (
        <BoardElement>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                {columnsOrder.map((columnId: string) => {
                    const column = newColumns[columnId];
                    const columnItems: CountryEntity[] = column.itemsIds
                        .map((itemId: string) => items[itemId])
                        .filter((item: CountryEntity) => item);

                    return (
                        <BoardColumn
                            key={column.id}
                            column={column}
                            items={columnItems}
                            onItemSelected={onItemSelected}
                            isReplaceCountryHelpEnabled={
                                isReplaceCountryHelpEnabled
                            }
                            isBoardRefreshButtonDisabled={
                                isBoardRefreshButtonDisabled
                            }
                            isFiftyFiftyHelpEnabled={isFiftyFiftyHelpEnabled}
                            isBoardFiftyFiftyButtonDisabled={
                                isBoardFiftyFiftyButtonDisabled
                            }
                            fiftyFiftyHints={fiftyFiftyHints}
                            selectedCountryCode={selectedCountryCode}
                            highlightedColumns={highlightedColumns}
                            replacedCountry={replacedCountry}
                            newReplacedCountryCode={newReplacedCountryCode}
                        />
                    );
                })}
            </DragDropContext>
        </BoardElement>
    );
};

export default Board;
