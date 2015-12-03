'use strict';

var React = require('react-native');

var {
	StyleSheet
} = React;


var PostTheme = StyleSheet.create({
	scrollContainer: {
		flex: 1
	},

	container: {
		padding: 20,
		marginTop: 60
	},

	header: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
		flexWrap: 'wrap'
	},

	info: {
		fontSize: 15,
		color: '#999999',
		position: 'relative',
		top: 3
	},

	user: {
		fontSize: 18,
		color: '#000000',
		marginRight: 7
	},

	profilePic: {
		resizeMode: 'contain',
		height: 30,
		width: 30,
		marginRight: 10
	},

	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#333333'
	}, 

	content: {
		marginBottom: 20,
		flex: 1
	},

	bodyWrapper: {
		height: 300
	},

	body: {
		resizeMode: 'contain',
		flex: 1
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

	errorIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: 40
	},

	errorMessage: {
		color: '#999999',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 22,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		textAlign: 'center'
	}
});

module.exports = PostTheme;