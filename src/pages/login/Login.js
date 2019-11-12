import React, { Component } from 'react';
import './Login.scss';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';
import { login as initiateLogin } from './_store/actions';
import { connect } from 'react-redux';
import qs from 'query-string';
import FloatingLabelInputText from '../../components/floating-label-input-text/FloatingLabelInputText';
import { push } from 'react-router-redux';
import { setAuthentication } from '../../services/authentication/actions';

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
		this.props.authenticate();
		this.props.navigate('/preferences');
	};

	render() {
		const { username, password } = this.state;
		const disableLoginBtn = !(username && password);
		return (
			<div className="container-fluid mx-0 p-0">
				<header className="row mx-0 header-setup align-items-center">
					<div className="col text-center p-0">
						<span className="logo-text"> Login </span>
					</div>
				</header>
				<div className="pb-3">
					<div className="row mx-0 mt-5">
						<div className="col-md-4  offset-md-4">
							<FloatingLabelInputText
								inputLabel="User Name"
								inputId="user name"
								inputVal={username}
								errorNote="Please enter a valid user name"
								onInputChange={this.handleUserName}
							/>
						</div>
					</div>
					<div className="row mx-0 mt-5">
						<div className="col-md-4 offset-md-4">
							<FloatingLabelInputText
								inputLabel="Password"
								inputId="password"
								inputVal={password}
								onInputChange={this.handlePassword}
							/>
						</div>
					</div>
				</div>
				<footer className="row mx-0 pt-3 pb-3">
					<div className="col p-0 text-center">
						<button className={(disableLoginBtn ? "btn-disabled " : " ") + "btn-orange-rounded"} onClick={this.login} disabled={disableLoginBtn}>
							{'Login'}
						</button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		navigate: (path) => dispatch(push(path)),
		authenticate: () => {
			dispatch(setAuthentication(true))
		}
	}
}

export default connect(null, mapDispatchToProps)(Login);
