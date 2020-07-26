import React, {Component} from 'react';
import Auth0 from 'react-native-auth0';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import AUTH_CONFIG from '../../../constants/auth0Config';
import { AuthProvider } from './AuthContext';

const auth = new Auth0({
  domain: AUTH_CONFIG.domain,
  clientId: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
});

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: 'visitor',
    },
    accessToken: '',
  };

  initiateLogin = () => {
    auth.webAuth.authorize({ scope: 'openid profile email' })
      .then(this.handleAuthentication);
  };

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: 'visitor',
      },
      accessToken: '',
    });
  };

  handleAuthentication = (authResult) => {
    this.setSession(authResult);
  };

  setSession(data) {
    const user = {
      id: data.idToken,
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user,
    }, () => {
      Actions.home({});
    });
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout,
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};

export default Auth;
