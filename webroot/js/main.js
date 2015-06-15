$(document).ready(function() {

	window.newChapter = function(nb_chapter, result) {

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
			}
		} else {
			currentResult = 'lose';
		}
		canPassChapter = false;
	}

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

	function chapterOne() {
		window.currentChapter = 1;

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
			chapterTwo();
		}, 1000);
	}

	/******************/
	/*	CHAPTER TWO   */
	/******************/

	function chapterTwo() {
		window.currentChapter = 2;

		gameLaunched = true;

    	// Création de korosensei
        scene.korosensei = people.create(300, 200, 'korosensei');
        scene.korosensei.body.immovable = true;

        scene.rukia = people.create(100, 100, 'rukia');
        scene.rukia.body.immovable = true;

        scene.piccolo = people.create(450, 150, 'piccolo');
        scene.piccolo.body.immovable = true;

        console.log(scene);
	}

	/******************/
	/*  CHAPTER THREE */
	/******************/

	function chapterThree() {
		window.currentChapter = 3;
	}

	function chapterFour() {
		scene.yugi = people.create(500, 100, 'yugi');
        scene.yugi.body.immovable = true;
		window.currentChapter = 4;
	}

	function chapterFive() {
		scene.yusuke = people.create(500, 100, 'yusuke');
        scene.yusuke.body.immovable = true;
		window.currentChapter = 5;
	}

	function chapterSix() {
		scene.yugi = people.create(500, 100, 'yugi');
        scene.yugi.body.immovable = true;
		window.currentChapter = 6;
	}

	function chapterSeven() {
		scene.yugi = people.create(500, 100, 'yugi');
        scene.yugi.body.immovable = true;
		window.currentChapter = 7;
	}
	
});