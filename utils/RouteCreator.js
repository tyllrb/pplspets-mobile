var RouteCreator = function (data, context) {
	if (data.rightButton) {
		return {
			rightButtonTitle: data.rightButton,
			rightButtonPress: data.rightButtonRoute
			title: data.title,
			component: data.component,
			passProps: data.props
		}
	}
	
	else {
		return {
			title: data.title,
			component: data.component,
			passProps: data.props
		}
	}

}


module.export = RouteCreator;

var login = RouteCreator({
	title: 'New+',
	component: NewPost,
	rightButton: 'Cancel',
	rightButtonPress: () => {
		context.refs.nav.navigator.pop()
	}
})

var first = RouteCreator({
	title: 'petppl',
	component: PostList,
	props: {'user': 1}
})