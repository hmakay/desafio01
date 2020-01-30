const express = require("express")

const app =  express()

app.use(express.json())



const projects = []
let request = 0

/********** funções */

function stringToArray(toString){
  return  toString.split(',').map( task=> task.trim() );
}

function countRequest(req,res,next){
  request++
  console.log(`Request: ${request}`)
  return next()
  
}

function verifyIdInArray(req, res, next){
  let project = projects.some( (project) => {

    return (project.id === req.params.id)
  
  }) 
 
  if(!project){
    return res.status(400).json({"error":"this id not found in db"})
  }

  return next()

}




/*********** rotas */
app.post( '/projects', countRequest, (req,res) => {
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

app.post( '/projects/:id/task/', verifyIdInArray, countRequest, (req,res) => {
  const id = req.params.id
  const arrayTask = stringToArray(req.body.task)

  const projectArray = projects.filter( p => 
      p.id === id )
  console.log(projectArray[0])

  const indexProjects =   projects.indexOf(projectArray[0]) 
  if(indexProjects >= 0){
    projects[indexProjects].tasks =  arrayTask
  }


  // let NewProject =  projects.filter( project  => {
  //   if(project.id===id){
  //     project.task = arrayTask
  //   }

  // } )

     
      
  return res.json(projects)
})

app.get('/projects', countRequest, (req,res) => {
  return res.json(projects);
})

app.put('/projects/:id',  verifyIdInArray ,  countRequest,(req, res) => {


  const id = req.params.id
  const {title} = req.body
  
  let titles = projects.map( (product) => {
      if(product.id === id){
        product.title = title
        return res.json({"title":product.title })
        
      }
  } )

  app.delete('/projects:id', verifyIdInArray, countRequest, (req, res) => {
      const id = req.params.id 
      projects.project[id].tasks.splice();


  })

  

 
 

})

app.listen(3030);