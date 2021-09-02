const input = document.getElementById("input");
const submit = document.querySelector(".shorten");
const copyBtn = document.querySelector(".copy_btn");
var links_container = document.querySelector(".shortened");
submit.addEventListener("click", shorten);
var data;

retrieve();

function copy() {
    buttons = document.querySelectorAll(".copy_btn");
    for (let i = 0; i < buttons.length; i++) {
       buttons[i].addEventListener("click", (e) => {
        text = document.createElement('textarea');
        text.value = e.target.previousElementSibling.innerHTML;
        text.setAttribute('readonly', true);
        text.style.position = 'absolute';
        text.style.left = '-99999px';
        document.body.appendChild(text);
        text.select();
        text.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(text);
        e.target.classList.add('copied');
        e.target.textContent = "Copied!";
       }) 
    }
}

function shorten() {
    var link = input.value.trim();
    $.ajax({url: "https://api.rebrandly.com/v1/links/new?apikey=de59ae267a57441db0644ecc81cf1be9&destination="+link+"&domain[fullName]=rebrand.ly",
    success: function(rawData) {
        var rawString = JSON.stringify(rawData);
        data = JSON.parse(rawString);
        console.log(data.shortUrl);
        links_container.innerHTML = links_container.innerHTML + put(link, data.shortUrl);
        store(link, data.shortUrl);
        copy();
        input.value = "";
    }})
    
}

function put(longLink, shortLink) {
    var section = 
    `
    <div class= "slink">
    <a href="${longLink}" target="_blank" class="left1">${longLink}</a>
    <div class="copy">
     <a href="https:${shortLink}" target="_blank" class = "short">${shortLink}</a>
     <button class= "copy_btn">Copy</button>
     </div>
     </div>`;

    return section
  
     
}
function store(longLink, shortLink) {
    localStorage.setItem(longLink, shortLink);
}

function retrieve() {
    

    for (let i = 0; i < localStorage.length; i++) {
        const longLink = localStorage.key(i);
        const shortLink = localStorage.getItem(longLink);

        links_container.innerHTML = links_container.innerHTML + put(longLink, shortLink)
        copy();
    }
}



