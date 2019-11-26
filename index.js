const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

server.get("/", (req, res) => {
    return res.json({ message: 'Hello World' })
});

server.post('/projects', (req, res) => {
    const data = req.body;
    projects.push(data)
    return res.json(data);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
    const id = req.params;
    const { title } = req.body;

    const project = projects.map(el => {
       if(el.id == id){
           return el;
       }
    });
    project.title = title;
    return res.json(project.title)
});

server.listen(3000);