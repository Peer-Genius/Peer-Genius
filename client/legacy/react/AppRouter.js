import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { push } from 'react-router-redux';

import AppBar from './appBar';

import FrontPage from './frontPage';
import Home from './home.js';

import CreateAccount from './account/create';
import AccountRouter from './account/router';

const style = {
	content: {
		height: '100%',
		paddingTop: 64,
		textAlight: 'center',
		overflowX: 'hidden',
		overflowY: 'initial',
	}
};

@connect(state => ({
	inSession: state.inSession
}), {
	push
})
class LoggedInRoute extends React.Component {
	componentWillMount() {
		if (this.props.inSession === 0) {
			this.props.push('/');
		}
	}
	
	render() {
		return (
			<Route {...this.props} />
		);
	}
}

@connect(state => ({
	inSession: state.inSession
}), {
	push
})
class LoggedOutRoute extends React.Component {
	componentWillMount() {
		if (this.props.inSession === 1) {
			this.props.push('/home');
		}
	}
	
	render() {
		return (
			<Route {...this.props} />
		);
	}
}

const LoggedInRouter = props => (
	<div style={{ width: '100%', height: '100%' }}>
		<AppBar />
		<div style={style.content}>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/account" render={AccountRouter} />
			</Switch>
		</div>
	</div>
);

export default props => (
	<div style={{ width: '100%', height: '100%' }}>
		<Switch>
			<LoggedOutRoute path="/" exact component={FrontPage} />
			<LoggedOutRoute path="/createAccount" component={CreateAccount} />
			<LoggedInRoute path="/" render={LoggedInRouter} />
		</Switch>
	</div>
);