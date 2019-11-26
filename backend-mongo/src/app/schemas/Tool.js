import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema(
  {
    // id,
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Tool', ToolSchema);
