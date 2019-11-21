import React, { FunctionComponent, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Position } from '../types/position.type';
import { HelperItem } from '../interfaces/helper-item.interface';

interface Props {
    items: HelperItem[];
    position: Position;
    open: boolean;
    onHelperClosed: (state: any) => any;
    onHelpClicked: (state: any) => any;
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

const Helper: FunctionComponent<Props> = ({
    items,
    position,
    open,
    onHelperClosed,
    onHelpClicked,
}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        top: false,
        bottom: false,
        left: false,
        right: false,
        [position]: open,
    });
    const [selectedHelpId, setSelectedHelpId] = useState();

    useEffect(() => {
        toggleDrawer(position, true);
    }, [open, position]);

    useEffect(() => {
        onHelperClosed(state);
    }, [state, onHelperClosed]);

    useEffect(() => {
        if (!selectedHelpId) {
            return;
        }
        onHelpClicked(selectedHelpId);
    }, [selectedHelpId, onHelpClicked]);

    const toggleDrawer = (side: Position, open: boolean) => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const onHelperClicked = (id: number) => {
        setSelectedHelpId(id);
    };

    const sideList = (side: Position) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {items.map((item: HelperItem) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => onHelperClicked(item.id)}
                    >
                        <ListItemIcon>
                            <HelpIcon></HelpIcon>
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                anchor={position}
                open={state[position]}
                onClose={toggleDrawer(position, false)}
            >
                {sideList(position)}
            </Drawer>
        </div>
    );
};

export default Helper;
