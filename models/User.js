import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate} from "./hooks.js";
import Joi from "joi";


const userSchema = new Schema ({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
    },
    token: String
  }, {versionKey: false, timestamps: true});

  userSchema.post("save", handleSaveError);

  userSchema.pre("findOneAndUpdate", preUpdate);

  userSchema.post("findOneAndUpdate", handleSaveError)

  const User = model('user', userSchema);


export default User