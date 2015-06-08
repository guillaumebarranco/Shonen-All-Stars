var menu = {};
menu.open = false;
menu.txt = {};
menu.graphics;
menu.cursor;
menu.wait = 0;


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