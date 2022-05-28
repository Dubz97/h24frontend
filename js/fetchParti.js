const urlParti = "http://localhost:8080/partier";

const partiMap = new Map();

async function fetchPartiFromDB() {
  console.log("fetcher partier")
  const promise = fetch(urlParti).then(response => response.json());

  await promise.then(data => {
    data.forEach(parti => {
      partiMap.set(parti.partiId, parti);

    })
  })
}

fetchPartiFromDB();

function hentAlleStemmer() {
  let alleStemmer = 0;
  partiMap.forEach(parti => {
    alleStemmer += parti.partiStemmetal;
  })
  return alleStemmer;
}

function sortList() {
  partiMap.entries().sor
}

