import mongoose from "mongoose";

/* const userSchema = new mongoose.Schema({

   friends_list: {
      type: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }],
      require: false,
      default: [],
   },
   statistics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Statistics',
   },

}, {
   timestamps: true
}); */

const userSchema = new mongoose.Schema(
	{
		steam_id: String,
		steam_nickname: String,
		steam_avatar: String,
		steam_friends: Array, // привязать
		stats: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Statistics"
      }, // привязать
		revenue: {
			type: Number,
			default: 0,
			require: true,
		},
		balance: {
			type: Number,
			default: 0,
			require: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
			require: true,
		},
	},
	{ timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
