var React = require('react-native');

class PostListPage extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			message: 'Hey'
		}
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.hello} value={this.state.message}/>
			</View>
		);
	}
}

module.exports = PostListPage;