// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
//     console.log(err);

//     if (err) return res.sendStatus(403);
//     const email = payload.padStart;
//     const user = user.findUnique({
//         where: {
//             id: Number(id),
//         }
//     })

//     req.user = user;

//     next();
//   });
// }

// module.exports = {
//   authenticateToken,
// };

const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    if (err) return res.sendStatus(403);

    const email = payload.data; // Extract email from payload
    const user = await prisma.user.findUnique({
      // Assuming your user model is named "user"
      where: {
        email: email,
      },
    });

    if (!user) return res.sendStatus(401); // If user not found, return unauthorized

    req.user = JSON.stringify(user);
    next();
  });
}

module.exports = {
  authenticateToken,
};

