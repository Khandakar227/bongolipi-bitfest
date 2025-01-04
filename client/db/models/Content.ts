import { model, models, Schema } from "mongoose";

export interface IContent {
  userId: string; // Clerk user ID
  title: string;
  caption: string;
  content: string;
  isPublished: boolean;
  created_at: Date;
  upvotes: string[];
}

const ContentSchema = new Schema<IContent>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  upvotes: { type: [String], default: [] },
});

export const Content = models?.Content || model("Content", ContentSchema);
