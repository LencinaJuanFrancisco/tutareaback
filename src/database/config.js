import {connect} from 'mongoose'

export async function  dbConect() {
    await connect(process.env.DB_CONNECT)
}
