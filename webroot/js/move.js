$(document).ready(function() {

	var perso = $('.perso');
	var speed = 150;
	var canMove = true;
	var direction;
	var collision;
	var enableTalk = false;
	var newText = null;

	var game = new Phaser.Game(700, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {
		game.load.spritesheet('perso', 'img/assets/dude.png', 32, 48);
		game.load.image('star', 'img/star.png');
	}

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE); // Initialize the "PHYSICS"

		player = game.add.sprite(32, game.world.height - 150, 'perso');
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);
    	player.animations.add('up', [4], 1, true);
    	player.animations.add('down', [4], 1, true);

    	stars = game.add.group();

    	stars.enableBody = true;
    	
        var star = stars.create(300, 250, 'star');
        star.body.immovable = true;

	    newText = game.add.text(player.position.x, (player.position.y - 50), '', { fontSize: '32px', fill: '#fff' });

	    if($('.launch_direct').length == 0) {
	    	$('canvas').hide();
	    }
	    
	}

	function update() {
		cursors = game.input.keyboard.createCursorKeys();

		game.physics.arcade.collide(player, stars, hitStar, null, this);

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

	    if (cursors.left.isDown) {
	    	movePerso(player, 'left');

	    } else if (cursors.right.isDown) {
	        movePerso(player, 'right');

	    } else if (cursors.up.isDown) {
	        movePerso(player, 'up');

	    } else if (cursors.down.isDown) {
	        movePerso(player, 'down');

	    } else {
	        player.animations.stop();
	        //player.frame = 4;
	    }
	}

	$(document).keydown(function(e) {
		var key = e.which || e.keyCode;

		switch(key) {
			case 32 :
				e.preventDefault();
				if(enableTalk) {
					talk();
				}
			break;
		}
	});

	function hitStar(player, star) {

		console.log(player);

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

	function talk() {

		newText.x = player.position.x;
		newText.y = player.position.y - 50;
		newText.text = 'Well, you can begin';

		setTimeout(function() {
			showBattle();
			newText.text = '';
		}, 1000);
	}

	function showBattle() {
		$('canvas').hide();
		$('.before_battle').show();
	}
	
});