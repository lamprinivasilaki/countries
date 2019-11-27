import React, { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { Typography } from '@material-ui/core';

interface Props {
    item: CountryEntity;
    index: number;
    onItemSelected: (id: string) => void;
    isReplaceCountryHelpEnabled: boolean;
    isRefreshButtonDisabled: boolean;
}

interface StyleProps {
    isDragging: boolean;
}

const BoardItemElement = styled.div<StyleProps>`
    padding: 8px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : '#fff')};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;

    &:hover {
        background-color: #f7fafc;
    }

    & + & {
        margin-top: 4px;
    }
`;

const BoardItem: FunctionComponent<Props> = ({
    item,
    index,
    onItemSelected,
    isReplaceCountryHelpEnabled,
    isRefreshButtonDisabled,
}) => {
    const selectItem = (id: string) => {
        onItemSelected(id);
    };

    return (
        <Draggable draggableId={item.code} index={index}>
            {(provided, snapshot) => (
                <BoardItemElement
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Typography style={{ display: 'inline-block' }}>
                        {item.emoji} {item.name}
                    </Typography>
                    {isReplaceCountryHelpEnabled && (
                        <IconButton
                            onClick={() => selectItem(item.code)}
                            disabled={isRefreshButtonDisabled}
                        >
                            <AutorenewIcon></AutorenewIcon>
                        </IconButton>
                    )}
                </BoardItemElement>
            )}
        </Draggable>
    );
};

export default BoardItem;
