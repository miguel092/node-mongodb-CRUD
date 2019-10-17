const express = require('express');
const router = express.Router();
const Task = require('../models/task');

/** async es para indicar que se hará un proceso asíncrono 
 * entonces se debe usar await para indicar que debemos esperar a que el proceso o rutina termine para poder continuar con el flujo
*/

router.get('/', async function(req, res){
    const tasks = await Task.find();
    console.log(tasks);

    // Se le envía el resultado de la consulta a la vista
    res.render("index", {
        tasks
    });
});

router.post('/add', async function(req, res){
    //Se crea el objeto Task y se le envía el request
    const task = new Task(req.body); 
    // Se almacena en la coleccion de mongo
    await task.save();    
    res.redirect('/')
});

router.get('/done/:idTask', async function(req, res){
    const { idTask } = req.params;
    const task = await Task.findById(idTask);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:idTask', async function(req, res){
    const { idTask } = req.params;
    const task = await Task.findById(idTask);
    res.render('edit', {
        task
    });
});

router.post('/edit/:idTask', async function(req, res){
    const { idTask } = req.params;
    await Task.update({_id: idTask}, req.body);
    res.redirect('/');
})

router.get('/delete/:idTask', async function(req, res){
    const { idTask } = req.params;
    await Task.remove({_id: idTask});
    res.redirect('/');
});

module.exports = router;