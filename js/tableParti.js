

const table = document.getElementById("partiTable");

function addRowParti(parti) {

  console.log("add row method")

  let rowCount1 = table.rows.length;
  let row1 = table.insertRow(rowCount1);
  row1.id = parti.parti;

  let cell1 = row1.insertCell(0);
  cell1.innerHTML = parti.partiId;

  let cell2 = row1.insertCell(1);
  cell2.innerHTML = parti.partiBogstav;

  let cell3 = row1.insertCell(2);
  cell3.innerHTML = parti.partiNavn;

  let cell4 = row1.insertCell(3);
  cell4.innerHTML = parti.partiStemmetal;

  let cell5 = row1.insertCell(4);
  cell5.innerHTML = ((parseInt(parti.partiStemmetal) / parseInt(hentAlleStemmer())) * 100).toFixed(2) + "%";


}

async function createTableFromMap() {
  await fetchPartiFromDB();
  console.log(partiMap);
  console.log("create table");
  for (const partiKey of partiMap.keys()) {
    const parti1 = partiMap.get(partiKey);
    addRowParti(parti1);
  }
}
createTableFromMap();
