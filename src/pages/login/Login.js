import React, { Component } from 'react';
import './Login.scss';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';
import { login as initiateLogin } from './_store/actions';
import { connect } from 'react-redux';
import qs from 'query-string';
import FloatingLabelInputText from '../../components/floating-label-input-text/FloatingLabelInputText';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			loginInProgress: false
		};
	}
	handleUserName = value => {
		this.setState({
			username: value
		});
	};
	handlePassword = value => {
		this.setState({
			password: value
		});
	};
	login = e => {
		this.props.onSubmit(this.state.username, this.state.password)
	};

	render() {
		const { username, password } = this.state;
		return (
			<div className="container-fluid mx-0 p-0 preferences-container">
				<header className="row mx-0 header-setup align-items-center">
					<div className="col text-center p-0">
						<span className="logo-text"> Setup Profile </span>
					</div>
				</header>
				<div className="pb-3">
					<div className="row mx-0 mt-5">
						<div className="col-md-3 offset-md-3">
							<FloatingLabelInputText
								inputLabel="First Name"
								inputId="firstName"
								inputVal={username}
								errorNote="Please enter a valid user name"
								onInputChange={this.handleUserName}
							/>
						</div>
						<div className="col-md-3">
							<FloatingLabelInputText
								inputLabel="Last Name"
								inputId="lastName"
								inputVal={password}
								onInputChange={this.handlePassword}
							/>
						</div>
					</div>
				</div>
				<footer className="row mx-0 pt-3 pb-3">
					<div className="col-md-6 offset-md-3">
						<div className="row mx-0 p-0">
							<div className="col p-0 text-right">
								<button onClick={this.login}>
									{'Login'}
								</button>
							</div>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginInProgress: false
		};
	}

	doLogin = async (username, password) => {
		this.setState({
			loginInProgress: true
		});
		try {
			const search = qs.parse(this.props.location.search);
			const redirect = search ? search.redirect : '/';
			this.props.initiateLogin(username, password, redirect);
		} catch (e) {
			this.setState({
				loginInProgress: false
			});
		}
	};

	render() {
		return (
			<div className="position-relative">
				{this.state.loginInProgress && (
					<LoadingIndicator className="loading-container" showBackground={true} />
				)}
				<Login onSubmit={this.doLogin} loginInProgress={this.state.loginInProgress} />
			</div>
		);
	}
}

export default connect(null, { initiateLogin })(LoginContainer);
