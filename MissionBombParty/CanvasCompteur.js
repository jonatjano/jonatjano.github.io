/**
 * il s'agit de la fonction qui dessine le compteur
 * @param {number} id l'id du canvas sur lequel on affiche le compteur
 */
function drawCompteur(id) {
	canvas[id].fillStyle = "black";
	canvas[id].fillRect(11,11,229,229);//on fait le fond noir
	canvas[id].font = "50px serif";//on initialise la police d'ecriture

	canvas[id].fillStyle = "darkgrey";
	canvas[id].fillRect(35,25,195,60);
	canvas[id].fillStyle = "grey";
	canvas[id].fillRect(40,30,185,50);//on fait le cadre qui entoure le temps restant

	canvas[id].fillStyle = "darkred";
		canvas[id].fillText(temps[0], 55, 70);//on affiche les minutes
	if (temps[1] > 9) {//puis les secondes avec un decallage si il en reste moins de 9 pour garder les unités sur la meme position
		canvas[id].fillText(temps[1], 100, 70);
	} else {
		canvas[id].fillText(temps[1], 120, 70);
	}
	if (temps[2] > 9) {//puis les centieme de secondes avec un decallage si il en reste moins de 9 pour garder les unités sur la meme position
		canvas[id].fillText(temps[2], 165, 70);
	} else {
		canvas[id].fillText(temps[2], 185, 70);
	}
	canvas[id].fillText(":", 85, 70);
	canvas[id].fillText(":", 150, 70);//on affiche les separateur entre les minutes, secondes et centieme de secondes

	canvas[id].fillStyle = "#383838";
	canvas[id].fillRect(28,192,143,30);//on fait le cadre du nulmero de serie
	canvas[id].fillStyle = "white";
	canvas[id].font = "25px serif";
	canvas[id].fillText(numeroSerie[1], 35, 215);//on affiche le numero de serie sous sa version contenant les lettres

	canvas[id].fillStyle = "darkgrey";
	canvas[id].fillRect(70, 105, 110, 60);
	canvas[id].fillStyle = "#585858";
	canvas[id].fillRect(75, 110, 100, 50);//on fait le cadre contenant les vie restantes

	for (var i = 0; i < viesDepart; i++) {//pour chaque vies que l'on a au depart
		if (i + 1 <= vies) {//si on l'a encore
			canvas[id].fillStyle = "#F00"//on prend un rouge clair
		} else {//si on l'a deja perdu
			canvas[id].fillStyle = "#400"//on prend un rouge foncé
		}
		canvas[id].fillRect(80 + (50 * i) - (25 * (viesDepart - 2)), 115, 40, 40)//et on dessine le carré correspondant
	}
}

/**
 * il s'agit de la fonction qui affiche l'explosion de la bombe lorsque l'on perd
 */
function explosion(){
		var divImage = document.getElementById("imageFin");//on prend la div à l'id "imageFin"
		divImage.style.background = "url('images/nuclear.jpg') no-repeat center/100%";//on lui applique l'image nuclear en fond à laquelle on dit de prend toute la place de la div
		divImage.style.color = "white";//on passe en ecriture blanche pour etre visible sur l'image qui est tres sombre
		divImage.innerHTML = "Vous avez échoué dans votre mission<br/>Après avoir réussi à désamorcer " + nombreVictoires + " bombe(s)<br/><br/><br/><br/><br/><br/><br/><br/><br/>veuillez attendre 5 secondes pour un nouveau challenge"//on ecrit un texte annonçant la defaite
		divImage.style.visibility = "visible";//on affiche la div
		window.setTimeout(function(){//les actions dans cette fonctions se font au bout de 5000 millisecondes
			divImage.style.visibility = "hidden";//on recache l'image
			nombreVictoires = 0;
			initialisation();//et on recreer une bombe
		}, 5000)//après 5 secondes (5000 millisecondes)
}

/*
 * window.setInterval(function, temps)
 * appelle la fonction tout les temps en milliseconde
 */
window.setInterval(function (){
	if (temps[2] == -1) {//si le nombre de centieme seconde est -1
		temps[2] = 99;//on le passe a 99
		temps[1]--//on enleve 1 seconde
	}
	if (temps[1] == -1) {//si le temps en seconde est -1
		temps[1] = 59;//on le passe a 59
		temps[0]--;//en enlevant 1 minute
		for (var i = 0; i < 6; i++) {
			affichage(i);//on reaffiche chaque module (permettant d'eviter un bug où le module affiché ne correspond pas aux variables qui le caractérise (exemple : des fils à la place d'un bouton))
		}
	}
	temps[2]--//on enleve 1 centieme de seconde
	if (temps[0] == 0 && temps[1] == 0 && temps[2] == 0) {//si le temps restant est 0:00:00
		explosion();//la bombe explose
	}
	drawCompteur(positionTimer);//on redessine le compteur
}, 10)//tout cela toutes les centieme de seconde (10 millisecondes)
