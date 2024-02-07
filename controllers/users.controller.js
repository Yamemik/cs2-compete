import userModel from "../models/user.model.js";

export const usersController = {
	GET: async (_, res) => {
		const users = await userModel.find({}).populate(["steam_friends", "stats"]);
		res.json(users);
	},
	GET_BY_ID: async (req, res) => {
		const user = await userModel.findOne({ id: req.params.id });
		res.json(user);
	},
	DELETE: async (req, res) => {
		await userModel.findOneAndDelete({ id: req.params.id });
		res.json({ deleted: true });
	},
};
