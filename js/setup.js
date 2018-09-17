'use strict';

(function() {
	var setup = document.querySelector('.setup');
	
	var wizardCoat = document.querySelector('.wizard-coat');
	var wizardEyes = document.querySelector('.wizard-eyes');
	var wizardFireball = document.querySelector('.wizard-fireball');

	var setupSimilar = document.querySelector('.setup-similar');
	var similarList = document.querySelector('.setup-similar-list'); 
	var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


	var fillElement = function(element, color) {
		element.style.fill = color;
	};
	var changeElementBackground = function(element, color) {
		element.style.backgroundColor = color;
	};

	window.colorizeElement(wizardCoat, ['red', 'green', 'blue'], fillElement);
	window.colorizeElement(wizardEyes, ['navy', 'teal', 'orange'], fillElement);
	window.colorizeElement(wizardFireball, ['yellow', 'black', 'aliceblue'], changeElementBackground);


	var renderWizard = function(wizard) {
		var wizardElement = similarWizardTemplate.cloneNode(true);

		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

		return wizardElement;
	};

	var loadHandler = function(wizards) {
		var numberWizards = 4;
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < numberWizards ; i++) {
			fragment.appendChild(renderWizard(wizards[i]));
		};

		similarList.appendChild(fragment);
		setupSimilar.classList.remove('hidden');
	};

	window.backend.load(loadHandler, window.util.errorHundler);

})();