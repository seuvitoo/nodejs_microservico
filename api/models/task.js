import mongoose from 'mongoose';

let Task = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Oops!Você está tentando cadastrar uma tarefa sem titulo'],
        unique: true
    },
    owner: {
        type: String,
        required: [true, 'Oops!Todas as tarefas precisam de um dono']
    },
    done: Boolean
});

export default mongoose.model('Task', Task);