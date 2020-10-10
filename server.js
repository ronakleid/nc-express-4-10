const express = require('express');
const fs = require('fs');
const app = express();

let history = require('./history.json') || [];
let uuid = history.length > 0 ? history[history.length-1].id + 1 : 0;

function saveHistory(history) {
    fs.writeFileSync('history.json', JSON.stringify(history), {encoding: "utf-8"});
};


app.use(express.json());

app.get('/', (req, res) => {
    res.send(
        fs.readFileSync('index.html', {encoding: "utf-8"})
    );
});

app.get('/messeges', (req, res) => {
    res.send(history);
});

app.get('/messeges/:id', (req, res) => {
    console.log(req.params.id);
    res.send('Not-found');
});

app.delete('/messeges', (req, res) => {
history = [];
saveHistory(history);
res.send(history);
});


app.post('/messeges', (req,res) => {
history.push({
    id: uuid,
    ...req.body,
});
uuid++;
 saveHistory(history);
 res.send(history);
});


/*app.get('/photos/:id', (req, res) => {
    res.send(`<h1>${req.params.id}</h1>`);
});

app.get('/users/:id', (req, res) => {
    res.send(`<h1>${req.params.id}</h1>`);
});

app.use((req, res, next) => {
    console.log('Time', Date.now());
    next();
});*/

app.listen(8080);