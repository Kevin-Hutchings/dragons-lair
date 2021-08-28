const dragonTreasure = async (req, res) => {
   const db = req.app.get('db');
   const treasure = await db.get_dragon_treasure(1);
   res.status(200).send(treasure);
};

const getUserTreasure = async (req, res) => {
   const db = req.app.get('db');
   const { id } = req.session.user;
   const userTreasure = await db.get_user_treasure(id);
   res.status(200).send(userTreasure);
};

const addUserTreasure = async (req, res) => {
   const db = req.app.get('db');
   const { treasureURL } = req.body;
   const { id } = req.session.user;
   const userTreasure = await db.add_user_treasure(treasureURL, id);
   res.status(200).send(userTreasure);
};

const getAllTreasure = async (req, res) => {
   const db = req.app.get('db');
   const allTreasure = await db.get_all_treasure();
   res.status(200).send(allTreasure);
}

module.exports = {
   dragonTreasure,
   getUserTreasure,
   addUserTreasure,
   getAllTreasure,
};