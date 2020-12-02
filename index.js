const fs = require('fs').promises;
const $ = jQuery = require('jquery');

let root = document.getElementById("root");
let scriptContainer = document.getElementById("scripts");

async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath);
        const htmlString = data.toString();
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        const scriptElements = doc.getElementsByTagName("script");

        if (scriptElements.length === 0) {
            root.innerHTML = htmlString;
        } else {
            const script = document.createElement("script");
            script.type = "text/javascript";

            // Get the script content
            let scripts = "";
            for (let i = 0; i < scriptElements.length; i++) {
                // Get the custom data-src attribute
                let dataSrc = scriptElements[i].getAttribute("data-src");
                console.log(scriptElements[i]);
                console.log(dataSrc);

                // Get scripts on current document
                const currentDocScripts = document.getElementsByTagName("script");
                console.log(currentDocScripts[i]);

                // Check if a rendered script has the same data-src attribute
                for (let y = 0; y < currentDocScripts.length; y++) {
                    if (currentDocScripts[y].getAttribute("data-src") === dataSrc) {
                        // If it does, remove the script
                        console.log("Removing redundant script");
                        currentDocScripts[y].parentNode.removeChild(currentDocScripts[y]);
                    }
                }
                // Get the script
                let data = await fs.readFile("./templates/" + dataSrc)
                let src = data.toString();
                scripts += src;
                script.setAttribute("data-src", dataSrc);
            } // END OF OUTER LOOP

            // Set the scripts content
            script.textContent = scripts;

            // Append the html with script tags removed to the root container
            root.innerHTML = removeScripts(htmlString);

            // Append the built script tag to the script container
            scriptContainer.appendChild(script);
        } 
    } catch (error) {
        console.error(`Error fetching file: ${error.message}`);
        root.innerHTML = "<h1>Error</h1>";
    }
}

function removeScripts(html) {
    let newHtml = $(html.bold());
    newHtml.find("script").remove();
    return newHtml.html();
}

readFile("./templates/index.html");