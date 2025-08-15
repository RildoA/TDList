const LocalStrategy = require("passport-local").Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../model/User');
const User = mongoose.model("users");

module.exports = (passport)=>{
    //usernameField: é o campo que será analisado na autenticação
    //passwordField: especifica o campo em que estará a password a ser auntenticado 
       
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},(email, password, done)=>{

        User.findOne({email: email}).then((user)=>{
            if(!user){
                // done é uma função de callback que recebe parametros
                //1 - dado da conta autenticada
                //2 - estado da autenticalção
                //3 - mensagem
                return done(null, false, {message: "Esta conta não existe"});
            }
            bcrypt.compare(password,user.password, (erro, batem)=>{

                if(batem){
                    return done(null,user);
                }
                else{
                    return done(null, false, {message: "password incorrecta"})
                }

            })
        })

    }))


    passport.serializeUser((user,done)=>{
        done(null, user.id)
    })
    passport.deserializeUser((id, done)=>{
        User.findById(id).then((user)=>done(null,user)).catch((error)=>done(error))
       
    })
}
