const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const data = req.body;

    fs.readFile('database.json', 'utf8', (err, fileData) => {
        if (err && err.code === 'ENOENT') {
            fs.writeFile('database.json', JSON.stringify([data], null, 2), 'utf8', (err) => {
                if (err) throw err;
                res.send('Data saved!');
            });
        } else if (err) {
            throw err;
        } else {
            const jsonData = JSON.parse(fileData);
            jsonData.push(data);
            fs.writeFile('database.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) throw err;
                res.send('Data saved!');
            });
        }
    });
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
