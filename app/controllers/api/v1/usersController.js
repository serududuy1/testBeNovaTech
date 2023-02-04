const { User } = require("../../../models");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;

const checkPassword = (encryptedPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
};

const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  accessControl: {
    admin: 1,
    customer: 2,
  },

  async loginCustomer(req, res) {
    const email = req.body.email;
    const pwd = req.body.password;

    const loginAccess = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!loginAccess) {
      res.status(404).json({
        message: "Email tidak ditemukan",
      });
      return;
    }

    const isPasswordCorrect = await checkPassword(loginAccess.password, pwd);
    if (!isPasswordCorrect) {
      res.status(404).json({
        message: "Password salah!",
      });
      return;
    }

    const accessToken = createToken({
      id: loginAccess.id,
      username: loginAccess.username,
      email: loginAccess.email,
      role: loginAccess.role,
    });

    User.update(
      {
        tokenLogin: accessToken,
      },
      {
        where: {
          email: email,
        },
      }
    )
      .then((result) => {
        res.cookie("accessToken", accessToken);
        res.status(200).json({
          statusLogin: "Berhasil",
          email: loginAccess.email,
          token: `Bearer ${accessToken}`,
          createdAt: loginAccess.createdAt,
          updatedAt: loginAccess.updatedAt,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "error",
          data: err,
        });
      });
  },

  logout(req, res) {
    User.update(
      { tokenLogin: null },
      {
        where: {
          email: req.user.email,
        },
      }
    )
      .then((result) => {
        res.clearCookie("refreshToken");
        res.status(200).json({
          message: "Berhasil Logout!",
        });
      })
      .catch((err) => {
        res.status(401).json({
          error: {
            name: err,
            message: "gabisa logout.",
            details: err.details || null,
          },
        });
      });
  },

  authorize(params) {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization;

        if (!token) {
          res.status(401).json({
            message: "Token Requireds!",
          });
          return;
        }

        const bearerToken = token.split("Bearer ")[1];
        const tokenPayload = jwt.verify(
          bearerToken,
          process.env.JWT_SIGNATURE_KEY || "Rahasia"
        );

        if (params != tokenPayload.role) {
          res.status(401).json({
            message: "Authorize Required!",
          });
          return;
        }

        req.user = tokenPayload;
        next();
      } catch (err) {
        res.status(401).json({
          error: {
            name: err,
            message: "not Authorize!",
            details: err.details || null,
          },
        });
      }
    };
  },
};
