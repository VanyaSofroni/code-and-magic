'use strict';

(function() {

	var WIZARD_COUNT = 4;

	var setupSimilar = document.querySelector('.setup-similar');
	var similarList = document.querySelector('.setup-similar-list'); 
	var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

	var renderWizard = function(wizard) {
		var wizardElement = similarWizardTemplate.cloneNode(true);

		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

		return wizardElement;
	};

	window.render = function (wizards) {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < WIZARD_COUNT; i++) {
			fragment.appendChild(renderWizard(wizards[i]));
		};

		similarList.innerHTML = '';
		similarList.appendChild(fragment);
		setupSimilar.classList.remove('hidden');
	}

})();