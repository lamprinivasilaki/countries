import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import Dashboard from './components/Dashboard';
import { makeStyles, createStyles } from '@material-ui/styles';
import Quiz from './components/Quiz';
import { useQuery } from '@apollo/react-hooks';
import ContinentsQuery from './api/queries/continents';
import Alert from './components/Alert';
import logo from './assets/logo.svg';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        link: {
            textDecoration: 'none',
            color: 'white',
        },
        logoWrapper: { paddingTop: 20, paddingBottom: 20, display: 'flex' },
        logo: { width: 50, height: 50, alignSelf: 'center' },
        logoText: { flexDirection: 'column', paddingLeft: 12, fontSize: 25 },
    }),
);
const App = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(ContinentsQuery);

    if (!data) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }
    return (
        <Router>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Link
                        to="/dashboard"
                        className={`${classes.title} ${classes.link}`}
                    >
                        <div className={classes.logoWrapper}>
                            <img
                                src={logo}
                                alt="Countries Quiz"
                                className={classes.logo}
                            />
                            <div className={classes.logoText}>
                                <span>Countries</span>
                                <br />
                                <span>Quiz</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/quiz" className={classes.link}>
                        <Typography>Quiz</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/quiz">
                    <Quiz continents={data.continents}></Quiz>
                </Route>
            </Container>
        </Router>
    );
};

export default App;
