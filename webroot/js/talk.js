function talk() {

	newText.x = player.position.x;
	newText.y = player.position.y - 50;

	if(balls.children.length != 0) {
		newText.y = player.position.y - 150;
	}
	var closeObject = getCloseObject();

	switch(closeObject) {

		/*
		*	BALLS
		*/

		case "ball1" :
			txt('Voulez-vous choisir Luffy, le pirate avide de liberté ? Appuyez sur entrée pour confirmer.');
			standby = 'Luffy';
			user.id_starter = 1;
		break;

		case "ball2" :
			txt('Voulez-vous choisir Sangoku, le Super Saiyen ? Appuyez sur entrée pour confirmer.');
			standby = 'Sangoku';
			user.id_starter = 0;
		break;

		case "ball3" :
			txt('Voulez-vous choisir Naruto, le ninja légendaire ? Appuyez sur entrée pour confirmer.');
			standby = 'Naruto';
			user.id_starter = 3;
		break;



		/*
		*	PERSONNAGES RECURRENTS
		*/

		case 'korosensei':

			if(currentChapter < 3) {

				if(stepTalk === 1) {
					txt("Bonjour, je suis Korosensei !");
					showPass();
				} else if(stepTalk === 2) {
					txt("Je serais ton professeur de mangas.");
					showPass();
				} else if(stepTalk === 3) {
					txt("As-tu des questions ?");
					showPass();
					spoken.korosensei = true;
				} else if(stepTalk === 4) {
					finishTalking();
				}

			} else if(currentChapter === 3) {

				if(stepTalk === 1) {
					txt("Maintenant que tu as effectué ton premier combat, ton apprentissage des mangas peut commencer !");
					showPass();
				} else if(stepTalk === 2) {
					txt("Le genre le plus lu de mangas est le style Shonen !");
					showPass();
				} else if(stepTalk === 3) {
					txt("Tu va devoir combattre un héros emblématique pour comprendre ce dont je parle !");
					showPass();
				} else if(stepTalk === 4) {
					txt("Es-tu prêt à combattre ?");
					stepTalk++;
				} else if(stepTalk === 5) {
					hidePass();
					canPassChapter = true;
					showBattle('yugi');
				}

			// Yusuke
			} else if(currentChapter === 4) {
				if(stepTalk == 1) {
					txt("Tu t'en es bien sorti, il ne te reste qu'une épreuve !");
					showPass();
				} else if(stepTalk == 2) {
					finishTalking();
				}

			// Kenichi
			} else if(currentChapter === 5) {
				if(stepTalk == 1) {
					txt("La force Astrale t'attend désormais, seras-tu à la hauteur ?");
					showPass();
				} else if(stepTalk == 2) {
					finishTalking();
				}
			}
			
		break;

		case 'rukia':
			if(currentChapter < 4) {

				if(stepTalk == 1) {
					txt("Bonjour, je suis Rukia !");
					showPass();
				} else if(stepTalk == 2) {
					txt("Je te guiderais à travers tes aventures.");
					showPass();
					spoken.rukia = true;
				} else if(stepTalk == 3) {
					finishTalking();
				}

			// Yusuke
			} else if(currentChapter === 4) {

				if(stepTalk === 1) {
					txt("Bravo pour être arrivé jusqu'ici !");
					showPass();
				} else if(stepTalk === 2) {
					txt("Pour ton dernier entraînement tu va avoir un adversaire coriace, tu es prêt ?");
					showPass();
				} else if(stepTalk === 3) {
					txt("C'est parti !");

					setTimeout(function() {
						canPassChapter = true;
						showBattle('yusuke');
						spoken.rukia = true;
						hidePass();
					}, 500);
				}

			// Kenichi
			} else if(currentChapter === 5) {
				if(stepTalk == 1) {
					txt("Tu trouveras ton chemin vers le nord-est.");
					showPass();
				} else if(stepTalk == 2) {
					finishTalking();
				}
			}

		break;

		case 'piccolo':
			if(currentChapter < 3) {
				if(spoken.korosensei != undefined && spoken.rukia != undefined) {

					if(currentResult != 'lose') {
						if(stepTalk == 1) {
							txt("Un petit combat ?");
							showPass();
						} else if(stepTalk == 2) {
							showBattle('trial');
						}
					} else {
						if(stepTalk == 1) {
							txt("Tu veux retenter ta chance ?");
							showPass();
						} else if(stepTalk == 2) {
							canPassChapter = true;
							showBattle('trial');
						}
					}
					
				} else {
					txt("Je te conseille d'aller voir les autres d'abord");
				}

			} else if(currentChapter === 3) {
				txt("Bravo !");
			} else if(currentChapter === 4) {
				if(stepTalk == 1) {
					txt("Deux victoires à ton actif ! C'est un bon début !");
					showPass();
				} else if(stepTalk === 2) {
					txt("Pour la fin de ton entraînement, tu devrais aller voir la guide !");
					showPass();
				} else if(stepTalk === 3) {
					finishTalking();
				}
				
			} else if(currentChapter == 5) {
				if(stepTalk == 1) {
					txt("Une nouvelle forme d'énergie est apparue.");
					showPass();
				} else {
					txt("Mais avant cela, tu dois aller voir le grand Sage.");
					finishTalking();
				}
			}
			
		break;



		/*
		*	ENNEMIS
		*/

		case 'yugi' :
			if(stepTalk == 1) {
				txt("Bonjour "+pseudo);
				showPass();
			} else if(stepTalk == 2) {
				txt("Souhaites-tu me combattre ?");
				showPass();
			} else if(stepTalk == 3) {
				txt("Parfait ! C'est l'heure du duel !");
				showBattle('yugi');
				spoken.yugi = true;
				hidePass();
			}
		break;

		case 'toriko':
			if(stepTalk == 1) {
				txt("J'avais le ventre vide, mais maintenant suis prêt à prendre ma revanche !");
			} else if(stepTalk == 2) {
				txt("Parfait ! Itadakimasu !");
				showBattle('toriko');
				spoken.toriko = true;
				hidePass();
			}
		break;

		case 'yusuke':
			if(stepTalk == 1) {
				txt("Mon énergie astrale a vacillé pour une seconde. Je veux combattre encore !");
			} else if(stepTalk == 2) {
				txt("Tu va moins faire le malin cette fois !");
				showBattle('yusuke');
				spoken.yusuke = true;
				hidePass();
			}
		break;

		case 'kenichi':
			if(stepTalk == 1) {
				txt("Une défaite n'es qu'un entraînement de plus. Cette fois je gagnerais.");
			} else if(stepTalk == 2) {
				txt("Tu va me dire des nouvelles de mes techniques !");
				showBattle('kenichi');
				spoken.kenichi = true;
				hidePass();
			}
		break;

		case 'gon':
			if(stepTalk == 1) {
				txt("Un hunter n'arrête jamais de courir après la victoire.");
			} else if(stepTalk == 2) {
				txt("Janke, Go !");
				showBattle('gon');
				spoken.gon = true;
				hidePass();
			}
		break;

		case 'aladdin':
			if(stepTalk == 1) {
				txt("As-tu envie d'un autre face-à-face ?");
			} else if(stepTalk == 2) {
				txt("Faisons de notre mieux !");
				showBattle('aladdin');
				spoken.aladdin = true;
				hidePass();
			}
		break;

		case 'kenshin':
			if(stepTalk == 1) {
				txt("Je ne peux pas me permettre de perdre une nouvelle fois.");
			} else if(stepTalk == 2) {
				txt("Combattons.");
				showBattle('kenshin');
				spoken.kenshin = true;
				hidePass();
			}
		break;
	}
}
