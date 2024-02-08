import mongoose from "mongoose";


const messagesSchema = new mongoose.Schema({
   text: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
   }
}, {
   timestamps: true,
});

const messageModel = mongoose.model("Messages", messagesSchema);

export default messageModel;