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
}) => {
    const [newColumns, setColumns] = useState(columns);

    useEffect(() => {
        setColumns(columns);
    }, [columns]);

    useEffect(() => {
        onItemMoved(newColumns);
    }, [newColumns, onItemMoved]);

    const onDragEnd = (result: DropResult): OnDragEndResponder => {
        const { source, destination, draggableId } = result;

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

    return (
        <BoardElement>
            <DragDropContext onDragEnd={onDragEnd}>
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
                        />
                    );
                })}
            </DragDropContext>
        </BoardElement>
    );
};

export default Board;
