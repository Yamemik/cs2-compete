import mongoose, { Schema } from 'mongoose';


const StatisticsSchema = new mongoose.Schema({
   count_matches: {
      type: Number,
      require: true,
   },
   winrate: {
      type: Number,
      require: true,
   },
   profit: {
      type: Number,
      require: true,
   },
   kd: {
      type: Number,
      require: true,
   },
   last_result: {
      type: Array,
      require: true,
   },
   hs: {
      type: Number,
      requre: true,
   },
   rate: {
      type: Number,
      require: true,
   }
}, {
   timestamps: true,
});

export default mongoose.model("Statistics", StatisticsSchema);