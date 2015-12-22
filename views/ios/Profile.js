'use strict';

var React = require('react-native'),
	Post  = require('./Post'),

	Dimensions = require('Dimensions'),
	
	ProfileModel = require('./../../models/Profile'),
	ProfileTheme = require('./../../resources/ios/ProfileTheme'),
	Theme = require('./../../resources/ios/theme'),

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
	TabBarIOS,
	Animated
} = React;



class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasErrors: false
		}
	}

	componentWillMount () {
		var self = this;
		
		self.setState({isLoading: true, hasErrors: false}, () => {
			ProfileModel.downloadPosts('uby0zg7oz7').then(() => {
				var posts = ProfileModel.getPosts();

				console.log(posts);

				self.setState({isLoading: false, hasErrors: false, data: posts});
			})
			.catch((error) => {
				self.setState({isLoading: false, hasErrors: true, error: error});
			});
		});
	}

	_openPost (postId) {
		console.log("Open new post -- " + postId);

		this.props.navigator.push({
			title: 'Post',
			component: Post,
			passProps: {
		    	'postId': postId
		  	}
		});
	}

	render () {
		var windowSize = Dimensions.get('window');

		if (this.state.isLoading) {
			return (
				<View style={ProfileTheme.loadingContainer}>
					<ActivityIndicatorIOS style={ProfileTheme.loading} size='large' />
				</View>
			);
		}

		else if (this.state.hasErrors) {
			return (
				<View style={ProfileTheme.errorWrapper}>
					<Image style={ProfileTheme.errorIcon} source={{uri: 'data:image/png;base64,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'}}/>
					<Text style={ProfileTheme.errorMessage}>{this.state.error}</Text>
				</View>
			);
		}

		else {
				return (
					<ScrollView style={ProfileTheme.scrollContainer}>
						<View style={ProfileTheme.container}>
							<View style={ProfileTheme.header}>
								<Image style={ProfileTheme.profilePic} source={{uri: Server.apiUrl + 'images/default.jpg'}} />

								<Text style={ProfileTheme.user}>
									Tyler
								</Text>
							</View>

							<View style={ProfileTheme.badges}>
								<Image style={ProfileTheme.badge} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACh0lEQVRYR72XW27aUBCGZ7BAqnxQyQoaVhBHinmta/peuoKEFTQ7qLuCNisoXUHpe3HcV7tSYAVhB0WyUSUQnujEl9jGl4ON4BHPmfk855+LERr8SFN6a6l9z2bOZV03WPdgFBwIz5hpn9f1UxvA0wdzQLggoj9d09FOCuDqAwMRPgdB6QebOTcnA/ivKec7qfMYByS6Y6ZzezIAT1e/AeKnKOBJr4ALz2u1HxGxVwXgvr/Sur//WlWZqRQhv29AULoze8SdIrXus07ZzE75ie2IJsx0xmUQpQDeUJ0A4DUQjZnpTNLie3GLAB/lmT2N/vH0q1vA1tdAo+UQhQDr4WBEAD+5D3m3OUNrvnKHgykCfNh/o3QlePpgCQhvIrssYPJ8LsBzk2l1HgDhucFEKXZ11ULEt1kAIloxf9vnkHHWEkbJ59mzuQCpFAoAhP2AC64HgErunReUawFAOoVVGahSeqAFWDLT7ldmwNNUBSR8SBoS+u94SRWJUAiAM4R+SjWQX2qByDxdvQHE76IB9+zCaioHSPX5lJLGsr+drqXOv7oARPCla9pGPYCwpgFQi6rjUBAhgMZpLqESAihqt4e+bZ69kAj5QXeorhDw9TGCJn1kZwZ/lt8HohlwRAIC+MUHWmUf4AZ7S8cRQKTdpv/Kmi+FALhRdvFoxFCyNZWP43DxbBYcFsy08+dDkQaigOFUtPj2WwuCYCH7G41PyaLzlRtR7esgupP9rVEWvLAK8mj5kCIJjfyF5OUEVzvuyGCWMxfJmlAGko6Ca2mPCDD1NYRASz4rqt5YuApE6I9hk8oA3wOBagpOlAZhkVxgY4C8RUTU58F2O7qMNBIDNC45UYpMaT4B4wpBMB7BDxwAAAAASUVORK5CYII='}} />
								<Image style={ProfileTheme.badge} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEJklEQVRYR8WXTXIaSRCFv2yHBTvhEwidQOgERicwcwJLS8NixGYMK0srsDfgBXhpdIJhTmB0AqMTGJ9gWjs1E+6cyCoauvlpYYciXCuiuzrr1cuXLxPhNy/5zefzcwAGHyo0/prmgt5nTyrAfgAsqMQ9oIoyotG62Api2BmBvAYmaNB8FCzswcDwfQ3VzwiCMkF4heoFjfYoA2LQOUfkM8o/iAOqiFxQfzvOYyyfAX/zr8AdUaFKsxky7E5Rjmi0XmQCD7shMKPeqtDrlShEE+AEDU7zmNgNwAf5iqowL1YoPPQdA7bcTVOBE6DGjAQlVE+YF5ocPEwRUaLCqQO/Ze0GMHx/CdpD9AwNSqB/o4QQnC1YGSPiBalaAWoOlMQG8tB9597JF5Am9bf9nwMw6MwQCR2l/veRC1BvCcOubs1r9p2l49ilzADZ770Z+NQpo/IN1Wt4Nl7c+B7VPo32VX4Zdq4QuXSHGiP8qCHyDtFj3rRn699uT8GnTtVR5+mvoFplXjjflccNQKafg2iEyASJp8tYb9peQ4/6QDr/D8Xp3gevRzcgxYdKng42GUjqGb2h3j5/EqsedMe7/GMFwOfd3K7GUx5uN3Al/dBfuOQY0WaiB2HQuQJ5hWClZCV1/ajQfpUWO8sE6dfENOJLSvU7yJhA+xmlJmL0H8ycEQV6vU3NboexGJviqQJl98yEnBaf32MeY9VxJAw7Xpn1tn20uczlgh8lFGPqpd8gf2x4vPUMMytP4y3CFfGzcKcNL871AFQOabROc5k1r7cG4291twHYxznx7xHqrVJuPGduzLwGLC9R4UVuuQ26fYQ//QX5SKNlZrNaj71P702MDmkK6Uay3mLXr5CkY4uhLDRQzaU9iZf4jAanvgyNDuTfjTSYCNOHeYfruU633t12vVuPsTwPaLTLCYDFMLEYNHxvP8wQoEwRLK/lrT1+NTtYtYTLsk6C2DObIZaDiz9rZUTJoGHt1tb8+czdMrHTWGpOA4lPeNV7TSAfXVUkOjCNBDomsXHHzn++LIm/IHx3XTYzknlh2LTzjXnhzHk4wUtiLSN2a0ruVgmA1dTDclpKBO3ZsqqZEcgMlQnR8zsOIjv8GNHKygnTPCfiWD7TWwcKDZEghLjmSk2wThei6nuFyAhV84pzV6IEYzQugZTcYUv/cJszw0m2GXkxWuOwwKaBPlHheik47+njVUC9XaRgYVB6S1SsZfdHZr1WsvduojYHbLQX6dg1FS/7uU3ATlAjNLjJuJrtSSoh/dup3A2zrz0jJly9ISpebvOZ/KnYSsh820Zxv3w/sEEDWZtutOwGl3QfsBHd95eNQSTJ8n5/TJxAg5rTQCaf607FPejUaUDi8c6mlfpsPwC7HNFNy6arONzLATfw7vPPaMtHT/no1xh4QgT/A7TuLZMft3KYAAAAAElFTkSuQmCC'}} />
								<Image style={ProfileTheme.badge} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAErklEQVRYR51X7XEaSxDsOQz3UzgCoQiEAng6iEAoAkkRCEVgHIFQBMIRGCIA9AIwRCCcAf7J8dh5NbMft8ABklXlKuu0t9vb090zRzjxw2M0kFQfwUkThFZYzjwDsHC/N0DULP6GCcjMYNYv1A5rSk+iQ+fzGHVQ7RlE927NFOBJtL4JdoeSgpF/7ocEaKa/MA/A+RO1sSw76ziASrUDk/RAOAdjAUIfZvXj0GYKOknvwOiC0ADjNxLTw2Y9/DQABT+t9cB4BFEdzHMQZiCe0PV6UHYbfqveg6kFRhNEl2BeCmjK8u+HmC5lwNE/DnU15ora64jiU8oB+K3WAdNPV4YZOG+XsbAHIBwOXICkfqoBBudXpwTlYalwqfYLAEV7vJeB2AcwTSdgboK5JbfmcVXonAD0Cwn3lV6hWX5E6VqrxDqAeKJlMtQF+AqcNwV0vAe1Vu2Yvy0AtobJK4hv6TofhhuJFkDfIgvOQbRUoHowzcBc17oXi75TlvfCHmFv8xBraBvApLaUzShbBb879GOA/oiiDwlw6yBxDvgMzO1YO2zZvaRW/jUYtnjRiYZ5iAQDus5HTg/vAH6D89YhK+1K0r6XziyI/ELeU1Ea3IGoEzMcGOBpbQDQXUSzDRcJor9xwb9fWjCVsQYR1JZFUsK8ULbuavWKOqeackK/asFQH0RnAKZxSU4bMFKBUC6JyPwHCXclkJCkqi2/ZwyAAQ7CCT4mPNH1qm+DqdoHJ5eifsrWTzEYZZDpHGTm/nb8lnbBeI4p13ADfaNspWfvAYDhodrPU5hs2vTPf8qOAkDyqAfHz/1a/UNB7+4eKuiEOkcA6A5KeWHJiAFvJcn4yuY+ABMAm8pAewYVNisYsM/UBa5J7TMwqYnopK0GG7I8E2+7TfUGWPsWXPfJqMkH3+2qDWUwgOUZtfIry6ALOWBBrVxFuZ0DFiFgTBdEr0G50lQq5hab5CcII8py36K3NMnT2hCMrFhLdV0gswPzA5JEtRSLegeACikDWF6koFyqTULKHbGkrXEiPUAOnUt2QFs6ycEM0BJkRl6kJQy4yBXbuBzXvXQqSt8B/uFvr88qNRu9m3weyuGFalYSQFou15yknGex0/YBBDUXdtQNyhwRmpTeVhvXobW2/u5ykXv2ADihcGwlfeYFtUO/PpdaRQNKYCtyQ2xhr34vnpJ2LDrAjc9wS6GrrQulaFDt6EYyN5hcRrVFsF4ENvSUEgHvA9gpg7yszcR1Mp2EQ67zyN6EboLarZXnmiXh3XL6S0vg6mUbE/EtDD1Ta3XhbuHcwCOY/N53RzuMajO78epX0JN0oU7S0axIyNi7x2bCwnpb/UDCBOeADJyuw9lvhHDzLdFFlvzQTOjRuRvb1BP7uJo6PWigFN8JbkQzphvGOMkDsbN4n1cymn3uu8D5VwJJhgtJSAavZDAt3WgbeGoHUtbJannsnYMfJnGdiqESpZPtDmtjyEQdZUO81+7/PwQgWFGnYwHBD7vfCQ7k62cOP+iCQ4gjJhhEPcpWLzao0i4My9RMH735wSA6RlfQhR2rMv1etNdoANvWPLXPXwMI9baBZef+ZNPzw8lHD/br/gcohSBOXY98SgAAAABJRU5ErkJggg=='}} />
							</View>

							<View style={ProfileTheme.infoWrapper}>
								<Text style={ProfileTheme.info}>Made the following posts: </Text>
							</View>

							<View style={ProfileTheme.posts}>
								{this.state.data.map((post) => {
									return (
										<View style={ProfileTheme.post}>
											<Image style={ProfileTheme.postBody} source={{uri: post.content}} />

											<Text style={ProfileTheme.postTitle}>
												{post.title}
											</Text>
										</View>
									);
								})}
							</View>
						</View>
					</ScrollView>
				);
		}

	}
}


module.exports = Profile;
