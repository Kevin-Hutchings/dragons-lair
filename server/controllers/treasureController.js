const dragonTreasure = async (req, res) => {
   const db = req.app.get('db');
   const treasure = await db.get_dragon_treasure(1);
   res.status(200).json(treasure);
};

const getUserTreasure = async (req, res) => {
   const db = req.app.get('db');
   const userTreasure = await db.get_user_treasure(req.session.user.id);
   res.status(200).send(userTreasure);
}

module.exports = {
   dragonTreasure,
   getUserTreasure,
}