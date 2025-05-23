const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGViNmYyNjBjYzAwMTVjYzBkY2QiLCJpYXQiOjE3MjE5Nzg1NTAsImV4cCI6MTcyMzE4ODE1MH0.qfVpHFiuqK7P2KKIG58U9joWwpcziiSKkv031qTQpEI';
const form = document.getElementsByTagName("form")[0];
const barParameters = new URLSearchParams(location.search).get('cardId');
const meth = barParameters ? "PUT" : "POST";


async function postPutProduct() {
    const id = (meth === "PUT") ? barParameters : "";
    const uri = id
        ? `https://striveschool-api.herokuapp.com/api/product/${id}`
        : `https://striveschool-api.herokuapp.com/api/product`;
    try {
        const name = document.getElementById("nameIn").value;
        const desc = document.getElementById("descIn").value;
        const brand = document.getElementById("brandIn").value;
        const url = document.getElementById("urlIn").value;
        const price = document.getElementById("priceIn").value;
        const newArtWork = {
            "name": name,
            "description": desc,
            "brand": brand,
            "imageUrl": url,
            "price": price
        }

        const response = await fetch(uri, {
            method: meth,
            body: JSON.stringify(newArtWork),
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + apiKey
            },
        })
        console.log(response);

        if (response.ok) {
            console.log("L'aggiunta è andata a buon fine!")
        } else {
            const errorDetails = await response.text();
            throw new Error(`Risposta non andata a buon fine! Dettagli: ${errorDetails}`)
        }

    } catch (err) {
        console.log(err)
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    postPutProduct();
    form.reset();
});