import express from 'express';

const app = express();
const PORT = 3000;

app.use('/public', express.static('public'));

app.get('/api/v1/cats', (reqs, res) => {

    res.json({
        cat_id: 1,
        name: "David",
        birthdate: "2025-02-04",
        weight: 10,
        owner: "Pekka",
        image: "https://loremflickr.com/320/240/cat"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});