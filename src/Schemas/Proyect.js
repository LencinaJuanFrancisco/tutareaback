import mongoose from "mongoose";
const {Schema, model} = mongoose;

const proyectSchema = new Schema({
    name: {
        type: String,
        trim: true,
       
    },
    description: {
        type: String,
        trim: true,
       
    },
    dateEnd: {
        type: Date,
        default: Date.now(),
    },
    customer: {
        type: String,
        trim: true,
        
    },
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    task: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    collaborator: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, 
{
    timestamps: true
});
proyectSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id
        delete returnedObjet._id
        delete returnedObjet.__v
    }
})

const Proyect = model('Proyect', proyectSchema);

export default Proyect;

