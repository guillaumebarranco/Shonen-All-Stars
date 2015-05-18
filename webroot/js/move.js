$(document).ready(function() {

	var perso = $('.perso');
	var speed = 20;
	var collision = 30;
	
	$(document).keydown(function(e) {

		var key = (event.keyCode ? event.keyCode : event.which);

	    switch(key) {
			case 38 : // Flèche haut
				e.preventDefault();

		        move('up', e);
			break;

			case 40 : // Flèche bas
				e.preventDefault();
				move('down', e);
			break;

			case 37 : // Flèche gauche
				e.preventDefault();
				move('left', e);
			break;

			case 39 : // Flèche droite
				e.preventDefault();
				move('right', e);
			break;

			default : 
				return true;
		}
	});


	function getClass() {
		return perso.find('div').attr('class');
	}

	function replaceClass(the_class) {
		perso.find('div').removeClass();
		perso.find('div').addClass('perso_'+the_class);
	}

	function move(direction, e) {

		if(getClass() != ('perso_'+direction)) {
			replaceClass(direction);
		}

		//perso.clearQueue().stop();

		if(!checkCollision(direction)) {
			

			switch(direction) {

				case 'up':
					perso.animate({
						top: '-='+speed
					}, function() {
						if(checkCollision()) {
							
						}
						perso.stop(true, true);
					});
				break;

				case 'down':
					perso.animate({
						top: '+='+speed
					}, function() {

						perso.stop(true, true);
					});
				break;

				case 'left':
					perso.animate({
						left: '-='+speed
					}, function() {
						if(checkCollision()) {
							
						}
						perso.stop(true, true);
					});
				break;

				case 'right':
					perso.animate({
						left: '+='+speed
					}, function() {
						if(checkCollision()) {
							
						}
						perso.stop(true, true);
					});
				break;
			}
		} else {
			alert('Salut');
		}

		

		// console.log('perso_left', getPersoLeft());
		// console.log('people_left', $('.people').offset().left);

		// console.log('perso_top', getPersoTop());
		// console.log('people_top', $('.people').offset().top);
	}

	function getPersoLeft() {
		return perso.offset().left;
	}

	function getPersoTop() {
		return perso.offset().top;
	}

	function checkCollision(direction) {

		console.log(getPersoLeft() - $('.people').offset().left);

		if(
			getPersoLeft() > ($('.people').offset().left - $('.people').width()) && // Si le personnage marche vers la droite et se trouve à moins de 30 px à gauche
			(getPersoTop() - $('.people').offset().top) > -$('.people').height() &&
			(getPersoTop() - $('.people').offset().top) < $('.people').height() &&
			direction === 'right'
		){
			return true;
		}

		if(
			getPersoLeft() > ($('.people').offset().left + ($('.people').width() * 2)) && // Si le personnage marche vers la droite et se trouve à moins de 30 px à gauche
			(getPersoTop() - $('.people').offset().top) > -($('.people').height()) &&
			(getPersoTop() - $('.people').offset().top) < $('.people').height() &&
			direction === 'left'
		){
			return true;
		}

		if(
			getPersoTop() < ($('.people').offset().top + ($('.people').height() *2)) && // Si le personnage marche vers la droite et se trouve à moins de 30 px à gauche
			(getPersoLeft() - $('.people').offset().left) > -$('.people').width() &&
			(getPersoLeft() - $('.people').offset().left) < $('.people').width() &&
			direction === 'up'
		){
			return true;
		}

		// if((getPersoLeft() > ($('.people').offset().left - 30)) && direction === 'down') {
		// 	return true;
		// }

		return false;
	}

});