# Scrabble
This Express.js website utilizes the [tezaurs API](https://tezaurs.lv) to process a string of letters, providing a highly accurate 95% list of valid words.

## Installation
```bash
# Clone the Scrabble-LV repository and navigate to the project directory
git clone https://github.com/Zilonis123/scrable-lv && cd scrable-lv

# Install dependencies
npm install

# Run the application
node .
```

## Usage
In the search bar, enter the letters you have. Keep in mind that the search query expands in complexity as you input more letters. For instance, if you provide 5 letters, the program will examine roughly 5! + 4! possibilities.

## Contributing
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request