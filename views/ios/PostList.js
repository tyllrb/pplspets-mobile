'use strict';

var React = require('react-native'),
	Post  = require('./Post'),
	Profile = require('./Profile'),

	AccountModel = require('./../../models/Account'),

	Dimensions = require('Dimensions'),
	
	PostModel = require('./../../models/Post'),
	PostTheme = require('./../../resources/ios/PostTheme'),
	Theme = require('./../../resources/ios/theme'),

	CommentModel = require('./../../models/Comment'),
	CommentTheme = require('./../../resources/ios/CommentTheme'),

	Server = require('./../../server'),

	$ = require('./../../helpers.js');


var {
	StyleSheet,
	Text,
	TextInput,
	View,
	ScrollView,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component,
	Animated
} = React;


var postList = StyleSheet.create({
	container: {
		padding: 30,
		marginTop: 50,
		alignItems: 'center'
	},

	message: {
		fontSize: 24,
		color: '#333333'
	}
});

class PostList extends Component {
	constructor(props) {
		super(props);

		this.postListData = [];
		this.state = {
			hasErrors: false
		}
	}

	componentWillMount () {
		var self = this;
		
		self.setState({isLoading: true, hasErrors: false}, function () {
			PostModel.downloadPosts(2).then(function () {
				var posts = PostModel.getPosts();

				$.forEach(posts, _processComment, function () {

					self.setState({
						isLoading: false,
						hasErrors: false,
						data: self.postListData
					})
				});
			})
			.catch(function (error) {
				self.setState({
					hasErrors: true,
					errorMessage: error.message,
					isLoading: false
				});
			});
		});
	
		function _processComment(post, next) {
			var newPost = {};
			newPost.data = post;

			CommentModel.downloadThread(post.postId, 2).then(function () {
				newPost.comments = CommentModel.getComments(post.postId);
			})
			.catch(function () {
				newPost.comments = null;
			})
			.finally(function () {
				self.postListData.push(newPost);
				next();
			});
		}
	}

	_openPost (postId) {
		this.props.navigator.push({
			title: 'Post',
			component: Post,
			passProps: {
		    	'postId': postId
		  	}
		});
	}

	_openProfile (profileId) {
		this.props.navigator.push({
			title: 'Profile',
			component: Profile,
			passProps: {
				'profileId': 'any'
			}
		});
	}

	_awwPost (postId) {
		console.log("Awwing post " + postId);
		
		PostModel.awwPost(postId).then(() => {

		});
	}

	loadOlderPosts () {

	}

	render () {
		var windowSize = Dimensions.get('window');

		if (this.state.isLoading) {
			return (
				<View style={PostTheme.loadingContainer}>
					<ActivityIndicatorIOS style={PostTheme.loading} size='large' />
				</View>
			);
		}

		else if (this.state.hasErrors) {
			return (
				<View style={PostTheme.errorWrapper}>
					<Image style={PostTheme.errorIcon} source={{uri: 'data:image/png;base64,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'}}/>
					<Text style={PostTheme.errorMessage}>{this.state.error}</Text>
				</View>
			);
		}

		else {
				return (
					<ScrollView style={PostTheme.scrollContainer}>
						<View style={PostTheme.mainContainer}>
							{this.state.data.map((post) => {
								return (
									<View style={PostTheme.container}>
										<View style={PostTheme.header}>
											<TouchableHighlight underlayColor="#FF0094" onPress={() => {
												this._openProfile();
											}}>
												<Image style={PostTheme.profilePic} source={{uri: Server.apiUrl + 'images/default.jpg'}} />
											</TouchableHighlight>

											<Text style={PostTheme.user}>
												{post.data.user.username}
											</Text>

											<Text style={PostTheme.info}>
												posted
											</Text>
										</View>

										<View style={PostTheme.content}>
											<Text style={PostTheme.title}>{post.data.title}</Text>

											<TouchableHighlight underlayColor="#FF0094" onPress={() => {
												this._openPost(post.data.postId);
											}}>
												<View style={{height: Math.round(post.data.ratio*(windowSize.width - 20)), flex: 1, marginBottom: 10}}>
													<Image style={PostTheme.body} source={{uri: post.data.content}} />
												</View>
											</TouchableHighlight>

											<TouchableHighlight onPress={() => {
												this._awwPost(post.data.postId);
											}}>
												<View style={Theme.button}>
													<Image style={Theme.buttonIcon} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB1ElEQVRYR81XYVnDQAx9TwE4ABQAChgOmAJAAZsChgKYApgCcABVAChgOAAF4XtHr+tK16bttpJf/b5ekpdcknshehZW+Tezk/ifZNIEq1f3DwAz2wdwDeAMwG7B6QOAGcmXMjBmNgBwDuCi8P8LwBOAG5Lz/L8lAGYmxXtHpCOS0/w5M7sCcOfQvSSpQIJkAMxsBODWYSAemZKUDsxMjgXAK2OSAWwAkKbu2audOzdMvx9b6J7qKiOADwC6+6aiu5UUa8VjZ07ygGamYmsTgcdJ3ZmhAKggVLl9yEwAXgEc9eEdQCIA1pPz3zb8DwA0mfZ6ysKnMqCxms38LQMJNTBJZ/+WfQd3YwFQB6gT+pDjOAn7uIaE5KDrW9Ala4u3QFa2XIwh+jAHYggpEXkDsNMlLIfutyZvJCZtCYnDz8oj5YQkl4lNtqUomexnUkpKN/RCiksWueKiBooJWzOIUudLRVh2Y2uakhn/K/NRuRek7am0iUA27Q5Vu9hzxoBbAUhBaFzL0KGz/N+1G5BUW1dKbQby2k76ndH1Oue1NbCiLjTBdCXFbChqpbx0a1oFplEGCtnQUhJ7ehIXDU/UtXPAa8TMwj5AMu4HXtXqQdTYSgeFH2oqqvQ3MFsgAAAAAElFTkSuQmCC'}}/>
													<Text style={Theme.buttonText}>{post.data.awws} Awww!</Text>
												</View>
											</TouchableHighlight>
										</View>

										<View style={CommentTheme.container}>
											<View style={CommentTheme.postComment}>
												<TextInput style={CommentTheme.input} placeholder="Say something..." />
											</View>

											{post.comments.map((comment) => {
												return (
													<View style={CommentTheme.comment}>
														<View style={CommentTheme.header}>
															<Image style={CommentTheme.profilePic} source={{uri: Server.apiUrl + comment.user.pic}} />

															<Text style={CommentTheme.user}>{comment.user.username}</Text>
														</View>

														<View style={CommentTheme.body}>
															<Text style={CommentTheme.text}>{comment.body}</Text>

															<Text style={CommentTheme.date}>{comment.date}</Text>
														</View>
													</View>
												);
											})}
										</View>
									</View>
								);
							})}
						</View>

						<View style={PostTheme.loadMore}>
							<View style={Theme.buttonFullWidth} onClick={this.loadOlderPosts()}>
								<Text style={Theme.buttonText}>Load older</Text>
							</View>
						</View>
					</ScrollView>
				);
		}

	}
}


module.exports = PostList;

/*
				<View style={postList.container}>
					<TouchableHighlight onPress={this._openPost.bind(this)} underlayColor="#FF0094">
						<Text style={postList.message}>
							DERP
						</Text>
					</TouchableHighlight>
				</View>

*/