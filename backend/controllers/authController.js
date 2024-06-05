const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
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
          res.json({ token, ok: true, msg: ['Registration successful'] });
        }
      );
    }).catch(err => {
      res.json({ ok: false, msg: [...err] });
    
    })
  } catch (err) {
    res.send({ ok: false, msg: ['Server error'] });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ ok: false, msg: ['Please enter all fields'] });
  }

  await User.findByUsername(username).then(async user => {
    if (!user) {
      return res.json({ ok: false, msg: ['Invalid Credentials'] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ ok: false, msg: ['Invalid Credentials'] });
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
        res.json({ token, ok: true, msg: ['Login successful'] });
      }
    );
  }).catch(err => {
    res.json({ ok: false, msg: ['Server error please contact administrators.'] });
  });
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ ok: false, msg: ['Server error please contact administrators.'] });
    }
    res.json({ ok: true, msg: ['Logout successful'] });
  });
}

exports.verify = async (req, res) => {
  if (req.user) {
    res.json({ data: req.session.user , ok: true, msg: ['Authorized'] });
  } else {
      res.json({ ok: false, msg: ['Not authorized'] });
  }
}
