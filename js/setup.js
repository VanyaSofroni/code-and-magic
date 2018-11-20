'use strict';

(function () {

  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.wizard-fireball');


  wizardCoat.addEventListener('click', function () {
    var color = window.util.getNextValue(WIZARD_COATS);
    wizardCoat.style.fill = color;
    window.similar.coatChangeHandler(color);
  });

  wizardEyes.addEventListener('click', function () {
    var color = window.util.getNextValue(WIZARD_EYES);
    wizardEyes.style.fill = color;
    window.similar.eyesChangeHandler(color);
  });

  wizardFireball.addEventListener('click', function () {
    var color = window.util.getNextValue(WIZARD_FIREBALLS);
    wizardFireball.style.backgroundColor = color;
  });

})();
