import { Schema, model, Types } from "mongoose";
import slugify from "slugify-now"; 

const ideaSchema = new Schema({
  idea: { type: String, required: [true, "Idea is required"], trim: true },
  postedBy: { type: Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  comments: [
    {
      text: { type: String, required: true },
      commentedBy: { type: Types.ObjectId, ref: "User", required: true },
      createdAt: { type: Date, default: Date.now }
    },
  ],
  collaborators: [{ type: Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["visible", "hidden"], default: "visible" },
  views: { type: Number, default: 0 },
  slug: { type: String, unique: [true, "A similar idea is already posted. Try using different words or expand your idea."], lowercase: true, index: true },
},{ timestamps: true });
 
ideaSchema.pre("save", function (next) {
  if (this.isModified("idea")) { 
    this.slug = slugify(this.idea);
  }
  next();
});

const Idea = model("Idea", ideaSchema);
export default Idea;
