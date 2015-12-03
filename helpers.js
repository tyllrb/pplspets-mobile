var $ = {};

$.forEach = function (list, process, finished) {

	var nextItem = 0;

	function next() {
		nextItem++;

		if (nextItem == list.length)
			finished();
		else
			process(list[nextItem], next);
	}

	process(list[0], next);

}


module.exports = $;