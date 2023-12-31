const express = require('express');
const chalk = require("chalk")
const app = express();


const PORT = 3000;

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Get the local IP address dynamically
const os = require('os');
const ifaces = os.networkInterfaces();
let ipAddress;

Object.keys(ifaces).forEach((ifname) => {
  ifaces[ifname].forEach((iface) => {
    if (iface.family === 'IPv4' && !iface.internal) {
      ipAddress = iface.address;
    }
  });
});


if (!ipAddress) {
  console.error(chalk.red('Unable to determine the local IP address.'));
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server is running at ${chalk.green(`http://${ipAddress}:${PORT}`)}`);
});
