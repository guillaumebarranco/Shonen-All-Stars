"use strict";

function addAsset(the_asset) {
	assets[assetsLength] = the_asset;
	assetsLength++;
}

function addAssetPerso(the_asset) {
	assetsPersos[assetsPersosLength] = the_asset;
	assetsPersosLength++;
}

function getPersoIdByName(perso_name) {

	switch(perso_name) {

		case "Sangoku" :
			return 0;
		break;

		case "Luffy" :
			return 1;
		break;

		case "Naruto":
			return 3;
		break;		

		default:
			return null;
		break;
	}
}

// Fonction pour gérer la collision avec un autre personnage, appellée grâce à la gestion des collisions de Phaser
function hitObject() {
	//console.log(direction);
	if(direction === 'up' || direction === 'up' || direction === 'up' || direction === 'up') collision = direction;
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
			updateScene('left');
		} else if(the_direction === 'right') {
			player.body.velocity.x = speed;
			updateScene('right');
		} else if(the_direction === 'up') {
			player.body.velocity.y = -speed;
			updateScene('up');
		} else if(the_direction === 'down') {
			player.body.velocity.y = speed;
			updateScene('down');
		}

        player.animations.play(the_direction);
        direction = the_direction;
	} else {
		enableTalk = true;
	}
}

function updateScene(the_direction) {
	if(scene.length != 0) {
		for (let object in scene) {
			switch(the_direction) {

				case 'left':
					scene[object].body.position.x = scene[object].body.position.x + speed/100;
				break;
				case 'right':
					scene[object].body.position.x = scene[object].body.position.x - speed/100;
				break;
				case 'up':
					scene[object].body.position.y = scene[object].body.position.y + speed/100;
				break;
				case 'down':
					scene[object].body.position.y = scene[object].body.position.y - speed/100;
				break;
			}
		}
	}
}

let proxi, choosed;

function getCloseObject() {

	proxi = 100;
	choosed = '';

	for (let i = 0; i < balls.length; i++) {

		if(Math.abs(balls.children[i].position.x - player.position.x) < proxi) {
			proxi = Math.abs(balls.children[i].position.x - player.position.x);
			choosed = "ball"+(i+1);
		}
	}

	if(choosed == '') {
		for (let i = 0; i < people.length; i++) {

			if(Math.abs(people.children[i].position.x - player.position.x) < proxi) {
				proxi = Math.abs(people.children[i].position.x - player.position.x);
				choosed = people.children[i].key;
			}
		}
	}

	return choosed;
}

function addText(x, y,  txt) {
	return game.add.text(x, y, txt, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
}

function showBattle(argument) {
	$('canvas').hide();
	beginBattle(user.id_starter, argument);
	newText.text = "";
}
function showCanvas() {
	$('.battle').hide();
	$('canvas').show();
}

const showPass = function() {
	passText.x = player.position.x;
	passText.y = player.position.y - 100;
	passText.text = "Appuyer sur espace pour voir la suite";

	stepTalk++;
}

const hidePass = function() {
	passText.text = "";
	stepTalk = 1;
}

const finishTalking = function() {
	hidePass();
	newText.text = "";
}

const txt = function(someText) {
	newText.text = someText;
}

const popup = function(text) {
	swal({
		title: '',
		text: text
	});
}

const popError = (description) => {

  if(description != undefined) {
    swal({
      type: 'error',
      title: "Erreur",
      text: description
    });
  } else {
    swal({
      type: 'error',
      title: "Erreur"
    });
  }
}

const popSuccess = (description) => {

  if(description != undefined) {
    swal({
      type: 'success',
      title: "Succès !",
      text: description
    });
  } else {
    swal({
      type: 'success',
      title: "Succès !"
    });
  }
}

const scenePerso = (left, top, perso_name) => {
	scene[perso_name] = people.create(left, top, perso_name);
    scene[perso_name].body.immovable = true;
};

// Fonction simplifiant l'AJAX
function makeAjax(type, url, data, callback) {

	$.ajax({
		type : type,
		url : WEB_URL+url,
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
	