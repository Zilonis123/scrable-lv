
async function search() {
    // Function that starts it all
    
    const letters = document.getElementById("letters").value;
}


async function find(word) {
    const res = await fetch(`http://api.tezaurs.lv:8182/v1/inflections/${word}`);
    const json = await res.json();
    return json;
}

