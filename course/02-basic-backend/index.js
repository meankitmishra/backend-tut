const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://meankitmishra10:jJJxymuKb9DzTV15@cluster0.xcsxd55.mongodb.net/user_app_new')

const User = mongoose.model('Users', {username: String, password: String, name: String})

const user = new User(
    {
        username: 'getsuga',
        password:'121212',
        name:'Ankit Kumar Mishra'
    }
)

user.save()