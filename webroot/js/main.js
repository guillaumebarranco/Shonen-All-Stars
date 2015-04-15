$(document).ready(function() {

	var turn;
	var ally;
	var ennemy;
	var winner;
	var _this = this;

	var al = $('.ally .status .life');
	var el = $('.ennemy .status .life');
	var ap = $('.ally .status .pp');
	var ep = $('.ennemy .status .pp');

	$('.battle').hide();
	$('.before_battle h2').hide();

	$('.sign_log_in form').on('submit', function(e) {
		e.preventDefault();

		var pseudo = $(this).find('input[name=pseudo]').val();

		if(pseudo != null && pseudo != '') {
			$.ajax({
				type : "POST",
				url : "battle/"+$(this).attr('class'),
				data: {
					pseudo : pseudo
				},
				success: function(response) {

					if(response.check === 'OK') {
						$('.sign_log_in').hide();
						getAllPersos();
					} else {
						alert('pseudo déjà pris ou bug');
					}
				},

				error: function(){
					console.log('error');
		        }
			});
			} else {
				alert('veuillez entrer un pseudo');
			}

		
	});


	function getAllPersos() {

		$.ajax({
			type : "GET",
			url : "battle/getPersos",
			success: function(response) {

				console.log(response);

				$('.before_battle h2').show();

				for (var p = 0; p < response.length; p++) {

					var li_append =
						'<li data-id="'+p+'">'+
							'<img src="img/persos/'+response[p].img_front+'"/>'+
						'</li>'
					;
					$('.choose_perso').append(li_append);
				}

				$(document).on('click', '.choose_perso li img', function() {
					var id_chosen = $(this).parent().attr('data-id');
					console.log(id_chosen);
					var random_ennemy = rand(1,response.length -1);

					response[id_chosen].side = 'ally';
					response[random_ennemy].side = 'ennemy';
					
					ally = response[id_chosen];
					ennemy = response[random_ennemy];

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

			},

			error: function(){
				console.log('error');
	        }
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

	function endGame() {
		$('.choose .button_attack').parent().hide();
		$('.choose .button_tools').parent().hide();
		$('.choose .button_depart').parent().hide();
		emptyChat();

		if(winner === 'ally') {
			chat('Les points de vie de votre adversaire sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">gagné</span> !');
		} else if(winner === 'ennemy') {
			chat('Vos points de vie sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">perdu</span> !');
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

				var check_critik = rand(1,10)

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

				var check_critik = rand(1,10)

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

				if(parseInt(ep.find('strong').text()) < 50) {
					alert('IA regenerate mana');
					ep.find('strong').text(parseInt(ep.find('strong').text()) + 50);
					ep.find('span').width(ep.find('span').width() + 50*3);
					$('.choose .button_depart').parent().show();
				} else {
					ennemyTurn();
				}
			}
		}
	}

});