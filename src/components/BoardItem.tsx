import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography, Menu, MenuItem } from '@material-ui/core';

interface Props {
    item: CountryEntity;
    index: number;
    onItemSelected: (id: string) => void;
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
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectItem = (id: string) => {
        onItemSelected(id);
        handleClose();
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
                    <Typography>
                        {item.emoji} {item.name}
                    </Typography>
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => selectItem(item.code)}>
                            Replace Country
                        </MenuItem>
                    </Menu>
                </BoardItemElement>
            )}
        </Draggable>
    );
};

export default BoardItem;
