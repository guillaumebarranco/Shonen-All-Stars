$(document).ready(function() {

	newChapter = function(nb_chapter, result) {

		if(result == 'win') {
			currentResult = 'win';

			switch(nb_chapter) {
				case 1:
					chapterOne();
				break;
				case 2:
					chapterTwo();
				break;
				case 3:
					chapterThree();
				break;
				case 4:
					chapterFour();
				break;
				case 5:
					chapterFive();
				break;
			}
		} else {
			currentResult = 'lose';
		}
		canPassChapter = false;
	}

	$(document).keydown(function(e) {
		var key = e.which || e.keyCode;

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
					
					if(standby != undefined) {
						e.preventDefault();
						chapterOne();
					}
					
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
					if(!menu.open) {
						openMenu();
					} else {
						closeMenu();
					}
				}
			break;
		}
	});

	/******************/
	/*	CHAPTER ONE   */
	/******************/

	var chapterOne = function() {
		
		currentChapter = 1;

		user.persos[0] = standby;
		newText.text = "Vous avez choisi "+standby+" ! Excellent choix !";
		removeBalls();
	};

	var removeBalls = function() {

		collision = null;
		enableChoice = false;

		setTimeout(function() {
			newText.text = '';
			balls.removeAll(true, true);
			chapterTwo();
		}, 1000);
	};

	/******************/
	/*	CHAPTER TWO   */
	/******************/

	var chapterTwo = function() {

		currentChapter = 2;

		gameLaunched = true;

    	// Création de korosensei
        scenePerso(300, 200, 'korosensei');
        scenePerso(100, 100, 'rukia');
        scenePerso(450, 150, 'piccolo');
	};

	/******************/
	/*  CHAPTER THREE */
	/******************/

	var chapterThree = function() {
		currentChapter = 3;
	};

	var chapterFour = function() {
		scenePerso(500, 100, 'yugi');
		currentChapter = 4;
	};

	var chapterFive = function() {
		scenePerso(600, 200, 'yusuke');
		currentChapter = 5;
	};

	var chapterSix = function() {
		scene.yugi = people.create(500, 100, 'yugi');
        scene.yugi.body.immovable = true;
		currentChapter = 6;
	};

	var chapterSeven = function() {
		scene.yugi = people.create(500, 100, 'yugi');
        scene.yugi.body.immovable = true;
		currentChapter = 7;
	};
	
});