import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema(
	{
		winrate: {
			type: Number,
			require: true,
			default: 0,
		},
		kd: {
			type: Number,
			require: true,
			default: 0,
		},
		hs: {
			type: Number,
			requre: true,
			default: 0,
		},
		count_matches: {
			default: 0,
			require: true,
			type: Number,
		},
		last_matches: {
			type: Array,
			require: true,
			default: [],
		},
		rank: {
			type: Number,
			require: true,
         default: 0
		},
	},
	{
		timestamps: true,
	},
);

const statisticsModel = mongoose.model("Statistics", statisticsSchema);

export default statisticsModel;
