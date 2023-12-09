import express from 'express';

import { getUsers, deleteUserById, getUserById } from '../db/users';
import { get } from 'lodash';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body;
        const { id } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await getUserById(id);
        if(!user) {
            return res.sendStatus(404);
        }   
        user.username = username;
        await user.save();

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};