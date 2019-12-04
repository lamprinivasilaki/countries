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
                        style={{ textDecoration: 'none', color: 'white' }}
                        className={classes.title}
                    >
                        <div
                            style={{
                                paddingTop: 20,
                                paddingBottom: 20,
                                display: 'flex',
                            }}
                        >
                            <img
                                src={logo}
                                alt="Countries Quiz"
                                style={{
                                    width: 50,
                                    height: 50,
                                    alignSelf: 'center',
                                }}
                            />
                            <div
                                style={{
                                    flexDirection: 'column',
                                    paddingLeft: 12,
                                    fontSize: 25,
                                }}
                            >
                                <span>Countries</span>
                                <br />
                                <span>Quiz</span>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/quiz"
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
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
