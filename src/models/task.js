const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Mapear los datos hacia la BD no relacional

/* En el esquema se colocan los datos de la entidad 'Task'
*  Se define el tipo de dato de cada campo
*  Esto apoya a la validación
*/
const TaskSchema = new Schema({
    title: String,
    description: String,
    // El estatus será por default 'false', por ello de agrega como objeto dentro del esquema
    status: {
        type: Boolean,
        default: false
    }
});

// Casa conjunto del esquema se guardará en la coleccion de tareas
module.exports = mongoose.model('tasks', TaskSchema)