
async function deleteKandidat(kandidat) {

  try {
    await restDeleteKandidat(kandidat);

  } catch(error) {
    alert(error.message);
    console.log(error);
  }
}

async function restDeleteKandidat(kandidat) {
  const url = "http://localhost:8080/delete/kandidat/" + kandidat.kandidatId;

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: ""
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    console.log("det gik ikke godt");
  }
  window.location.href = "kandidater.html";
  return response;
}
