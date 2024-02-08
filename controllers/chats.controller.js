import chatsModel from "../models/chats.model.js";
import messagesController from "../controllers/messages.controller.js";


export const chatsController = {
   GET_BY_LOBBY: async (req, res) => {
      const chats = await chatsModel.find({ lobby: req.body.lobby });
      res.json(chats);
   },
   DELETE: async (req, res) => { // перенести в лобби при удалении
      await chatsModel.deleteMany({ lobby: req.body.lobby });
      res.json({ deleted: true });
   },
};
