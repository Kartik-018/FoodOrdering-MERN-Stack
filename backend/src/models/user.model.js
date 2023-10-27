import { model, Schema } from 'mongoose';
import validator from "validator";


export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,
      validate(value){
        if(validator.isEmail(value)){
          console.log("Email is valid");
        }
        else{
          throw new Error("Email is invalid");
        }
      }
    },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const UserModel = model('user', UserSchema);
