Server = require('./../server.js');

PostModel = (function () {

	/* List of posts */
	var posts = [];

	/* The current page of the post list */
	var page = 0;

	/* The current (single) page post */
	var post = null;

	/* API server location */
	var API_SERVER = 'http://192.168.1.35:1999';

	function processDate (timestamp) {
		var rightNow  = parseInt(Date.now() / 1000);
		var timestamp = parseInt(timestamp);
		var timeLapse = rightNow - timestamp;

		if (timeLapse < 30)
			return ' like literally seconds ago';

		else if (timeLapse >= 30 && timeLapse < (60*5))
			return ' a few minutes ago';

		else if (timeLapse > (60*5) && timeLapse < (60*60))
			return parseInt(timeLapse) + ' minutes ago';

		else if (timeLapse > (60*60) && timeLapse < (60*60*2))
			return ' couple hours ago';

		else if (timeLapse > (60*60*2) && timeLapse < (60*60*20))
			return parseInt(timeLapse) + ' hours ago';

		else if (timeLapse > (60*60*20) && timeLapse < (60*60*24*30))
			return parseInt(timeLapse / (60*60*24)) + ' day ago';

		else {
			var meridium;
			var format = new Date(timestamp * 1000);
			var minutes = format.getMinutes();
			var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][format.getMonth()];
			var year = format.getFullYear();
			var day = format.getUTCDate();

			var hours = format.getHours();
			if (hours > 12) {
				meridium = 'pm';
				hours = hours - 12;
			}

			else {
				meridium = 'am';

				if (hours == 0) 
					hourse = 12;
			}


			return month + ' ' + year + ', ' + hours + ':' + minutes + meridium;
		}
	}

	/* Public API */
	return {
		downloadPost: function (postId) {
			return new Promise(
				function (resolve, reject) {
					fetch(
						API_SERVER + '/api/post/' + postId, {
						method: 'GET'
					})
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						post = data;
						post.date = processDate(data.published);

						resolve();
					})
					.catch(function (error) {
						console.log(error);
						reject(error);
					});
				}
			);
		},

		downloadPosts: function (amount) {
			return new Promise(
				function (resolve, reject) {
					fetch(
						API_SERVER + '/api/posts/' + page + '/' + amount, {
						method: 'GET'
					})
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						posts = data;
						resolve();
					})
					.catch(function (error) {
						reject(error);
					});
				}
			);
		},

		downloadMorePosts: function () {

		},

		awwPost: function () {
			return new Promise(
				function (resolve, reject) {
					fetch(
						API_SERVER + '/api/post/' + postId + '/aww', {
							method: 'PUT'
					})
					.then((response) => {
						console.log(response);
						resolve();
					})
					.catch((error) => {
						console.log(error);
						reject();
					})
				}
			)
		},

		getPost: function () {
			return post;
		},

		getPosts: function () {
			return posts;
		}
	}
})();


module.exports = PostModel;

