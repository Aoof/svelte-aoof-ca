import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import rUser from '../models/RaJ/User.js';

let raj_func = async (req, res, next) => {
  req.isRaj = true;
  next();
}

let register = async (req, res) => {
  try {
    let user;
    if (req.isRaj) {
      user = new rUser({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        course: req.body.course,
        email: req.body.email,
        color: req.body.color
      });
    } else {
      user = new User({
        username: req.body.username,
        password: req.body.password
      });
    }

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
    console.log(err);
    res.send({ ok: false, msg: ['Server error'] });
  }
};

let login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({ ok: false, msg: ['Please enter all fields'] });
  }

  let user;

  if (req.isRaj) {
    user = new rUser();
  } else {
    user = new User();
  }

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

export { register, login, logout, verify, raj_func };