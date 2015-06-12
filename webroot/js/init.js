var game;

var user = {};
var assets = {};

var assetsPersos = {};
var assetsPersosLength = 0;

var assetsLength = 0;
var balls;
var direction;
var collision;
var speed = 150;
var canMove = true;
var enableTalk = false;
var newText = null;
var passText = null;
window.pseudo;

var currentResult = 'win';

var stars;
var enableChoice = true;
var standby;
var gameLaunched = false;

var the_persos;
var spoken = {};

var stepTalk = 1;

var people;
var scene = {};

window.currentChapter = 1;

user.persos = {};
user.id_starter;

// Initialisation du framework Phaser et de la map de jeu
game = new Phaser.Game(700, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

addAsset("ball");
addAsset("korosensei");
addAsset("piccolo");
addAsset("rukia");
addAsset("yugi");
addAsset("aladdin");
addAsset('ichigo');
addAsset('tsubasa');
addAsset('gon');
addAsset('kenichi');
addAsset('kenshin');
addAsset('toriko');
addAsset('yusuke');
addAsset('naruto');
addAsset('goku');
addAsset('luffy');

addAssetPerso("luffy_front");
addAssetPerso("goku_front");
addAssetPerso("sangoku_front");
addAssetPerso("naruto_front");

function preload() {

	game.load.spritesheet('perso', 'img/assets/perso.png', 32, 48);

	for(asset in assets) {
		game.load.image(assets[asset], 'img/assets/'+assets[asset]+'.png');
	}

	for(assetPerso in assetsPersos) {
		game.load.image(assetsPersos[assetPerso], 'img/persos/'+assetsPersos[assetPerso]+'.png');
	}
}

function create() {

	// Initialisation des gestions "physiques"
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Ajout du personnage sur la scène
	player = game.add.sprite(32, game.world.height - 150, 'perso');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;

	player.position.x = game.world.width / 2;
	player.position.y = game.world.height / 2;

	// Définition des applications
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.animations.add('up', [4], 1, true);
	player.animations.add('down', [4], 1, true);

	balls = game.add.group();

	balls.enableBody = true;
	
	// Création des manga balls de départ pour le choix du starter
    var ball1 = balls.create(200, 350, 'ball');
    ball1.body.immovable = true;

    var ball2 = balls.create(300, 350, 'ball');
    ball2.body.immovable = true;

    var ball3 = balls.create(400, 350, 'ball');
    ball3.body.immovable = true;

    // Création du tableau pour l'ajout des personnages movibles
    people = game.add.group();
	people.enableBody = true;

    newText = game.add.text(player.position.x, (player.position.y - 50), '', { fontSize: '16px', fill: '#fff', wordWrap : true, wordWrapWidth : 300 });
    passText = game.add.text(player.position.x, (player.position.y - 50), '', { fontSize: '12px', fill: '#fff', wordWrap : true, wordWrapWidth : 300 });

    // Si jamais l'utilisateur n'est pas authentifié, on cache le jeu
    if($('.launch_direct').length == 0 || !showCanvasFromBeginning) {
    	$('canvas').hide();
    }
}

function update() {

	// Initialisation du keyboard
	cursors = game.input.keyboard.createCursorKeys();

	game.physics.arcade.collide(player, balls, hitObject, null, this);
	game.physics.arcade.collide(player, people, hitObject, null, this);

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