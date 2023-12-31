
async function search() {
    // Function that starts it all
    
    // Get the letters
    var letters_input = document.getElementById("letters");
    var letters = letters_input.value;

    // reset previous words
    document.getElementById("words").innerText = ""

    // Check if letters isn't larger than 7 letters because theres no need to check for 8! when 7! is smaller and scrable ...
    // .. only allows 7 letters per person

    // if the letters are less than 3 then there's no point in checking and the api might be faulty
    if (letters.length > 7 || letters.length < 3) return;

    // Reset the input
    letters_input.value = "";

    get_words(letters);
}


async function get_words(letters) {
    
    // Generate all arangements without duplicates
    var arrangements = getAllUniquePermutations(letters);


    function callback(word) {
        // this function will run everytime that checkWordValidity finishes
        var words_store = document.getElementById("words")
        words_store.innerText += words_store.innerText.length == 0 ? word : `, ${word}`
    }
    
    // Check all the arrangements and see if there are any real word
    for (let i=0; i < arrangements.length; i++) {
        var arr = arrangements[i]
        checkWordValidity(arr, callback);
    }

    if (letters.length >= 4) {
        // remove one letter and go again
        var new_words = removeOneLetter(letters);
        new_words.forEach(word => {
            get_words(word)
        });
    }
}


function removeOneLetter(input) {
    const result = new Set();
  
    for (let i = 0; i < input.length; i++) {
      const removedLetter = input.slice(0, i) + input.slice(i + 1);
      result.add(removedLetter);
    }
  
    return Array.from(result);
  }

function getAllUniquePermutations(str) {
    const result = new Set();

    function swapChars(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function generatePermutations(charArray, startIndex) {
        if (startIndex === charArray.length - 1) {
        result.add(charArray.join(''));
        return;
        }

        for (let i = startIndex; i < charArray.length; i++) {
        swapChars(charArray, startIndex, i);
        generatePermutations([...charArray], startIndex + 1);
        swapChars(charArray, startIndex, i); // Backtrack
        }
    }

    generatePermutations([...str], 0);
    return Array.from(result);
}
    
async function checkWordValidity(word, callback=function(a,b){}) {
    try {
        var data = await find(word);
        var isValid = data.length >= 1 && word.length > 3;

        if (isValid) callback(word);
        return isValid;
    } catch (err) {
        return false
    }
    
}

async function find(word) {
    const res = await fetch(`http://api.tezaurs.lv:8182/analyze/${word}`);
    const json = await res.json();
    return json;
}


function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}