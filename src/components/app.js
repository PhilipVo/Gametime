import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AppNavigator from '../navigators/app.navigator';
import Login from './login';

class App extends Component {
  componentDidMount() {
    console.log(this.props)
    console.log('mode', this.state);
  }

  render() {
    let Navigator;

    switch (this.props.mode) {
      case 0:
        return (
          <View style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <ImageBackground
              source={require('../../assets/images/background1.png')}
              style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: 40,
                  textAlign: 'center'
                }}>
                  Gametime
                </Text>
                <Text style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center'
                }}>
                  Never miss your favorite team play
                </Text>
              </View>
              <View style={{ flex: 3 }} />
            </ImageBackground>
          </View>
        );
      case 1:
        return (<AppNavigator />);
    }
  }
}

const mapStateToProps = state => ({
  mode: state.session.mode
});

const mapDispatchToProps = dispatch => ({
  setMode: mode => dispatch({ type: 'SET_MODE', mode: mode })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);;