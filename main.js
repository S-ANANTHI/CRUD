import express from "express";
import movieRoutes from './routes/movies.routes.js'
const app = express();
const PORT = 3000;
app.use(express.json());         //allows server to read json from req body (post/put) // This middleware is required to parse incoming JSON request bodies, and make them available as a JavaScript object on req.body. - if not this error Cannot read properties of undefined (reading 'name')

app.use('/movies', movieRoutes); //base route starts here 
app.listen(PORT, ()=>{            
    console.log(`server running at ${PORT}`);
});



//npm init -y           => creates package.json
//npm install express   => instals framework to create api
//nodemon               => restarts server runs whenever there is changrs 
//app.use()             => adds middleware functions, allows to add functionality to Express application that is executed before route handlers.
//middleware            => functions that process requests before reaching the route handlers.                    //functions that are between client's request and the application's response. It processes and modifies the request before it reaches its final destination (route handler) or handles the response before it's sent back to the client. 