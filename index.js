const { spawn } = require('child_process');
const { type } = require('express/lib/response');

function run(name, command, args) {
    const process = spawn(command, args);
    // collect data from script
    process.stdout.on('data', function (data) {
        // console.log('Running runner.js ...');
        console.log(data.toString());
    });
    // in close event we are sure that stream from child process is closed
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} (${name})`);
    });
}

function runMQTT() {
    const process = spawn('mosquitto_sub', ['-h', 'broker.mqttdashboard.com', '-p', '1883', '-u', 'pollo', '-P', 'pollo', '-t', 'dogtrainer', '-i', 'linuxclient']);
    // collect data from script
    process.stdout.on('data', function (data) {
        var message = data.toString().trim();
        if (message == 'release treat')
            console.log('treat is released');
        else
            console.log('no treat');
    });
    // in close event we are sure that stream from child process is closed
    process.on('close', (code) => {
        console.log(`child process close all stdio with code ${code} (${name})`);
    });
}

// run("script1", 'python3', ['script1.py']);
// run("script2", 'python3', ['script2.py']);
// run("runner", 'node', ['/lib/node_modules/edge-impulse-linux/build/cli/linux/runner.js'])
// runMQTT();