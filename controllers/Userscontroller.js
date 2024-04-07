const prisma = require("../config/prisma");
const bcrypt = require("../utils/bcrypt");

let users = [
  {
    id: 1,
    name: "Alice",
  },
  {
    id: 2,
    name: "Bob",
  },
];

class UsersController {
  async index(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
  async store(req, res) {
    try {
      //const encryptedPassword = await hashPasseword(body.password);
      const body = req.body;
      console.log(body);
      //const encryptedPassword = await bcrypt.hash(body.password);
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
        },
      });
      return res.status(201).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async show(req, res) {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  }

  undate(req, res) {
    const id = req.params.id;
    const body = req.body;
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = body.name;

    return res.json(user);
  }

  delete(req, res) {
    const id = req.params.id;
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    users = users.filter((user) => user.id !== Number(id));

    return res.json(user);
  }
}

module.exports = new UsersController();
