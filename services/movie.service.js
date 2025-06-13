import fs from 'fs/promises';
import Movie from '../models/movie.model.js';
import bcrypt from 'bcrypt';

const filePath = './Sample.json';


export const getAllMovies = async () => {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
};

export const loginMovie = async(name,password)=>{
    const data = await getAllMovies();
    const user = data.find(m => m.name === name);
    if (!user) return null;
    const matchedUser = await bcrypt.compare(password, user.password);
    return matchedUser ? user : null;
}

export const getMovieById = async (id) => {
    const data = await getAllMovies();
    return data.find(m => m.id == id);
};

export const createMovie = async (name, password) => {
    const data = await getAllMovies();
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newMovie = new Movie(data.length + 1, name,hashedPassword);
    data.push(newMovie);
    await fs.writeFile(filePath, JSON.stringify(data, null, 4));
    return newMovie;
};

export const updateMovie = async (id, name) => {
    const data = await getAllMovies();
    const movie = data.find(m => m.id == id);
    if (!movie) return null;
    movie.name = name;
    await fs.writeFile(filePath, JSON.stringify(data, null, 4));
    return movie;
};

export const deleteMovie = async (id) => {
    const data = await getAllMovies();
    const index = data.findIndex(m => m.id == id);
    if (index === -1) return null;
    const deleted = data.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(data, null, 4));
    return deleted[0];
};