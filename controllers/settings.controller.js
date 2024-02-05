import settingsModel from "../models/settings.model.js";

export const settingController = {
	GET: async (_, res) => {
		const settings = await settingsModel.find({});
		res.json(settings);
	},
	PATCH: async (req, res) => {
		const settings = await settingsModel.updateMany(
			{},
			{
				$set: req.body,
			},
			{ upsert: true },
		);
		res.json(settings);
	},
};
