// Variables permettant de commencer par la Map ou non
var showCanvasFromBeginning = true;
var canPassChapter = true;

// Variable permettant de commencer par un certain chapitre
var beginByChapter = false;
var chapterBegin = 7;


var beginBattle;

var game;

// Variable qui va contenir le User global
var user = {};
console.log(user);
user.persos = {};
user.id_starter;

console.log(user);

// Tableaux pour les assets à charger
var assets = {};
var assetsLength = 0;

var assetsPersos = {};
var assetsPersosLength = 0;

// Texts apparition

var enableTalk = false;
var newText = null;
var passText = null;

var spoken = {};
var stepTalk = 1;

// Movements
var direction;
var collision;
var speed = 150;
var canMove = true;



var pseudo;

var currentResult = 'win';

// Items
var balls;
var people;

var enableChoice = true;
var standby;
var gameLaunched = false;

// Variables qui gère les assets persos
var the_persos;

// Variables pour la fonction newChapter ainsi que les chapitres
var newChapter;
var currentChapter = 1;

var scene = {};

// Initialisation du framework Phaser et de la map de jeu
game = new Phaser.Game(700, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// All assets for Map
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
addAsset('saitama');

// All assets for start menu
addAssetPerso("luffy_front");
addAssetPerso("goku_front");
addAssetPerso("sangoku_front");
addAssetPerso("naruto_front");

function preload() {

	// On va charger tous les assets pour la Map
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
