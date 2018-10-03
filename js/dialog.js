'use strict';

(function() {

	var setup = document.querySelector('.setup');
	var setupOpen = document.querySelector('.setup-open');
	var setupClose = setup.querySelector('.setup-close');

	var openPopup = function() {
		setup.classList.toggle('hidden');
		document.addEventListener('keydown', onPopupEscPress);

		// положение окна при открытии сбрасывается на изначальное, после drop
		setup.style.top = 80 + 'px';
		setup.style.left = 50 + '%'; 
		setup.style.transform = 'translateX(-50%)';
	};

	var closePopup = function(event) {
		setup.classList.add('hidden');
		document.removeEventListener('keydown', onPopupEscPress);
	};

	var onPopupEscPress = function(event) {
		if (event.keyCode === window.util.ESC_KEYCODE && event.target !== userNameInput) { // Если input не в фокусе
			closePopup();
		}
	};

	setupOpen.addEventListener('click', function() {
		openPopup();
	});

	setupOpen.addEventListener('keydown', function(event) {
		if (event.keyCode === window.util.ENTER_KEYCODE) {
			openPopup();
		}
	});

	setupClose.addEventListener('click', function() {
		closePopup();
	});

	setupClose.addEventListener('keydown', function(event) {
		if (event.keyCode === window.util.ENTER_KEYCODE) {
			closePopup();
		}
	});

	var userNameInput = setup.querySelector('.setup-user-name');

	userNameInput.addEventListener('invalid', function() {
		if (userNameInput.validity.tooShort) {
			userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
		} else if (userNameInput.validity.tooLong) {
			userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
		} else if (userNameInput.validity.valueMissing) {
			userNameInput.setCustomValidity('Обязательное поле');
		} else {
			userNameInput.setCustomValidity('');
		}
	});

	// в Edge не поддерживается minlength, для него пишем такой код
	userNameInput.addEventListener('input', function(event) {
		var target = event.target;
		if (target.value.length < 2) {
			target.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
		} else {
			userNameInput.setCustomValidity('');
		}
	});


	var dialogHandle = setup.querySelector('.setup-user-pic');

	dialogHandle.addEventListener('mousedown', function(event) {
		event.preventDefault();

		var startCoords = {
			x: event.clientX,
			y: event.clientY
		};

		var onMouseMove = function(moveEvent) {
			moveEvent.preventDefault();

			var shift = {
				x: startCoords.x - moveEvent.clientX,
				y: startCoords.y - moveEvent.clientY
			};

			startCoords = {
				x: moveEvent.clientX,
				y: moveEvent.clientY
			};

			setup.style.top = (setup.offsetTop - shift.y) + 'px';
			setup.style.left = (setup.offsetLeft - shift.x) + 'px'; 
		};

		var onMouseUp = function(upEvent) {
			upEvent.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	var shopElement = document.querySelector('.setup-artifacts-shop');
	var artifactsElement = document.querySelector('.setup-artifacts');
	var draggedItem = null;

	shopElement.addEventListener('dragstart', function(event) {
		if (event.target.tagName.toLowerCase() === 'img') {
			draggedItem = event.target;
			event.dataTransfer.setData('text/plain', event.target.alt);
		}
		artifactsElement.style.outline =  2 + 'px dashed red';
	});

	artifactsElement.addEventListener('dragover', function(event) {
		event.preventDefault();
		return false;
	});

	artifactsElement.addEventListener('drop', function(event) {
		event.target.style.backgroundColor = '';

		if (event.target.tagName.toLowerCase() === 'img') return;
		event.target.appendChild(draggedItem.cloneNode(true));
		
		event.preventDefault();
	});

	artifactsElement.addEventListener('dragenter', function(event) {
		event.target.style.backgroundColor = 'yellow';
		artifactsElement.style.outline = 'none';
		event.preventDefault();
	});

	artifactsElement.addEventListener('dragleave', function(event) {
		event.target.style.backgroundColor = '';
		event.preventDefault();
	});

	// отправка данных на сервер из form
	var form = document.querySelector('.setup-wizard-form');

	var loadHandler = function(response) {
		setup.classList.add('hidden');
	};

	form.addEventListener('submit', function(event) {
		window.backend.save(new FormData(form), loadHandler, window.util.errorHundler);
		event.preventDefault();
	});

})();