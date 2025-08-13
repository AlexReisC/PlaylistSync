const inputForm = document.getElementById("paste-new-url-form");

inputForm.addEventListener("submit", ev => {
    ev.preventDefault();
    
    const inputUrlField = document.getElementById("playlist-url");
    const url = inputUrlField.value.trim();

    const existingError = document.querySelector(".url-error");
    if (existingError) existingError.remove();

    if (url.startsWith("https://open.spotify.com/playlist/")) {
        getConvertedPlaylist(url);
    } else {
        const errorMessage = createElement("p", "url-error", "Insira uma URL de uma playlist do Spotify");
        const sectionForm = document.querySelector(".paste-url-form");
        sectionForm.appendChild(errorMessage);
    }
})

function createElement(tag, className, textContent = '', attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    if (textContent) el.textContent = textContent;
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    return el;
}

async function getConvertedPlaylist(urlPasted) {
    try {
        const response = await fetch("http://localhost:3000/api/convert-playlist", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlPasted })
        });
        
        if (!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
    
        const jsonData = await response.json();
        
        const div = document.querySelector(".display-new-playlist");
        div.innerHTML = "";
        
        const a = createElement("a", "new-playlist-url", "Ver playlist no Youtube", {
            "href": jsonData.url,
            "target": "_blank",
            "rel": "noopener noreferrer"
        });
    
        div.appendChild(a);
    } catch (error) {
        console.error("Erro ao converter playlist: ", error);

        const div = document.querySelector(".display-new-playlist");
        div.innerHTML = "<p class='urlError'>Ocorreu um erro ao converter a playlist. Tente novamente.</p>";
    }
}