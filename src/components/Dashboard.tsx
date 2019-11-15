import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ContinentsSelector from './ContinentsSelector';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3, 3),
        padding: theme.spacing(2, 3),
        maxWidth: 300,
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.root}>
                <ContinentsSelector />
            </Paper>
        </>
    );
};

export default memo(Dashboard);
