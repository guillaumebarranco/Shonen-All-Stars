"use strict";

/*****************************/
/* 	 FONCTIONS FIN DU JEU  	 */
/*****************************/

let data;

//$(document).ready(function() {

	// Fonction pour updater en temps réel les données de l'utilisateur (A chaque victoire, défaite, ou arcade remportée)
	function updateUser(type) {

		data = {};
		data.type = type;
		data.pseudo = user.pseudo;

		makeAjax('POST', 'battle/updateUser', data, function() {
			//console.log('updateUser', _this.response);
		});
	}

	function updateUserPerso(id_perso) {

		data = {};
		data.id_perso = id_perso;

		makeAjax('POST', 'battle/updateUserPerso', data, function() {

			console.log('updateUserPerso', _this.response);

			if(_this.response.check === 'OK') {
				let get_perso = _this.response.perso[0];

				chat('<img src="img/persos/'+get_perso.img_front+'" />');
				chat('Vous avez débloqué '+get_perso.name);
			}
		});
	}

	// Fonction annonçant la fin du jeu
	function endGame() {

		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().hide();

		recordFight();

		if(winner === 'ally') {

			updateUser('win');
			chat('Les points de vie de votre adversaire sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">gagné</span> !');

			$('.nb_win em').text(parseInt($('.nb_win em').text()) + 1);

			arcade = arcade +1;

			if(showCanvasAfterBattle) {

				setTimeout(function() {
					updateLevel('win', function() {
						cleanFight();
				
						showCanvas();
						showCanvasAfterBattle = false;

						if(canPassChapter) {
							newChapter(currentChapter + 1, 'win');
						} else {
							newChapter(currentChapter, 'win');
						}
					});
				}, 1500);

			} else {

				setTimeout(function() {

					if(arcade < 5) {

						updateLevel('win', function() {
							newFight();
						});
						
					} else {
						updateLevel('arcade', function() {
							endArcade();
						});
					}

				}, 2000);
			}			

		} else if(winner === 'ennemy') {
			arcade = 0;
			updateUser('lost');

			if(showCanvasAfterBattle) {
				cleanFight();

				$('.nb_lost em').text(parseInt($('.nb_lost em').text()) + 1);
				
				showCanvas();
				showCanvasAfterBattle = false;

				newChapter(currentChapter, 'win');
				
			} else {
				chat('Vos points de vie sont tombé à zéro.');
				chat('Vous avez <span style="color:red;text-transform:uppercase;">perdu</span> !');
				chat('<button class="play_again">Rejouer</button>');
			}
			

		} else if(winner == 'catch') {

			arcade = 0;
			chat('Vous pouvez rejouer une arcade et sélectionnez si vous le voulez votre nouveau personnage !');
			chat('<button class="play_again">Rejouer</button>');
		}
	}

	// Fonction pour vérifier et augmenter si besoin le niveau du perso
	function updateLevel(what, callback) {

		let current_level = ally.level;
		let current_xp = ally.xp;
		let exp;

		if(what === 'win') {

			exp = 10;

			current_xp = current_xp + exp;

			if((current_level * exp) === current_xp) { // Si 2 * 10 = 20

				current_level = current_level + 1; // On augmente le niveau
				current_xp = 0;
			}

		} else if(what === 'arcade') {
			
			exp = 0;

			for (let i = 0; i < 5; i++) {

				exp = 10;

				current_xp = current_xp + exp;

				if((current_level * exp) === current_xp) { // Si 2 * 10 = 20

					current_level = current_level + 1; // On augmente le niveau
					current_xp = 0;
				}
			}
		}

		ally.level = current_level;
		ally.xp = current_xp;

		let data = {
			'perso' : ally,
			'pseudo' : 'Gear'
		};

		makeAjax('POST', 'battle/updateLevelExp', data, function() {
			//console.log('updateExp', _this.response);
		});

		let exp_width = Math.round(ally.xp / ally.level)*10;

		$('.ally .status .name').html(ally.name+' '+'<em class="level">Lv '+ally.level+'</em><i class="exp" style="width:'+(exp_width*2)+'px">'+exp_width+'%</i>');

		chat('Vous avez êtes désormais niveau '+ally.level);

		callback();
	}

	// Fonction pour enregistrer les données du combat en BDD
	function recordFight() {

		data = {
			'user' : user.pseudo,
			'ally' : ally.name,
			'ennemy' : ennemy.name
		};

		data.result = (winner === 'ally') ? 'win' : 'lost';

		makeAjax('POST', 'battle/recordFight', data, function() {
			//console.log('recordFight', _this.response);
		});
	}

	// Fonction appellée une fois une Arcade remportée
	function endArcade() {

		emptyChat();
		chat('FELICITATIONS ! VOUS AVEZ TERMINE UNE ARCADE');
		chat('<button class="play_again">Rejouer</button>');

		$('.nb_arcade em').text(parseInt($('.nb_arcade em').text()) + 1);

		updateUser('arcade');

		let arcades_now = parseInt($('.nb_arcade em').text());

		if(arcades_now === 1) {
			// Kenshin est débloqué
			updateUserPerso(12);

		} else if(arcades_now === 3) {
			// Toriko est débloqué
			updateUserPerso(25);

		} else if(arcades_now === 5) {
			// Aladdin est débloqué
			updateUserPerso(26);

		} else if(arcades_now === 7) {
			// Ah Gou est débloqué
			updateUserPerso(47);

		} else if(arcades_now === 8) {
			// Ray est débloqué
			updateUserPerso(54);

		} else if(arcades_now === 15) {
			// Saitama est débloqué
			updateUserPerso(29);
		}

		arcade = 0;
	}

	function cleanFight() {
		emptyChat();

		// On régénère les PV et PP des deux personnages
		$('.status span').width(300);
		$('.status strong').text('100');
	}

	// Fonction utilisée pour démarrer un nouveau combat (après une victoire de l'utilisateur)
	function newFight() {

		emptyChat();

		// On régénère les PV et PP des deux personnages
		$('.status span').width(300);
		$('.status strong').text('100');

		if(ennemy_defined === false) {
			random_ennemy = rand(0,_this.all_persos.length -1);
		}

		_this.all_persos[random_ennemy].side = 'ennemy';

		ennemy = _this.all_persos[random_ennemy];

		//console.log('ennemy', ennemy);

		if(ennemy.name == 'Saitama') {
			while(ennemy.name == 'Saitama') {
				random_ennemy = rand(1,_this.all_persos.length -1);
				_this.all_persos[random_ennemy].side = 'ennemy';

				ennemy = _this.all_persos[random_ennemy];
			}
		}

		ennemy.level = rand(ally.level-3, ally.level+3);

		$('.ennemy .status .name').html(ennemy.name+' '+'<em class="level">Lv '+ennemy.level+'</em>');
		$('.ennemy').find('img').attr('src', 'img/persos/'+ennemy.img_front);

		if(ennemy.vit >= ally.vit) {
			ennemyTurn();
		} else {
			$('.choose .button_depart').parent().show();
		}
	}

	// Fonction pour rejouer après une défaite ou la fin d'une arcade
	function playAgain() {

		emptyChat();
		$('.battle').hide();

		setPersoAttr('ally', 'life', 100);
		setPersoAttr('ally', 'pp', 100);
		setPersoAttr('ennemy', 'life', 100);
		setPersoAttr('ennemy', 'pp', 100);

		$('.choose_perso').empty();
		$('.choose_perso').show();

		getAllPersos();
	}
//});
