import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =process.env.MONGO_URL;

  mongoose
    .connect(connectionUrl, configOptions)
    .catch((err) =>
    );
};

export default connectToDB;