import {connect} from 'mongoose'

export async function  dbConect() {
    await connect('mongodb://127.0.0.1:27017/tuTarea')
}
