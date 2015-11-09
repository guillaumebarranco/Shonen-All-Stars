"use strict";

//this = window;
const _this = this;

/*****************************/
/* 	       VARIABLES      	 */
/*****************************/

let turn,
	ally,
	ennemy,
	winner;

//let user;
this.response = '';
this.all_persos = '';

let arcade = 0,
	attack_ended = 1;

let showCanvasAfterBattle = false;

// SI BESOIN DE TESTER UNE ATTAQUE ENNEMIE PARTICULIERE, CHANGER CES VARIABLES

let ennemy_defined = false,
	random_ennemy,
	attack_defined = false,
	random_attack,
	disappear_attack = true,
	master_ball = false;

$(document).ready(function() {


	/*****************************/
	/* 	       	 HIDES      	 */
	/*****************************/

	if(!showCanvasFromBeginning) $('.before_battle').show();

	$('.battle').hide();
	$('.before_battle h2').hide();
	$('.pseudo').hide();
	$('.sign_log_in form').hide();
	$('.anim').hide();
	$('.return_sign_log_in').hide();
	$('.button_return').hide();

	hideButtons(['attack', 'tools']);

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

		let show_what = $(this).attr('class');

		if(show_what === 'show_signIn') {
			$('.sign_log_in form.signIn').show();

		} else if(show_what === 'show_logIn') {
			$('.sign_log_in form.logIn').show();
		}

	});

	$('.sign_log_in form').on('submit', function(e) {

		e.preventDefault();

		let the_pseudo = $(this).find('input[name=pseudo]').val(),
			password = $(this).find('input[name=password]').val(),
			what_form = $(this).attr('class');

		if(the_pseudo != null && the_pseudo != '') {

			let data = {
				"pseudo" : the_pseudo,
				password,
				what_form
			};

			// Fonction AJAX sign_in log_in
			checkConnection(data);			

		} else {
			popError('Veuillez entrer un pseudo et un mot de passe.');
		}

	});

	function getAllPersos() {

		makeAjax('POST', 'battle/getPersos', '', function() {

			//console.log('getPersos', _this.response);

			_this.response = _this.response.persos;
			window.all_persos = _this.response;

			$('.before_battle h2').show();

			let li_append;

			for (let p = 0; p < _this.response.length; p++) {

				let picture_perso = _this.response[p].img_front;

				// Si le personnage a été débloqué
				if(_this.response[p].unlocked == 1) {

					li_append =
						`<li data-id="${p}">
							<img class="unlocked" src="${WEB_URL}img/persos/${picture_perso}"/>
						</li>`
					;

				} else {

					li_append = 
						`<li data-id="${p}">
						<img src="${WEB_URL}img/persos/${picture_perso}"/>`
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

	function checkConnection(data) {
		makeAjax('POST', "battle/signLogIn", data, function() {

			if(_this.response.check === 'OK') {

				user = (_this.response.user[0] != undefined) ? _this.response.user[0] : _this.response.user;
				user.persos = {};
				user.id_starter;

				if(data.what_form === 'signIn') user.win = user.lost = user.arcades = 0;

				pseudo = user.pseudo;

				let the_win = user.win,
					the_lost = user.lost,
					the_arcades = user.arcades;

				var txt_pseudo = 
					user.pseudo +
					`<span class="nb_win">Win <em>${the_win}</em></span>
					<span class="nb_lost">Lost <em>${the_lost}</em></span>
					<span class="nb_arcade">Arcades <em>${the_arcades}</em></span>`
				;

				$('.pseudo').html(txt_pseudo);
				$('.pseudo').show();
				$('.sign_log_in').hide();

				if(showCanvasFromBeginning) {
					$('canvas').show();
					$('.before_battle').hide();
				}
				
				(data.what_form == 'signIn') ? getUserPersos() : getAllPersos();
				
			} else {
				var the_alert = (data.what_form === 'logIn') ? 'Vous avez tapé un mauvais pseudo et/ou un mauvais mot de passe.' : 'Ce pseudo est déjà pris, essayez-en un autre.';
				popError(the_alert);
			}
		});
	}

	/*****************************/
	/* 	  GET PERSOS AND USER  	 */
	/*****************************/

	// Fonction appellée quand la $_SESSION récupère un utilisateur connecté
	function getConnectedUser() {

		makeAjax('POST', 'battle/getConnectedUser', '', function() {

			if(_this.response.check === 'OK') {
				user = (_this.response.user[0] != undefined) ? _this.response.user[0] : _this.response.user;
				user.persos = {};
				user.id_starter;
				getAllPersos();
			}
		});
	}
});
