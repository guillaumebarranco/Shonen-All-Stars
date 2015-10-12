"use strict";

$(document).ready(function() {

	newChapter = (nb_chapter, result, callback) => {

		if(result == 'win') {
			currentResult = 'win';

			switch(nb_chapter) {
				case 1:
					chapterOne(function() {
						if(callback) callback();
					});
				break;
				case 2:
					chapterTwo(function() {
						if(callback) callback();
					});
				break;
				case 3:
					chapterThree(function() {
						if(callback) callback();
					});
				break;
				case 4:
					chapterFour(function() {
						if(callback) callback();
					});
				break;
				case 5:
					chapterFive(function() {
						if(callback) callback();
					});
				break;
				case 6:
					chapterSix(function() {
						if(callback) callback();
					});
				break;
				case 7:
					chapterSeven(function() {
						if(callback) callback();
					});
				break;
				case 8:
					chapterEight(function() {
						if(callback) callback();
					});
				break;
				case 9:
					chapterNine(function() {
						if(callback) callback();
					});
				break;
			}
		} else {
			currentResult = 'lose';
		}
		canPassChapter = false;
	};

	let key;

	$(document).keydown(function(e) {
		key = e.which || e.keyCode;

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
							let perso_id = getPersoIdByName(menu.txt.userPerso[0].text);
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
					(!menu.open) ? openMenu() : closeMenu();
				}

			break;
		}
	});

	/******************/
	/*	CHAPTER ONE   */
	/******************/

	const chapterOne = function(callback) {

		if(beginByChapter) {
			standby = 'Sangoku';
			user.id_starter = 0;
			currentResult = 'win';
		}
		
		currentChapter = 1;
		console.log('user', user);
		
		user.persos[0] = standby;
		txt("Vous avez choisi "+standby+" ! Excellent choix !");

		removeBalls(function() {
			if(callback) callback();
		});		
	};

	const removeBalls = function(callback) {

		collision = null;
		enableChoice = false;

		setTimeout(function() {
			newText.text = '';
			balls.removeAll(true, true);

			chapterTwo(function() {
				if(callback) callback();
			});
			
		}, 1000);
	};

	/******************/
	/*	CHAPTER TWO   */
	/******************/

	const chapterTwo = function(callback) {

		currentChapter = 2;

		gameLaunched = true;

    	// Création de korosensei
        scenePerso(300, 200, 'korosensei');
        scenePerso(100, 100, 'rukia');
        scenePerso(450, 150, 'piccolo');

        if(callback) callback();
	};

	/******************/
	/*  CHAPTER THREE */
	/******************/

	const chapterThree = function(callback) {
		currentChapter = 3;
		if(callback) callback();
	};

	const chapterFour = function(callback) {
		scenePerso(500, 100, 'yugi');
		currentChapter = 4;
		if(callback) callback();
	};

	const chapterFive = function(callback) {
		scenePerso(1100, 200, 'yusuke');
		scenePerso(600, -400, 'saitama');
		currentChapter = 5;
		if(callback) callback();
	};

	/*
	*	LORSQUE QU'ON FAIT APPARAITRE UN NOUVEAU PERSO, Il apparait aux coordonnées qu'on lui donne EN FONCTION de la position du point en haut à gauche visible à l'écran du Canvas
	*/

	const chapterSix = function(callback) {
		scenePerso(-300, 0, 'kenichi');
		currentChapter = 6;
		if(callback) callback();
	};

	const chapterSeven = function(callback) {
		scenePerso(-400, 0, 'gon');
		currentChapter = 7;
		if(callback) callback();
	};

	const chapterEight = function(callback) {
		currentChapter = 8;
		if(callback) callback();
	};

	const incrementChapter = function(nbChapter) {
		if(nbChapter < (chapterBegin+1)) {
			newChapter(nbChapter, 'win', function() {
				incrementChapter(nbChapter+1);
			});
		}
	};

	if(beginByChapter) {
		pseudo = "Gear";

		setTimeout(function() {

			chapterOne(function() {
				if(chapterBegin > 2) incrementChapter(3);
			});

		}, 2000);
	}

});
