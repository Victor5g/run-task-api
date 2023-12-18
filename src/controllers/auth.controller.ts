import { createHmac } from 'crypto';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { getUser } from '../services/user.service';

export const authenticate = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await getUser(email);
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        const hexPassword = createHmac('md5', password.split('').reverse().join(''))
            .update(password)
            .digest('hex');
        if (hexPassword != user.password) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET!, {
            expiresIn: '1d',
        });
        return res.status(200).json({ token });
    } catch {
        return res.sendStatus(500);
    }
};
