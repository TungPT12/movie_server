const jwt = require('jsonwebtoken');
const User = require('../../models/admin/User');
const bcrypt = require('bcryptjs');

exports.isAccessToken = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(401).send(JSON.stringify({
                message: 'UnAuthorization'
            }));
        }
        const decoded = jwt.verify(token, 'keyword');
        const userId = decoded._id;
        let user = await User.findOne({ _id: userId }).select('-password')
        if (user.isAdmin) {
            return res.send(JSON.stringify({
                ...user._doc,
                token: token,
            }));
        }
        return res.status(403).send(JSON.stringify({
            success: false
        }))
    } catch (error) {
        req.session.destroy((error) => {
            console.log(error)
        })
        return res.status(403).send(JSON.stringify({
            message: 'UnAuthorization'
        }));
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({
            email: email,
        });

        if (!user) {
            return res.status(401).send(JSON.stringify({
                message: "Wrong username , email or password!",
                success: false
            }))
        }
        const isCorrectPassword = bcrypt.compareSync(password, user.password); // true
        if (!isCorrectPassword) {
            return res.status(401).send(JSON.stringify({
                message: "Wrong username , email or password!",
                success: false
            }))
        }

        if (user.isAdmin) {
            const token = jwt.sign({
                _id: user._id,
                isAdmin: user.isAdmin,
            }, 'keyword', { expiresIn: '1d' });

            req.session.token = token;
            req.session.isAuthn = true;
            return res.send(JSON.stringify({
                id: user._id,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                token: token
            }));
        }
        return res.status(403).send(JSON.stringify({
            message: "Not permission!",
            success: false
        }))

    } catch (error) {
        console.log(error.message)
        return res.status(500).send(JSON.stringify({
            message: "Server Error",
            success: false
        }))
    }
}

exports.logout = async (req, res) => {
    try {
        req.session.destroy((error) => {
            console.log(error)
        })
        return res.status(200).send(JSON.stringify({
            success: true
        }))
    } catch (error) {
        req.session.destroy((error) => {
            console.log(error)
        })
        return res.status(403).send(JSON.stringify({
            message: 'UnAuthorization'
        }));
    }
}

exports.signup = async (req, res) => {
    try {
        const { password, email } = req.body;
        let isDuplicateEmail = await User.findOne({ email: email })
        if (isDuplicateEmail) {
            return res.status(400).send(JSON.stringify({
                message: "Duplicate Email",
                success: false
            }))
        }

        const hashPassword = bcrypt.hashSync(password, 12);

        const user = new User({
            password: hashPassword,
            email: email,
            isAdmin: false,
            avatar: 'https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png',
            isDisable: false,
        })
        const result = await user.save();
        if (result) {
            return res.sendStatus(200);
        }
        return res.status(400).send(JSON.stringify({
            message: "Sorry system is Error!",
            success: false
        }))
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(JSON.stringify({
            message: "Server Error",
            success: false
        }))
    }
}
