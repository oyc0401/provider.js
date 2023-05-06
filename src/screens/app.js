// let loadedScripts = [];

function loadPage(url) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let content = document.getElementById('content');
            content.innerHTML="";
            content.innerHTML = xhr.responseText;
            executeScripts(content);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function executeScripts(container) {
    let scripts = container.getElementsByTagName('script');
    console.log(scripts.length);

    for (let i = 0; i < scripts.length; i++) {
        let script = scripts[i];
        let src = script.src;
        console.log(src)


        let type = script.getAttribute('type');

        if (type === 'module') {
            loadModule(script.src)
        } else {
            let newScript = document.createElement('script');
            newScript.text = script.text;
            document.head.appendChild(newScript);
        }


    }

}

function loadModule(src) {
    console.log("das");
    let script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    document.head.appendChild(script);
}


// loadPage('index.html');