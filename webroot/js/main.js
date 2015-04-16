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

	var al = $('.ally .status .life');
	var el = $('.ennemy .status .life');
	var ap = $('.ally .status .pp');
	var ep = $('.ennemy .status .pp');

	$('.battle').hide();
	$('.before_battle h2').hide();
	$('.pseudo').hide();
	$('.sign_log_in form').hide();

	/*****************************/
	/* 	   LOG IN / SIGN IN      */
	/*****************************/

	$('.buttons_sign_log_in button').on('click', function() {

		$(this).parent().hide();

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

		if(pseudo != null && pseudo != '') {

			var data = {};
			data.pseudo = pseudo;

			// Fonction AJAX
			makeAjax('POST', "battle/"+$(this).attr('class'), data, function() {

				console.log('log_sign_in', _this.response);

				if(_this.response.check === 'OK') {

					console.log(_this.response);

					if(_this.response.user[0] != undefined) {
						user = _this.response.user[0];
					} else {
						user = _this.response.user;
					}

					$('.pseudo').text(user.pseudo);
					$('.pseudo').show();
					$('.sign_log_in').hide();
					getAllPersos();
					
				} else {
					alert('pseudo déjà pris ou bug');
				}
			});

		} else {
			alert('veuillez entrer un pseudo');
		}

	});

	/*****************************/
	/* 	       GET PERSOS      	 */
	/*****************************/

	function getAllPersos() {

		makeAjax('POST', 'battle/getPersos', '', function() {

			console.log('getPersos', _this.response);

			_this.response = _this.response.persos;

			$('.before_battle h2').show();

			for (var p = 0; p < _this.response.length; p++) {

				var li_append =
					'<li data-id="'+p+'">'+
						'<img src="img/persos/'+_this.response[p].img_front+'"/>'+
					'</li>'
				;
				$('.choose_perso').append(li_append);
			}

			$(document).on('click', '.choose_perso li img', function() {

				_this.all_persos = _this.response;

				var id_chosen = $(this).parent().attr('data-id');
				var random_ennemy = rand(1,_this.response.length -1);

				_this.response[id_chosen].side = 'ally';
				_this.response[random_ennemy].side = 'ennemy';
				
				ally = _this.response[id_chosen];
				ennemy = _this.response[random_ennemy];

				$('.ally').find('img').attr('src', 'img/persos/'+ally.img_back);
				$('.ennemy').find('img').attr('src', 'img/persos/'+ennemy.img_front);

				$('.ally .status .name').text(ally.name);
				$('.ennemy .status .name').text(ennemy.name);

				$('.choose .button_attack1').text(ally.attack_1.name);
				$('.choose .button_attack2').text(ally.attack_2.name);
				$('.choose .button_attack3').text(ally.attack_3.name);
				$('.choose .button_attack4').text(ally.attack_4.name);

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

				$('.battle').show();
				$('.before_battle').hide();

				if(ennemy.vit >= ally.vit) {
					ennemyTurn();
				}

			});
		});
	}


	/*****************************/
	/* 	  GESTION DES CLICKS	 */
	/*****************************/

	$('.choose .button_attack').parent().hide();
	$('.choose .button_tools').parent().hide();

	$('.make_attack').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_attack').parent().show();
	});

	$('.use_tools').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_tools').parent().show();
	});

	$('.button_life_potion').on('click', function() {
		updateLife();
	});

	$('.button_pp_potion').on('click', function() {
		updatePP();
	});

	$('.button_attack').on('click', function() {
		attack('ally', $(this));
	});

	/*****************************/
	/* 	  FONCTIONS GENERIQUES	 */
	/*****************************/

	function makeAjax(type, url, data, callback) {

		$.ajax({
			type : type,
			url : url,
			data : data,
			success: function(response_get) {
				_this.response = response_get;
				callback();
			},
			
			error: function(){
				console.log('error', url);
	        }
		});
	}

	function updateLife() {

		if(parseInt(al.find('strong').text()) <= 50) {
			al.find('strong').text(parseInt(al.find('strong').text()) + 50);
			al.find('span').width(al.find('span').width() + 50*3);
			ennemyTurn();

		} else {
			alert('You have too much life to use it');
		}
	}

	function updatePP() {

		if(parseInt(ap.find('strong').text()) <= 50) {
			ap.find('strong').text(parseInt(ap.find('strong').text()) + 50);
			ap.find('span').width(ap.find('span').width() + 50*3);
			ennemyTurn();

		} else {
			alert('You have too much PP to use it');
		}
	}

	function chat(txt) {
		$('.chat').append('<p>'+txt+'</p>');
	}

	function emptyChat() {
		$('.chat').empty();
	}

	function rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/*****************************/
	/* 	 FONCTIONS FIN DU JEU  	 */
	/*****************************/

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

	function updateUser(type) {

		var data = {};
		data.type = type;
		data.pseudo = user.pseudo;

		makeAjax('POST', 'battle/updateUser', data, function() {
			console.log('updateUser', _this.response);
		});
	}

	function endGame() {

		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().hide();

		emptyChat();

		recordFight();

		if(winner === 'ally') {
			updateUser('win');
			chat('Les points de vie de votre adversaire sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">gagné</span> !');

			setTimeout(function() {
				newFight();
			}, 2000);

		} else if(winner === 'ennemy') {
			updateUser('lost');
			chat('Vos points de vie sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">perdu</span> !');
		}


	}

	function recordFight() {

		data = {};
		data['user'] = user.pseudo;
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

	function newFight() {

		emptyChat();

		$('.status span').width(300);
		$('.status strong').text('100');

		var random_ennemy = rand(1,_this.all_persos.length -1);

		_this.all_persos[random_ennemy].side = 'ennemy';

		ennemy = _this.all_persos[random_ennemy];

		console.log('ennemy fight 2', ennemy);

		$('.ennemy').find('img').attr('src', 'img/persos/'+ennemy.img_front);

		if(ennemy.vit >= ally.vit) {
			console.log('ennemy turn 2');
			ennemyTurn();
		} else {
			$('.choose .button_depart').parent().show();
		}
	}

	/*****************************/
	/* 	    FONCTIONS COMBAT  	 */
	/*****************************/

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

	function ennemyTurn() {
		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().hide();

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

	function attack(who, that) {

		if(who === 'ally') {

			if(parseInt(ap.find('strong').text()) >= parseInt(that.attr('data-requis'))) {

				var name_attack = that.text();
				var power_attack = parseInt(that.attr('data-power'));
				var requis_attack = that.attr('data-requis');
				var type_attack = that.attr('data-type');

				emptyChat();

				power_attack = calculForce(power_attack, type_attack, 'ally');
				var check_critik = rand(1,10);

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
			} else {
				alert('not enough pp');
			}	

		} else if(who === 'ennemy') {

			if(parseInt(ep.find('strong').text()) > parseInt(that.requis)) {

				var name_attack = that.name;
				var power_attack = that.power;
				var requis_attack = that.requis;
				var type_attack = that.type;

				emptyChat();

				// Mise à jour des PP

				ep.find('span').width(ep.find('span').width() - requis_attack*3);
				ep.find('strong').text(parseInt(ep.find('strong').text()) - requis_attack);

				// Mise à jour de la vie de l'adversaire

				power_attack = calculForce(power_attack, type_attack, 'ennemy');
				var check_critik = rand(1,10);

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
					$('.choose .button_depart').parent().show();
				}

			} else {

				// Si les PP adverses sont inférieurs à la moitié on les régénère
				if(parseInt(ep.find('strong').text()) < 50) {
					ep.find('strong').text(parseInt(ep.find('strong').text()) + 50);
					ep.find('span').width(ep.find('span').width() + 50*3);
					$('.choose .button_depart').parent().show();

				// Sinon, il lance une nouvelle attaque
				} else {
					ennemyTurn();
				}
			}
		}
	}

});