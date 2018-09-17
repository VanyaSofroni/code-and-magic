// В модуле util хранятся вспомогательные функиции, которые нужны в других модулях. Для того, что бы они
// были доступны, их нужно поместить в глобальную область видимости(экспортировать).
'use strict';

(function() {
	var currentValue = 1;

	// экспорт модуля
	window.util = {
		ESC_KEYCODE: 27,
	  ENTER_KEYCODE: 13,

		getRandomValue: function(values) {
			return values[Math.floor(Math.random() * values.length)]; 
		},

		// вычисляет следующий цвет в массиве
		getNextValue: function(values) {
			currentValue++;

			if (currentValue > values.length - 1) {
				currentValue = 0;
			}
			
			return values[currentValue];
		},

    // находит мах элемент в массиве
		getMaxElementArray: function(arr) {
			var max = -1;

			for (var i = 0; i < arr.length ; i++) {
				if (arr[i] > max) {
					max = arr[i];
				}
			}
			
			return max;
		},

		errorHundler: function(errorMessage) {
			var error = document.querySelector('.error-box');
			var errorMessageBox = document.querySelector('.error-box__message');
			var errorClose = document.querySelector('.error-box__close');
			
			errorMessageBox.textContent = errorMessage;

			error.classList.remove('hidden');

			errorClose.addEventListener('click', function(event) {
				error.classList.add('hidden');
			});
		}

	}
})();