'use strict';

var React    = require('react-native'),
    PostList = require('./views/ios/PostList'),
    Post 	 = require('./views/ios/Post'),
    Theme 	 = require('./resources/ios/theme');


var {
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	Component,
	AppRegistry
} = React;




var nav = StyleSheet.create({
	container: {
		flex: 1
	}
});


/* This is the navigation container for iPhone, also acts as header */
class App extends Component {
	render () {
		return (
			<NavigatorIOS
				style={nav.container}
				barTintColor="#FF0094"
				tintColor="#444444"
				titleTextColor="#FFFFFF"
				initialRoute={{
					title: 'petppl',
					component: PostList
				}}
			/>
		);
	}
}


AppRegistry.registerComponent('test', function () {
	return App;
});