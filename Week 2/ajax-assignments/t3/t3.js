async function getReq() {
    try{
        const res = await fetch("https://reqres.in/api/unknown/23");

        if (!res.ok) {
            throw new Error("Request failed with status " + res.status);
        }

        const data = await res.json();
        console.log(data);

    } catch(error){
        console.log("Error occurred:", error.message);
    }
}
getReq();