$(document).ready(function() {

	var turn;
	var ally;
	var ennemy;
	var winner;
	var _this = this;

	$.ajax({
		type : "POST",
		url : "battle/getPersos",
		success: function(response) {

			response[0].side = 'ally';
			response[0].side = 'ennemy';
			
			ally = response[0];
			ennemy = response[1];

			$('.ally').find('img').attr('src', 'img/persos/'+ally.img_back);
			$('.ennemy').find('img').attr('src', 'img/persos/'+ennemy.img_front);

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
		},

		error: function(){
			console.log('error');
        }
	});

	$('.make_attack').on('click', function() {
		$('.choose .button_depart').parent().hide();
		$('.choose .button_attack').show();
	});

	$('.button_attack').on('click', function() {

		attack('ally', $(this));

	});

	function chat(txt) {
		$('.chat').append('<p>'+txt+'</p>');
	}

	function emptyChat() {
		$('.chat').empty();
	}

	function rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function checkWin() {
		var al = $('.ally .status .life');
		var el = $('.ennemy .status .life');

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
		emptyChat();

		if(winner === 'ally') {
			chat('Les points de vie de votre adversaire sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">gagné</span> !');
		} else if(winner === 'ennemy') {
			chat('Vos points de vie sont tombé à zéro.');
			chat('Vous avez <span style="color:red;text-transform:uppercase;">perdu</span> !');
		}
	}

	function ennemyTurn() {
		console.log('ennemyturn');

		setTimeout(function() {

			var random = rand(1,4);
			console.log('random', random);
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

			var name_attack = that.text();
			var power_attack = parseInt(that.attr('data-power'));
			var requis_attack = that.attr('data-requis');

			emptyChat();

			chat('Vous avez attaqué l\'adversaire avec '+name_attack);
			chat('L\'adversaire a perdu '+power_attack+' points de vie');
			chat('Vous avez perdu '+requis_attack+' points de pouvoir');

			// Mise à jour des PP

			var ap = $('.ally .status .pp');
			ap.find('span').width(ap.find('span').width() - requis_attack*3);
			ap.find('strong').text(parseInt(ap.find('strong').text()) - requis_attack);

			// Mise à jour de la vie de l'adversaire

			var el = $('.ennemy .status .life');
			el.find('span').width(el.find('span').width() - power_attack*3);
			el.find('strong').text(parseInt(el.find('strong').text()) - power_attack);

			if(!checkWin()) {
				ennemyTurn();
			} else {
				endGame();
			}
			

		} else {

			console.log(that);

			var name_attack = that.name;
			var power_attack = that.power;
			var requis_attack = that.requis;

			emptyChat();

			chat('L\'adversaire vous a attaqué avec '+name_attack);
			chat('Vous avez perdu '+power_attack+' points de vie');
			chat('L\'adversaire a perdu '+requis_attack+' points de pouvoir');

			// Mise à jour des PP

			var ep = $('.ennemy .status .pp');
			ep.find('span').width(ep.find('span').width() - requis_attack*3);
			ep.find('strong').text(parseInt(ep.find('strong').text()) - requis_attack);

			// Mise à jour de la vie de l'adversaire

			console.log('power_attack', power_attack);

			var al = $('.ally .status .life');
			al.find('span').width(al.find('span').width() - power_attack*3);
			al.find('strong').text(parseInt(al.find('strong').text()) - power_attack);

			if(!checkWin()) {
				ennemyTurn();
			} else {
				endGame();
			}
		}
	}

});