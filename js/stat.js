'use strict';

(function() {
		
	window.renderStatistics = function(ctx, names, times) {

		// Поле 
		ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
		ctx.fillRect(110, 20, 420, 270);

		ctx.fillStyle = "#eee";
		ctx.fillRect(100, 10, 420, 270);

		// Текст
		ctx.fillStyle = "#000";
		ctx.font = "normal 16px PT Mono";
		ctx.fillText("Ура вы победили!", 240, 40);
		ctx.fillText("Список результатов:", 115, 70);

		// Гистограмма
		var maxWidthGtgm = 150;
		var heightColumnGtgm = 40;
		var betweenColumnGtgm = 50;
		var colorUserColumnGtgm = "rgba(255, 0, 0, 1)";
		var colorColumnGtgm;

		// шаг
		var step = maxWidthGtgm / (window.util.getMaxElementArray(times) - 0);
		
		for (var i = 0; i <= 3 ; i++) {
			colorColumnGtgm = "rgba(" + 0 + ", " + 0 + ", " + 255 + ", " + Math.random() + ")"; 
			ctx.fillStyle = colorColumnGtgm;

			if ( names[i] === "Вы" ) {
				ctx.fillStyle = colorUserColumnGtgm;
			}

			ctx.fillRect(140 + (betweenColumnGtgm * i) + (heightColumnGtgm * i), 100 + (maxWidthGtgm - (times[i] * step)), 40, times[i] * step);
			
			ctx.fillStyle = "#000";
			ctx.font = "normal 12px PT Mono";
			ctx.fillText(names[i], 145 + i * (heightColumnGtgm + betweenColumnGtgm), 270);

			ctx.fillStyle = "#fff";
			ctx.font = "normal 12px PT Mono";
			ctx.fillText(Math.round(times[i] * 1000 / 1000), 145 + i * (heightColumnGtgm + betweenColumnGtgm), 230);
		}
	}

})();