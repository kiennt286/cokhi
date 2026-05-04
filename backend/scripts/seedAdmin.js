import "dotenv/config";
import bcrypt from "bcrypt";
import { connectDb } from "../config/db.js";
import { seedRbacDefaults } from "../config/seedRbacDefaults.js";
import User from "../models/User.js";

const run = async () => {
  await connectDb(process.env.MONGO_URI);
  await seedRbacDefaults();

  const email = (process.env.ADMIN_EMAIL || "admin@cokhi.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@123456";
  const passwordHash = await bcrypt.hash(password, 10);

  await User.updateOne(
    { email },
    {
      $set: {
        email,
        passwordHash,
        role: "super_admin",
      },
    },
    { upsert: true }
  );

  console.log(`Seeded admin account: ${email}`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
