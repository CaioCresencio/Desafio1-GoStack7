const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let count =  0;

server.get("/", (req, res) => {
    return res.json({ message: 'Hello World' })
});


function checkProject(req,res,next){
    if(!projects.find(el => el.id == req.params.id)){
        return res.status(400).json({error:'Projects does not exists'})
    }
    return next();
}

server.use((req,res,next) => {
    console.log(`Requests: ${++count}`)
    return next();
})
server.post('/projects', (req, res) => {
    const data = req.body;
    projects.push(data)
    return res.json(data);
});

server.post('/projects/:id/tasks',checkProject, (req,res) => {
    const {id} = req.params;
    const {title} = req.body;
    
    const project = projects.find(el => el.id == id);

    project.tasks.push(title);
    
    return res.json(project);
})
server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id',checkProject, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(el => {
        if(el.id == id){
            return el;
        }
    });
    project.title = title;
    projects = project;

    return res.json(project.title)
});

server.delete('/projects/:id', checkProject, (req,res) =>{
    const {id} = req.params;
    const project = projects.find(el => el.id == id)

    projects.splice(projects.indexOf(project),1);

    return res.json(projects);

})
server.listen(3000);