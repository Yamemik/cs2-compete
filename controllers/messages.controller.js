import messagesModel from "../models/messages.model.js";


export const chatsController = {
   GET_BY_CHAT: async (req, res) => {
      const messages = await messagesModel.find({ chat: req.body.chat });
      res.json(messages);
   },
   POST_CREATE: async (req, res) => {
      const message = await messagesModel.create({
         text: req.body.text,
         user: req.body.user,
         chat: req.body.chat,
      });
      res.json(message);
   },
   DELETE: async (req, res) => { // перенести в лобби при удалении
      await messagesModel.deleteMany({ chat: req.body.chat });
      res.json({ deleted: true });
   },
};
