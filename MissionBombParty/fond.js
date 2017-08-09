var canvas = [];//on relis chaque canvas de la page html
for (var i = 0; i < 6; i++) {
	canvas[i] = document.getElementById("module" + i).getContext("2d");//recuperation des canvas
}

/**
 * @var {number} nombreVictoires le nombre de bombe reussi jusqu'a ce moment il est utilisé lors de l'initialisation du temps à la cretion de la bombe pour que chaque victoire enleve 30 secondes
 * @var {number[]} temps tableau contenant les variables relatives au temps restant
 * @var {array} modules tableau contenant toutes les variables des modules
 *                      il prend la forme [[variables du module 0], [variables du module 1], [variables du module 2], [variables du module 3], [variables du module 4], [variables du module 5]]
 * @var {number[]} etatModules tableau des etats des modules, dans ce tableau un modules perdu = -1, un module gagné = 1, un modules pas encore fait = 0
 * @var {number} nombreModules la variable contenant le nombre de modules present sur la bombe
 * @var {number} positionTimer il sagit de l'id du canvas contenant le compteur
 * @var {array} numeroSerie tableau contenant le numero de serie sous deux formes : (nombre) et (lettres + nombres) permettant de l'ecrire et d'interagir avec
 * @var {number} vies nombre de vies restantes
 * @var {number} viesDepart nombre de vies a la creation de la bombe
 */
var nombreVictoires = 0;
var temps
var modules = [];
var etatModules
var nombreModules
var positionTimer
var numeroSerie = [];
var vies;
var viesDepart = 2;

initialisation();//on appelle la fonction creant les variables des modules


/**
 * il s'agit de la fonction qui initialise toutes les variables, elle est appellée des que la bombe est crée
 */
function initialisation(){

	//cette partie supprime les anciennes variables pour pouvoir les remplacer
	//ce a quoi correspond ces variables est indiqué plus haut (de la ligne 6 à la ligne 10)
	modules = [];
	etatModules = [0, 0, 0, 0, 0, 0];
	nombreModules = 0;
	positionTimer = -1;
	numeroSerie[0] = Math.floor(Math.random() * 899999) + 100000;//la partie numerique du numero de serie
	numeroSerie[1] = String.fromCharCode(Math.floor(Math.random() * 26) + 65, Math.floor(Math.random() * 26) + 65, Math.floor(Math.random() * 26) + 65) + "" + numeroSerie[0];
	//on ajoute la parie literale du numero de serie
	/*
	String.fromCharCode(idLettre1, idLettre2, ...)
		est une fonction qui permet d'obtenir une lettre a partir de sa valeur unicode
		mettre plusieur lettre a la suite creer une chaine de caracteres
		on utilise ici 3 valeur entre 65 et 90 qui correspondent au lettres majuscules de notre alphabet pour les 3 lettres du numero de serie
	*/

	while (nombreModules == 0) {//tanqu'il n'y a aucun module sur la bombe
		for (var i = 0; i < 6; i++) {//on passe par chaque module
			modules[i] = Math.floor(Math.random() * 3); //et on lui donne une valeur de 0 à 2 correspondant a un module
			//0 = aucun module, 1 = module de fils, 2 = modules de bouton
			if (modules[i] != 0) {//si le module que l'on vien de creer n'est pas un module vide
				nombreModules++;//le nombre total de module augmente de 1
			}
		}
	}
	if (nombreModules != 6) {//si il reste de la place sur la bombe
		for (var i = 0; i < 6; i++) {//on parcours tous les modules
			if (modules[i] == 0 && positionTimer == -1) {//si on est sur une position vide et qu'il n'y a pas encore de timer
				positionTimer = i;//on pose le timer
			} else if (modules[i] == 0 && positionTimer != -1) {//si on est sur un module vide mais qu'il y a deja un timer
				modules[i] = -1;//alors le modules vide prend pour variable -1
			}
		}
	} else {//si tous les emplacement de modules sont prit
		positionTimer = Math.floor(Math.random() * 5);//la bombe prend une position aleatoire
		modules[positionTimer] = 0;//la variable de module a cette position prend la valeur 0
	}

	if (nombreModules == 1 || Math.random() < 0.25) {//si il n'y a que 1 module ou  qu'un nombre aleatoire entre 0 et 1 est inferieur à 0.25
		viesDepart = 1;//alors le nombre de vies passe de 2 à 1 pour rendre plus compliqué
	}
	vies = viesDepart;//le nombre de vie(s) actuelle prend la valeur de la vie max
	temps = [nombreModules + (Math.floor(Math.random() * 3) - 1) - Math.ceil(nombreVictoires / 2), 30 * (nombreVictoires % 2), 1];//le temps pour desamorcer la bombe est : le nombre de modules plus ou moins 1 minutes
	if (temps[0] <= 0) {
		temps = [0, 30, 1];
	}

	for (var i = 0; i < 6; i++) {//on refait tous les modules 1 par 1
		switch (modules[i]) {//en fonction de la variable dans le module (à ce moment des entiers compris entre -1 et 2)
			case 2://si 2 (un bouton)
				var couleur = Math.floor(Math.random() * 5);//une couleur parms les 5 possible
				var idMot = Math.floor(Math.random() * 4);//un mot parmis les 4 possibles
				modules[i] = [2, couleur, idMot, false];//on integre les variables dans module
				getSolutionButton(i);//on appelle la fonction qui donne la solution de ce bouton
				affichage(i);//on affiche le module
			break;
			case 1://si 1 (un module de fils)
				var nombreFils = Math.floor(Math.random() * 4) + 2;//on lui donne un nombre
				var fils = [];//on initialise les variables des fils
				for (var cpt = 0; cpt < nombreFils; cpt++) {//pour toutes les positions qui sont utilisé
					var couleur = Math.floor(Math.random() * 5);//on lui attribut une couleur representé par un entier entre 0 et 4
					fils[cpt] = [couleur, true];
				}
				for (var cpt = nombreFils; cpt < 6; cpt++) {//pour les emplacement inutilisé
					fils[cpt] = [-1, true];//on lui donne la valeur -1
				}
				modules[i] = [1, nombreFils, fils[0], fils[1], fils[2], fils[3], fils[4]];//on met toutes ces variables dans la variable module
				getSolutionFils(i);//on cherche la solution du module
				affichage(i);//on l'affiche
			break;
			case 0://si 0 (timer)
				modules[i] = [0];//il garde la valeur 0
				affichage(i);//et on affiche
			break;
			default://sinon il est vide
				modules[i] = [-1];//il garde la valeur -1
				etatModules[i] = 1;//il est considéré comme reussi
				affichage(i);//on l'affiche
			break;
		}
	}

}
//affichage();
/**
 * fonction permettant de rafraichir l'affichage des modules
 * @param {number} id Position du canvas a afficher
 */
function affichage(id){//cette fonction gere l'affichage des modules
	switch (modules[id][0]) {//en fonction du type de module (rien, timer, bouton, fil, ...)
		case 2://si bouton
			drawEtat(id);//on affiche son etat(reussi, raté, non touché)
			drawBoutton(id, 0);//on affiche le bouton sur le canvas numero id, le 0 correspond au fait que le bouton n'est pas pressé
		break;
		case 1://si fils
			drawEtat(id);//on affiche son etat(reussi, raté, non touché)
			drawFils(id);//on affiche les fils sur le canvas numero id
		break;
		case 0://si compteur
			drawEtat(id);//on affiche son etat(reussi, raté, non touché)
			drawCompteur(id);//on affiche le compteur sur le canvas numero id
		break;
		default://sinon module vide
			drawEtat(id);//on affiche son etat(reussi, raté, non touché)
			drawVide(id);//on affiche le module vide sur le canvas numero id
	}
}

/**
 * fonction permettant d'afficher sur le module si il est reussi, raté ou pas encore fait
 * @param {number} id Position du canvas a afficher
 */
function drawEtat(id) {//cette fonction affiche le contour du module
	switch (etatModules[id]) {//si il est reussi, rate, ou pas encore touché
		case 0://pas touche
			canvas[id].fillStyle = "grey";
			canvas[id].fillRect(0,0,250,250)//on dessine le rectangle gris
		break;
		case -1://rate
			canvas[id].fillStyle = "red";
			canvas[id].fillRect(0,0,250,250)//on dessine le rectangle rouge
		break;
		case 1://reussi
			canvas[id].fillStyle = "green";
			canvas[id].fillRect(0,0,250,250)//on dessine le rectangle vert
		break;
		default:
	}
}

/**
 * fonction dessinant les modules vides (ceux ou il n'y a rien a afficher)
 * @param {number} id Position du canvas a afficher
 */
function drawVide(id) {//si il n'y a pas de module
	canvas[id].fillStyle = "black";
	canvas[id].fillRect(11, 11, 229, 229);//on le rempli de noir
}

/**
 * Fonction gerant les cliques en fonction de leurs provenance
 * @param {Event} click Evenement provenant des balise <canvas> du html lorsque l'on clique dessus
 * @param {number} id Position du canvas ayant appellé la fonction
 * @param {String} etat precise si le bouton de la souris est appuyé ou relaché
 */
function getClick(click, id, etat) {
	/*
	 * les coordonnées horiontales du clique sur le canvas
	 * click.clientX correspond à sa position par rapport à la fenetre
	 * on lui enleve ensuite 20% de la taille de la page puisqu'il est indiqué sur le CSS que la bombe est décallé de 20% par rapport au bord gauche de l'ecran
	 * on enleve ensuite 68 qui correspond a un decalage observé lors de nos test qui viens du fait qu'il y a une bordure autour de la page dans les navigateurs plus l'eppaisseur du bord de la bombe
	 * puis on enleve 284 fois la position horizontale du canvas (0, 1 ou 2) permettant d'avoir des coordonnées relatives au canvas
	 * ajouter le window.scrollX permet à l'utilisateur de faire defiler la page web sans subir de decallage sur la position de ses cliques
	 */
	posX = click.clientX - (20 / 100) * window.innerWidth - 68 - (id % 3) * 284 + window.scrollX;
	/*
	 * nous passons ensuite aux coordonnées verticales
	 * le calcul fonctionne de la meme facon
	 * il ne possede juste pas le decalage en fonction de la taille de l'ecran puisque la position relative au bord haut de l'ecran est fixe
	 */
	posY = click.clientY - 163 - Math.floor(id / 3) * 285 + window.scrollY;
	switch (modules[id][0]) {//on verifie alors le type de jeu contenu dans le canvas cible et on lance la fonction de reaction correspondante
		case 0://si on clique sur le comteur on raffraichit tout les modules
			for (var i = 0; i < 6; i++) {
				affichage(i)
			}
		break;
		case 1:
			cutFils(id, posX, posY);//les fils n'ont pas besoin de savoir si on appuis ou si on les relache puisqu'il ne se coupent qu'une fois
		break;
		case 2:
			pressButton(id, posX, posY, etat);//l'etat est necessaire au bouton pour savoir si on appuie dessus ou si on le relache
		break;
		default:

	}
}

/**
 * Fonction appellée des que l'on perd une vie
 */
function getVies(){
	if (vies <= 1) {//si il s'agit de notre derniere vie
		etatModules[positionTimer] = -1;//le timer passe en module raté
		explosion();//on appelle la fonction d'explosion
	} else {
		vies--;//sinon on perd une vie
	}
}

/**
 * Fonction appellée apres un clique sur un module
 */
function avance(){
	var modulesRestant = 0;//on compte le nombre de modules qui ne sont pas encore fini(s)
	for (var i = 0; i < 6; i++) {
		if (etatModules[i] == 0 && i != positionTimer) {//si le module n'est pas fait et n'est pas le compteur
			modulesRestant++;//on le comptabilise
		}
	}
	if (modulesRestant == 0) {//si il en reste aucun jeu
		etatModules[positionTimer] = 1;//le timer prend un contour vert
		affichage(positionTimer);//que l'on affiche
		nombreVictoires++;//le nombre de victoire augmente de 1
		var divImage = document.getElementById("imageFin");//on prend la div à l'id "imageFin"
		divImage.style.background = "url('images/confetti.jpg') no-repeat center/100%";//on lui applique l'image confetti en fond à laquelle on dit de prend toute la place de la div
		divImage.style.color = "black";//on passe en ecriture noir pour etre visible sur l'image qui est tres claire
		divImage.innerHTML = "Vous avez réussi votre mission<br/>Mais le héros que vous êtes<br/>ne va pas se contenter<br/>d'une seule petite bombe<br/><br/><br/><br/><br/><br/><br/>veuillez attendre 5 secondes pour un nouveau challenge";
		//on ecrit un texte de felicitation
		divImage.style.visibility = "visible";//on affiche la div
		window.setTimeout(function(){//les actions dans cette fonctions se font au bout de 5000 millisecondes
			divImage.style.visibility = "hidden";//on recache l'image
			initialisation();//et on recreer une bombe
		}, 5000)//après 5 secondes (5000 millisecondes)
	}
}
