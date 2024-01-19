const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')        

mongoose.connect(process.env.DATABASE_URL)

const User = mongoose.model('Users', {username: String, password: String, name: String})

const user = new User(
    {
        username: 'getsuga',
        password:'121212',
        name:'Ankit Kumar Mishra'
    }
)

user.save()