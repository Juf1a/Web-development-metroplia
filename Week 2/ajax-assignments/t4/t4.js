async function fetchData(url, options) {
    try{
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error("Request failed with status: " + res.status);
        }

        const data = await res.json();
        return data;

    } catch(error){
        console.log("An error has occured: " + error.message);
    }
}

// works
fetchData("https://reqres.in/api/users", {
  method: "GET",
  headers: {
    "x-api-key": "reqres-free-v1" // replace with your own API key if needed
  }
}).then(console.log);

// error
fetchData("https://reqres.in/api/unknown/23", {
  method: "GET",
  headers: {
    "x-api-key": "reqres-free-v1" // replace with your own API key if needed
  }
});