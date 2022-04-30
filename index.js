const { spawn } = require('child_process');

var dataToSend;
// spawn new child process to call the python script
const python = spawn('python3', ['servopi.py']);
// collect data from script
python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data.toString());
});
// in close event we are sure that stream from child process is closed
python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
});
