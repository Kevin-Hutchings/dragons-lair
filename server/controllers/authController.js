const bcrypt = require('bcryptjs');

const register = async (req, res) => {
   const { username, password, isAdmin } = req.body;
   const db = req.app.get('db');
   const result = await db.get_user([username]);
   const existingUser = result[0];

   if(existingUser) {
      res.status(409).json('Username taken');
   } else {
      const hash = bcrypt.hashSync(password);
      const registeredUser = await db.register_user([isAdmin, username, hash]);
      const user = registeredUser[0];
      req.session.user = {
         isAdmin: user.is_admin,
         username: user.username,
         id: user.id,
      };
      res.status(201).json(req.session.user);
   }
};

const login = async (req, res) => {
   const { username, password } = req.body;
   const db = req.app.get('db');
   const foundUser = await db.get_user([username]);
   const user = foundUser[0];

   if(!user) {
      res.status(401).json('User not found. Please register as a new user before loggin in.')
   } else {
      const isAuthenticated = bcrypt.compareSync(password, user.hash);
      if(!isAuthenticated) {
         res.status(403).json('Incorrect password');
      } else {
         req.session.user = {
            isAdmin: user.is_admin,
            username: user.username,
            id: user.id,
         }
         res.status(200).json(req.session.user);
      }
   }
}

module.exports = {
   register,
   login,
};