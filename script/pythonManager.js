// Python manager : manager the interaction with the python code

const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000

let json = {}

app.get('/', (req, res) => {
    var largeDataSet = [];
    // spawn new child process to call the python script
    const python = spawn('python', ['script3.py', json]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        largeDataSet.push(data);
    });
    // in close event we are sure that stream is from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(largeDataSet.join(""))
    });

})
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))