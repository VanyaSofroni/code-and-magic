'use strict';

(function() {

	window.colorizeElement = function (elem, colors, callback) {
		elem.addEventListener('click', function() {
			var color = window.util.getNextValue(colors);
			callback(elem, color);
		});
	};

})();