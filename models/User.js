import mongoose, { UserSchema } from 'mongoose';

const UserSchema = new mongoose.Schema({
   nickname: {
      type: String,
      require: true,
   },
   is_admin: {
      type: Boolean,
      require: true,
      default: false,
   },
   balance: {
      type: Number,
      default: 0,
   },
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
   password_hash: {
      type: String,
      require: false,
   },
   key_hash: {
      type: String,
      require: false,
   },

}, {
   timestamps: true
});

export default mongoose.model("User", UserSchema);