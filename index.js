const { error } = require('console');
const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3'}
];
//GET
app.get('/', (req,res) => {
    res.send('Hey There');
});
app.get('/api/post/:year/:month', (req,res)=>{
    res.send(req.params);
})
app.get('/api/courses', (req,res)=>{
    res.send([1,2,3,4]);
});
app.get('/api/courses/:id', (req,res)=>{
    res.send(req.params.id);
});

app.get('/api/coursesList', (req,res)=>{
    res.send(courses);
});
app.get('/api/coursesList/:id', (req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('not available');
    res.send(course);
});

//GET from other file
app.get('/api/courseSample', (req,res)=>{
    fs.readFile('./Sample.json', (error, data) =>{
        if(error) res.status(400).send('Error reading file');
        const obj = JSON.parse(data);
        res.send(obj);
    });
});
//GET from other file with id/name
app.get('/api/courseSampleId/:id', (req,res)=>{
    fs.readFile('./Sample.json', (error, data) =>{
        if(error) res.status(400).send('Error reading file');
        const obj = JSON.parse(data);
        const course = obj.find(c=> c.id=== req.params.id); //const course = obj.find(c=> c.name=== req.params.name);
        res.send(course);
    });
});

//POST
app.post('/api/courses', (req,res)=>{
    const course={
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
//POST to other file
app.post('/api/courseSample',(req,res)=>{
    fs.readFile('./Sample.json', (error,data)=>{
        if(error) return res.status(400).send('Error reading file');
        const obj = JSON.parse(data);
        const newCourse = {
            id: obj.length + 1,
            name: req.body.name
        };
        obj.push(newCourse);
        fs.writeFile('./Sample.json', JSON.stringify(obj,null,4), (error)=>{
            if(error) return res.status(500).send('Error writing file');
            res.send(newCourse);
        });
    });
});

//PUT
app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('not available');
    course.name = req.body.name;
    res.send(course); 
});
//PUT to other file
app.put('/api/courseSampleId/:id', (req,res)=>{
    fs.readFile('./Sample.json', (error,data)=>{
        if (error) return res.status(400).send('Error reading file');
        const obj = JSON.parse(data);
        const course = obj.find(c=> c.id == req.params.id);
        if(!course) res.status(404).send('Course not found');
        course.name=req.body.name;
        fs.writeFile('./Sample.json', JSON.stringify(obj, null, 4), (error)=>{
            if(error) return res.status(500).send('Error writing file');
            res.send(course);
        });
    });
});

//DELETE
app.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('not available');
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});
//DELETE to other file
app.delete('/api/courseSampleId/:id', (req,res)=>{
    fs.readFile('./Sample.json', (error,data)=>{
        if(error) return res.status(400).send('Error reading file');
        let obj = JSON.parse(data);
        const index = obj.findIndex(c=>c.id == req.params.id);
        if(index==-1) return res.status(500).send('Not found');
        const deleted = obj.splice(index,1);
        fs.writeFile('./Sample.json', JSON.stringify(obj, null, 4), (error)=>{
            if(error) return res.status(500).send('Error writing file');
            res.send(deleted[0]);
        });
    });
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening port ${port}`));



//MVC is a software design pattern that helps developers organize code by separating concerns into three distinct components: 
//Model: The model represents the data and the business logic of the application. It handles data storage, retrieval, and manipulation, and interacts with the database or external APIs.
// View: The view represents the user interface of the application. It handles the presentation of data to the user and receives input from the user.
// Controller: The controller acts as the mediator between the model and the view. It receives input from the user via the view, interacts with the model to retrieve or manipulate data, and updates the view accordingly.
// To implement MVC in Node.js, use a framework that supports this pattern. One such framework is Express.js, which is a minimal and flexible web application framework that provides a set of tools for building HTTP servers and handling HTTP requests.

//Route - define endpoints 
//Controller - Route runs eg, to get all course 
//Model - Controller asks model for data, defines db tables
//Model returns data to Controller
//Controller sends response to User 

//404 - not found
//200 - ok 
//201 - created
//202 - accepted
//400 - bad request
//500 - internal server error



// API - is an application programming interface 
// it is a set of rules that allow programs to talk to each other 
// the developer creates the api on the server and allows the client to talk to it rest determines how the api looks like 
// it stands for representational state transfer it is a set of rules that developers follow when they create their apis