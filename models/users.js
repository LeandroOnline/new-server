const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const schema = mongoose.Schema;

const usersSchema = new schema({
	email: {
		type: String,
		required: true,
        unique: true
	},
	password: {
		type: String,
		required: true
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

// Hashing Password with bcryptjs
usersSchema.pre('save', async function(next){
	if(this.isModified('password')){
		this.password= bcryptjs.hashSync(this.password, 10);
	}
	next();
})

// Generate Token with jwt para mantener el usuario logeado
usersSchema.methods.generateToken = async function(){
	try{
		let generatedToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
		this.tokens= this.tokens.concat({token: generatedToken});
		await this.save();
		return generatedToken;
	} catch (err){
		console.log(err);
	}
}

const Users = mongoose.model('Users', usersSchema);
module.exports =  Users;