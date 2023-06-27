# Scrabble
Website running with http and accesing https://tezaurs.lv api.

## How to download
First check if you have node.js installed by writting this into the command prompt
```bash
node --version
```

If you don't have [node](https://nodejs.org/en/download/) installed here's where you can find it.

## Install the dependenices
Use the npm package manager.
```bash
npm install
```

### How to run
First copy the .env-example to .env
```bash
cp .env-example .env
```
Then open the .env file in any text editor and add your ip address (on linux just run `hostname -I`)
You also may want to change the port, but that's purely optional.

Then you may start the application with this line
```bash
node .
```
If everything went good and the ip was correct the website is now working! 👍

### Instructions
In the input section on the web place your letters (Note that the more letters you place the more word combinations the website will check)
and click the "Search" button. If everything goes well there will be some results presented as buttons that when clicked show inflections of the word.