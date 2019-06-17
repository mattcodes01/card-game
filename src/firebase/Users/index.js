import { db } from "../../config/firebase-exports";

const Users = {
  usernameExists: async username => {
    const doc = await db
      .collection("usernames")
      .doc(username)
      .get();

    return doc.exists;
  }
};

export { Users as default };
