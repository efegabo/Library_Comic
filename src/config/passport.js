import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import User from "../models/user.js"

passport.use(
	new LocalStrategy({
		usernameField:"email"
	},async (email, password, done)=>{
		//encontrar correo en la base de datos 
		const user= await User.findOne({email:email})
		if (!user) {
			//retornamos error con done(error, user, option )
			return done(null, false)
		}else{
			const passw = await user.matchPassword(password)
			if (passw) {
				return done(null, user)
			}else{
				return done(null, false)
			 
		}
			}

	}
		 
		)


	)

//almacenar id en local 
passport.serializeUser((user, done)=>{
	done(null, user.id)
})

//toma el id y genera el usuario que navegara
 
 
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });