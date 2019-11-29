import React, { FunctionComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import BoardItem from './BoardItem';
import styled from 'styled-components';
import { ColumnEntity } from '../interfaces/column.interface';
import { getBoardBackground } from '../services/getBoardBackground';

interface Props {
    key?: string;
    column: ColumnEntity;
    items: CountryEntity[];
    onItemSelected: (id: string, help: string) => void;
    isReplaceCountryHelpEnabled: boolean;
    isBoardRefreshButtonDisabled: boolean;
    isFiftyFiftyHelpEnabled: boolean;
    isBoardFiftyFiftyButtonDisabled: boolean;
}

interface StyleProps {
    isDraggingOver: boolean;
    continentCode: string;
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
    min-height: 50px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
    background: ${props =>
        props.itemsLength === 0
            ? `url(${getBoardBackground(
                  props.continentCode,
              )}) no-repeat top center`
            : null};
`;

const BoardColumn: FunctionComponent<Props> = ({
    items,
    column,
    onItemSelected,
    isReplaceCountryHelpEnabled,
    isBoardRefreshButtonDisabled,
    isFiftyFiftyHelpEnabled,
    isBoardFiftyFiftyButtonDisabled,
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
                            continentCode={column.id}
                            itemsLength={items.length}
                        >
                            {items.map((item: CountryEntity, index: number) => (
                                <BoardItem
                                    key={item.code}
                                    item={item}
                                    index={index}
                                    onItemSelected={onItemSelected}
                                    isReplaceCountryHelpEnabled={
                                        isReplaceCountryHelpEnabled
                                    }
                                    isRefreshButtonDisabled={
                                        isBoardRefreshButtonDisabled
                                    }
                                    isFiftyFiftyHelpEnabled={
                                        isFiftyFiftyHelpEnabled
                                    }
                                    isFiftyFiftyButtonDisabled={
                                        isBoardFiftyFiftyButtonDisabled
                                    }
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
