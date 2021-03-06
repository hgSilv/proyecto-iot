const { spawn } = require('child_process');

function runMQTT() {
    const process = spawn('mosquitto_sub', ['-h', 'broker.mqttdashboard.com', '-p', '1883', '-u', 'pollo', '-P', 'pollo', '-t', 'dogtrainer', '-i', 'linuxclient']);
    // collect data from script
    process.stdout.on('data', function (data) {
        let message = data.toString().trim();
        if (message == 'turn on') {
            console.log('start edge-impulse');
            run_edge();
        }
        else if (message == 'release treat')
            run_servo();
        else
            console.log('no treat');
    });
    // in close event we are sure that stream from child process is closed
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} (MQTT})`);
    });
}

function run_edge() {
    const process = spawn('node', ['/lib/node_modules/edge-impulse-linux/build/cli/linux/runner.js']);
    // collect data from script
    process.stdout.on('data', function (data) {
        let output = data.toString().trim();
        if (output == 'Dog detected, activating servo') {
            console.log(output);
            run_servo();
        }
    });
    // in close event we are sure that stream from child process is closed
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} (runner)`);
    });
}

function run_servo() {
    const process = spawn('python', ['servopi.py']);
    // collect data from script
    process.stdout.on('data', function (data) {
        // console.log('Running runner.js ...');
        console.log(data.toString());
    });
    // in close event we are sure that stream from child process is closed
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} (servo)`);
    });
}

// run("script1", 'python3', ['script1.py']);
// run("script2", 'python3', ['script2.py']);
// run("runner", 'node', ['/lib/node_modules/edge-impulse-linux/build/cli/linux/runner.js'])
runMQTT();