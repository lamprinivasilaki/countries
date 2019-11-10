import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import CountriesSelector from './components/CountriesSelector';

const App = () => {
	return (
		<Router>
			<Route path="/countries" component={CountriesSelector} />
			<Link to="/countries">Go to Countries</Link>
		</Router>
	);
};

export default App;
