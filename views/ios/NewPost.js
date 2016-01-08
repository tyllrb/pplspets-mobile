'use strict';
//https://github.com/marcshilling/react-native-image-picker/blob/master/README.md

var React = require('react-native'),
	Dimensions = require('Dimensions'),
	
	Theme = require('./../../resources/ios/theme'),
	Login = require('./Login'),
	
	NewPostTheme = require('./../../resources/ios/NewPostTheme'),

	AccountModel = require('./../../models/Account'),
	
	UIImagePickerManager = require('NativeModules').UIImagePickerManager,

	Server = require('./../../server'),
	$ = require('./../../helpers.js');


var {
	StyleSheet,
	ScrollView,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component,
} = React;



class NewPost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasErrors: false,
			isLoading: false,
			newPostTitle: "",
			selectedImage: null
		}
	}

	componentWillMount () {
	}

	componentDidMount () {
	}

	submitPost () {
		console.log("Title= " + this.state.newPostTitle);
		console.log("ImageRatio= " + this.state.imageRatio);
		console.log("ImageB64= " + this.state.selectedImage.uri.length);

		var data = {
			title: this.state.newPostTitle,
			ratio: this.state.imageRatio,
			image: this.state.selectedImage.uri
		};

		fetch('http://192.168.1.35:1999/api/posts/new', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	addPhoto () {
		var options = {
			title: "Select image/gif",
			cancelButtonTitle: "Nevermind -_-",
			takePhotoButtonTitle: "Take a new photo...",
			chooseFromLibraryButtonTitle: "Choose a photo...",
			cameraType: "back",
			mediaType: "photo",
			videoQuality: "high",
			maxWidth: 1000,
			maxHeight: 1000,
			allowsEditing: true,
			noData: false,
			storageOptions: {
				skipBackup: true,
				path: "images"
			}
		};

		UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
			if (didCancel) return;

			if (response.error) {
				console.log(response.error);
			}

			else if (response.customButton) {
				console.log("Selected custom button -- " + response.customButton);
			}

			else {
				const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
				//const source = {uri: response.uri.replace('file://', ''), isStatic: true};

				this.setState({
					selectedImage: source,
					imageRatio: Math.round(response.height / response.width)
				});
			}
		});
	}

	render () {
		var windowSize = Dimensions.get('window');
		var loading, landingImage, instructionText, formButton;


		if (this.state.selectedImage) {
			/* If the user has selected an image display that instead of the default landing page image */
			landingImage = <Image style={{width: (windowSize.width - 40), height: this.state.imageRatio*(windowSize.width - 40)}} source={this.state.selectedImage} />;

			/* User has entered a title and an image, now we can display the submit button */
			if (this.state.newPostTitle.length) {
				instructionText = "Sweet! Everything looks good, hit that submit button!";
				formButton = <TouchableHighlight onPress={() => this.submitPost()}><View style={Theme.buttonFullWidth}><Text style={Theme.buttonText}>Submit new post</Text></View></TouchableHighlight>;
			}

			else {
				instructionText = "Nice picture! Now just give it a title";
				formButton = <TouchableHighlight onPress={() => this.addPhoto()}><View style={Theme.buttonFullWidth}><Text style={Theme.buttonText}>Add a photo</Text></View></TouchableHighlight>
			}
		}

		else {
			landingImage = <Image style={{width: 110, height: 110}} source={{uri: 'data:image/png;base64,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'}} />;

			/* Since the user hasn't selected an image, display the 'add image' button */
			formButton = <TouchableHighlight onPress={() => this.addPhoto()}><View style={Theme.buttonFullWidth}><Text style={Theme.buttonText}>Add a photo</Text></View></TouchableHighlight>

			/* User has already submitted a title, so all they need to do is add an image */
			if (this.state.newPostTitle.length)
				instructionText = "Select an image and your ready to post!";

			/* Used hasn't entered in a title or selected an image */
			else
				instructionText = "Create a new post! Just need an image and a title and your good to go!";
		}

		return (
			<ScrollView style={{flex:1}}>
				<View style={NewPostTheme.container}>
					<View style={NewPostTheme.landingImageWrapper}>
						{landingImage}
					</View>

					<View style={NewPostTheme.box}>
						<View style={NewPostTheme.field}>
							<TextInput 	style={NewPostTheme.input} 
										placeholder="Post title..." 
										onChangeText={(text) => this.setState({newPostTitle: text})} />
						</View>

						<View style={NewPostTheme.field}>
							{formButton}
						</View>

						<View style={NewPostTheme.field}>
							<Text style={NewPostTheme.info}>{instructionText}</Text>
						</View>

						<View style={NewPostTheme.errorWrapper}>
							<Text style={NewPostTheme.errorMessage}>{this.state.error}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		);

	}
}


module.exports = NewPost;
