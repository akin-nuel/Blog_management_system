import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body;

  console.log("USER MODEL:", prisma.user);
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exist with the email" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create User
  const user = await prisma.user.create({
    data: {
        name,
        email,
        password: hashedPassword,
    }
  })

  res.status(201).json({
    status: "success",
    data: {
        user: {
            id: user.id,
            name: name,
            email: email
        }
    }
  })
};

export { register };
