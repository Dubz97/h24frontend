
const partiSelector = document.getElementById("partiDropDown");
let selectedParti;

async function loadAsyncData(){
  await fetchPartiFromDB();
  createDropDown();
}

function createDropDown(){
  console.log(partiMap)
  partiMap.forEach(parti=> {
    const options = document.createElement("option");
    options.textContent = parti.partiNavn;
    options.value = parti.partiId;
    partiSelector.appendChild(options);
  })

  partiSelector.addEventListener("change",(event) => {
    const optionIndex = partiSelector.value;

    partiMap.forEach(parti => {
      if (parseInt(optionIndex) === parseInt(parti.partiId)) {
        selectedParti = parti;
      }
    })
  })
}
loadAsyncData();



document.addEventListener("DOMContentLoaded",createFormEvent);


function createFormEvent(){
  const formObject = document.getElementById("assign");
  formObject.addEventListener("submit",handleKandidatSubmit);
}


async function handleKandidatSubmit(event){
  event.preventDefault();

  const form = event.currentTarget;
  const url = "http://localhost:8080/create/kandidat"

  try{
    const formData = new FormData(form);
    await insertKandidatInBackend(url,formData);

  }catch(error){
    console.log("Error in function handleKandidatSubmit "+error.message)
  }
  window.location.href = "kandidater.html";
}

async function insertKandidatInBackend(url,formData){
  const plainFormData = Object.fromEntries(formData.entries());

  let kandidatJSON = {
    kandidatNavn: plainFormData.navn,
    kandidatStemmetal : plainFormData.stemmetal,
    partiNavn : selectedParti.partiNavn,
    parti : {
      partiId: selectedParti.partiId
    }
  }

  const JSONObjectToJSONString = JSON.stringify(kandidatJSON);

  const POSTOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSONObjectToJSONString
  }

  const response = await fetch(url,POSTOptions);

  // await resetInputFields();
  return response.json();

}
