import axios from "axios";
import statisticsModel from "../models/statistics.model.js";
import userModel from "../models/user.model.js";

export const authController = {
	GET: async (req, res) => {
		// TODO: добавить отслеживание статуса онлайн-оффлайн
		axios
			.get(
				`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${req.user.steam_data[1]._json.steamid}&relationship=friend`,
			)
			.then(async response => {
				const steam_friends_ids = await response.data.friendslist.friends.map(friend => friend.steamid);

				const suitable_users = await userModel.find().where("steam_id").in(steam_friends_ids);

				const stats = await statisticsModel.create({});

				let lastUser = await userModel.find().sort({ id: -1 }).exec();
				let lastUserID = await lastUser[0]?.id;

				const user = await userModel.create({
					id: lastUserID ? Number(lastUserID) + 1 : 1,
					steam_id: req.user.steam_data[1]._json.steamid,
					steam_nickname: req.user.steam_data[1]._json.personaname,
					steam_avatar: req.user.steam_data[1]._json.avatarfull,
					steam_friends: suitable_users,
					stats,
				});

				// если друзья на платформе есть, добавим к ним текущего юзера
				if (suitable_users.length > 0) {
					suitable_users.map(async suitable_user => {
						await userModel.findByIdAndUpdate(suitable_user._id, {
							$push: { steam_friends: { $each: [user] } },
						});
					});
				}

				res.json(user);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json({ error: "Невозможно получить друзей Steam" });
			});
	},
};
