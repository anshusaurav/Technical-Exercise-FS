const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let fileSchema = new Schema(
  {
    name: { type: String },
    url: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    size: { type: Number }

  },
  {
    timestamps: true
  }
);
fileSchema.methods.toJSON = function () {
  return {
    name: this.name,
    size: this.size,
    url: this.url,
    startTime: this.startTime,
    endTime: this.endTime,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt

  };
};
module.exports = mongoose.model("File", fileSchema);
