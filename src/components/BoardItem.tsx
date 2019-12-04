import React, { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CountryEntity } from '../interfaces/country.interface';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TouchAppIcon from '@material-ui/icons/TouchAppOutlined';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HistoryIcon from '@material-ui/icons/History';
import { Typography, Tooltip } from '@material-ui/core';
import theme from '../theming/theme';
import { makeStyles } from '@material-ui/styles';

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
    replacedCountry: string;
    newReplacedCountryCode: string;
}

interface StyleProps {
    isDragging: boolean;
}

const useStyles = makeStyles(() => ({
    flag: {
        fontSize: 40,
        textAlign: 'center',
    },
    name: {
        textAlign: 'center',
    },
    iconSize: {
        fontSize: 'medium',
    },
}));

const BoardItemElement = styled.div<StyleProps>`
    padding: 8px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : '#fff')};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;
    color: ${theme.palette.text.primary}
    margin: 4px;

    &:hover {
        background-color: #f7fafc;
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
    replacedCountry,
    newReplacedCountryCode,
}) => {
    const classes = useStyles();
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
                >
                    <Typography className={classes.flag}>
                        {item.emoji}
                    </Typography>
                    <Typography noWrap className={classes.name}>
                        {item.name}
                    </Typography>
                    {isReplaceCountryHelpEnabled && !isRefreshButtonDisabled && (
                        <IconButton
                            onClick={() => selectItem(item.code, 'replace')}
                            disabled={isRefreshButtonDisabled}
                        >
                            <AutorenewIcon className={classes.iconSize} />
                        </IconButton>
                    )}
                    {replacedCountry && newReplacedCountryCode === item.code && (
                        <Tooltip title={replacedCountry} placement="top">
                            <IconButton>
                                <HistoryIcon className={classes.iconSize} />
                            </IconButton>
                        </Tooltip>
                    )}
                    {isFiftyFiftyHelpEnabled && !isFiftyFiftyButtonDisabled && (
                        <IconButton
                            onClick={() => selectItem(item.code, 'fifty-fifty')}
                            disabled={isFiftyFiftyButtonDisabled}
                        >
                            <TouchAppIcon className={classes.iconSize} />
                        </IconButton>
                    )}
                    {fiftyFiftyHints.length !== 0 &&
                        selectedCountryCode === item.code && (
                            <IconButton
                                onClick={() => selectItem(item.code, 'hint')}
                            >
                                <EmojiObjectsIcon
                                    className={classes.iconSize}
                                />
                            </IconButton>
                        )}
                </BoardItemElement>
            )}
        </Draggable>
    );
};

export default BoardItem;
