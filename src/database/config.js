import {connect} from 'mongoose'

export async function  dbConect() {
    await connect('mongodb://localhost:27017/tutarea')
}
