import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
	rules: String,
	faq: String,
	contacts: [{ icon: String, label: String, value: String }],
	advertising_banners: [String],
});

const settingsModel = mongoose.model("Settings", settingsSchema);

export default settingsModel;
