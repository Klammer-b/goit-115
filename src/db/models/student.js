import { model, Schema, Types } from 'mongoose';
import { GENDERS } from '../../constants/genders.js';
import { User } from './user.js';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    avgMark: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(GENDERS),
    },
    onDuty: {
      type: Boolean,
      required: false,
      default: false,
    },
    parentId: {
      type: Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Student = model('student', studentSchema);
