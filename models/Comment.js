Server = require('./../server.js');

CommentModel = (function () {

	/* List of current comments */
	var comments = [];

	/* Current page of the comments */
	var page = 0;

	/* API server location */
	var API_SERVER = 'http://192.168.1.35:1999';

	/* Process the time/date routines */
	function processDate (timestamp) {
		var rightNow  = parseInt(Date.now() / 1000);
		var timestamp = parseInt(timestamp);
		var timeLapse = rightNow - timestamp;

		if (timeLapse < 30)
			return 'like literally seconds ago';

		else if (timeLapse >= 30 && timeLapse < (60*5))
			return 'a few minutes ago';

		else if (timeLapse > (60*5) && timeLapse < (60*60))
			return parseInt(timeLapse) + ' minutes ago';

		else if (timeLapse > (60*60) && timeLapse < (60*60*2))
			return 'couple hours ago';

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


	return {
		downloadThread: function (postId, amount) {
			comments [postId] = [];

			return new Promise (
				function (resolve, reject) {
					fetch(
						API_SERVER + '/api/post/' + postId + '/comments/' + page + '/' + amount, {
						method: 'GET'
					})
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						comments [postId] = data.comments;
						comments [postId] = comments [postId].map(function (value) {
							value.date = processDate(value.published);
							return value;
						});

						resolve();
					})
					.catch(function (error) {
						console.log(error);
						reject(error);
					});
				}
			);
		},

		getComments: function (postId) {
			return comments [postId];
		},

		post: function (postId, comment) {
			var body = {'comment': comment};

			return Promise (
				function (reject, resolve) {
					fetch(
						API_SERVER + '/api/post/' + postId + '/comment', {
						method: 'POST',
						body: JSON.stringify(body)
					})
					.then((response) => {
						console.log(response);
						resolve();
					})
					.catch((error) => {
						console.log("ERRROR");
						console.log(error);
						reject(error);
					});
				}
			);
		},

/*
		upvote: function (postId, commentId) {
			return Promise (
				function (reject, resolve) {
					resolve();
				}
			);
		},

		downvote: function (postId, commentId) {
			return Promise (
				function (reject, resolve) {
					resolve();
				}
			);
		},

		report: function (postId, commentId) {
			return Promise (
				function (reject, resolve) {
					resolve();
				}
			);
		}
		*/
	}

})();

module.exports = CommentModel;
