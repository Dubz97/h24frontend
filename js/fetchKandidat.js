
const urlKandidat = "http://localhost:8080/kandidater";

const kandidatMap = new Map();

async function fetchKandidatFromDB() {

  const promise = fetch(urlKandidat).then(response => response.json());
  await promise.then(data =>{
    data.forEach(kandidat => {
      kandidatMap.set(kandidat.kandidatId, kandidat);
    })
  })
}

fetchKandidatFromDB();



const tableKandidat = document.getElementById("kandidatTable");

function addRow(kandidat) {

  console.log("adding rows")

  let rowCount = tableKandidat.rows.length;
  let row = tableKandidat.insertRow(rowCount);
  row.id = kandidat.kandidat;

  let cell1 = row.insertCell(0);
  cell1.innerHTML = kandidat.kandidatId;

  let cell2 = row.insertCell(1);
  cell2.innerHTML = kandidat.kandidatNavn;

  let cell3 = row.insertCell(2);
  cell3.innerHTML = kandidat.kandidatStemmetal;

  let cell4 = row.insertCell(3);
  cell4.innerHTML =kandidat.parti.partiId;

  let cell5 = row.insertCell(4);
  cell5.innerHTML =kandidat.parti.partiNavn;

  let cell6 = row.insertCell(5);
  let pbDelete = document.createElement("input");
  pbDelete.type = "button";
  pbDelete.setAttribute("value", "slet kandidat");
  pbDelete.onclick = function () {
    document.getElementById(kandidat.kandidat).remove();
    deleteKandidat(kandidat);
  }
  cell6.appendChild(pbDelete);

}

async function createTableFromMap() {
  await fetchKandidatFromDB();
  console.log(kandidatMap);
  console.log("create table");
  for (const kandidatKey of kandidatMap.keys()) {
    const kandidat1 = kandidatMap.get(kandidatKey);
    addRow(kandidat1);
  }
}

createTableFromMap();




// async function createKandidatMap() {
//   alleKandidater = await getAllKandidater();
//
//   // sorting our array with players by firstname
//   alleKandidater.sort((a, b) => a.firstName.localeCompare(b.firstName));
// }
//
// createKandidatMap();
