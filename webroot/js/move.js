$(document).ready(function() {

	var perso = $('.perso');
	var speed = 150;
	var canMove = true;
	var direction;
	var collision;
	var enableTalk = false;
	var newText = null;
	var balls;
	var stars;
	var enableChoice = false;
	var standby;
	var gameLaunched = false;

	var the_persos;

	var menu = {};
	menu.open = false;
	menu.txt = {};
	menu.graphics;
	menu.cursor;
	menu.wait = 0;

	var user = {};
	user.persos = {};
	user.id_starter;

	// Initialisation du framework Phaser et de la map de jeu
	var game = new Phaser.Game(700, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {
		game.load.spritesheet('perso', 'img/assets/dude.png', 32, 48);
		game.load.image('ball', 'img/little_ball.png');
		game.load.image('star', 'img/star.png');
		game.load.image('Luffy', 'img/persos/luffy_front.png');
		game.load.image('Sangoku', 'img/persos/goku_front.png');
		game.load.image('Naruto', 'img/persos/naruto_front.png');
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

		game.physics.arcade.collide(player, balls, hitObject, null, this);

		// Remise à zéro des mouvements du joueur.
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		// Gestion des mouvements en fonction de la touche pressée

		if(!menu.open) {
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

		} else {
			if(cursors.up.isDown) {
				upMenu();

		    } else if(cursors.down.isDown) {
		    	downMenu();
		    }
		}
	}

	$(document).keydown(function(e) {
		var key = e.which || e.keyCode;

		//console.log(key);

		// Si jamais le joueur est face à un autre personnage, il peut lui parler en appuyant sur espace
		switch(key) {
			case 32 : // space
				if(enableTalk) {
					e.preventDefault();
					talk();
				}
			break;

			case 13 : // enter
				if(enableChoice) {
					e.preventDefault();
					choose();
				} else if(menu.open) {

					if(menu.choose == 'persos') {
						showMenuPersos();
					} else if(menu.choose == 'object') {

					} else if(menu.choose == 'return') {

						if(menu.shown == 'default') {
							closeMenu();

						} else if(menu.shown == 'persos') {
							hideMenuPersos();
						}
						
					} else if(menu.choose == 'battle') {
						showBattle();

					} else if(menu.choose == 'perso1') {
						var perso_id = getPersoIdByName(menu.txt.userPerso[0].text);
						showOnePerso(window.all_persos[perso_id]);

					} else if(menu.choose == 'one_perso') {
						hideOnePerso();
					}
				}
			break;

			case 81 : // q
				if(gameLaunched) {
					e.preventDefault();
					if(menu.open) {
						closeMenu();
					} else {
						openMenu();
					}
				}
			break;

			// case 83 : // s
			// 	if(gameLaunched) {
			// 		showBattle();
			// 	}
			// break;
		}
	});

	/***********************/
	/* FONCTION GENERIQUES */
	/***********************/

	// Fonction pour gérer la collision avec un autre personnage
	function hitObject() {

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

	// Fonction pour ouvrir le menu start

	function openMenu() {
		menu.open = true;

		menu.graphics = game.add.graphics(0, 0);
		menu.graphics.beginFill(0xFFFFFF, 1);
		menu.graphics.drawRect(500, 0, 200, 300);
		menu.graphics.endFill();

		menu.cursor = game.add.graphics(0, 0);
		menu.cursor.beginFill(0xAAAAAA, 1);
		menu.cursor.drawRect(510, 20, 20, 20);
		menu.cursor.endFill();

		menu.choose = 'persos';

		menu.txt.persos = game.add.text(550, 20, 'Personnages', { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
		menu.txt.objects = game.add.text(550, 50, 'Objects', { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
		menu.txt.retour = game.add.text(550, 80, 'Retour', { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
		menu.txt.launch_battle = game.add.text(550, 110, 'Launch Battle', { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });

		menu.shown = 'default';
	}

	function closeMenu() {
		menu.graphics.clear();
		menu.cursor.clear();
		menu.open = false;
	}

	function downMenu() {

		if(menu.wait === 0) {
			waitMenu();
			var top_cursor = menu.cursor.graphicsData[0].shape.y + 30;

			menu.cursor.clear();
			menu.cursor.beginFill(0xAAAAAA, 1);
			menu.cursor.drawRect(510, top_cursor, 20, 20);
			menu.cursor.endFill();

			if(menu.shown == 'default') {

				if(menu.choose == 'persos') {
					menu.choose = 'objects';
				} else if(menu.choose == 'objects') {
					menu.choose = "return";
				} else if(menu.choose == 'return') {
					menu.choose = 'battle';
				}

			} else if(menu.shown == 'persos') {
				console.log(menu.choose);

				if(user.persos[1] == undefined) {
					if(menu.choose == 'perso1') {
						menu.choose = 'return';
					}
				}
			}
		}
	}

	function upMenu() {

		if(menu.wait === 0) {
			waitMenu();
			var top_cursor = menu.cursor.graphicsData[0].shape.y - 30;

			menu.cursor.clear();
			menu.cursor.beginFill(0xAAAAAA, 1);
			menu.cursor.drawRect(510, top_cursor, 20, 20);
			menu.cursor.endFill();

			if(menu.choose == 'objects') {
				menu.choose = 'persos';
			} else if(menu.choose == 'return') {
				menu.choose = 'objects';
			}
		}
	}

	function waitMenu() {
		menu.wait = 1;
		setTimeout(function() {
			menu.wait = 0;
		}, 500);
	}

	function showMenuPersos() {
		menu.txt.persos.text = '';
		menu.txt.objects.text = '';
		menu.txt.retour.text = '';
		menu.txt.launch_battle.text = '';

		menu.shown = 'persos';
		menu.choose = 'perso1';

		var tops = 20;

		menu.txt.userPerso = {};

		for (userPerso in user.persos) {
			console.log('userPerso', userPerso);
			var this_text = user.persos[userPerso];

			menu.txt.userPerso[userPerso] = game.add.text(550, tops, this_text, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
			tops = tops + 30;
		}

		menu.txt.retourPersos = game.add.text(550, tops, 'Retour', { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
	}

	function hideMenuPersos() {
		for (userPerso in user.persos) {
			menu.txt.userPerso.text = '';
		}

		menu.txt.retourPersos.text = '';

		menu.shown = 'default';

		menu.cursor.clear();
		menu.cursor.beginFill(0xAAAAAA, 1);
		menu.cursor.drawRect(510, 20, 20, 20);
		menu.cursor.endFill();

		menu.choose = 'persos';

		for(item in menu.txt.userPerso) {
			menu.txt.userPerso[item].text = "";
		}

		menu.txt.persos.text = 'Personnages';
		menu.txt.objects.text = 'Objects';
		menu.txt.retour.text = 'Retour';
		menu.txt.launch_battle.text = 'Launch Battle';
	}

	function showOnePerso(perso) {
		menu.choosed_perso = {};

		menu.choose = "one_perso";

		menu.choosed_perso.graphics = game.add.graphics(0, 0);
		menu.choosed_perso.graphics.beginFill(0xFFFFFF, 1);
		menu.choosed_perso.graphics.drawRect(10, 10, 680, 480);
		menu.choosed_perso.graphics.endFill();
		
		menu.choosed_perso.txt = {};
		menu.choosed_perso.txt[0] = game.add.text(20, 20, perso.name, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
		menu.choosed_perso.txt[1] = game.add.text(20, 50, "Level : "+perso.level, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
		menu.choosed_perso.txt[2] = game.add.text(20, 80, "Exp : "+perso.xp, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });

		the_persos = game.add.group();
		var the_perso1 = the_persos.create(20, 100, perso.name);

	}

	function hideOnePerso() {
		menu.choosed_perso.graphics.clear();
		the_persos.removeAll(true, true);
		for(item in menu.choosed_perso.txt) {
			menu.choosed_perso.txt[item].text = "";
		}
		menu.choose = 'perso1';
	}

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

	function addText(x, y,  txt) {
		return game.add.text(x, y, txt, { fontSize: '16px', fill: '#000', wordWrap : true, wordWrapWidth : 300 });
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
				user.id_starter = 1;
			break;
			case "ball2" :
				newText.text = 'Voulez-vous choisir Sangoku, le Super Saiyen ? Appuyez sur entrée pour confirmer.';
				standby = 'Sangoku';
				user.id_starter = 0;
			break;
			case "ball3" :
				newText.text = 'Voulez-vous choisir Naruto, le ninja légendaire ? Appuyez sur entrée pour confirmer.';
				standby = 'Naruto';
				user.id_starter = 3;
			break;
		}

		user.persos[0] = standby;

		enableChoice = true;

		setTimeout(function() {

			//showBattle();
			//newText.text = '';
		}, 1000);
	}

	function showBattle() {
		$('canvas').hide();
		//$('.before_battle').show();
		window.beginBattle(user.id_starter);
	}

	function getCloseBall() {

		var proxi = 100;
		var choosed = '';

		for (var i = 0; i < balls.length; i++) {

			// console.log(balls.children[i].position);
			// console.log('player y - ball'+i, player.position.y - balls.children[i].position.y);
			// console.log('player x - ball'+i, balls.children[i].position.x - player.position.x);

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

		stars = game.add.group();

		gameLaunched = true;

    	stars.enableBody = true;
    	
    	// Création de la manga ball
        var star = stars.create(0, 100, 'star');
        star.body.immovable = true;
	}
	
});