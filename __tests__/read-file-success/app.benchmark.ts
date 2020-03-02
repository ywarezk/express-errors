/**
 * We are doing a benchmarking test for the app with zone errors and without the zone erros.
 *
 * Created Tuesday February 25th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import zoneApp from './app.zone';
import app from './app';
import runBenchmarkTest from '../test-utils';

/**
 * run benchmarking with zone and without zone
 */
async function main(): Promise<void> {
    // zone benchmark
    await runBenchmarkTest(zoneApp);

    // no zone benchmark
    await runBenchmarkTest(app, 'benchmark-report.nozone.json');
}

main();
