import { readDb, writeDb } from "../db/fileDb.js";
import { v4 as uuid } from "uuid";

async function getAll(req, res, next) {
  try {
    const db = await readDb();
    res.json(db.todos);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const db = await readDb();
    const t = db.todos.find(x => x.id === req.params.id);
    if (!t) return res.status(404).json({ error: "Todo not found" });
    res.json(t);
  } catch (err) {
    next(err);
  }
}


async function createTodo(req,res,next){
    try{
        const {title,completed = false} = req.body;
        if(!title || typeof title !== 'string') return res.status(400).json({
            error: 'title is required'
        })

        const db = await readDb();
        const todo = {
            id : uuid(),
            title,
            completed,
            createdAt : new Date().toISOString()
        }

        db.todos.push(todo);
        await writeDb(db);
        res.status(201).json(todo);
    }catch(err){
        next(err);
    }
}

async function updateTodo(req,res,next){
    try{
        const {title,completed} = req.body;
        const db = await readDb();
        const idx = db.todos.findIndex(x=> x.id === req.params.id);
        if(idx === -1) return res.status(404).json({
            error : "Todo not found"
        })
        db.todos[idx] = {
            ...db.todos[idx],
            title,
            completed
        }
        await writeDb(db);
        res.json(db.todos[idx]);
    }catch(err){
        next(err);
    }
}

async function deleteTodo(req,res,next){
    try{
        const db = await readDb();
        const idx = db.todos.findIndex(x=> x.id === req.params.id);
        if(idx === -1) return res.status(404).json({
            error : "Todo not found"
        })
        db.todos.splice(idx,1);
        await writeDb(db);
        res.json({
            message : "Todo deleted"
        })
    }catch(err){
        next(err);
    }
}

 export { getAll, getById, createTodo, updateTodo, deleteTodo };
