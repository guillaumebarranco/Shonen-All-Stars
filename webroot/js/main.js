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

	var al = $('.ally .status .life');
	var el = $('.ennemy .status .life');
	var ap = $('.ally .status .pp');
	var ep = $('.ennemy .status .pp');

	$('.battle').hide();
	$('.before_battle h2').hide();
	$('.pseudo').hide();
	$('.sign_log_in form').hide();
	$('.anim').hide();
	$('.return_sign_log_in').hide();

	$('.choose .button_attack').parent().hide();
	$('.choose .button_tools').parent().hide();

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

		var pseudo = $(this).find('input[name=pseudo]').val();
		var password = $(this).find('input[name=password]').val();
		var what_form = $(this).attr('class');

		if(pseudo != null && pseudo != '') {

			var data = {};
			data.pseudo = pseudo;
			data.password = password;
			data.what_form = what_form;

			// Fonction AJAX
			makeAjax('POST', "battle/signLogIn", data, function() {

				console.log('log_sign_in', _this.response);

				if(_this.response.check === 'OK') {

					console.log(_this.response);

					if(_this.response.user[0] != undefined) {
						user = _this.response.user[0];
					} else {
						user = _this.response.user;
					}

					if(what_form === 'signIn') {
						user.win = user.lost = user.arcades = 0;
					}

					var txt_pseudo = 
						user.pseudo +
						'<span class="nb_win">Win <em>'+user.win+'</em></span>'+
						'<span class="nb_lost">Lost <em>'+user.lost+'</em></span>'+
						'<span class="nb_arcade">Arcades <em>'+user.arcades+'</em></span>'
					;

					$('.pseudo').html(txt_pseudo);
					$('.pseudo').show();
					$('.sign_log_in').hide();
					getAllPersos();
					
				} else {
					alert('Pseudo déjà pris ou bug.');
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

				if(_this.response.user[0] != undefined) {
					user = _this.response.user[0];
				} else {
					user = _this.response.user;
				}

				getAllPersos();

			}
		});
	}

	// Fonction AJAX qui récupère tous les personnages et leurs attaques pour que l'utilisateur choisisse son personnage

	function getAllPersos() {

		makeAjax('POST', 'battle/getPersos', '', function() {

			console.log('getPersos', _this.response);

			_this.response = _this.response.persos;

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

					if(_this.response[p].id == 26 || _this.response[p].id == 25 || _this.response[p].id == 12) {

						li_append += 
							'<div class="sub">Vous devez terminer '+_this.response[p].condition+' arcades pour débloquer ce personnage !</div>'
						;

					} else {

						li_append += 
							'<div class="sub">Vous devez vous attraper ce personnage pour pouvoir le jouer !</div>'
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
	}

	/*****************************/
	/* 	  GESTION DES CLICKS	 */
	/*****************************/

	$(document).on('click', '.choose_perso li img.unlocked', function() {

		var id_chosen = $(this).parent().attr('data-id');
		var random_ennemy = rand(1,_this.all_persos.length -1);

		_this.all_persos[id_chosen].side = 'ally';
		_this.all_persos[random_ennemy].side = 'ennemy';
		
		ally = _this.all_persos[id_chosen];
		ennemy = _this.all_persos[random_ennemy];

		$('.ally').find('.picture img').attr('src', 'img/persos/'+ally.img_back);
		$('.ennemy').find('.picture img').attr('src', 'img/persos/'+ennemy.img_front);

		$('.ally .status .name').text(ally.name);
		$('.ennemy .status .name').text(ennemy.name);

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

	});
	
	// Bouton de retour dans le jeu (pour quitter les attaques et revenir sur les objets par exemple)
	$('.button_return').on('click', function(e) {
		e.preventDefault();
		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().show();
	});

	// Au click sur le bouton Attack, on affiche les 4 attaques
	$('.make_attack').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_attack').parent().show();
	});

	// Au click sur le bouton Tools, on affiche les 4 objets
	$('.use_tools').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_tools').parent().show();
	});

	// Au clic sur l'objet Potion de Vie
	$('.button_life_potion').on('click', function() {
		updateLife();
	});

	// Au clic sur l'objet Potion de PP
	$('.button_pp_potion').on('click', function() {
		updatePP();
	});

	// Au clic sur l'objet Recovery Potion
	$('.button_life_pp_potion').on('click', function() {
		updateLifePP();
	});

	// Au clic sur l'objet Shosinsui
	$('.button_shosinsui').on('click', function() {
		shosinsui();
	});
	
	// Au clic sur une attaque
	$('.button_attack').on('click', function() {
		attack('ally', $(this));
	});

	// Au clic sur le bouton "Rejouer" après avoir perdu un combat ou gagné une arcade
	$(document).off('click', '.play_again');
	$(document).on('click', '.play_again', function() {
		playAgain();
	});

	// Au clic sur Manga Ball

	$('.manga_ball').on('click', function() {
		mangaBall();
	});
 
	/*****************************/
	/* 	  FONCTIONS GENERIQUES	 */
	/*****************************/

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

		if(parseInt(al.find('strong').text()) <= 50) {
			al.find('strong').text(parseInt(al.find('strong').text()) + 50);
			al.find('span').width(al.find('span').width() + 50*3);
			ennemyTurn();

		} else {
			alert('You have too much life to use it');
		}
	}

	// Action de la Potion de PP
	function updatePP() {

		if(parseInt(ap.find('strong').text()) <= 50) {
			ap.find('strong').text(parseInt(ap.find('strong').text()) + 50);
			ap.find('span').width(ap.find('span').width() + 50*3);
			ennemyTurn();

		} else {
			alert('You have too much PP to use it');
		}
	}

	// Action de la Recovery Potion
	function updateLifePP() {

		if(parseInt(ap.find('strong').text()) <= 75 && parseInt(al.find('strong').text()) <= 75) {
			ap.find('strong').text(parseInt(ap.find('strong').text()) + 25);
			ap.find('span').width(ap.find('span').width() + 25*3);
			al.find('strong').text(parseInt(al.find('strong').text()) + 25);
			al.find('span').width(al.find('span').width() + 25*3);
			ennemyTurn();

		} else {
			alert('You have too much PP or Life to use it');
		}
	}

	// Action de la Shosinsui
	function shosinsui() {

		if(parseInt(ap.find('strong').text()) >= 50) {
			ap.find('strong').text(parseInt(ap.find('strong').text()) - 50);
			ap.find('span').width(ap.find('span').width() - 50*3);
			al.find('strong').text('100');
			al.find('span').width(300);
			ennemyTurn();

		} else {
			alert('You have not enough PP to use it');
		}
	}

	// Fonction de lancement d'une Manga Ball

	function mangaBall() {

		var ennemy_name = $('.ennemy .status .name').text();
		var is_unlocked = false;
		var ennemy_id;

		for (var c = 0; c < _this.all_persos.length; c++) {
			if(_this.all_persos[c].name == ennemy_name) {

				ennemy_id = _this.all_persos[c].id;

				if(_this.all_persos[c].unlocked == 1) {
					is_unlocked = true;
				}
			}
		}

		if(!is_unlocked) {

			// Impossible d'attraper les personnages que l'on obtient seulement en finissant des arcades
			if(ennemy_id != 26 || ennemy_id != 25 || ennemy_id != 12) {

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

					var is_possible;
					var ennemy_life = parseInt(el.find('strong').text());
					var catched = 0;

					if(ennemy_life === 100) {
						is_possible = false;
					} else {

						is_possible = true;

						catched = rand(1, Math.floor((ennemy_life/10)));

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

					if(catched === 3 && is_possible) {
						chat('Félicitations ! Vous avez attrapé '+ennemy_name);
						chat('Vous pouvez désormais jouer avec '+ennemy_name);
						updateUserPerso(ennemy_id);

						winner = 'catch';
						endGame();
					} else {
						chat('Vous avez manqué le personnage, dommage.');
					}

					ennemyTurn();

				}, duration);
			
			} else {
				alert('Vous ne pouvez pas obtenir ce personnage de cette façon !');
			}

		} else {
			alert('Ce personnage est déjà disponible, vous ne pouvez pas l\'attraper !');
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
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/*****************************/
	/* 	 FONCTIONS FIN DU JEU  	 */
	/*****************************/

	// Après chaque attaque, on vérifie si un personnage a ses PV à 0
	function checkWin() {

		if(parseInt(al.find('strong').text()) <= 0) {
			winner = 'ennemy';
			return true;
		}

		if(parseInt(el.find('strong').text()) <= 0) {
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

		//emptyChat();

		recordFight();

		if(winner === 'ally') {
			updateUser('win');
			chat('Les points de vie de votre adversaire sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">gagné</span> !');

			$('.nb_win em').text(parseInt($('.nb_win em').text()) + 1);

			arcade++;

			setTimeout(function() {

				if(arcade < 5) {
					newFight();
				} else {
					endArcade();
				}
				
			}, 2000);

		} else if(winner === 'ennemy') {
			arcade = 0;
			updateUser('lost');
			chat('Vos points de vie sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">perdu</span> !');
			chat('<button class="play_again">Rejouer</button>');
			$('.nb_lost em').text(parseInt($('.nb_lost em').text()) + 1);

		} else if(winner == 'catch') {

			arcade = 0;
			chat('Vous pouvez rejouer une arcade et sélectionnez si vous le voulez votre nouveau personnage !');
			chat('<button class="play_again">Rejouer</button>');

		}
	}

	// Fonction pour enregistrer les données du combat en BDD
	function recordFight() {

		data = {};
		data.user = user.pseudo;
		data.ally = ally.name;
		data.ennemy = ennemy.name;
		data.result = 'lost';

		if(winner === 'ally') {
			data.result = 'win';
		}

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
		}

		updateUserPerso(id_perso);

	}

	// Fonction utilisée pour démarrer un nouveau combat (après une victoire de l'utilisateur)
	function newFight() {

		emptyChat();

		// On régénère les PV et PP des deux personnages
		$('.status span').width(300);
		$('.status strong').text('100');

		var random_ennemy = rand(1,_this.all_persos.length -1);

		_this.all_persos[random_ennemy].side = 'ennemy';

		ennemy = _this.all_persos[random_ennemy];

		$('.ennemy .status .name').text(ennemy.name);
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

		ap.find('strong').text('100');
		ap.find('span').width(300);
		al.find('strong').text('100');
		al.find('span').width(300);

		ep.find('strong').text('100');
		ep.find('span').width(300);
		el.find('strong').text('100');
		el.find('span').width(300);

		$('.choose_perso').empty();
		$('.choose_perso').show();

		getAllPersos();
	}

	/*****************************/
	/* 	    FONCTIONS COMBAT  	 */
	/*****************************/

	// Fonction pour calculer les dégâts en fonction des caractéristiques de chaque personnage
	function calculForce(power, type, who) {

		if(type === 'physic') {

			if(who === 'ally') {
				if(ally.atk >= ennemy.def) {
					power = power + 5;
				} else {
					power = power - 5;
				}

			} else if(who === 'ennemy') {
				if(ennemy.atk >= ally.def) {
					power = power + 5;
				} else {
					power = power - 5;
				}
			}

		} else if(type === 'special') {

			if(who === 'ally') {
				if(ally.atk_spe >= ennemy.def_spe) {
					power = power + 5;
				} else {
					power = power - 5;
				}

			} else if(who === 'ennemy') {
				if(ennemy.atk_spe >= ally.def_spe) {
					power = power + 5;
				} else {
					power = power - 5;
				}
			}
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

			var random = rand(1,4);
			var ennemy_attack;

			switch(random) {
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

		if(who === 'ally') {

			console.log('attack_ended', attack_ended);

			if(attack_ended === 1) {

				attack_ended = 0;

				if(parseInt(ap.find('strong').text()) >= parseInt(that.attr('data-requis'))) {

					var name_attack = that.find('em').text();
					var power_attack = parseInt(that.attr('data-power'));
					var requis_attack = that.attr('data-requis');
					var type_attack = that.attr('data-type');
					var anim_attack = that.attr('data-anim');

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

						ap.find('span').width(ap.find('span').width() - requis_attack*3);
						ap.find('strong').text(parseInt(ap.find('strong').text()) - requis_attack);

						// Mise à jour de la vie de l'adversaire

						el.find('span').width(el.find('span').width() - power_attack*3);
						el.find('strong').text(parseInt(el.find('strong').text()) - power_attack);


						if(!checkWin()) {
							ennemyTurn();
						} else {
							endGame();
						}
					});
					
				} else {
					alert('not enough pp');
				}

				attack_ended = 1;
			}

		} else if(who === 'ennemy') {

			attack_ended = 1;

			if(parseInt(ep.find('strong').text()) > parseInt(that.requis)) {

				var name_attack = that.name;
				var power_attack = that.power;
				var requis_attack = that.requis;
				var type_attack = that.type;
				var anim_attack = that.anim;

				emptyChat();

				// Mise à jour des PP

				ep.find('span').width(ep.find('span').width() - requis_attack*3);
				ep.find('strong').text(parseInt(ep.find('strong').text()) - requis_attack);

				// Mise à jour de la vie de l'adversaire

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

					al.find('span').width(al.find('span').width() - power_attack*3);
					al.find('strong').text(parseInt(al.find('strong').text()) - power_attack);

					if(checkWin()) {
						endGame();
					} else {
						$('.button_return').hide();
						$('.choose .button_depart').parent().show();
					}
				});

			} else {

				// Si les PP adverses sont inférieurs à la moitié on les régénère
				if(parseInt(ep.find('strong').text()) < 50) {
					ep.find('strong').text(parseInt(ep.find('strong').text()) + 50);
					ep.find('span').width(ep.find('span').width() + 50*3);
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

		var who_receive;

		if(who_attack === 'ally') {
			who_receive = 'ennemy';
		} else if(who_attack === 'ennemy') {
			who_receive = 'ally';
		}

		if(anim_attack == 'ultimate') {
			$('html, body').css('overflow', 'hidden');
		}

		$('.'+who_receive+' .anim').append('<div class="anim_'+anim_attack+'"></div>');
		$('.'+who_receive+' .anim').show();

		// Animation duration from the CSS given to the setTimeout function
		var duration = $('.anim_'+anim_attack).css('-webkit-animation-duration');

		if(duration.length == 2) {
			duration = duration.substr(0,1);
			duration = parseInt(duration) * 1000;
		} else {
			duration = duration.substr(0,3);
			duration = parseFloat(duration) * 1000;
		}

		setTimeout(function() {

			$('.'+who_receive+' .anim').hide();
			$('.'+who_receive+' .anim div').remove();
			$('html, body').css('overflow', 'auto');
			$('.'+who_receive+'').addClass('injured');

			setTimeout(function() {
				$('.'+who_receive+'').removeClass('injured');
				callback();
			}, 1000);

		}, duration);
	}

});