import React, { useState, FunctionComponent } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
} from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';

interface PropsType {
    items: CountryEntity[];
}
const getListStyle = isDraggingOver => ({
    width: 400,
    background: isDraggingOver ? 'lightblue' : '#efefef',
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: 'rgb(235,235,235)',
    }),
});

const Column: FunctionComponent<PropsType> = ({ items }) => {
    const [list, setList] = useState(items);

    const reorder = (
        originalList: CountryEntity[],
        startIndex: number,
        endIndex: number,
    ): CountryEntity[] => {
        const updatedList: CountryEntity[] = Array.from(originalList);
        const [removedItem] = updatedList.splice(startIndex, 1);
        updatedList.splice(endIndex, 0, removedItem);

        return updatedList;
    };

    const onDragEnd = event => {
        // dropped outside the list
        if (!event.destination) {
            return;
        }

        setList(reorder(list, event.source.index, event.destination.index));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                        <List style={getListStyle(snapshot.isDraggingOver)}>
                            {list.map((item: CountryEntity, index: number) => (
                                <Draggable key={item.code} draggableId={item.code} index={index}>
                                    {(provided, snapshot) => (
                                        <ListItem
                                            ContainerComponent="li"
                                            ContainerProps={{ ref: provided.innerRef }}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                            )}
                                        >
                                            <ListItemText>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {item.emoji} {item.name}
                                                </Typography>
                                            </ListItemText>
                                            <ListItemSecondaryAction></ListItemSecondaryAction>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    </RootRef>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Column;
