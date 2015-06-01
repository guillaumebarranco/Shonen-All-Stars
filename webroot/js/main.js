$(document).ready(function() {

	$(document).keydown(function(e) {
		var key = e.which || e.keyCode;

		//console.log(key);

		// Si jamais le joueur est face à un autre personnage, il peut lui parler en appuyant sur espace

		switch(key) {
			case 32 : // space
				if(enableTalk) {
					e.preventDefault();
					talk();
				}
			break;

			case 13 : // enter
				if(enableChoice) {
					e.preventDefault();
					chooseStarter();
				} else if(menu.open) {

					switch(menu.choose) {

						case 'persos':
							showMenuPersos();
						break;

						case 'object':
							showMenuPersos();
						break;

						case 'return':

							if(menu.shown == 'default') {
								closeMenu();

							} else if(menu.shown == 'persos') {
								hideMenuPersos();
							}

						break;

						case 'battle':
							showBattle();
						break;

						case 'perso1':
							var perso_id = getPersoIdByName(menu.txt.userPerso[0].text);
							showOnePerso(window.all_persos[perso_id]);
						break;

						case 'one_perso':
							hideOnePerso();
						break;
					}
				}
			break;

			case 81 : // q
				if(gameLaunched) {
					e.preventDefault();
					if(menu.open) {
						closeMenu();
					} else {
						openMenu();
					}
				}
			break;
		}
	});

	/******************/
	/*	CHAPTER ONE   */
	/******************/

	function chooseStarter() {
		user.persos[0] = standby;
		newText.text = "Vous avez choisi "+standby+" ! Excellent choix !";
		removeBalls();
	}

	function removeBalls() {

		collision = null;
		enableChoice = false;

		setTimeout(function() {
			newText.text = '';
			balls.removeAll(true, true);
			makeScene();
		}, 1000);
	}

	/******************/
	/*	CHAPTER TWO   */
	/******************/

	function makeScene() {

		gameLaunched = true;

    	// Création de korosensei
        var korosensei = people.create(300, 200, 'korosensei');
        korosensei.body.immovable = true;

        var rukia = people.create(100, 100, 'rukia');
        rukia.body.immovable = true;

        var piccolo = people.create(450, 150, 'piccolo');
        piccolo.body.immovable = true;
	}
	
});