import User from "../models/user.js"
import Swal from 'sweetalert2'
import passport from 'passport'
 

export const renderLogin = (req, res)=>{
	res.render('user/login')
}

export const login = passport.authenticate("local",{
	
	successRedirect:"/",
	failureRedirect:"/user/login", 
	failureFlash: true,
})

export const logout = async (req, res)=>{
   
  try{
  	 req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/user/login');
  });
   
  
  }catch(err){
        console.error("error al cerrar session", err)
    }
   
}

export const renderSignUp = (req, res)=>{
	res.render('user/register')
}

export const signUp = async (req,res)=>{
	const {name, email, password, confirm_password} = req.body;
	 
	 if (name.length <= 0) {
	 	req.flash('error_msg', 'Ingrese un nombre');
	 	return res.redirect('/user/signUp')
	 }
	  if (email.length <= 0) {
	 	req.flash('error_msg', 'Ingrese un email');
	 	return res.redirect('/user/signUp')
	 }
	  if (password.length <= 0) {
	 	req.flash('error_msg', 'Ingrese una password');
	 	return res.redirect('/user/signUp')
	 }
	 
	  if (confirm_password.length <= 0) {
	 	req.flash('error_msg', 'Ingrese una confirm_password');
	 	return res.redirect('/user/signUp')
	 }
	 if (password !== confirm_password) {
		req.flash('error_msg', 'Las contraseñas no son iguales');
	 	return res.redirect('/user/signUp')
	}
	if (password.length <=7) {
		req.flash('error_msg', 'La contraseña debe ser mayor a 8 digitos');
	 	return res.redirect('/user/signUp')
	}
	//verificar email
	const userFind = await User.findOne({email:email})
	if (userFind) {
		req.flash('error_msg', 'Ya existe este email');
		return res.redirect('/user/signUp') 
	}

	//crear usuario 
	const newUser = new User({name, email, password})
	newUser.password = await newUser.encryptPassword(password)
	await newUser.save();
	req.flash('success_msg', 'usuario creado con exito');
	res.redirect('/user/login')


}
