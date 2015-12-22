'use strict';

var React = require('react-native');

var {
	StyleSheet
} = React;


var Theme = StyleSheet.create({
	button: {
		backgroundColor: '#FF0094',
		borderRadius: 10,
		padding: 10,
		width: 220,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonFullWidth: {
		backgroundColor: '#FF0094',
		borderRadius: 10,
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonFullWidthGray: {
		backgroundColor: '#cccccc',
		borderRadius: 10,
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonText: {
		color: '#FFFFFF',
		fontSize: 18
	},

	buttonTextGray: {
		color: '#333333',
		fontSize: 18
	},

	buttonIcon: {
		width: 20,
		height: 20,
		marginRight: 5
	}
});

module.exports = Theme;
