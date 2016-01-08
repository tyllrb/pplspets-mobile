'use strict';

var React = require('react-native');

var {
	StyleSheet
} = React;


var NewPostTheme = StyleSheet.create({

	container: {
		padding: 15,
		flex: 1
	},

	info: {
		color: '#999999',
		fontSize: 14
	},

	field: {
		marginBottom: 10
	},

	landingImageWrapper: {
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 30
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

module.exports = NewPostTheme;