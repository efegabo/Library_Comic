import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const NewUser = new mongoose.Schema({
	name:String, 
	email:String, 
	password:String
})

NewUser.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

NewUser.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

export default mongoose.model("user", NewUser)