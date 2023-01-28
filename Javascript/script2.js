// On déclare une variable "fav2" contenant la clé "favoris" du Local Storage sous forme Objet

let fav2 = JSON.parse(localStorage.getItem('listeObjet'));

for (let i = 0; i < fav2.length; i++) {
    // Condition : si le Local Storage est remplis, affiche dans l'élément qui à l'ID "result"  les infos du marker dans une div (en affiche plusieurs sans ecraser a précédente)

    if (fav2 != null)
        document.getElementById("result").innerHTML +=
            '<div class= "test">' + '<div>' + fav2[i].title + '</div>' + '<button type="submit" id="close">Supprimer</button>' + '</div><div>' + fav2[i].contact + '</div><div class= "divpos">' + fav2[i].short_desc + '</div>';


    // Si le local storage est vide, mettre la couleur du background de la div "result" en blanc (confort)

    else {
        document.getElementById("result").style.display = "none";
    }
}
// On cible l'élément qui a l'ID "close" (ici le bouton Supprimer générer plus haut)

let favsup = document.getElementById("close");

// On ajoute le fait de vider la clé "listeObjet" du local Storage au click du bouton Supprimer

favsup.onclick = () => {
    localStorage.clear('listeObjet');
    document.getElementById("result").style.display = "none";
}
