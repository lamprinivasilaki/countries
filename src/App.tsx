import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import Dashboard from './components/Dashboard';
import { makeStyles, createStyles } from '@material-ui/styles';
import Quiz from './components/Quiz';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        },
        title: {
            flexGrow: 1
        }
    })
);
const App = () => {
    const classes = useStyles();
    return (
        <Router>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Link
                        to="/dashboard"
                        style={{ textDecoration: 'none', color: 'white' }}
                        className={classes.title}
                    >
                        <Typography variant="h6">COUNTRIES</Typography>
                    </Link>

                    <Link
                        to="/quiz"
                        style={{
                            textDecoration: 'none',
                            color: 'white'
                        }}
                    >
                        <Typography>Quiz</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/quiz" component={Quiz} />
            </Container>
        </Router>
    );
};

export default App;
