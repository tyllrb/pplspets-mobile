'use strict';

var React    = require('react-native'),
	Login    = require('./views/ios/Login'),
    PostList = require('./views/ios/PostList'),
    Post 	 = require('./views/ios/Post'),
    AccountModel = require('./models/Account'),
    Theme 	 = require('./resources/ios/theme'),
    NewPost  = require('./views/ios/NewPost');


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

	constructor(props) {
		super(props);
		this.state = {user: null, isLoggedIn: false};

		/* Check to see if we need to login */
		AccountModel.isLoggedIn().then((user) => {
			console.log("Logged in");
			this.setState({user: user, isLoggedIn: true});
		})
		.catch((error) => {
			console.log("Not logged in");
			this.setState({user: null, isLoggedIn: false});
		});
	}

	getInitialState() {
		return {user: null, isLoggedIn: false};
	}

	render () {
		var self = this;

		var userProps = (this.state.isLoggedIn) ? { 'user': this.state.user } : { 'user': null };

		return (
			<NavigatorIOS
				ref="nav"
				style={nav.container}
				barTintColor="#FF0094"
				tintColor="#FFFFFF"
				titleTextColor="#FFFFFF"
				initialRoute={{
					rightButtonTitle: 'New+',
					onRightButtonPress: () => {
						this.refs.nav.navigator.push({
							title: 'Create',
							component: NewPost,
							rightButtonTitle: 'Cancel',
							onRightButtonPress: () => {
								this.refs.nav.navigator.pop();
							},
							passProps: userProps
						});
					},
					title: 'petppl',
					component: Login,
					passProps: userProps
				}}
			/>
		);
	}
}


AppRegistry.registerComponent('test', function () {
	return App;
});