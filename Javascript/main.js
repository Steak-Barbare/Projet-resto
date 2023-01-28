var map = L.map('map').setView([50.62335014751016, 3.110441113800351], 13);

// Cible l'élément dans lequel ira la popUp, ici la div ayant la classe ".part2"

let addRest = document.querySelector('.part2');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const url = 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone'

fetch(url)
    .then(response => response.json())
    .then(data => {
        const places = data.records;

        // Utilisation d'une boucle "for" pour parcourir tous les lieux

        for (let lieu of places) {
            const marker = L.marker(lieu.fields.geolocalisation).addTo(map);

            // Lorsqu'on click sur un marqueur, on déclenche un événement :

            marker.on("click", () => restAdd(lieu.fields));
            // console.log (lieu.fields.title)
        }
    })
    .catch(error => console.error(error))


//   Déclaration de la fonction ajoutant du contendu dans la div qui à la classe "part2"

function restAdd(data) {


    // On modifie la valeur du display 'none' en 'flex'

    addRest.style.display = 'flex';

    // On ajoute du contenu dans dans l'élément 'addRest' (correspond à la div qui à la classe 'part2')

    addRest.innerHTML = `
        <div class="photo">
            <img src="./Images/camera-solid.svg" alt="" id="img">
        </div>
        <div class="titre">       
            <p class="description">${data.title}</p>
            <p class="description">${data.contact}</p>
            <p class="description">${data.short_desc}</p>
        </div>
        <div class="btns">
            <button type="submit" id="save">Enregistrer</button>
            <span id="mark">
                <i class="fas fa-times fa-5x"></i>
            </span>
        </div>
    `;

    // On séléctionne l'élément qui a l'ID "save", ici le bouton "Enregistrer" de la PopUp

    let save = document.getElementById("save");

    // Quand on click sur le bouton Enregistrer, on ajoute le contenu des infos des différents restaurants dans le Local Storage sous forme de chaines de caractères dans un tableau

    save.addEventListener("click", () => {

        const listeObjets = 'listeObjet';

        const mesObjetsString = localStorage.getItem(listeObjets);

        const mesObjets = JSON.parse(mesObjetsString) || [];

        const newObjet = data;

        mesObjets.push(newObjet);

        localStorage.setItem(listeObjets, JSON.stringify(mesObjets));
    })

    // Déclaration permettant de supprimer la 'popup' lorsqu'on click sur la 'croix'

    document.getElementById("mark").addEventListener("click", function () {
        addRest.style.display = 'none';
    });
}