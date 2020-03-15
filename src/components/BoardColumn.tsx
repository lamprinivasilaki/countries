import React, { FunctionComponent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import BoardItem from './BoardItem';
import styled, { css } from 'styled-components';
import { ColumnEntity } from '../interfaces/column.interface';
import { getBoardBackground } from '../services/getBoardBackground';
import theme from '../theming/theme';

interface Props {
    key?: string;
    column: ColumnEntity;
    items: CountryEntity[];
    onItemSelected: (id: string, help: string) => void;
    isReplaceCountryHelpEnabled: boolean;
    isBoardRefreshButtonDisabled: boolean;
    isFiftyFiftyHelpEnabled: boolean;
    isBoardFiftyFiftyButtonDisabled: boolean;
    fiftyFiftyHints: (string | null)[];
    selectedCountryCode?: string;
    highlightedColumns: { [id: string]: ColumnEntity };
    replacedCountry?: string;
    newReplacedCountryCode?: string;
    row?: boolean;
}

interface StyleProps {
    isDraggingOver: boolean;
    continentCode: string;
    itemsLength: number;
    row: boolean;
}

const BoardColumnWrapper = styled.div`
    flex-grow: 1;
    padding: 8px;
    background-color: #e5eff5;
    border-radius: 4px;
    box-shadow: ${props =>
        Object.keys(props.highlightedColumns).includes(props.column.id)
            ? `0px 0px 0 2px ${theme.palette.secondary.main}`
            : 'none'};
    margin: 6px;
    ${props =>
        props.row &&
        css`
            width: 100%;
        `};
`;

const BoardColumnTitle = styled.h2`
    font-size: 15px;
    text-align: center;
    margin-bottom: 12px;
    color: ${theme.palette.text.primary};
`;

const BoardColumnContent = styled.div<StyleProps>`
    min-height: 50px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
    margin: -4px;
    background: ${props =>
        props.itemsLength === 0
            ? `url(${getBoardBackground(
                  props.continentCode,
              )}) no-repeat top center`
            : null};

    display: flex;
    flex-direction: column;
    ${props =>
        props.row &&
        css`
            flex-direction: row;
        `};
`;

const BoardColumn: FunctionComponent<Props> = ({
    items,
    column,
    onItemSelected,
    isReplaceCountryHelpEnabled,
    isBoardRefreshButtonDisabled,
    isFiftyFiftyHelpEnabled,
    isBoardFiftyFiftyButtonDisabled,
    fiftyFiftyHints,
    selectedCountryCode,
    highlightedColumns,
    replacedCountry,
    newReplacedCountryCode,
    row,
}) => {
    return (
        <>
            <BoardColumnWrapper
                highlightedColumns={highlightedColumns}
                column={column}
                row={row}
            >
                <BoardColumnTitle>{column.title}</BoardColumnTitle>

                <Droppable
                    droppableId={column.id}
                    direction={row ? 'horizontal' : 'vertical'}
                >
                    {(provided, snapshot) => (
                        <BoardColumnContent
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            continentCode={column.id}
                            itemsLength={items.length}
                            row={row}
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
                                    fiftyFiftyHints={fiftyFiftyHints}
                                    selectedCountryCode={selectedCountryCode}
                                    replacedCountry={replacedCountry}
                                    newReplacedCountryCode={
                                        newReplacedCountryCode
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
