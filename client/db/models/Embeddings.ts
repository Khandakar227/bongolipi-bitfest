import { model, models, Schema } from 'mongoose';

export interface IEmbeddings {
    userId: string,
    embedding: number[],
    created_at: Date
}

const EmbeddingsSchema = new Schema<IEmbeddings>({
    userId: { type: String, required: true },
    embedding: { type: [Number], required: true },    
    created_at: { type: Date, default: Date.now },
});

export const Embeddings = models?.Embeddings || model('Embeddings', EmbeddingsSchema);
