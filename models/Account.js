Server = require('./../server.js');

AccountModel = (function () {

	/* API server location */
	var API_SERVER = 'http://192.168.1.35:1999';

	/* Public API */
	return {
		isLoggedIn: function () {
			return new Promise(
				function (resolve, reject) {
					fetch(API_SERVER + '/api/login/status', {
						method: 'GET'
					})
					.then((response) => {
						if (response.status === 400) {
							reject("Not logged in");
							return;
						}

						resolve(JSON.parse(response._bodyText));
					})
					.catch((error) => {
						reject("Not currently logged in");
					});
				}
			);
		},

		doLogin: function (username, password) {
			return new Promise(
				function (resolve, reject) {
					fetch(API_SERVER + '/api/login/basic', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: 'username=' + username + '&password=' + password
					})
					.then((response) => {
						if (response.status === 400) {
							reject("Bad request, could not login :^(");
							return;
						}

						resolve(JSON.parse(response._bodyText));
					})
					.catch((error) => {
						reject("Hmm, could not login, maybe you misspelled something");
					})
					.done();
				}
			);
		}
	}
})();


module.exports = AccountModel;

