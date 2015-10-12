"use strict";

$(document).ready(function() {

	//import * as myModule from "init_battle.js";

	// Fonction AJAX qui récupère tous les personnages et leurs attaques pour que l'utilisateur choisisse son personnage
	

	// Si Sign In, création des persos pour le User
	const getUserPersos = () => {
		makeAjax('POST', 'battle/getUserPersos', '', function() {
			getAllPersos();
		});
	};

	/*****************************/
	/* 	  GESTION DES CLICKS	 */
	/*****************************/

	$(document).on('click', '.choose_perso li img.unlocked', function() {
		let id_chosen = $(this).parent().attr('data-id');
		beginBattle(id_chosen);
	});

	beginBattle = (id_chosen, argument) => {

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

		//console.log('ennemy', ennemy);

		if(ennemy.name == 'Saitama') {
			while(ennemy.name == 'Saitama') {
				random_ennemy = rand(1,_this.all_persos.length -1);
				_this.all_persos[random_ennemy].side = 'ennemy';

				ennemy = _this.all_persos[random_ennemy];
			}
		}

		$('.ally').find('.picture img').attr('src', WEB_URL+'img/persos/'+ally.img_back);
		$('.ennemy').find('.picture img').attr('src', WEB_URL+'img/persos/'+ennemy.img_front);

		// ECRITURE DU NOM DU PERSONNAGE
		
		let exp_width = Math.round(ally.xp / ally.level)*10;

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

});
