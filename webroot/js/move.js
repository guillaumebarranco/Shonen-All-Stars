$(document).ready(function() {

	var perso = $('.perso');
	var speed = 150;
	var canMove = true;
	var direction;
	var collision;
	var enableTalk = false;
	var newText = null;
	var balls;
	var enableChoice = false;
	var standby;

	// Initialisation du framework Phaser et de la map de jeu
	var game = new Phaser.Game(700, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {
		game.load.spritesheet('perso', 'img/assets/dude.png', 32, 48);
		game.load.image('ball', 'img/little_ball.png');
	}

	function create() {

		// Initialisation des gestions "physiques"
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Ajout du personnage sur la scène
		player = game.add.sprite(32, game.world.height - 150, 'perso');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		// Définition des applications
		player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);
    	player.animations.add('up', [4], 1, true);
    	player.animations.add('down', [4], 1, true);

    	balls = game.add.group();

    	balls.enableBody = true;
    	
    	// Création de l'étoile
        var ball1 = balls.create(200, 350, 'ball');
        ball1.body.immovable = true;

        var ball2 = balls.create(300, 350, 'ball');
        ball2.body.immovable = true;

        var ball3 = balls.create(400, 350, 'ball');
        ball3.body.immovable = true;

	    newText = game.add.text(player.position.x, (player.position.y - 50), '', { fontSize: '16px', fill: '#fff', wordWrap : true, wordWrapWidth : 300 });

	    // Si jamais l'utilisateur n'est pas authentifié, on cache le jeu
	    if($('.launch_direct').length == 0) {
	    	$('canvas').hide();
	    }
	}

	function update() {

		// Initialisation du keyboard
		cursors = game.input.keyboard.createCursorKeys();

		game.physics.arcade.collide(player, balls, hitStar, null, this);

		// Remise à zéro des mouvements du joueur.
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		// Gestion des mouvements en fonction de la touche pressée

	    if(cursors.left.isDown) {
	    	movePerso(player, 'left');

	    } else if(cursors.right.isDown) {
	        movePerso(player, 'right');

	    } else if(cursors.up.isDown) {
	        movePerso(player, 'up');

	    } else if(cursors.down.isDown) {
	        movePerso(player, 'down');

	    } else {
	        player.animations.stop();
	        //player.frame = 4;
	    }
	}

	$(document).keydown(function(e) {
		var key = e.which || e.keyCode;

		// Si jamais le joueur est face à un autre personnage, il peut lui parler en appuyant sur espace
		switch(key) {
			case 32 :
				e.preventDefault();
				if(enableTalk) {
					talk();
				}
			break;

			case 13 :
				e.preventDefault();
				if(enableChoice) {
					choose();
				}
		}
	});

	// Fonction pour gérer la collision avec un autre personnage
	function hitStar() {

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

	// Fonction pour parler à un autre personnage
	function talk() {

		newText.x = player.position.x;
		newText.y = player.position.y - 150;
		var closeBall = getCloseBall();

		switch(closeBall) {

			case "ball1" :
				newText.text = 'Voulez-vous choisir Luffy, le pirate avide de liberté ? Appuyez sur entrée pour confirmer.';
				standby = 'Luffy';
			break;
			case "ball2" :
				newText.text = 'Voulez-vous choisir Sangoku, le Super Saiyen ? Appuyez sur entrée pour confirmer.';
				standby = 'Sangoku';
			break;
			case "ball3" :
				newText.text = 'Voulez-vous choisir Naruto, le ninja légendaire ? Appuyez sur entrée pour confirmer.';
				standby = 'Naruto';
			break;
		}

		enableChoice = true;

		setTimeout(function() {

			//showBattle();
			//newText.text = '';
		}, 1000);
	}

	function showBattle() {
		$('canvas').hide();
		$('.before_battle').show();
	}

	function getCloseBall() {

		var proxi = 100;
		var choosed = '';

		for (var i = 0; i < balls.length; i++) {

			console.log(balls.children[i].position);
			console.log('player y - ball'+i, player.position.y - balls.children[i].position.y);
			console.log('player x - ball'+i, balls.children[i].position.x - player.position.x);

			if(Math.abs(balls.children[i].position.x - player.position.x) < proxi) {
				proxi = Math.abs(balls.children[i].position.x - player.position.x);
				choosed = "ball"+(i+1);
			}
		}

		return choosed;
	}

	function choose() {
		newText.text = "Vous avez choisi "+standby+" ! Excellent choix !";

		removeBalls();
	}

	function removeBalls() {

		enableChoice = false;

		setTimeout(function() {
			newText.text = '';
			balls.removeAll(true, true);
			makeScene();
		}, 1000);
	}

	function makeScene() {

		balls = game.add.group();

    	balls.enableBody = true;
    	
    	// Création de l'étoile
        var ball1 = balls.create(0, 100, 'ball');
        ball1.body.immovable = true;
	}
	
});