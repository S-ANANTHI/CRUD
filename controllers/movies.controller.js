import { error } from 'console';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {loginMovie, getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie} from '../services/movie.service.js';
import dotenv from 'dotenv';
dotenv.config();


export const movieLogin = async(req,res)=>{
    const {name,password} = req.body;
    const movie = await loginMovie(name,password);
    if(!movie) return res.status(401).send('Invalid');
    const token = jwt.sign( {name:movie.name}, process.env.JWT_SECRET, {expiresIn: '1hr'});
    res.send( {token} );
}


export const movieIndex = async (req, res) => {
    const movie = await getAllMovies();
    if(!movie) return res.status(500).send('Error reading data');
    res.send(movie);
};

export const movieByID = async (req, res) => {
    const movie = await getMovieById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.send(movie);
};

export const movieCreate = async (req, res) => {
    const { name, password } = req.body;
    const movie = await createMovie(name, password);
    res.send(movie);
};

export const movieUpdate = async (req, res) => {
    const movie = await updateMovie(req.params.id, req.body.name);
    if (!movie) return res.status(404).send('Movie not found');
    res.send(movie);
};

export const movieDelete = async (req, res) => {
    const movie = await deleteMovie(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.send(movie);
};

// export const movieIndex =  (req, res)=>{
//     fs.readFile('./Sample.json', (error, data)=>{
//         if(error) return res.status(400).send("Error reading data");
//         const obj = JSON.parse(data);
//         res.send(obj);
//     });
// };
// export const movieByID = (req,res)=>{
//     fs.readFile('./Sample.json', (error, data) =>{
//         if(error) res.status(400).send('Error reading file');
//         const obj = JSON.parse(data);
//         const course = obj.find(c=> c.id=== req.params.id); //const course = obj.find(c=> c.name=== req.params.name);
//         res.send(course);
//     });
// };
// export const movieCreate = (req, res)=>{
//     fs.readFile('./Sample.json', (error,data)=>{
//         if(error) return res.status(400).send('Error reading file');
//         const obj = JSON.parse(data);
//         const newCourse = {
//             id: obj.length + 1,
//             name: req.body.name
//         };
//         obj.push(newCourse);
//         fs.writeFile('./Sample.json', JSON.stringify(obj,null,4), (error)=>{
//             if(error) return res.status(500).send('Error writing file');
//             res.send(newCourse);
//         });
//     });
// };
// export const movieUpdate = (req, res)=>{
//     fs.readFile('./Sample.json', (error,data)=>{
//         if (error) return res.status(400).send('Error reading file');
//         const obj = JSON.parse(data);
//         const course = obj.find(c=> c.id == req.params.id);
//         if(!course) res.status(404).send('not found');
//         course.name=req.body.name;
//         fs.writeFile('./Sample.json', JSON.stringify(obj, null, 4), (error)=>{
//             if(error) return res.status(500).send('Error writing file');
//             res.send(course);
//         });
//     });
// };
// export const movieDelete = (req, res)=>{
//     fs.readFile('./Sample.json', (error,data)=>{
//         if(error) return res.status(400).send('Error reading file');
//         let obj = JSON.parse(data);
//         const index = obj.findIndex(c=>c.id == req.params.id);
//         if(index==-1) return res.status(500).send('Not found');
//         const deleted = obj.splice(index,1);    
//         fs.writeFile('./Sample.json', JSON.stringify(obj, null, 4), (error)=>{
//             if(error) return res.status(500).send('Error writing file');
//             res.send(deleted[0]);
//         });
//     });
// };
