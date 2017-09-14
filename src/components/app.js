import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import AppNavigator from '../navigators/app.navigator';
import TabNavigator from '../navigators/tab.navigator';

class App extends Component {
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          session.setSession(token)
            .then(() => this.setState({ mode: 1 }))
            .catch(() => { });
        } else {
          console.log('setting to 2')
          this.props.setMode(2)
        };
      }).catch(() => { });
  }

  render() {
    if (this.props.mode === 0) return (
      <ImageBackground
        source={require('../../assets/images/background0.png')}
        style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
      </ImageBackground>
    );
    else if (this.props.mode === 1) return <TabNavigator />
    else if (this.props.mode === 2) return <AppNavigator />
    else if (this.props.mode === 3) return <FTUENavigator />
    else return null;
  }
}

const mapStateToProps = state => ({
  mode: state.session.mode
});

const mapDispatchToProps = dispatch => ({
  setMode: mode => dispatch({ type: 'SET_MODE', mode: mode })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);;