const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/^[^ ]+@[^ ]+\.[a-z]{2,3}$/, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 4,
        select: false
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {timestamps: true})

UserSchema.pre('save', async function (next){
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

// UserSchema.methods.getSignedToken = function () {
//     return jwt.sign({id: this._id}, `${process.env.JWT_SECRET}`, {expiresIn: "10min"})
// }

module.exports = mongoose.model("user", UserSchema)