'use strict';

(function() {

	var DEBOUNCE_INTERVAL = 500;
	var wizards = [];
	var currentCoat;
  var currentEyes;

	var getRank = function(wizard) {
    var rank = 0;

    if (wizard.colorCoat === currentCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyes) {
      rank += 1;
    }

    return rank;
  };

  var compareNames = function (first, second) {
    if (first > second) {
      return 1;
    } else if (first < second) {
      return -1;
    } else {
      return 0;
    }

    // return first - second; // такая запись здесь не работает, потому что отниматются не числа, а строки (first.name - second.name)
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (first, second) {
      var rankDiff = getRank(second) - getRank(first);
      if (rankDiff === 0) {
        rankDiff = compareNames(first.name, second.name);
      }
      return rankDiff;
    }));
  };

  window.similar = {
  	eyesChangeHandler: window.util.debounce(function (color) {
  		currentEyes = color;
  		updateWizards();
  	}, DEBOUNCE_INTERVAL),
  	coatChangeHandler: window.util.debounce(function (color) {
  		currentCoat = color;
  		updateWizards();
  	}, DEBOUNCE_INTERVAL)
  };

  var loadHandler = function(data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(loadHandler, window.util.errorHundler);

})();