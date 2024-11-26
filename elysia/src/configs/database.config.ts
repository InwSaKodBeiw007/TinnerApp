import { connect } from "bun"
import mongoose from "mongoose"

const user = Bun.env.MONGO_USER || 'your-mongo-user'
const password = Bun.env.MONGO_PASSWORD || 'your-mongo-password'
const db_name = Bun.env.MONGO_DB_NAME || 'tinner_app'

const uri = `mongodb+srv://${user}:${password}@cluster0.hfipz.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`
    
export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log('---- MONGODB CONNECTED ----')
        } catch (error) {
            console.error('---- MONGODB CONNECTION ERROR ----',error)
            console.error(' error: ',error)
        }
    }
}
