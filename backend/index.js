const express = require('express');
const app = express();
const cors = require('cors')
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt');
require('./model/User');
const User = mongoose.model("users");
require('./config/auth')(passport)
const logged = require('./helpers/logged');
const db = require('./config/db.js')

//Configurações
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI)
    .then(()=>console.log("MongoDB connected successfully"))
    .catch(error=>console.log("Error connecting MongoDB: "+error))

    app.use(session({
        secret: "UmaPalavraSecretaQualquer",
        saveUninitialized: true,
        resave: true,
        cookie:{
            secure: false,
            sameSite: "lax",
            httpOnly: true
        }
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json())

    app.use(express.static(path.join(__dirname,"../src/components")))

    app.use(cors({
        origin: "http://localhost:3000", //Onde está o frontend
        credentials: true

    }))

    app.use(express.static(path.join(__dirname, "../build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../build", "index.html"))
    })
    

//Rotas
    //POST
        app.post("/signup",(req,res)=>{
            User.findOne({email: req.body.user.email}).then((user)=>{
                if(user){
                    res.json({message: "Email já registado", typeMessage:"error"})
                }else{
                   const newUser = new User(req.body.user);
                    
                    //salt valor aleatório para ficar dentro de HASH, aumentado a dificuldade
                   bcrypt.genSalt(10,(error,salt)=>{
                        bcrypt.hash(newUser.password,salt,(error,hash)=>{
                            if(error){
                                res.json({message: "Houve um erro durante o salvamento do usuário", typeMessage:"error"})
                                console.log("Houve um erro durante o salvamento do usuário: ",error);
                                
                            }
                            else{
                                newUser.password = hash
                                newUser.save().then(()=>{
                                    res.json({message: "Usuário criado com sucesso",typeMessage: "success"})
                                }).catch((error)=>{
                                    console.log("Houve um erro ao criar usuário: "+error);
                                    res.json({message:"Houve um erro ao criar usuário, tente novamente" , typeMessage: "error"})
                                })
                            }
                            
                        })
                    })
                }
            }).catch(error=>console.log("Somenthing went wrong finding user: "+error))
            
        })
        app.post("/login",(req,res,next)=>{
            passport.authenticate("local",(err,user,info)=>{
            
            if (err) {
                
                return res.status(500).json({message: "Erro ao autenticar", typeMessage: "error"});
            }

            if (!user) {
                return res.status(401).json({message: info?.message || 'Login inválido', typeMessage: "error"});
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({message: "Erro ao iniciar sessão", typeMessage: "error"});
                }
                return res.status(200).json({message: "Login efeutado com sucesso", typeMessage: "success", user})
            });

            })(req,res,next)
        })
    //GET
        app.get("/logged",logged,(req,res)=>{
            res.json({user: req.user})
        })
        app.get("/logout",logged,(req,res)=>{
            req.logout((error)=>{
                if(error){
                    console.log("Erro ao fazer logout: "+error);
                    res.status(401).json({message: "Erro ao fazer logout", typeMessage: "error"});
                }else{
                    res.status(200).json({message: "Sessão terminada com sucesso", typeMessage: "success"});
                }
            });
        })
        app.get("/user/tasks",logged,(req,res)=>{
            User.findById(req.user.id).then((user)=>{
                res.json({tasks: user.tasks});
            }).catch(e=>console.log("Houve um erro ao carregar tarefas: "+e));
        })

    //PATCH
        app.patch("/user/tasks/add",logged,(req,res)=>{
            User.findByIdAndUpdate(req.user._id,{$push: {tasks: {name: req.body.newTask, status: 0, id: req.body.idTask}}},{new: true}).then((user)=>{
                res.json({tasks: user.tasks})
            })
            .catch(e=>console.log("Erro ao adicionar tarefa: ",e))
        })
        app.patch("/user/tasks/delete",logged,(req,res)=>{
            User.findByIdAndUpdate(req.user._id, {$pull: {tasks: {id: req.body.idTask}}},{new: true})
            .then((user)=>{res.json({tasks: user.tasks})})
            .catch(e=>console.log("Error occured tryind to delete task: "+e));
        })
        app.patch("/user/tasks/edit",logged,(req,res)=>{
            User.updateOne(
                {_id: req.user._id, "tasks.id": req.body.idTask},
                {$set: {"tasks.$.name": req.body.nameTask}},
                {new: true}
            ).then(()=>{
                User.findById(req.user._id)
                .then((user)=>{
                    res.json({tasks: user.tasks});
                })
            }).catch(e=>console.log("Somenthing went wrong triyng to edit a task: "+e));
        })
        app.patch("/user/tasks/done",logged,(req,res)=>{
            User.updateOne(
                {_id: req.user._id, "tasks.id":req.body.idTask},
                {$set: {"tasks.$.status": req.user.tasks[req.body.idTask].status===0?1:0}},
                {new: true}
            ).then(()=>{
                User.findById(req.user._id)
                .then((user)=>{
                    res.json({tasks: user.tasks});
                })
            }).catch(e=>console.log("Something went wrong trying to change status of the tasks: "+e));
        })



const port = process.env.PORT || 8080;

app.listen(port,()=>console.log("Servidor a rodar "));

