
async function main(word) {
    const res = await fetch("https://api.tezaurs.lv/v1/examples/" + word);
    const json = await res.json();
    return json;
}




function factorial(n){
    let answer = 1;
    if (n == 0 || n == 1){
      return answer;
    }else{
      for(var i = n; i >= 1; i--){
        answer = answer * i;
      }
      return answer;
    }  
  }

  function swap(chars, i, j) {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

function getAnagrams(input) {
    var counter = [],
        anagrams = [],
        chars = input.split(''),
        length = chars.length,
        i;

    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }

    anagrams.push(input);
    i = 0;
    while (i < length) {
        if (counter[i] < i) {
            swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            anagrams.push(chars.join(''));
        } else {
            counter[i] = 0;
            i++;
        }
    }

    return anagrams;
}

function filt(comb) {
    const bpb = ['s', 'a', 'e', 'i']; // burti parasti beigas

    const correctlist = [];

    for (let i = 0; i < comb.length; i++) {
        for (let j = 0; j < bpb.length; j++) {
            if (comb[i].endsWith(bpb[j])) {
                correctlist.unshift(comb[i]);
                comb.splice(i, 1);
            }
        }
        correctlist.push(comb[i]);
    }
    return correctlist;
}

async function atrastLocijumus(vards) {
    const res = await fetch("https://api.tezaurs.lv/v1/inflections/" + vards);
    const json = await res.json();
    const locijumi = [];
    for (let i = 0; i < json[0].length; i++) {
        locijumi.push(json[0][i]['Vārds']);
    }

    return locijumi;
}

function nonemburtu(vards, reize) {
    return vards.replace(vards[vards.length-reize], '');
}

async function getword(l, count, combinations, words, lorig=null, times=0, combi) {
    if (!combinations || combinations.length == 0) {
        combinations = getAnagrams(l);
        combinations = filt(combinations);
    }
    if (!words) words = [];

    let word = [];
    let found = false;
    while (!found) {
        word = await main(combinations[count[0]]);
        if (word.length > 1) found = true;
        word = combinations[count[0]];
        count[0]++;
        count[1]++;

        // parbaudam vai jau tie procenti tika ievaditi
        const prev = Math.floor(((count[1]-1)/combi)*100);
        const jauns = Math.floor(((count[1])/combi)*100);
        if (prev != jauns && jauns < 101) {
            const comp = document.getElementById('comp');
            comp.innerHTML = jauns + "%";
        }


        if (count[0] > combinations.length) {
            // vairak iespejamu vardu kombinaciju nav
            if (words.length != 0) { // piedavajam citas opcijas
                console.log("Atradam " + words.join(" "));
                if (words.length == 1) {
                    const locijumi = await atrastLocijumus(words[0]);
                    console.log("Iespejeami locijumi: " + locijumi.join());
                }
            }
            
            // visas kombinacijas tika izmantotas
            // meiginam atkal bet nonemam burtu
            if (!lorig) { // sis ir pirmais meiginajums nonemt burtu
                setTimeout(function() {
                    const lett = l.slice(0, -1);
                    getword(lett, [0, count[1]], null, words, l, 1, combi);
                }, 500);
                return;
            } else {
                if (times == lorig.length) {
                    const comp = document.getElementById('comp');
                    comp.innerHTML = "Pabeidza";
                    return;
                }
                const lett = nonemburtu(lorig, times);
                times += 1;
                getword(lett, [0, count[1]], null, words, lorig, times, combi);
                return;
            }
        }
    }
    // parbaudam vai jau tads vards ir
    if (!words.includes(word)){
        const result = document.getElementById('res');
        console.log(word);
        result.innerHTML += word+" ";
        words.push(word);
    }   

    // we continue to search for more words
    getword(l, count, combinations, words, lorig, times, combi);
}

async function btnClick() {
    const val = document.getElementById('fname').value;
    const result = document.getElementById('res');
    result.innerHTML = "";
    const comp = document.getElementById('comp');
    comp.innerHTML = '';

    const combinacijas = factorial(val.length) + (factorial(val.length-1) * (val.length-1));
    const comb = document.getElementById('comb');
    comb.innerHTML = "Vardu kombinacijas: "+combinacijas;

    if (val.length > 1) getword(val, [0,0], null, null, null,null, combinacijas);
}