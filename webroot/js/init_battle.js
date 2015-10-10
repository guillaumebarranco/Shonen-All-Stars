"use strict";

const _this = this;

/*****************************/
/* 	       VARIABLES      	 */
/*****************************/

let turn;
var ally;
var ennemy;
var winner;

var user;
this.response = '';
this.all_persos = '';
var arcade = 0;
var attack_ended = 1;

const showCanvasAfterBattle = false;

// SI BESOIN DE TESTER UNE ATTAQUE ENNEMIE PARTICULIERE, CHANGER CES VARIABLES

var ennemy_defined = false;
var random_ennemy;

var attack_defined = false;
var random_attack;

var disappear_attack = true;

var master_ball = false;

$(document).ready(function() {


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
				password,
				what_form
			};

			// Fonction AJAX sign_in log_in
			checkConnection(data);			

		} else {
			alert('Veuillez entrer un pseudo et un mot de passe.');
		}

	});

	function getAllPersos () {

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

	function checkConnection(data) {
		makeAjax('POST', "battle/signLogIn", data, function() {

			console.log('log_sign_in', _this.response);

			if(_this.response.check === 'OK') {

				user = (_this.response.user[0] != undefined) ? _this.response.user[0] : _this.response.user;

				if(data.what_form === 'signIn') {
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

				console.log('connected user', _this.response);
				user = (_this.response.user[0] != undefined) ? _this.response.user[0] : _this.response.user;

				getAllPersos();
			}
		});
	}
});