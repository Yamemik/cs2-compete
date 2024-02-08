import mongoose from "mongoose";


const chatsSchema = new mongoose.Schema({
   lobby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lobby",
      reqire: false,
   }
});

const chatsModel = mongoose.model("Chats", chatsSchema);

export default chatsModel;