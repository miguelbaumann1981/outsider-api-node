import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
  mainText: {
    type: String,
  },
  collaborators: {
    type: [Object],
    properties: {
      name: {
        type: String,
      },
      text: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  },
});

aboutUsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export const AboutUsModel = mongoose.model('AboutUs', aboutUsSchema);
