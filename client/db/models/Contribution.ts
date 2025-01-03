//models/Contribution.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IContribution extends Document {
  userId: string; //clerk user id
  banglish_text: string;
  bangla_text: string;
  isApproved: boolean;
}

const ContributionSchema = new Schema<IContribution>(
  {
    userId: {
      type: String,
      required: true,
      // If you have a separate User model, you could do:
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
    },
    banglish_text: {
      type: String,
      required: true,
    },
    bangla_text: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  },
);

export default mongoose.models.Contribution ||
  mongoose.model<IContribution>('Contribution', ContributionSchema);
