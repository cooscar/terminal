document.addEventListener("DOMContentLoaded", function () {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");
    const userInputSpan = document.getElementById("user-input");

    let commandHistory = [];
    let historyIndex = -1;

    async function getIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return "Error fetching IP address";
        }
    }

    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const command = terminalInput.value.trim();
            if (command !== "") {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                processCommand(command);
            }
            terminalInput.value = "";
            userInputSpan.textContent = "";
        } else if (event.key === "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
                userInputSpan.textContent = terminalInput.value;
            }
        } else if (event.key === "ArrowDown") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
                userInputSpan.textContent = terminalInput.value;
            } else {
                terminalInput.value = "";
                userInputSpan.textContent = "";
            }
        } else if (event.ctrlKey && event.key === 'c') {
            terminalOutput.innerHTML = "";
        }
    });

    terminalInput.addEventListener("input", function () {
        userInputSpan.textContent = terminalInput.value;
    });

    async function processCommand(command) {
        const commandElement = document.createElement("div");
        commandElement.innerHTML = `<span class="prefix">terminal@web-terminal ~ $</span> ${command}`;
        terminalOutput.appendChild(commandElement);
    
        const outputElement = document.createElement("div");
        outputElement.classList.add("output-line");
        outputElement.innerHTML = await executeCommand(command);  
        
        terminalOutput.appendChild(outputElement);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    async function executeCommand(command) {
        switch (command.toLowerCase()) {
            case "help":
                return "Available commands:\n- help: Show available commands\n- clear: Clear the terminal\n- echo [text]: Print text \n- github: Get the link to my github \n- bio: Get a short and brief bio about me \n- projects: get a list of my projects \n- discord: Get my discord \n- ip: Get your current ip address \n- game: Get the link to BitZap";
            case "clear":
                terminalOutput.innerHTML = "";
                return "";
            case "github":
                return 'Visit my GitHub: <a href="https://github.com/cooscar" target="_blank" style="color:rgb(117, 120, 124);">https://github.com/cooscar</a>';
            case "bio":
                return "Hi, I'm a high school student with hopes of becoming a full stack dev. \n I am familiar with multiple languages and this is my summary of sorts.";
            case "projects":
                return "I have a few projects on my GitHub, most of which are private, none of which particularly stand out, other than my Discord bot. \n I am very familiar with Discord bots and if you have any bot requests feel free to hmu on Discord, just run the command `discord`";
            case "discord":
                return 'My discord is <a href="https://discord.com/users/884805614591676426" target="_blank" style="color:rgb(117, 120, 124);">https://discord.com/users/884805614591676426</a>'
            case "ip":
                const ip = await getIP(); 
                return `Your IP address is: ${ip}`;
    
            case "cls":
                terminalOutput.innerHTML = "";
                return "";
            case "game":
                return 'Bit zap is a small game i made: <a href="https://cooscar.github.io/Bit-Zap/menu.html" target="_blank" style="color:rgb(117, 120, 124);">https://cooscar.github.io/Bit-Zap/menu.html</a>'
    
            default:
                if (command.startsWith("echo ")) {
                    return command.slice(5);
                }
                if (command.startsWith("gbhx ")) {
                    return "Hahah you found my easteregg, good job!";
                }
                return `Command not found: ${command}`;
        }
    }
    
    

    document.addEventListener("click", function () {
        terminalInput.focus();
    });

    terminalInput.focus();
});
