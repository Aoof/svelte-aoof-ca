import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

let register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = new User({
      username,
      password
    });

    user.register().then(() => {
      const payload = {
        user: {
          id: user.id
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token, ok: true, msg: ['Registration successful'] });
        }
      );
    }).catch(err => {
      res.send({ ok: false, msg: [...err] });
    
    })
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

let login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({ ok: false, msg: ['Please enter all fields'] });
  }
  let user = new User();

  await user.findByUsername(username).then(async user => {
    if (!user) {
      return res.send({ ok: false, msg: ['Invalid Credentials'] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({ ok: false, msg: ['Invalid Credentials'] });
    }

    const payload = {
      user: {
        id: user._id.toString(),
        username: user.username
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.send({ token, ok: true, msg: ['Login successful'] });
      }
    );
  }).catch(err => {
    res.send({ ok: false, msg: ['Server error please contact administrators.'] });
  });
};

let logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({ ok: false, msg: ['Server error please contact administrators.'] });
    }
    res.send({ ok: true, msg: ['Logout successful'] });
  });
}

let verify = async (req, res) => {
  if (req.user) {
    res.send({ data: req.session.user , ok: true, msg: ['Authorized'] });
  } else {
      res.send({ ok: false, msg: ['Not authorized'] });
  }
}

export { register, login, logout, verify };