const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


//Middleware que verifica se o projeto existe
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
  
    if (!project) {
      return res.status(400).json({ error: 'Projeto não encontrado!' });
    }
  
    return next();
  }

//Middleware Contador de requisições
function countRequests(req, res, next) {

  console.count("Nº de requisições");
  
  return next();
  }
  
  server.use(countRequests);
  
  

//Insert
server.post('/projects', (req, res) => {
    const { id, name } = req.body;
  
    const project = {
        id,
        name,
        tasks: []
    }

    projects.push(project);
  
    return res.json(project);
  });

  //Listar todos
  server.get('/projects', (req, res) => {
    return res.json(projects);
  });


  //Atualizar um registro
  server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    const project = projects.find(p => p.id == id);
  
    project.name = name;
  
    return res.json(project);
  });

  //Deletar projeto
  server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
  
    const projectIndex = projects.findIndex(p => p.id == id);
  
    projects.splice(projectIndex, 1);
  
    return res.send();
  });
  


server.listen(3000);
