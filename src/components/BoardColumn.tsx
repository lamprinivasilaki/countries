import React, { FunctionComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import { ColumnEntity } from '../interfaces/column.interface';

interface Props {
    key?: string;
    column: ColumnEntity;
    items: CountryEntity[];
    onItemSelected: (id: string) => void;
}

interface StyleProps {
    isDraggingOver: boolean;
}

const BoardColumnWrapper = styled.div`
    flex: 1;
    padding: 8px;
    background-color: #e5eff5;
    border-radius: 4px;

    & + & {
        margin-left: 12px;
    }
`;

const BoardColumnTitle = styled.h2`
    font: 14px sans-serif;
    margin-bottom: 12px;
`;

const BoardColumnContent = styled.div<StyleProps>`
    min-height: 20px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
`;
const BoardColumn: FunctionComponent<Props> = ({
    items,
    column,
    onItemSelected,
}) => {
    return (
        <>
            <BoardColumnWrapper>
                <BoardColumnTitle>{column.title}</BoardColumnTitle>

                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                        <BoardColumnContent
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {items.map((item: CountryEntity, index: number) => (
                                <BoardItem
                                    key={item.code}
                                    item={item}
                                    index={index}
                                    onItemSelected={onItemSelected}
                                />
                            ))}
                            {provided.placeholder}
                        </BoardColumnContent>
                    )}
                </Droppable>
            </BoardColumnWrapper>
        </>
    );
};

export default BoardColumn;
