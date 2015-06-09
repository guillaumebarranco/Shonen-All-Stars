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

			if(window.currentChapter < 3) {

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

			} else {

				if(stepTalk == 1) {
					newText.text = "Maintenant que tu as effectué ton premier combat, ton apprentissage des mangas peut commencer !";
					showPass();
				} else if(stepTalk == 2) {
					newText.text = "Le genre le plus lu de mangas est le style Shonen !";
					showPass();
				} else if(stepTalk == 3) {
					newText.text = "Tu va devoir combattre un héros emblématique pour comprendre ce dont je parle !";
					showPass();
				} else if(stepTalk == 4) {
					newText.text = "Es-tu prêt à combattre ?";
					stepTalk++;
				} else if(stepTalk == 5) {
					showBattle('yugi');
				}
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
			if(window.currentChapter < 3) {
				if(spoken.korosensei != undefined && spoken.rukia != undefined) {

					if(currentResult != 'lose') {
						if(stepTalk == 1) {
							newText.text = "Un petit combat ? Appuie de nouveau sur espace pour accepter";
							stepTalk++;
						} else if(stepTalk == 2) {
							showBattle('trial');
						}
					} else {
						if(stepTalk == 1) {
							newText.text = "Tu veux retenter ta chance ? Appuie de nouveau sur espace pour accepter";
							stepTalk++;
						} else if(stepTalk == 2) {
							showBattle('trial');
						}
					}
					
				} else {
					newText.text = "Je te conseille d'aller voir les autres d'abord";
				}
			} else if(window.currentChapter == 3) {
				newText.text = "Bravo !";
			}
			
		break;

		case 'yugi' :
			if(stepTalk == 1) {
				newText.text = "Bonjour "+window.pseudo;
				showPass();
			} else if(stepTalk == 2) {
				newText.text = "Souhaites-tu me combattre ?";
				showPass();
			} else if(stepTalk == 3) {
				newText.text = "Parfait ! C'est l'heure du duel !";
				showBattle('yugi');
				spoken.yugi = true;
				hidePass();
			}
		break;
	}

	

	setTimeout(function() {

		//showBattle();
		//newText.text = '';
	}, 1000);
}