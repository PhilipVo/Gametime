import React, { Component } from 'react';
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	already: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 10,
		fontWeight: 'bold'
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	create: {
		backgroundColor: '#31da5b',
		borderRadius: 3,
		height: 35,
		justifyContent: 'center',
		marginTop: 15,
		padding: 5,
	},
	facebook: {
		backgroundColor: '#3b5998',
		borderRadius: 3,
		height: 35,
		justifyContent: 'center',
		padding: 5,
	},
	gametime: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 40,
		textAlign: 'center'
	},
	input: {
		backgroundColor: 'rgba(150,150,150,0.6)',
		borderColor: '#31da5b',
		borderRadius: 3,
		borderWidth: 0.5,
		color: 'white',
		fontSize: 16,
		height: 35,
		marginBottom: 10,
		padding: 5,
		textAlign: 'center'
	},
	never: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	or: {
		backgroundColor: 'transparent',
		color: 'white',
		fontWeight: 'bold'
	},
	orDivider: {
		backgroundColor: 'white',
		height: 0.5,
		width: 100
	},
	orView: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 15
	},
	sign: {
		backgroundColor: 'transparent',
		color: '#31da5b',
		fontSize: 10,
		fontWeight: 'bold'
	},
});

class Login extends Component {
	componentDidMount() {
		console.log(this.props)
		console.log('mode', this.state);
	}

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<KeyboardAvoidingView
						behavior={'padding'}
						style={{ flex: 1 }}>

						{/* Gametime */}
						<View style={{ flex: 1, justifyContent: 'flex-end' }}>
							<Text style={styles.gametime}>Gametime</Text>
							<Text style={styles.never}>Never miss your favorite team play</Text>
						</View>

						{/* Icon */}
						<View style={{ alignItems: 'center', flex: 2, justifyContent: 'center' }}>
							<Image
								source={require('../../assets/images/gametime.png')}
								style={{ height: 90, width: 90 }} />
						</View>

						{/* Form */}
						<View style={{ flex: 2 }}>
							<View style={{ paddingHorizontal: 40 }}>

								{/* Email */}
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									keyboardType='email-address'
									placeholder='email'
									placeholderTextColor='rgb(200,200,200)'
									style={styles.input} />

								{/* Password */}
								<TextInput
									autoCapitalize='none'
									autoCorrect={false}
									placeholder='password'
									placeholderTextColor='rgb(200,200,200)'
									secureTextEntry={true}
									style={styles.input} />

								{/* Create Account */}
								<TouchableHighlight
									onPress={() => this.props.setMode(3)}
									style={styles.create}
									underlayColor='#31da5b'>
									<Text style={styles.buttonText}>Create Account</Text>
								</TouchableHighlight>

								<View style={{ alignItems: 'center', marginTop: 10 }}>
									<View style={{ flexDirection: 'row' }}>
										<Text style={styles.already}>Aleady have an account? </Text>
										<Text style={styles.sign}>Sign In</Text>
										<Text style={styles.already}> | </Text>
										<Text style={styles.sign}>Forgot Password?</Text>
									</View>
								</View>

								{/* Or */}
								<View style={styles.orView}>
									<View style={styles.orDivider} />
									<Text style={styles.or}>   or   </Text>
									<View style={styles.orDivider} />
								</View>

								<TouchableHighlight
									onPress={() => { }}
									style={styles.facebook}
									underlayColor='#3b5998'>
									<Text style={styles.buttonText}>Continue with Facebook</Text>
								</TouchableHighlight>
							</View>
						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = state => ({
	mode: state.session
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);