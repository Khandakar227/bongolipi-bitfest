// file: models/EmbeddingRecord.ts
import { randomUUID } from 'crypto';
import mongoose, { Document, Schema } from 'mongoose';

interface IEmbeddingRecord extends Document {
  userId: string; // or mongoose.Schema.Types.ObjectId if referencing a User model
  sessionId: string; // will be auto-generated if not provided
  createdAt: Date;
  role: 'user' | 'assistant';
  content: string;
}

const EmbeddingRecordSchema = new Schema<IEmbeddingRecord>(
  {
    userId: {
      type: String,
      required: true,
      // If referencing a User model, you could do: type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    sessionId: {
      type: String,
      // If not provided by the user, generate a random UUID
      default: () => randomUUID(),
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    // By default, we already set createdAt, so no need for timestamps: true unless you want updatedAt as well
    timestamps: false,
  },
);

export default mongoose.models.EmbeddingRecord ||
  mongoose.model<IEmbeddingRecord>('EmbeddingRecord', EmbeddingRecordSchema);
