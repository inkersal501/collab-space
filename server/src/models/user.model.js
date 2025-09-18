import {Schema, Types, model} from "mongoose";
import bcrypt from "bcryptjs"; 

export const userRef = { type: Types.ObjectId, ref: "User"};

const userSchema = new Schema({
    username : {type: String, required: [true, "Username is required"]},
    email : { type : String, required: [true, "Email is required"], unique: [true, "Email already exists"]},
    password : {type: String},
    isGoogleAuth : {type: Boolean, default: false},
    avatar: { type: String, default: ""},
    sentRequests: [ userRef ],
    receivedRequests: [ userRef ],
    friends: [ userRef ],

}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
 
userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = model("User", userSchema, "users");
export default User;