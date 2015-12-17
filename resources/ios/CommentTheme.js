'use strict';

var React = require('react-native');

var {
	StyleSheet
} = React;

var CommentTheme = StyleSheet.create({
	container: {
		backgroundColor: '#eeeeee',
		flex: 1
	},

	postComment: {
		padding: 10,
		flex: 1
	},

	input: {
		borderColor: '#cccccc',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		fontSize: 15,
		backgroundColor: '#ffffff',
		height: 30
	},

	comment: {
		padding: 10,
		borderTopWidth: 1,
		borderColor: '#dddddd'
	},

	header: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
		flexWrap: 'wrap'
	},

	user: {
		color: '#666666',
		fontSize: 13,
		paddingTop: 5
	},

	profilePic: {
		resizeMode: 'contain',
		height: 30,
		width: 30,
		marginRight: 10
	},

	body: {
	},

	text: {
		fontSize: 15
	},

	date: {
		marginTop: 5,
		fontSize: 13,
		color: '#999999'
	}
});

module.exports = CommentTheme;