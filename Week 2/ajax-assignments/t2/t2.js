async function postMethod(name, job) {
    const res = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            'x-api-key': 'reqres-free-v1', // replace with your own API key if needed
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
             job: job
            })
    });

    const data = await res.json();
    console.log(data);
}

postMethod("Ray", "Homeless");