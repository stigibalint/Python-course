let pyodide;
let editor;

async function main() {
    pyodide = await loadPyodide();
    console.log("Pyodide loaded");
}

main();

document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();
    createCodeEditor();
    loadChallenge("1");
    
    document.querySelectorAll('.challenge-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.challenge-list a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            const challengeNumber = this.getAttribute('data-challenge');
            loadChallenge(challengeNumber);
        });
    });
});

function createCodeEditor() {
    const codeInput = document.getElementById('code-input');
    if (codeInput) {
        editor = CodeMirror.fromTextArea(codeInput, {
            mode: "python",
            theme: "monokai",
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            extraKeys: {
                "Tab": function(cm) {
                    cm.replaceSelection("    ", "end");
                }
            }
        });
    } else {
        console.error("Code input element not found");
    }
}
function loadChallenge(challengeNumber) {
    const challengeContent = document.getElementById('challenge-content');
    let challengeHTML = '';
    let validationFunction;

    switch(challengeNumber) {
        case "1":
            challengeHTML = `
                <h1>Mai kihívás: Palindrom ellenőrző</h1>
                <p>Írj egy függvényt, ami eldönti egy szóról, hogy palindrom-e (visszafelé olvasva is ugyanaz).</p>
                <div class="code-editor">
                    <textarea id="code-input">
def is_palindrome(word):
    # Itt írd meg a kódot
    pass

# Teszteld a függvényt
print(is_palindrome("radar"))  # True
print(is_palindrome("hello"))  # False
                    </textarea>
                </div>
                <button id="run-code" class="submit-button">Futtatás</button>
                <div id="output">
                    <pre></pre>
                </div>
            `;
            validationFunction = (output) => {
                return output.includes("True") && output.includes("False");
            };
            break;
        case "2":
            challengeHTML = `
                <h1>Kihívás: Fibonacci sorozat</h1>
                <p>Írj egy függvényt, amely generálja a Fibonacci sorozat első n elemét.</p>
                <div class="code-editor">
                    <textarea id="code-input">
def fibonacci(n):
    # Itt írd meg a kódot
    pass

# Teszteld a függvényt
print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                    </textarea>
                </div>
                <button id="run-code" class="submit-button">Futtatás</button>
                <div id="output">
                    <pre></pre>
                </div>
            `;
            validationFunction = (output) => {
                return output.includes("[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]");
            };
            break;
        case "3":
            challengeHTML = `
                <h1>Kihívás: Prímszám ellenőrző</h1>
                <p>Írj egy függvényt, amely eldönti egy számról, hogy prímszám-e.</p>
                <div class="code-editor">
                    <textarea id="code-input">
def is_prime(n):
    # Itt írd meg a kódot
    pass

# Teszteld a függvényt
print(is_prime(17))  # True
print(is_prime(24))  # False
                    </textarea>
                </div>
                <button id="run-code" class="submit-button">Futtatás</button>
                <div id="output">
                    <pre></pre>
                </div>
            `;
            validationFunction = (output) => {
                const lines = output.split('\n');
                return lines.some(line => line.trim() === "True") && 
                       lines.some(line => line.trim() === "False");
            };
            break;
        case "4":
            challengeHTML = `
                <h1>Kihívás: Lista rendezése</h1>
                <p>Írj egy függvényt, amely rendezi a listát növekvő sorrendben (buborékrendezés algoritmussal).</p>
                <div class="code-editor">
                    <textarea id="code-input">
def bubble_sort(arr):
    # Itt írd meg a kódot
    pass

# Teszteld a függvényt
test_list = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(test_list))  # [11, 12, 22, 25, 34, 64, 90]
                    </textarea>
                </div>
                <button id="run-code" class="submit-button">Futtatás</button>
                <div id="output">
                    <pre></pre>
                </div>
            `;
            validationFunction = (output) => {
                return output.includes("[11, 12, 22, 25, 34, 64, 90]");
            };
            break;
        case "5":
            challengeHTML = `
                <h1>Kihívás: Szöveg megfordítása</h1>
                <p>Írj egy függvényt, amely megfordítja a kapott szöveget.</p>
                <div class="code-editor">
                    <textarea id="code-input">
def reverse_string(text):
    # Itt írd meg a kódot
    pass

# Teszteld a függvényt
print(reverse_string("Hello, World!"))  # !dlroW ,olleH
                    </textarea>
                </div>
                <button id="run-code" class="submit-button">Futtatás</button>
                <div id="output">
                    <pre></pre>
                </div>
            `;
            validationFunction = (output) => {
                return output.includes("!dlroW ,olleH");
            };
            break;
        default:
            challengeHTML = '<h1>Kihívás nem található</h1>';
            validationFunction = () => false;
    }

    challengeContent.innerHTML = challengeHTML;
    createCodeEditor();
    hljs.highlightAll();

    document.getElementById("run-code").addEventListener("click", async function() {
        let code = editor.getValue();
        let outputElement = document.querySelector("#output pre");
        
        try {
            pyodide.runPython('import sys; sys.stdout.flush(); sys.stderr.flush()');
            
            pyodide.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);
            
            await pyodide.runPythonAsync(code);
            
            let output = pyodide.runPython("sys.stdout.getvalue()");
            
            outputElement.textContent = "Kimenet:\n" + output;
            
            if (validationFunction(output)) {
                outputElement.textContent += "\n\nHelyes megoldás!";
            } else {
                outputElement.textContent += "\n\nNem megfelelő megoldás. Próbáld újra!";
            }
        } catch (error) {
            outputElement.textContent = "Hiba: " + error.message;
        } finally {
            pyodide.runPython("sys.stdout = sys.__stdout__");
        }

        hljs.highlightElement(outputElement);
    });
}