import express from "express";
import { movieLogin,movieIndex,movieByID,movieCreate,movieUpdate,movieDelete } from "../controllers/movies.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/login', movieLogin);

router.get('/', verifyToken, movieIndex);
router.get('/:id', verifyToken, movieByID);
router.post('/', movieCreate);
router.put('/:id', verifyToken, movieUpdate);
router.delete('/:id', verifyToken, movieDelete);
export default router;


//express.Router() => function in the Express.js framework, creates a new router object.
//Define Routes    => Use methods like router.get(), router.post().. to define routes on the router.
//Mount the Router => Use app.use('/path', router); to mount the router onto a specific path in your main application.