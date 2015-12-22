	'use strict';

var React = require('react-native');

var {
	StyleSheet
} = React;


var ProfileTheme = StyleSheet.create({
	scrollContainer: {
		flex: 1
	},

	container: {
		padding: 15,
		flex: 1,
		marginTop: 60
	},

	header: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},

	info: {
		fontSize: 15,
		color: '#999999',
		position: 'relative',
		top: 3
	},

	infoWrapper: {
		marginTop: 10
	},

	user: {
		fontSize: 22,
		color: '#000000',
		marginRight: 7,
		fontWeight: 'bold'
	},

	profilePic: {
		resizeMode: 'contain',
		height: 30,
		width: 30,
		marginRight: 10
	},

	badges: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 5,
		marginLeft: 40
	},

	badge: {
		height: 20,
		width: 20,
		resizeMode: 'contain',
		marginRight: 10
	},

	posts: {
		flex: 1,
		marginBottom: 10,
		marginTop: 30
	},

	post: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 20
	},

	postTitle: {
		fontSize: 18,
		color: '#333333',
		width: 220
	},

	postBody: {
		resizeMode: 'contain',
		height: 40,
		width: 40,
		marginRight: 10
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

module.exports = ProfileTheme;