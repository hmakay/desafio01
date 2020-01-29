const express = require("express")

const app =  express()

app.use(express.json())



const projects = []


app.post( '/projects', (req,res) => {
  const {id, title} = req.body

    project = {
      id,
      title,
      tasks:[]

    }

    project.id = id
    project.title = title    

    projects.push(project)
      
  return res.json(project)
})

app.get('/projects',(req,res) => {
  return res.json(projects);
})

app.put('/projects/:id', (req, res) => {
  const {id} = res.params  
  const {title} = res.boby


  
})

app.listen(3030);