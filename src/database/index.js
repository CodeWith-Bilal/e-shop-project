import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =process.env.MONGO_URL;

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log())
    .catch((err) =>
      console.log(err.message)
    );
};

export default connectToDB;