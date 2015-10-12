/*****************************/
/* 	  FONCTIONS GENERIQUES	 */
/*****************************/

'use strict';

function getPersoAttr(who, what) {
	return parseInt($('.' + who + ' .status .' + what).find('strong').text());
}

function setPersoAttr(who, what, new_attr) {
	if (getPersoAttr(who, what) + new_attr >= 100) new_attr = 100 - getPersoAttr(who, what);
	$('.' + who + ' .status .' + what).find('strong').text(getPersoAttr(who, what) + new_attr);
	$('.' + who + ' .status .' + what).find('span').width($('.' + who + ' .status .' + what).find('span').width() + new_attr * 3);
}

// Action de la Potion de Vie
function updateLife() {

	if (getPersoAttr('ally', 'life') <= 50) {
		setPersoAttr('ally', 'life', 50);
		ennemyTurn();
	} else {
		popError('Vous avez trop de vie pour utiliser cette potion !');
		$('.choose .button_tools').parent().show();
	}
}

// Action de la Potion de PP
function updatePP() {

	if (getPersoAttr('ally', 'pp') <= 50) {

		setPersoAttr('ally', 'pp', 50);
		ennemyTurn();
	} else {
		popError('Vous avez trop de PP pour utiliser cette potion !');
		$('.choose .button_tools').parent().show();
	}
}

// Action de la Recovery Potion
function updateLifePP() {

	if (getPersoAttr('ally', 'pp') <= 75 && getPersoAttr('ally', 'life') <= 75) {

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

	if (getPersoAttr('ally', 'pp') >= 50) {

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

	var is_unlocked = ennemy.unlocked == 1 ? true : false;

	if (!is_unlocked) {

		//console.log('ennemy_id', ennemy_id);

		// Impossible d'attraper les personnages que l'on obtient seulement en finissant des arcades
		if (ennemy_id == 26 || ennemy_id == 25 || ennemy_id == 12 || ennemy_id == 29 || ennemy_id == 47 || ennemy_id == 54) {

			popError('Vous ne pouvez pas obtenir ce personnage de cette façon !');
			$('.choose .button_depart').parent().show();
		} else {

			$('.ennemy .anim').show();
			$('.ennemy .anim').append('<div class="anim_mangaball"></div>');

			var duration = $('.anim_mangaball').css('-webkit-animation-duration');

			if (duration.length == 2) {
				duration = duration.substr(0, 1);
				duration = parseInt(duration) * 1000;
			} else {
				duration = duration.substr(0, 3);
				duration = parseFloat(duration) * 1000;
			}

			emptyChat();
			chat('Vous avez lancé une Manga Ball !');

			setTimeout(function () {
				$('.ennemy .anim').hide();
				$('.anim_mangaball').remove();

				var ennemy_life = getPersoAttr('ennemy', 'life');
				var catched = 0;

				if (ennemy_life != 100) {

					catched = rand(1, Math.round(ennemy_life / 10));

					if (ennemy_life > 75) {
						catched = rand(1, 20);
					} else if (ennemy_life > 50 && ennemy_life <= 75) {
						catched = rand(1, 15);
					} else if (ennemy_life > 25 && ennemy_life <= 50) {
						catched = rand(1, 10);
					} else if (ennemy_life <= 25) {
						catched = rand(1, 5);
					}
				}

				if (master_ball) catched = 3;

				if (catched === 3) {
					chat('Félicitations ! Vous avez attrapé ' + ennemy_name);
					chat('Vous pouvez désormais jouer avec ' + ennemy_name);
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
		popError('Ce personnage est déjà disponible, vous ne pouvez pas l\'attraper !');
		$('.choose .button_depart').parent().show();
	}
}

// Fonction pour écrire dans la zone de texte
function chat(txt) {
	$('.chat').append('<p>' + txt + '</p>');
}

// Fonction pour vider la zone de texte
function emptyChat() {
	$('.chat').empty();
}

// Fonction pour générer un nombre aléatoire
function rand(min, max) {
	var the_random = Math.floor(Math.random() * (max - min + 1)) + min;

	// Pour gérer le niveau adverse qui ne peut pas être inférieur à 0 ni supérieur à 30
	the_random = the_random <= 0 ? 1 : the_random > 30 ? 30 : the_random;
	return the_random;
}

/*****************************/
/* 	    FONCTIONS COMBAT  	 */
/*****************************/

// Fonction pour calculer les dégâts en fonction des caractéristiques de chaque personnage
function calculForce(power, type, who) {

	// SI L'ATTAQUE EST PHYSIQUE
	if (type === 'physic') {

		if (who === 'ally') {
			power = ally.atk >= ennemy.def ? power + 5 : power - 5;
		} else if (who === 'ennemy') {
			power = ennemy.atk >= ally.def ? power + 5 : power - 5;
		}

		// SI L'ATTAQUE EST MAGIQUE
	} else if (type === 'special') {

			if (who === 'ally') {
				power = ally.atk_spe >= ennemy.def_spe ? power + 5 : power - 5;
			} else if (who === 'ennemy') {
				power = ennemy.atk_spe >= ally.def_spe ? power + 5 : power - 5;
			}
		}

	//GESTION DES NIVEAUX

	if (who === 'ally') {
		power = ally.level > ennemy.level ? power + 2 * (ally.level - ennemy.level) : power - 2 * (ally.level - ennemy.level);
	} else if (who === 'ennemy') {
		power = ally.level > ennemy.level ? power - 2 * (ally.level - ennemy.level) : power + 2 * (ally.level - ennemy.level);
	}

	return power;
}

// Fonction lancée pour lancer le tour de l'ennemi et simuler l'IA
function ennemyTurn() {
	$('.choose .button_attack').parent().hide();
	$('.choose .button_tools').parent().hide();
	$('.choose .button_depart').parent().hide();
	$('.button_return').hide();

	setTimeout(function () {

		random_attack = attack_defined === false ? rand(1, 4) : random_attack;

		var ennemy_attack = undefined;

		switch (random_attack) {
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

	var name_attack = undefined;
	var power_attack = undefined;
	var requis_attack = undefined;
	var type_attack = undefined;
	var anim_attack = undefined;
	var check_critik = undefined;

	if (who === 'ally') {

		if (attack_ended === 1) {

			attack_ended = 0;

			if (getPersoAttr('ally', 'pp') >= parseInt(that.attr('data-requis'))) {

				name_attack = that.find('em').text();
				power_attack = parseInt(that.attr('data-power'));
				requis_attack = that.attr('data-requis');
				type_attack = that.attr('data-type');
				anim_attack = that.attr('data-anim');

				emptyChat();

				power_attack = calculForce(power_attack, type_attack, 'ally');
				check_critik = rand(1, 10);

				makeAnimation('ally', anim_attack, function () {

					if (check_critik === 8) {
						power_attack = power_attack + 15;
						chat('Coup critique !');
					}

					chat('Vous avez attaqué l\'adversaire avec ' + name_attack);
					chat('L\'adversaire a perdu ' + power_attack + ' points de vie');
					chat('Vous avez perdu ' + requis_attack + ' points de pouvoir');

					// Mise à jour des PP
					setPersoAttr('ally', 'pp', -requis_attack);

					// Mise à jour de la vie de l'adversaire
					setPersoAttr('ennemy', 'life', -power_attack);

					!checkWin() ? ennemyTurn() : endGame();
				});
			} else {
				popError('Pas assez de PP pour cette attaque.');
				$('.choose .button_attack').parent().show();
			}

			attack_ended = 1;
		}
	} else if (who === 'ennemy') {

		attack_ended = 1;

		if (getPersoAttr('ennemy', 'pp') > parseInt(that.requis)) {

			name_attack = that.name;
			power_attack = that.power;
			requis_attack = that.requis;
			type_attack = that.type;
			anim_attack = that.anim;

			emptyChat();

			power_attack = calculForce(power_attack, type_attack, 'ennemy');
			check_critik = rand(1, 10);

			makeAnimation('ennemy', anim_attack, function () {

				if (check_critik === 8) {
					power_attack = power_attack + 15;
					chat('Coup critique !');
				}

				chat('L\'adversaire vous a attaqué avec ' + name_attack);
				chat('Vous avez perdu ' + power_attack + ' points de vie');
				chat('L\'adversaire a perdu ' + requis_attack + ' points de pouvoir');

				// Mise à jour des PP
				setPersoAttr('ennemy', 'pp', -requis_attack);

				// Mise à jour de la vie de l'adversaire
				setPersoAttr('ally', 'life', -power_attack);

				if (checkWin()) {
					endGame();
				} else {
					$('.button_return').hide();
					$('.choose .button_depart').parent().show();
				}
			});
		} else {

			// Si les PP adverses sont inférieurs à la moitié on les régénère
			if (getPersoAttr('ennemy', 'pp') < 50) {

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

	var who_receive = who_attack === 'ally' ? 'ennemy' : who_attack === 'ennemy' ? 'ally' : '',
	    duration = undefined;

	if (anim_attack == 'monochrome') {

		$('.battle').addClass('battle_monochrome');

		duration = $('.battle_monochrome').css('animation-duration');

		if (duration.length == 2) {
			duration = duration.substr(0, 1);
			duration = parseInt(duration) * 1000;
		} else {
			duration = duration.substr(0, 3);
			duration = parseFloat(duration) * 1000;
		}

		setTimeout(function () {

			$('.battle').removeClass('battle_monochrome');
			$('.' + who_receive + '').addClass('injured');

			setTimeout(function () {
				$('.' + who_receive + '').removeClass('injured');
				callback();
			}, 1000);
		}, duration);
	} else {

		if (anim_attack == 'ultimate') $('html, body').css('overflow', 'hidden');

		$('.' + who_receive + ' .anim').append('<div class="anim_' + anim_attack + '"></div>');
		$('.' + who_receive + ' .anim').show();

		// Animation duration from the CSS given to the setTimeout function
		duration = $('.anim_' + anim_attack).css('animation-duration');
		duration = duration.length === 2 ? parseInt(duration.substr(0, 1)) * 1000 : parseFloat(duration.substr(0, 3)) * 1000;

		setTimeout(function () {

			if (disappear_attack === true) {
				$('.' + who_receive + ' .anim').hide();
				$('.' + who_receive + ' .anim div').remove();
			}

			$('html, body').css('overflow', 'auto');
			$('.' + who_receive + '').addClass('injured');

			setTimeout(function () {
				$('.' + who_receive + '').removeClass('injured');
				callback();
			}, 1000);
		}, duration);
	}
}
