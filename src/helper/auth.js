export const isAuthenticated = (req,res,next)=>{
	if (req.isAuthenticated()) { 
		return next();
	}
	req.flash('error_msg', 'necesitas loguearte!')
	res.redirect('/user/login')
}
