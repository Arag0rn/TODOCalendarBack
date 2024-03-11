import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate} from "./hooks.js";

const todoSchema  = new Schema ({
      title: {
        type: String,
        required: [true, 'Set title for task'],
      },
      description: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String,
      },
      month: {
        type: String,
      },
      time: {
        type: String,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
}, {versionKey: false})

todoSchema.post("save", handleSaveError);

todoSchema.pre("findOneAndUpdate", preUpdate);

todoSchema.post("findOneAndUpdate", handleSaveError)

const TODO = model('todo', todoSchema);

export default TODO