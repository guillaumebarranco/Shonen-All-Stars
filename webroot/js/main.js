$(document).ready(function() {

	var turn;

	$.ajax({
		type : "POST",
		url : "battle/getPersos",
		success: function(response) {

			response[0].side = 'ally';
			response[0].side = 'ennemy';
			
			var ally = response[0];
			var ennemy = response[1];

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
		var name_attack = $(this).text();
		var power_attack = parseInt($(this).attr('data-power'));
		var requis_attack = $(this).attr('data-requis');

		chat('Vous avez attaqué l\'adversaire avec '+name_attack);

		var ennemy_life = parseInt($('.ennemy .status .life strong').text());
		var remain_life = ennemy_life - power_attack;

		chat('L\'adversaire a perdu '+power_attack+' points de vie');

		var el = $('.ennemy .status .life');

		el.find('span').width(el.find('span').width() - power_attack*3);
		el.find('strong').text(parseInt(el.find('strong').text()) - power_attack);

		ennemyTurn();

	});

	function chat(txt) {
		$('.chat').append('<p>'+txt+'</p>');
	}

	function ennemyTurn() {

	}

});