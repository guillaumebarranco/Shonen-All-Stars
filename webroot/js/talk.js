function talk() {

	newText.x = player.position.x;
	newText.y = player.position.y - 50;
	if(balls.children.length != 0) {
		newText.y = player.position.y - 150;
	}
	var closeObject = getCloseObject();

	switch(closeObject) {

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

		case 'korosensei':
			if(stepTalk == 1) {
				newText.text = "Bonjour, je suis Korosensei !";
				showPass();
			} else if(stepTalk == 2) {
				newText.text = "Je serais ton professeur de mangas.";
				showPass();
			} else if(stepTalk == 3) {
				newText.text = "As-tu des questions ?";
				showPass();
				spoken.korosensei = true;
			} else if(stepTalk == 4) {
				newText.text = "";
				hidePass();
			}
			
		break;

		case 'rukia':
			if(stepTalk == 1) {
				newText.text = "Bonjour, je suis Rukia !";
				showPass();
			} else if(stepTalk == 2) {
				newText.text = "Je te guiderais à travers tes aventures.";
				showPass();
				spoken.rukia = true;
			} else if(stepTalk == 3) {
				newText.text = "";
				hidePass();
			}
		break;

		case 'piccolo':
			if(spoken.korosensei != undefined && spoken.rukia != undefined) {
				if(stepTalk == 1) {
					newText.text = "Un petit combat ? Appuie de nouveau sur espace pour accepter";
					stepTalk++;
				} else if(stepTalk == 2) {
					showBattle();
				}
			} else {
				newText.text = "Je te conseille d'aller voir les autres d'abord";
			}
		break;
	}

	

	setTimeout(function() {

		//showBattle();
		//newText.text = '';
	}, 1000);
}