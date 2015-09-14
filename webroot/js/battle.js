$(document).ready(function() {

	/*****************************/
	/* 	       VARIABLES      	 */
	/*****************************/

	var turn;
	var ally;
	var ennemy;
	var winner;
	var _this = this;
	var user;
	this.response = '';
	this.all_persos = '';
	var arcade = 0;
	var attack_ended = 1;

	var showCanvasAfterBattle = false;

	// SI BESOIN DE TESTER UNE ATTAQUE ENNEMIE PARTICULIERE, CHANGER CES VARIABLES

	var ennemy_defined = false;
	var random_ennemy;

	var attack_defined = false;
	var random_attack;
	
	var disappear_attack = true;

	var master_ball = false;

	/*****************************/
	/* 	       	 HIDES      	 */
	/*****************************/

	if(!showCanvasFromBeginning) {
		$('.before_battle').show();
	}

	$('.battle').hide();
	$('.before_battle h2').hide();
	$('.pseudo').hide();
	$('.sign_log_in form').hide();
	$('.anim').hide();
	$('.return_sign_log_in').hide();
	$('.button_return').hide();

	$('.choose .button_attack').parent().hide();
	$('.choose .button_tools').parent().hide();

	// Si le User a déjà une session connectée
	if($('.launch_direct').length != 0) {
		$('.pseudo').show();
		getConnectedUser();
	}


	/*****************************/
	/* 	   LOG IN / SIGN IN      */
	/*****************************/


	$('.return_sign_log_in').on('click', function(e) {
		e.preventDefault();
		$(this).hide();
		$('.sign_log_in form.logIn, .sign_log_in form.signIn').hide();
		$('.buttons_sign_log_in').show();
	});

	$('.buttons_sign_log_in button').on('click', function() {

		$(this).parent().hide();
		$('.return_sign_log_in').show();

		var show_what = $(this).attr('class');

		if(show_what === 'show_signIn') {
			$('.sign_log_in form.signIn').show();

		} else if(show_what === 'show_logIn') {
			$('.sign_log_in form.logIn').show();
		}

	});

	$('.sign_log_in form').on('submit', function(e) {

		e.preventDefault();

		var the_pseudo = $(this).find('input[name=pseudo]').val();
		var password = $(this).find('input[name=password]').val();
		var what_form = $(this).attr('class');

		if(the_pseudo != null && the_pseudo != '') {

			var data = {
				"pseudo" : the_pseudo,
				"password" : password,
				"what_form" : what_form
			};

			// Fonction AJAX
			makeAjax('POST', "battle/signLogIn", data, function() {

				console.log('log_sign_in', _this.response);

				if(_this.response.check === 'OK') {

					user = (_this.response.user[0] != undefined) ? _this.response.user[0] : _this.response.user;

					if(what_form === 'signIn') {
						user.win = user.lost = user.arcades = 0;
					}

					pseudo = user.pseudo;

					var txt_pseudo = 
						user.pseudo +
						'<span class="nb_win">Win <em>'+user.win+'</em></span>'+
						'<span class="nb_lost">Lost <em>'+user.lost+'</em></span>'+
						'<span class="nb_arcade">Arcades <em>'+user.arcades+'</em></span>'
					;

					$('.pseudo').html(txt_pseudo);
					$('.pseudo').show();
					$('.sign_log_in').hide();

					if(showCanvasFromBeginning) {
						$('canvas').show();
						$('.before_battle').hide();
					}
					
					(what_form == 'signIn') ? getUserPersos() : getAllPersos();
					
				} else {
					var the_alert = (what_form === 'logIn') ? 'Vous avez tapé un mauvais pseudo et/ou un mauvais mot de passe.' : 'Ce pseudo est déjà pris, essayez-en un autre.';
					popError(the_alert);
				}
			});

		} else {
			alert('Veuillez entrer un pseudo et un mot de passe.');
		}

	});

	/*****************************/
	/* 	  GET PERSOS AND USER  	 */
	/*****************************/


	// Fonction appellée quand la $_SESSION récupère un utilisateur connecté
	function getConnectedUser() {

		makeAjax('POST', 'battle/getConnectedUser', '', function() {

			if(_this.response.check === 'OK') {

				console.log('connected user', _this.response);
				user = (_this.response.user[0] != undefined) ? _this.response.user[0] : _this.response.user;

				getAllPersos();
			}
		});
	}

	// Fonction AJAX qui récupère tous les personnages et leurs attaques pour que l'utilisateur choisisse son personnage
	var getAllPersos = function() {

		makeAjax('POST', 'battle/getPersos', '', function() {

			console.log('getPersos', _this.response);

			_this.response = _this.response.persos;
			window.all_persos = _this.response;

			$('.before_battle h2').show();

			var li_append;

			for (var p = 0; p < _this.response.length; p++) {

				// Si le personnage a été débloqué
				if(_this.response[p].unlocked == 1) {

					li_append =
						'<li data-id="'+p+'">'+
							'<img class="unlocked" src="img/persos/'+_this.response[p].img_front+'"/>'+
						'</li>'
					;

				} else {

					li_append = 
						'<li data-id="'+p+'">'+
						'<img src="img/persos/'+_this.response[p].img_front+'"/>'
					;

					if(_this.response[p].condition != 'none' && _this.response[p].condition != null && _this.response[p].condition != 'catch') {

						li_append += 
							'<div class="sub">Vous devez terminer '+_this.response[p].condition+' arcades pour débloquer ce personnage !</div>'
						;

					} else {

						li_append += 
							'<div class="sub">Vous devez attraper ce personnage pour pouvoir le jouer !</div>'
						;
					}

					li_append +=
						'</li>'
					;
				}
				
				$('.choose_perso').append(li_append);
			}

			_this.all_persos = _this.response;

		});
	};

	// Si Sign In, création des persos pour le User
	var getUserPersos = function() {
		makeAjax('POST', 'battle/getUserPersos', '', function() {
			getAllPersos();
		});
	};

	/*****************************/
	/* 	  GESTION DES CLICKS	 */
	/*****************************/

	$(document).on('click', '.choose_perso li img.unlocked', function() {
		var id_chosen = $(this).parent().attr('data-id');
		beginBattle(id_chosen);
	});

	beginBattle = function(id_chosen, argument) {

		if(ennemy_defined === false) {
			random_ennemy = rand(0,_this.all_persos.length -1);
		}

		if(argument) {
			switch(argument) {
				case "yugi" :
					random_ennemy = 17;
				break;

				case "toriko":
					random_ennemy = 7;
				break;

				case 'yusuke':
					random_ennemy = 9;
				break;

				case "kenshin":
					random_ennemy = 2;
				break;

				case "gon":
					random_ennemy = 6;
				break;

				case "aladdin":
					random_ennemy = 8;
				break;

				case "kenichi":
					random_ennemy = 15;
				break;
			}

			showCanvasAfterBattle = true;
		}
		
		_this.all_persos[id_chosen].side = 'ally';
		_this.all_persos[random_ennemy].side = 'ennemy';
		
		ally = _this.all_persos[id_chosen];
		ennemy = _this.all_persos[random_ennemy];

		console.log('ennemy', ennemy);

		if(ennemy.name == 'Saitama') {
			while(ennemy.name == 'Saitama') {
				random_ennemy = rand(1,_this.all_persos.length -1);
				_this.all_persos[random_ennemy].side = 'ennemy';

				ennemy = _this.all_persos[random_ennemy];
			}
		}

		$('.ally').find('.picture img').attr('src', 'img/persos/'+ally.img_back);
		$('.ennemy').find('.picture img').attr('src', 'img/persos/'+ennemy.img_front);

		// ECRITURE DU NOM DU PERSONNAGE
		
		var exp_width = Math.round(ally.xp / ally.level)*10;

		$('.ally .status .name').html(ally.name+' '+'<em class="level">Lv '+ally.level+'</em><i class="exp" style="width:'+(exp_width*2)+'px">'+exp_width+'%</i>');


		ennemy.level = rand(ally.level-3, ally.level+3);

		$('.ennemy .status .name').html(ennemy.name+' '+'<em class="level">Lv '+ennemy.level+'</em>');

		$('.choose .button_attack1').html('<span>'+ally.attack_1.requis+' PP</span>'+'<em>'+ally.attack_1.name+'<em>');
		$('.choose .button_attack2').html('<span>'+ally.attack_2.requis+' PP</span>'+'<em>'+ally.attack_2.name+'<em>');
		$('.choose .button_attack3').html('<span>'+ally.attack_3.requis+' PP</span>'+'<em>'+ally.attack_3.name+'<em>');
		$('.choose .button_attack4').html('<span>'+ally.attack_4.requis+' PP</span>'+'<em>'+ally.attack_4.name+'<em>');

		$('.choose .button_attack1').attr('data-power', ally.attack_1.power);
		$('.choose .button_attack2').attr('data-power', ally.attack_2.power);
		$('.choose .button_attack3').attr('data-power', ally.attack_3.power);
		$('.choose .button_attack4').attr('data-power', ally.attack_4.power);

		$('.choose .button_attack1').attr('data-requis', ally.attack_1.requis);
		$('.choose .button_attack2').attr('data-requis', ally.attack_2.requis);
		$('.choose .button_attack3').attr('data-requis', ally.attack_3.requis);
		$('.choose .button_attack4').attr('data-requis', ally.attack_4.requis);

		$('.choose .button_attack1').attr('data-type', ally.attack_1.type);
		$('.choose .button_attack2').attr('data-type', ally.attack_2.type);
		$('.choose .button_attack3').attr('data-type', ally.attack_3.type);
		$('.choose .button_attack4').attr('data-type', ally.attack_4.type);

		$('.choose .button_attack1').attr('data-anim', ally.attack_1.anim);
		$('.choose .button_attack2').attr('data-anim', ally.attack_2.anim);
		$('.choose .button_attack3').attr('data-anim', ally.attack_3.anim);
		$('.choose .button_attack4').attr('data-anim', ally.attack_4.anim);

		$('.battle').show();
		$('.choose_perso').hide();
		$('.before_battle h2').hide();

		// Si la vitesse de l'adversaire est supérieure au personnage de l'utilisateur, l'ennemi attaque en premier
		if(ennemy.vit >= ally.vit) { 
			ennemyTurn();
		} else {
			$('.choose .button_depart').parent().show();
		}
	};
	
	// Bouton de retour dans le jeu (pour quitter les attaques et revenir sur les objets par exemple)
	$('.button_return').on('click', function(e) {
		e.preventDefault();
		$(this).hide();
		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().show();
	});

	// Au click sur le bouton Attack, on affiche les 4 attaques
	$('.make_attack').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_attack').parent().show();
		$('.button_return').show();
	});

	// Au click sur le bouton Tools, on affiche les 4 objets
	$('.use_tools').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_tools').parent().show();
		$('.button_return').show();
	});

	// Au clic sur l'objet Potion de Vie
	$('.button_life_potion').on('click', function() {
		$('.choose .button_tools').parent().hide();
		updateLife();
	});

	// Au clic sur l'objet Potion de PP
	$('.button_pp_potion').on('click', function() {
		$('.choose .button_tools').parent().hide();
		updatePP();
	});

	// Au clic sur l'objet Recovery Potion
	$('.button_life_pp_potion').on('click', function() {
		$('.choose .button_tools').parent().hide();
		updateLifePP();
	});

	// Au clic sur l'objet Shosinsui
	$('.button_shosinsui').on('click', function() {
		$('.choose .button_tools').parent().hide();
		shosinsui();
	});
	
	// Au clic sur une attaque
	$('.button_attack').on('click', function() {
		$('.choose .button_attack').parent().hide();
		attack('ally', $(this));
	});

	// Au clic sur le bouton "Rejouer" après avoir perdu un combat ou gagné une arcade
	$(document).off('click', '.play_again');
	$(document).on('click', '.play_again', function() {
		playAgain();
	});

	// Au clic sur Manga Ball

	$('.manga_ball').on('click', function() {
		$('.choose .button_depart').parent().hide();
		mangaBall();
	});
 
	/*****************************/
	/* 	  FONCTIONS GENERIQUES	 */
	/*****************************/


	function getPersoAttr(who, what) {
		return parseInt($('.'+who+' .status .'+what).find('strong').text());
	}

	function setPersoAttr(who, what, new_attr) {
		if((getPersoAttr(who, what) + new_attr) >= 100) {
			new_attr = 100 - getPersoAttr(who, what);
		}
		$('.'+who+' .status .'+what).find('strong').text(getPersoAttr(who, what) + new_attr);
		$('.'+who+' .status .'+what).find('span').width($('.'+who+' .status .'+what).find('span').width() + new_attr*3);
	}


	// Fonction simplifiant l'AJAX
	function makeAjax(type, url, data, callback) {

		$.ajax({
			type : type,
			url : url,
			data : data,
			success: function(response_get) {
				// La variable globale de reponse est remplacée à chaque requête AJAX
				_this.response = response_get;
				callback();
			},
			error: function(){
				console.log('error', url);
	        }
		});
	}

	// Action de la Potion de Vie
	function updateLife() {

		if(getPersoAttr('ally', 'life') <= 50) {
			setPersoAttr('ally', 'life', 50);
			ennemyTurn();
		} else {
			popError('Vous avez trop de vie pour utiliser cette potion !');
			$('.choose .button_tools').parent().show();
		}
	}

	// Action de la Potion de PP
	function updatePP() {

		if(getPersoAttr('ally', 'pp') <= 50) {
			
			setPersoAttr('ally', 'pp', 50);
			ennemyTurn();

		} else {
			popError('Vous avez trop de PP pour utiliser cette potion !');
			$('.choose .button_tools').parent().show();
		}
	}

	// Action de la Recovery Potion
	function updateLifePP() {

		if(getPersoAttr('ally', 'pp') <= 75 && getPersoAttr('ally', 'life') <= 75) {

			setPersoAttr('ally', 'life', 25);
			setPersoAttr('ally', 'pp', 25);
			ennemyTurn();

		} else {
			popError('Vous avez trop de vie ou de PP pour utiliser cette potion !');
			$('.choose .button_tools').parent().show();
		}
	}

	// Action de la Shosinsui
	function shosinsui() {

		if(getPersoAttr('ally', 'pp') >= 50) {

			setPersoAttr('ally', 'pp', -50);
			setPersoAttr('ally', 'life', 100);
			ennemyTurn();

		} else {
			popError('Vous n\'avez pas assez de PP pour utiliser cette potion !');
			$('.choose .button_tools').parent().show();
		}
	}

	// Fonction de lancement d'une Manga Ball
	function mangaBall() {

		var ennemy_name = $('.ennemy .status .name').text();
		var ennemy_id = ennemy.id;

		var is_unlocked = (ennemy.unlocked == 1) ? true : false;

		if(!is_unlocked) {

			console.log('ennemy_id', ennemy_id);

			// Impossible d'attraper les personnages que l'on obtient seulement en finissant des arcades
			if(ennemy_id == 26 || ennemy_id == 25 || ennemy_id == 12 || ennemy_id == 29 || ennemy_id == 47 || ennemy_id == 54) {

				popError('Vous ne pouvez pas obtenir ce personnage de cette façon !');
				$('.choose .button_depart').parent().show();
			
			} else {
				
				$('.ennemy .anim').show();
				$('.ennemy .anim').append('<div class="anim_mangaball"></div>');

				var duration = $('.anim_mangaball').css('-webkit-animation-duration');

				if(duration.length == 2) {
					duration = duration.substr(0,1);
					duration = parseInt(duration) * 1000;
				} else {
					duration = duration.substr(0,3);
					duration = parseFloat(duration) * 1000;
				}

				emptyChat();

				chat('Vous avez lancé une Manga Ball !');

				setTimeout(function() {
					$('.ennemy .anim').hide();
					$('.anim_mangaball').remove();

					var ennemy_life = getPersoAttr('ennemy', 'life');
					var catched = 0;

					if(ennemy_life != 100) {

						catched = rand(1, Math.round((ennemy_life/10)));

						if(ennemy_life > 75) {
							catched = rand(1,20);
						} else if(ennemy_life > 50 && ennemy_life <= 75) {
							catched = rand(1,15);
						} else if(ennemy_life > 25 && ennemy_life <= 50) {
							catched = rand(1,10);
						} else if(ennemy_life <= 25) {
							catched = rand(1,5);
						}
					}

					console.log(catched);

					if(master_ball) {
						catched = 3;
					}

					if(catched === 3) {
						chat('Félicitations ! Vous avez attrapé '+ennemy_name);
						chat('Vous pouvez désormais jouer avec '+ennemy_name);
						updateUserPerso(ennemy_id);

						winner = 'catch';
						endGame();
					} else {
						chat('Vous avez manqué le personnage, dommage.');
						ennemyTurn();
					}

				}, duration);
			}

		} else {
			alert('Ce personnage est déjà disponible, vous ne pouvez pas l\'attraper !');
			$('.choose .button_depart').parent().show();
		}
	}

	// Fonction pour écrire dans la zone de texte
	function chat(txt) {
		$('.chat').append('<p>'+txt+'</p>');
	}

	// Fonction pour vider la zone de texte
	function emptyChat() {
		$('.chat').empty();
	}

	// Fonction pour générer un nombre aléatoire
	function rand(min, max) {
		var the_random = Math.floor(Math.random() * (max - min + 1)) + min;
		
		// Pour gérer le niveau adverse qui ne peut pas être inférieur à 0 ni supérieur à 30
		the_random = (the_random <= 0) ? 1 : (the_random > 30) ? 30 : the_random;

		return the_random;
	}


	/*****************************/
	/* 	 FONCTIONS FIN DU JEU  	 */
	/*****************************/

	// Après chaque attaque, on vérifie si un personnage a ses PV à 0
	function checkWin() {

		if(getPersoAttr('ally', 'life') <= 0) {
			winner = 'ennemy';
			return true;
		}

		if(getPersoAttr('ennemy', 'life') <= 0) {
			winner = 'ally';
			return true;
		}
		return false;
	}

	// Fonction pour updater en temps réel les données de l'utilisateur (A chaque victoire, défaite, ou arcade remportée)
	function updateUser(type) {

		var data = {};
		data.type = type;
		data.pseudo = user.pseudo;

		makeAjax('POST', 'battle/updateUser', data, function() {
			console.log('updateUser', _this.response);
		});
	}

	function updateUserPerso(id_perso) {

		var data = {};
		data.id_perso = id_perso;

		makeAjax('POST', 'battle/updateUserPerso', data, function() {

			console.log('updateUserPerso', _this.response);

			if(_this.response.check === 'OK') {
				var get_perso = _this.response.perso[0];

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

		var current_level = ally.level;
		var current_xp = ally.xp;
		var exp;

		if(what === 'win') {

			exp = 10;

			current_xp = current_xp + exp;

			if((current_level * exp) === current_xp) { // Si 2 * 10 = 20

				current_level = current_level + 1; // On augmente le niveau
				current_xp = 0;
			}

		} else if(what === 'arcade') {
			
			exp = 0;

			for (var i = 0; i < 5; i++) {

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

		var data = {
			'perso' : ally
		};

		makeAjax('POST', 'battle/updateLevelExp', data, function() {
			console.log('updateExp', _this.response);
		});

		var exp_width = Math.round(ally.xp / ally.level)*10;

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
			console.log('recordFight', _this.response);
		});
	}

	// Fonction appellée une fois une Arcade remportée
	function endArcade() {

		emptyChat();
		chat('FELICITATIONS ! VOUS AVEZ TERMINE UNE ARCADE');
		chat('<button class="play_again">Rejouer</button>');

		$('.nb_arcade em').text(parseInt($('.nb_arcade em').text()) + 1);

		updateUser('arcade');

		var arcades_now = parseInt($('.nb_arcade em').text());

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

		console.log('ennemy', ennemy);

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

	/*****************************/
	/* 	    FONCTIONS COMBAT  	 */
	/*****************************/

	// Fonction pour calculer les dégâts en fonction des caractéristiques de chaque personnage
	function calculForce(power, type, who) {

		// SI L'ATTAQUE EST PHYSIQUE
		if(type === 'physic') {

			if(who === 'ally') {
				power = (ally.atk >= ennemy.def) ? power + 5 : power - 5;

			} else if(who === 'ennemy') {

				power = (ennemy.atk >= ally.def) ? power + 5 : power - 5;
			}

		// SI L'ATTAQUE EST MAGIQUE
		} else if(type === 'special') {

			if(who === 'ally') {
				power = (ally.atk_spe >= ennemy.def_spe) ? power + 5 : power - 5;

			} else if(who === 'ennemy') {

				power = (ennemy.atk_spe >= ally.def_spe) ? power + 5 : power - 5;
			}
		}

		//GESTION DES NIVEAUX

		if(who === 'ally') {
			power = (ally.level > ennemy.level) ? power + (2*(ally.level - ennemy.level)) : power - (2*(ally.level - ennemy.level));

		} else if(who === 'ennemy') {

			power = (ally.level > ennemy.level) ? power - (2*(ally.level - ennemy.level)) : power + (2*(ally.level - ennemy.level));
		}

		return power;
	}

	// Fonction lancée pour lancer le tour de l'ennemi et simuler l'IA
	function ennemyTurn() {
		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().hide();
		$('.button_return').hide();

		setTimeout(function() {

			random_attack = (attack_defined === false) ? rand(1,4) : random_attack;

			var ennemy_attack;

			switch(random_attack) {
				case 1:
					ennemy_attack = ennemy.attack_1;
				break;
				case 2:
					ennemy_attack = ennemy.attack_2;
				break;
				case 3:
					ennemy_attack = ennemy.attack_3;
				break;
				case 4:
					ennemy_attack = ennemy.attack_4;
				break;
			}

			attack('ennemy', ennemy_attack);

		}, 2000);
	}

	// Fonction qui va lancer l'attaque et effectuer les actions relatives à la pré-attaque et la post-attaque
	function attack(who, that) {

		var name_attack;
		var power_attack;
		var requis_attack;
		var type_attack;
		var anim_attack;

		if(who === 'ally') {

			if(attack_ended === 1) {

				attack_ended = 0;

				if(getPersoAttr('ally', 'pp') >= parseInt(that.attr('data-requis'))) {

					name_attack = that.find('em').text();
					power_attack = parseInt(that.attr('data-power'));
					requis_attack = that.attr('data-requis');
					type_attack = that.attr('data-type');
					anim_attack = that.attr('data-anim');

					emptyChat();

					power_attack = calculForce(power_attack, type_attack, 'ally');
					var check_critik = rand(1,10);

					makeAnimation('ally', anim_attack, function() {

						if(check_critik === 8) {
							power_attack = power_attack + 15;
							chat('Coup critique !');
						}

						chat('Vous avez attaqué l\'adversaire avec '+name_attack);
						chat('L\'adversaire a perdu '+power_attack+' points de vie');
						chat('Vous avez perdu '+requis_attack+' points de pouvoir');

						// Mise à jour des PP
						setPersoAttr('ally', 'pp', -requis_attack);

						// Mise à jour de la vie de l'adversaire
						setPersoAttr('ennemy', 'life', -power_attack);

						(!checkWin()) ? ennemyTurn() : endGame();
					});
					
				} else {
					popError('Pas assez de PP pour cette attaque.');
					$('.choose .button_attack').parent().show();
				}

				attack_ended = 1;
			}

		} else if(who === 'ennemy') {

			attack_ended = 1;

			if(getPersoAttr('ennemy', 'pp') > parseInt(that.requis)) {

				name_attack = that.name;
				power_attack = that.power;
				requis_attack = that.requis;
				type_attack = that.type;
				anim_attack = that.anim;

				emptyChat();

				power_attack = calculForce(power_attack, type_attack, 'ennemy');
				var check_critik = rand(1,10);

				makeAnimation('ennemy', anim_attack, function() {

					if(check_critik === 8) {
						power_attack = power_attack + 15;
						chat('Coup critique !');
					}

					chat('L\'adversaire vous a attaqué avec '+name_attack);
					chat('Vous avez perdu '+power_attack+' points de vie');
					chat('L\'adversaire a perdu '+requis_attack+' points de pouvoir');

					// Mise à jour des PP
					setPersoAttr('ennemy', 'pp', -requis_attack);

					// Mise à jour de la vie de l'adversaire
					setPersoAttr('ally', 'life', -power_attack);

					if(checkWin()) {
						endGame();
					} else {
						$('.button_return').hide();
						$('.choose .button_depart').parent().show();
					}
				});

			} else {

				// Si les PP adverses sont inférieurs à la moitié on les régénère
				if(getPersoAttr('ennemy', 'pp') < 50) {

					setPersoAttr('ennemy', 'pp', 50);

					$('.button_return').hide();
					$('.choose .button_depart').parent().show();

				// Sinon, il lance une nouvelle attaque
				} else {
					ennemyTurn();
				}
			}
		}
	}

	// Fonction pour mettre en place les animations relatives au attaques (les animations étant créées en CSS3)
	function makeAnimation(who_attack, anim_attack, callback) {

		var who_receive = (who_attack === 'ally') ? 'ennemy' : (who_attack === 'ennemy') ? 'ally' : '';

		if(anim_attack == 'monochrome') {

			$('.battle').addClass('battle_monochrome');

			var duration = $('.battle_monochrome').css('animation-duration');

			if(duration.length == 2) {
				duration = duration.substr(0,1);
				duration = parseInt(duration) * 1000;
			} else {
				duration = duration.substr(0,3);
				duration = parseFloat(duration) * 1000;
			}

			setTimeout(function() {

				$('.battle').removeClass('battle_monochrome');
				$('.'+who_receive+'').addClass('injured');

				setTimeout(function() {
					$('.'+who_receive+'').removeClass('injured');
					callback();
				}, 1000);

			}, duration);

		} else {

			if(anim_attack == 'ultimate') {
				$('html, body').css('overflow', 'hidden');
			}

			$('.'+who_receive+' .anim').append('<div class="anim_'+anim_attack+'"></div>');
			$('.'+who_receive+' .anim').show();

			// Animation duration from the CSS given to the setTimeout function
			var duration = $('.anim_'+anim_attack).css('animation-duration');
			duration = (duration.length === 2) ? parseInt(duration.substr(0,1)) * 1000 : parseFloat(duration.substr(0,3)) * 1000;

			setTimeout(function() {

				if(disappear_attack === true) {
					$('.'+who_receive+' .anim').hide();
					$('.'+who_receive+' .anim div').remove();
				}
				
				$('html, body').css('overflow', 'auto');
				$('.'+who_receive+'').addClass('injured');

				setTimeout(function() {
					$('.'+who_receive+'').removeClass('injured');
					callback();
				}, 1000);

			}, duration);
		}
	}

});
