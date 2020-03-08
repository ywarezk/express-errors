/**
 * db read benchmark test
 * we will create a sqlite table with random items in it
 * we will read all the items from the table and benchmark the result
 *
 * Created March 8th, 2020
 * @author: ywarezk
 * @version: 1.0.9
 * @license: MIT
 *
 */

import { Application } from 'express';
import { createApp } from '../test-utils';
import { Todo } from './todo.model';

export default function appCreator(isZone = true): Application {
    const app = createApp(isZone);

    app.get('*', async function(_req, res) {
        const todos = await Todo.find();
        res.json(todos);
    });

    return app;
}
