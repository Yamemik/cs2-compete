import messagesModel from "../models/messages.model.js";


export const messagesController = {
   GET_BY_LOBBY: async (req, res) => {
      const messages = await messagesModel.find({ chat: req.body.chat });
      res.json(messages);
   },
   create: async (msg) => {
      const message = await messagesModel.create({
         text: msg.text,
         user: msg.user,
         chat: msg.chat,
      });
      res.json(message);
   },
   DELETE: async (req, res) => { // перенести в лобби при удалении
      await messagesModel.deleteMany({ chat: req.body.chat });
      res.json({ deleted: true });
   },
};
