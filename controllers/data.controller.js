const data = {};
const Users = require("../models/users");
const bcriptjs = require("bcryptjs");

data.getState = (req, res) => {
  res.send("Servidor CONECTADO");
};

data.getUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};

data.deleteUser = async (req, res) => {
  const deleteuser = await Users.findOneAndDelete({ email: req.params.email });
  res.json(deleteuser);
};

data.deleteAll = async (req, res) => {
  const deleted = await Users.deleteMany({})
  res.send('Se elimino todo');
};

data.login = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    const ok = await bcriptjs.compare(req.body.password, user.password);
    if (ok) {
      // metod generateToken from models/users
      const token = await user.generateToken();
      // send de cookie with the token
      res.cookie("jwt", token, {
        // expires in 24hs
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      
      res.cookie("email", req.body.email, {
        // expires in 24hs
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      })
      console.log('pass ok');
      res.status(200).send('OK');
    } else {
        console.log('pass incorrecta');
      res.send('incorrect password');
    }
  } else {
    res.send("user not found");
  }
};

data.register = async (req, res) => {
  try {
    const register = new Users({
      email: req.body.email,
      password: req.body.password,
    });
    const registered = await register.save();
    res.status(200).redirect("http://localhost:5173/login").send('OK');
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

data.logout = async (req, res) => {
  //limpiar token de la bdd
  const deletetoken = await Users.findOne({email: req.cookies.email});
  deletetoken.tokens.pop();
  const update= deletetoken.save();

  // limpiar token y email desde las cookies del navegador
  res.clearCookie("jwt", { path: "/" }).clearCookie("email", { path: "/" });  
  res.status(200).send("logout OK");
};

module.exports = data;
