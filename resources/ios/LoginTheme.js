	'use strict';

var React = require('react-native');

var {
	StyleSheet
} = React;


var LoginTheme = StyleSheet.create({

	container: {
		padding: 15,
		flex: 1,
		marginTop: 60
	},

	field: {
		marginBottom: 10
	},

	landingImage: {
		width: 110,
		height: 110,
		marginBottom: 30,
		marginTop: 30
	},

	landingImageWrapper: {
		alignItems: 'center'
	},

	input: {
		borderRadius: 5,
		padding: 10,
		fontWeight: '500',
		fontSize: 18,
		backgroundColor: '#eeeeee',
		height: 50,
		color: '#333333'
	},

	loadingContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},

	loading: {
		alignItems: 'center',
		justifyContent: 'center'
	},

	errorWrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},

	errorMessage: {
		color: '#FF0000',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 16,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		textAlign: 'center',
		fontWeight: '600'
	}
});

module.exports = LoginTheme;