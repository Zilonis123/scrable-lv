const http = require('http');
const fs = require('fs');
const url = require('url');
const chalk = require("chalk")

require("dotenv").config()

const hostname = process.env.IP;
const port = process.env.PORT;


fs.readFile('./Scrable/main.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    const server = http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": 'text/html'});
        var pathname=url.parse(request.url).pathname;
        switch(pathname){
            case '/subpage':
                response.end('rip minesweeper');
            break;
            default:
                response.write(html)
                response.end();
            break;
        }
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at ${chalk.green(`http://${hostname}:${port}`)}`)
    });
});

