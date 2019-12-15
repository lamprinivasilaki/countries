import React, { FunctionComponent } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import theme from '../theming/theme';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        padding: '20px 0',
    },
    section: {
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        margin: '10px',
        padding: '30px',
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,

        '&:hover': {
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    icon: {
        fontSize: 130,
        padding: 30,
        margin: 40,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.primary.main}`,
    },
    text: {
        paddingTop: 20,
    },
}));

const Dashboard: FunctionComponent = () => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Link className={classes.link} to="/explorer">
                <Box className={classes.section}>
                    <SearchIcon className={classes.icon}></SearchIcon>
                    <Typography variant="h4">Explore</Typography>
                    <Typography className={classes.text}>
                        You can search countries and continents, learn what
                        language people there speak as well as what is their
                        currency, in order to get ready for the quiz.
                    </Typography>
                </Box>
            </Link>
            <Link className={classes.link} to="/countries">
                <Box className={classes.section}>
                    <FormatListBulletedIcon
                        className={classes.icon}
                    ></FormatListBulletedIcon>
                    <Typography variant="h4">Countries List</Typography>
                    <Typography className={classes.text}>
                        You can view the full list of all containing countries
                        along with information about which continent they belong
                        to. Get ready for the Quiz and impress anyone with your
                        knowledge.
                    </Typography>
                </Box>
            </Link>
            <Link className={classes.link} to="/quiz">
                <Box className={classes.section}>
                    <SportsEsportsIcon
                        className={classes.icon}
                    ></SportsEsportsIcon>
                    <Typography variant="h4">Play</Typography>
                    <Typography className={classes.text}>
                        As long as you are prepared you can take the Quiz and
                        see how your geography skills are. Can you find the
                        correct continent for each country with just two hints?
                    </Typography>
                </Box>
            </Link>
        </Box>
    );
};

export default Dashboard;
