function getPersoIdByName(perso_name) {

	switch(perso_name) {

		case "Naruto":
			return 3;
		break;

		case "Luffy" :
			return 1;
		break;

		case "Sangoku" :
			return 0;
		break;

		default:
			return null;
		break;
	}
}

/***********************/
/* FONCTION GENERIQUES */
/***********************/

// Fonction pour gérer la collision avec un autre personnage
function hitObject() {
	console.log(direction);

	if(direction === 'up') {
		collision = 'up';
	} if(direction === 'down') {
		collision = 'down';
	} if(direction === 'left') {
		collision = 'left';
	} if(direction === 'right') {
		collision = 'right';
	}
}

// Fonction pour déplacer le personnage
function movePerso(player, the_direction) {

	stepTalk = 1;
	newText.text = "";
	hidePass();

	if(collision != the_direction) {
		collision = null;
		enableTalk = false;
		if(the_direction === 'left') {
			player.body.velocity.x = -speed;
		} else if(the_direction === 'right') {
			player.body.velocity.x = speed;
		} else if(the_direction === 'up') {
			player.body.velocity.y = -speed;
		} else if(the_direction === 'down') {
			player.body.velocity.y = speed;
		}

        player.animations.play(the_direction);
        direction = the_direction;
	} else {
		enableTalk = true;
	}
}

function addText(x, y,  txt) {
	return game.add.text(x, y, txt, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
}

function showBattle() {
	$('canvas').hide();
	window.beginBattle(user.id_starter);
}

function getCloseObject() {

	var proxi = 100;
	var choosed = '';

	for (var i = 0; i < balls.length; i++) {

		if(Math.abs(balls.children[i].position.x - player.position.x) < proxi) {
			proxi = Math.abs(balls.children[i].position.x - player.position.x);
			choosed = "ball"+(i+1);
		}
	}

	if(choosed == '') {
		console.log(people);
		for (var i = 0; i < people.length; i++) {

			if(Math.abs(people.children[i].position.x - player.position.x) < proxi) {
				proxi = Math.abs(people.children[i].position.x - player.position.x);
				choosed = people.children[i].key;
			}
		}
	}

	return choosed;
}

function showPass() {
	passText.x = player.position.x;
	passText.y = player.position.y - 100;
	passText.text = "Appuyer sur espace pour voir la suite";

	stepTalk++;
}

function hidePass() {
	passText.text = "";
	stepTalk = 1;
}

function addAsset(the_asset) {
	assets[assetsLength] = the_asset;
	assetsLength++;
}