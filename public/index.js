
async function search() {
    // Function that starts it all
    
    // Get the letters
    var letters_input = document.getElementById("letters");
    var letters = letters_input.value;

    // Check if letters isn't larger than 7 letters because theres no need to check for 8! when 7! is smaller and scrable ...
    // .. only allows 7 letters per person
    if (letters.length > 7) return;

    // Reset the input and disable it
    letters_input.value = "";
    letters_input.disabled = true;

    var words = await get_words(letters);

    // Show the result to the user
    document.getElementById("words").innerText = words.join(", ")

    // enable the input
    letters_input.disabled = false;

}


async function get_words(letters) {
    
    // Generate all arangements without duplicates
    var arrangements = getAllUniquePermutations(letters);
    

    // Check all the arrangements and see if there are any real words
    const validWords = [];
    
    for (let i=0; i < arrangements.length; i++) {
        var startTime = performance.now();
        
        var arr = arrangements[i]
        var isValid = await checkWordValidity(arr);
        if (isValid) validWords.push(arr);

        var duration = performance.now() - startTime;
        var est = duration*(arrangements.length-i)/1000 // estimated time left

        document.getElementById("est").innerText = est.toString() + "s"
    }

    document.getElementById("est").innerText = ""
    return validWords
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
    
async function checkWordValidity(word) {
    try {
        var data = await find(word);
        var isValid = data.length >= 1 && word.length > 3;
        return isValid
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