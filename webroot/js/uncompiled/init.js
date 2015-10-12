"use strict";

// Variables permettant de commencer par la Map ou non
let canPassChapter = true;

// Variable permettant de commencer par un certain chapitre
const beginByChapter = false,
	chapterBegin = 7;


let beginBattle,
	game,
	player;

// Variable qui va contenir le User global
let user = {};
user.persos = {};
user.id_starter;


// Tableaux pour les assets à charger
let assets = {},
	assetsLength = 0,

	assetsPersos = {},
	assetsPersosLength = 0;

// Textes
let enableTalk = false,
	newText = null,
	passText = null;

let spoken = {},
	stepTalk = 1;

// Mouvements
let direction,
	collision,
	speed = 150,
	canMove = true;

let pseudo,
	currentResult = 'win';

// Items
let balls,
	people;

let enableChoice = true,
	standby,
	gameLaunched = false;

// Variables qui gère les assets persos
let the_persos, cursors;

// Variables pour la fonction newChapter ainsi que les chapitres
let newChapter,
	currentChapter = 1,
	scene = {};

let ball1, ball2, ball3;

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
	game.load.spritesheet('perso', WEB_URL+'img/assets/perso.png', 32, 48);

	for(let asset in assets) game.load.image(assets[asset], WEB_URL+'img/assets/'+assets[asset]+'.png');
	for(let assetPerso in assetsPersos) game.load.image(assetsPersos[assetPerso], WEB_URL+'img/persos/'+assetsPersos[assetPerso]+'.png');
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
    ball1 = balls.create(200, 350, 'ball');
    ball1.body.immovable = true;

    ball2 = balls.create(300, 350, 'ball');
    ball2.body.immovable = true;

    ball3 = balls.create(400, 350, 'ball');
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
