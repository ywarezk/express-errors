/**
 * We are doing a benchmarking test for the app with zone errors and without the zone erros.
 *
 * Created Tuesday February 25th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import 'reflect-metadata';
import appCreator from './app-creator';
import runBenchmarkTest from '../test-utils';
import { createConnection } from 'typeorm';
import { Todo } from './todo.model';

/**
 * run benchmarking with zone and without zone
 */
async function main(): Promise<void> {
    await createConnection({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [Todo],
        synchronize: true,
    });
    await Todo.delete({
        title: 'stam',
    });

    for (let i = 0; i < 10000; i++) {
        const todo = new Todo();
        todo.title = 'stam';
        todo.description = 'foo bar';
        await todo.save();
    }

    // zone benchmark
    await runBenchmarkTest(appCreator());

    // no zone benchmark
    await runBenchmarkTest(appCreator(false), 'benchmark-report.nozone.json');
}

main();
