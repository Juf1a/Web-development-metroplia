async function getUser() {
  const res = await fetch("https://reqres.in/api/users/1", {
    headers: {
      "x-api-key": "reqres-free-v1" // replace with your own API key if needed
    }
  });

  const data = await res.json();
  console.log(data);
}

getUser();