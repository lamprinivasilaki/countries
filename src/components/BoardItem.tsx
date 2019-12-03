import React, { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TouchAppIcon from '@material-ui/icons/TouchAppOutlined';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { Typography } from '@material-ui/core';

interface Props {
    item: CountryEntity;
    index: number;
    onItemSelected: (id: string, help: string) => void;
    isReplaceCountryHelpEnabled: boolean;
    isRefreshButtonDisabled: boolean;
    isFiftyFiftyHelpEnabled: boolean;
    isFiftyFiftyButtonDisabled: boolean;
    fiftyFiftyHints: (string | null)[];
    selectedCountryCode: string;
    replacedCountryCode: string;
}

interface StyleProps {
    isDragging: boolean;
}

const BoardItemElement = styled.div<StyleProps>`
    padding: 8px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : '#fff')};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;
    border: ${props =>
        props.countryCode === props.replacedCountryCode
            ? '2px solid yellow'
            : null}

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
    isFiftyFiftyHelpEnabled,
    isFiftyFiftyButtonDisabled,
    fiftyFiftyHints,
    selectedCountryCode,
    replacedCountryCode,
}) => {
    const selectItem = (id: string, help: string) => {
        onItemSelected(id, help);
    };

    return (
        <Draggable draggableId={item.code} index={index}>
            {(provided, snapshot) => (
                <BoardItemElement
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    countryCode={item.code}
                    replacedCountryCode={replacedCountryCode}
                >
                    <Typography style={{ display: 'inline-block' }}>
                        {item.emoji} {item.name}
                    </Typography>
                    {isReplaceCountryHelpEnabled && (
                        <IconButton
                            onClick={() => selectItem(item.code, 'replace')}
                            disabled={isRefreshButtonDisabled}
                        >
                            <AutorenewIcon style={{ fontSize: 'medium' }} />
                        </IconButton>
                    )}
                    {isFiftyFiftyHelpEnabled && (
                        <IconButton
                            onClick={() => selectItem(item.code, 'fifty-fifty')}
                            disabled={isFiftyFiftyButtonDisabled}
                        >
                            <TouchAppIcon style={{ fontSize: 'medium' }} />
                        </IconButton>
                    )}
                    {fiftyFiftyHints.length !== 0 &&
                        selectedCountryCode === item.code && (
                            <IconButton
                                onClick={() => selectItem(item.code, 'hint')}
                            >
                                <EmojiObjectsIcon
                                    style={{ fontSize: 'medium' }}
                                />
                            </IconButton>
                        )}
                </BoardItemElement>
            )}
        </Draggable>
    );
};

export default BoardItem;
