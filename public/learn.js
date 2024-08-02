let pyodide;
let editor;
let userProgress = {};

async function main() {
    pyodide = await loadPyodide();
    console.log("Pyodide loaded");
}

main();

document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();
    createCodeEditor();
    loadLesson("1");
    
    document.querySelectorAll('.lesson-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.lesson-list a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            const lessonNumber = this.getAttribute('data-lesson');
            loadLesson(lessonNumber);
        });
    });
});

function createCodeEditor() {
    const codeInput = document.getElementById('code-input');
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
}

function loadLesson(lessonNumber) {
    const lessonContent = document.querySelector('.lesson-content');
    let lessonHTML = '';
    let validationFunction;

    switch(lessonNumber) {
        case "0":
            lessonHTML = `
                <h1><i class="fas fa-cogs"></i> 0. Python telepítése és beállítása</h1>
                <p>A Python telepítésének és beállításának lépései:</p>
                
                <h2>1. Python letöltése</h2>
                <p>Nyisd meg a <a href="https://www.python.org/downloads/" target="_blank">Python hivatalos letöltési oldalát</a>, és töltsd le a legújabb verziót.</p>
                
                <h2>2. Telepítés</h2>
                <p>Futtasd a letöltött telepítőt és kövesd a képernyőn megjelenő utasításokat. Ne felejtsd el bejelölni a "Add Python to PATH" opciót!</p>
                
                <h2>3. Telepítés ellenőrzése</h2>
                <p>Nyiss meg egy parancssort (Windows) vagy terminált (Mac/Linux), és írd be a következő parancsot:</p>
                <pre><code class="language-bash">python --version</code></pre>
                <p>Ha a Python verzióját látod, akkor sikeresen telepítetted a Pythont!</p>
                
                <h2>4. Szövegszerkesztő</h2>
                <p>Válassz egy szövegszerkesztőt vagy integrált fejlesztőkörnyezetet (IDE), mint például a Visual Studio Code, PyCharm vagy Jupyter Notebook.</p>
                
                <h2>Példa: Egyszerű Python program futtatása</h2>
                <p>Hozz létre egy fájlt <code>hello.py</code> néven, és írd bele a következő kódot:</p>
                <pre><code class="language-python">print("Hello, Python!")</code></pre>
                <p>Mentés után futtasd a fájlt a parancssorban a következő parancs segítségével:</p>
                <pre><code class="language-bash">python hello.py</code></pre>
                <p>Ha a "Hello, Python!" üzenetet látod, akkor minden készen áll a Python fejlesztéshez!</p>
                
            `;

            validationFunction = null;
            break;
        case "1":
            lessonHTML = `
                <h1><i class="fas fa-play"></i> 1. Bevezetés a Pythonba</h1>
                <p>A Python egy magas szintű, általános célú programozási nyelv. Könnyen olvasható és írható szintaxisa miatt kezdők és profik egyaránt kedvelik.</p>
                
                <h2>Python jellemzők:</h2>
                <ul>
                    <li>Egyszerű és könnyen olvasható szintaxis</li>
                    <li>Dinamikus típusosság</li>
                    <li>Automatikus memóriakezelés</li>
                    <li>Nagy standard könyvtár</li>
                    <li>Platformfüggetlen</li>
                </ul>
        
                <div class="example">
                    <h3>Példa: Első Python program</h3>
                    <p>Íme egy egyszerű Python program, amely kiírja a "Hello, Python!" üzenetet:</p>
                    <pre><code class="language-python">
print("Hello, Python!")
                    </code></pre>
                    <p>Ez a program a <code>print()</code> függvényt használja, amely kiírja a zárójelek közé írt szöveget a képernyőre.</p>
                </div>
        
                <h3>Python használata:</h3>
                <p>Pythonban a kódot közvetlenül írhatjuk és futtathatjuk, nincs szükség külön fordításra vagy összeállításra.</p>
        
                <div class="example">
                    <h3>Több sor kiíratása:</h3>
                    <pre><code class="language-python">
print("Ez az első sor")
print("Ez a második sor")
print("Ez a harmadik sor")
                    </code></pre>
                </div>
        
                <div class="exercise">
                    <h3>Feladat: Köszönj a világnak!</h3>
                    <p>Írj egy programot, amely kiírja: "Helló, Világ!", majd alatta egy új sorban: "Üdvözöl a Python!"</p>
                    <div class="code-editor">
                        <textarea id="code-input" rows="5"></textarea>
                    </div>
                    <button id="run-code">Futtatás</button>
                </div>
            `;
            validationFunction = (output) => {
                const lines = output.trim().split('\n');
                return lines.length === 2 && 
                       lines[0].trim() === "Helló, Világ!" && 
                       lines[1].trim() === "Üdvözöl a Python!";
            };
            break;
            case "2":
                lessonHTML = `
                    <h1>2. Változók és adattípusok</h1>
                    <p>A Python nyelvben a változók dinamikusan típusosak. Ez azt jelenti, hogy nem kell előre meghatároznunk a változó típusát, és egy változó típusa futás közben megváltozhat.</p>
                    
                    <h2>Alap adattípusok:</h2>
                    <ul>
                        <li><strong>int</strong>: Egész számok (pl. 5, -3, 1000)</li>
                        <li><strong>float</strong>: Lebegőpontos számok (pl. 3.14, -0.001, 2.0)</li>
                        <li><strong>str</strong>: Szöveg (karakterlánc) (pl. "Hello", 'Python')</li>
                        <li><strong>bool</strong>: Logikai érték (True vagy False)</li>
                    </ul>
            
                    <div class="example">
                        <h3>Példa: Változók és adattípusok</h3>
                        <pre><code class="language-python">
# Egész szám
x = 5
print(f"x értéke: {x}, típusa: {type(x)}")

# Lebegőpontos szám
y = 3.14
print(f"y értéke: {y}, típusa: {type(y)}")

# Szöveg
name = "Python"
print(f"name értéke: {name}, típusa: {type(name)}")

# Logikai érték
is_fun = True
print(f"is_fun értéke: {is_fun}, típusa: {type(is_fun)}")
                        </code></pre>
                    </div>
            
                    <h3>Változók elnevezése:</h3>
                    <ul>
                        <li>Betűvel vagy aláhúzásjellel kell kezdődnie</li>
                        <li>Csak betűket, számokat és aláhúzásjelet tartalmazhat</li>
                        <li>Kis- és nagybetű érzékeny</li>
                        <li>Nem lehet fenntartott kulcsszó (pl. if, for, while)</li>
                    </ul>
            
                    <div class="example">
                        <h3>Példa: Változók használata műveletekben</h3>
                        <pre><code class="language-python">
a = 10
b = 3

print(f"a + b = {a + b}")
print(f"a - b = {a - b}")
print(f"a * b = {a * b}")
print(f"a / b = {a / b}")
print(f"a // b = {a // b}")  # Egész osztás
print(f"a % b = {a % b}")   # Maradékos osztás
print(f"a ** b = {a ** b}") # Hatványozás
                        </code></pre>
                    </div>
            
                    <div class="exercise">
                        <h3>Feladat: Változók használata</h3>
                        <p>Hozz létre egy változót a neveddel, egy másikat a koroddal, majd írd ki őket egy mondatban a következő formában: "A nevem [név] és [kor] éves vagyok."</p>
                        <div class="code-editor">
                            <textarea id="code-input" rows="5"></textarea>
                        </div>
                        <button id="run-code">Futtatás</button>
                    </div>
                `;
                validationFunction = (output) => {
                    const pattern = /A nevem .+ és \d+ éves vagyok\./;
                    return pattern.test(output.trim());
                };
                break;
             

                case "3":
                    lessonHTML = `
                        <h1>3. Vezérlési szerkezetek</h1>
                        <p>A vezérlési szerkezetek lehetővé teszik a program folyásának irányítását. A leggyakoribb vezérlési szerkezetek az if-else elágazások és a ciklusok.</p>
                
                        <h2>If-else szerkezet:</h2>
                        <p>Az if-else szerkezet lehetővé teszi, hogy a program különböző kódokat hajtson végre különböző feltételek teljesülése esetén.</p>
                
                        <div class="example">
                            <h3>Példa: If-else szerkezet</h3>
                            <pre><code class="language-python">
age = 18

if age < 18:
    print("Kiskorú")
elif age == 18:
    print("Éppen nagykorú")
else:
    print("Felnőtt")
                            </code></pre>
                        </div>
                
                        <h2>For ciklus:</h2>
                        <p>A for ciklus lehetővé teszi, hogy egy adott műveletsort többször végrehajtsunk.</p>
                
                        <div class="example">
                            <h3>Példa: For ciklus</h3>
                            <pre><code class="language-python">
for i in range(5):
    print(f"A ciklus {i+1}. iterációja")
                            </code></pre>
                        </div>
                
                        <h2>While ciklus:</h2>
                        <p>A while ciklus addig fut, amíg egy adott feltétel igaz.</p>
                
                        <div class="example">
                            <h3>Példa: While ciklus</h3>
                            <pre><code class="language-python">
count = 0
while count < 5:
    print(f"A számláló értéke: {count}")
    count += 1
                            </code></pre>
                        </div>
                
                        <div class="exercise">
                            <h3>Feladat: Páros vagy páratlan?</h3>
                            <p>Írj egy programot, amely bekér egy számot a felhasználótól, és kiírja, hogy páros vagy páratlan! Használj if-else szerkezetet!</p>
                            <div class="code-editor">
                                <textarea id="code-input" rows="8"></textarea>
                            </div>
                            <button id="run-code">Futtatás</button>
                        </div>
                    `;
                    validationFunction = (output) => {
                        return output.toLowerCase().includes("páros") || output.toLowerCase().includes("páratlan");
                    };
                    break;
                
                case "4":
                    lessonHTML = `
                        <h1>4. Függvények</h1>
                        <p>A függvények újrafelhasználható kódrészletek, amelyek segítségével strukturálhatjuk és szervezhetjük a programunkat.</p>
                
                        <h2>Függvény definiálása:</h2>
                        <p>Pythonban a függvényeket a <code>def</code> kulcsszóval definiáljuk.</p>
                
                        <div class="example">
                            <h3>Példa: Egyszerű függvény</h3>
                            <pre><code class="language-python">
def greet(name):
    return f"Helló, {name}!"

print(greet("Alice"))
print(greet("Bob"))
                            </code></pre>
                        </div>
                
                        <h2>Paraméterek és visszatérési érték:</h2>
                        <p>A függvények fogadhatnak paramétereket és visszaadhatnak értékeket.</p>
                
                        <div class="example">
                            <h3>Példa: Paraméterek és visszatérési érték</h3>
                            <pre><code class="language-python">
def add(a, b):
    return a + b

result = add(5, 3)
print(f"5 + 3 = {result}")
                            </code></pre>
                        </div>
                
                        <h2>Alapértelmezett paraméterek:</h2>
                        <p>Függvényeknek lehetnek alapértelmezett paraméterei.</p>
                
                        <div class="example">
                            <h3>Példa: Alapértelmezett paraméter</h3>
                            <pre><code class="language-python">
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # 3^2 = 9
print(power(3, 3))  # 3^3 = 27
                            </code></pre>
                        </div>
                
                        <div class="exercise">
                            <h3>Feladat: Területszámítás</h3>
                            <p>Írj egy függvényt, amely kiszámítja egy téglalap területét a hosszúság és szélesség alapján! A függvény neve legyen <code>calculate_area</code>, és két paramétert fogadjon: <code>length</code> és <code>width</code>. A függvény térjen vissza a számított területtel.</p>
                            <div class="code-editor">
                                <textarea id="code-input" rows="8"></textarea>
                            </div>
                            <button id="run-code">Futtatás</button>
                        </div>
                    `;
                    validationFunction = (output) => {
             
                        return !isNaN(parseFloat(output));
                    };
                    break;
                    case "5":
                        lessonHTML = `
                            <h1>5. Listák és ciklusok</h1>
                            <p>A listák több elemet tartalmazó adatszerkezetek. A ciklusokkal könnyen végig tudunk menni a lista elemein.</p>
                    
                            <h2>Listák létrehozása és használata:</h2>
                            <div class="example">
                                <h3>Példa: Lista létrehozása és elemek elérése</h3>
                                <pre><code class="language-python">
fruits = ["alma", "banán", "cseresznye"]
print(fruits[0])  # Első elem
print(fruits[-1])  # Utolsó elem
print(len(fruits))  # Lista hossza
                                </code></pre>
                            </div>
                    
                            <h2>Lista műveletek:</h2>
                            <div class="example">
                                <h3>Példa: Lista műveletek</h3>
                                <pre><code class="language-python">
fruits = ["alma", "banán"]
fruits.append("cseresznye")  # Elem hozzáadása
fruits.insert(1, "narancs")  # Beszúrás adott indexre
fruits.remove("banán")  # Elem eltávolítása
popped = fruits.pop()  # Utolsó elem eltávolítása és visszaadása
fruits.sort()  # Lista rendezése
                                </code></pre>
                            </div>
                    
                            <h2>Listák és ciklusok:</h2>
                            <div class="example">
                                <h3>Példa: Lista bejárása for ciklussal</h3>
                                <pre><code class="language-python">
fruits = ["alma", "banán", "cseresznye"]
for fruit in fruits:
    print(f"Gyümölcs: {fruit}")
            </code></pre>
        </div>

        <h2>List comprehension:</h2>
        <p>A list comprehension egy tömör módja új listák létrehozásának.</p>
        <div class="example">
            <h3>Példa: List comprehension</h3>
            <pre><code class="language-python">
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]
                                </code></pre>
                            </div>
                    
                            <div class="exercise">
                                <h3>Feladat: Számok összege</h3>
                                <p>Írj egy programot, amely létrehoz egy listát az 1-től 10-ig terjedő számokkal, majd összeadja ezeket a számokat és kiírja az eredményt! Használj for ciklust a lista bejárásához!</p>
                                <div class="code-editor">
                                    <textarea id="code-input" rows="8"></textarea>
                                </div>
                                <button id="run-code">Futtatás</button>
                            </div>
                        `;
                        validationFunction = (output) => {
 
                            return output.trim() === "55";
                        };
                        break;
      
                        case "6":
                            lessonHTML = `
                                <h1>6. Szótárak és halmazok</h1>
                                <p>A szótárak kulcs-érték párokat tárolnak, míg a halmazok egyedi elemek rendezetlen gyűjteményei.</p>
                        
                                <h2>Szótárak (Dictionary):</h2>
                                <p>A szótárak kulcs-érték párokat tárolnak, és gyors hozzáférést biztosítanak a kulcsok alapján.</p>
                        
                                <div class="example">
                                    <h3>Példa: Szótár létrehozása és használata</h3>
                                    <pre><code class="language-python">
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
print(person["name"])  # John
print(person.get("age"))  # 30
person["job"] = "Developer"  # Új kulcs-érték pár hozzáadása
print(person)
                                    </code></pre>
                                </div>
                        
                                <h2>Szótár műveletek:</h2>
                                <div class="example">
                                    <h3>Példa: Szótár műveletek</h3>
                                    <pre><code class="language-python">
person = {"name": "John", "age": 30}
print(person.keys())  # Kulcsok listázása
print(person.values())  # Értékek listázása
print(person.items())  # Kulcs-érték párok listázása

for key, value in person.items():
    print(f"{key}: {value}")
            </code></pre>
        </div>

        <h2>Halmazok (Set):</h2>
        <p>A halmazok egyedi elemek rendezetlen gyűjteményei. Gyors műveletek végezhetők velük, mint unió, metszet, különbség.</p>

        <div class="example">
            <h3>Példa: Halmaz létrehozása és használata</h3>
            <pre><code class="language-python">
fruits = {"apple", "banana", "cherry"}
print(fruits)
fruits.add("orange")
fruits.remove("banana")
print("apple" in fruits)  # True
            </code></pre>
        </div>

        <h2>Halmaz műveletek:</h2>
        <div class="example">
            <h3>Példa: Halmaz műveletek</h3>
            <pre><code class="language-python">
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))  # Unió
print(set1.intersection(set2))  # Metszet
print(set1.difference(set2))  # Különbség
                                    </code></pre>
                                </div>
                        
                                <div class="exercise">
                                    <h3>Feladat: Szavak gyakorisága</h3>
                                    <p>Írj egy programot, amely megszámolja egy szövegben az egyes szavak előfordulásának gyakoriságát! Használj szótárat a gyakoriságok tárolására. A program kérjen be egy mondatot a felhasználótól, majd írja ki az egyes szavak gyakoriságát.</p>
                                    <div class="code-editor">
                                        <textarea id="code-input" rows="10"></textarea>
                                    </div>
                                    <button id="run-code">Futtatás</button>
                                </div>
                            `;
                            validationFunction = (output) => {
       
                                const lines = output.trim().split('\n');
                                return lines.length > 1 && lines.every(line => /\w+: \d+/.test(line));
                            };
                            break;
                        
                        case "7":
                            lessonHTML = `
                                <h1>7. Fájlkezelés</h1>
                                <p>A Python beépített függvényekkel rendelkezik a fájlok olvasására és írására. A fájlkezelés alapvető fontosságú az adatok tárolásához és feldolgozásához.</p>
                        
                                <h2>Fájl olvasása:</h2>
                                <div class="example">
                                    <h3>Példa: Fájl olvasása</h3>
                                    <pre><code class="language-python">
with open("pelda.txt", "r") as file:
    content = file.read()
    print(content)

# Soronkénti olvasás
with open("pelda.txt", "r") as file:
    for line in file:
        print(line.strip())
            </code></pre>
        </div>

        <h2>Fájl írása:</h2>
        <div class="example">
            <h3>Példa: Fájl írása</h3>
            <pre><code class="language-python">
with open("uj_fajl.txt", "w") as file:
    file.write("Ez az első sor.\n")
    file.write("Ez a második sor.")

# Hozzáfűzés meglévő fájlhoz
with open("uj_fajl.txt", "a") as file:
    file.write("\nEz egy új sor a fájl végén.")
            </code></pre>
        </div>

        <h2>Fájlok kezelése with utasítással:</h2>
        <p>A <code>with</code> utasítás használata biztosítja, hogy a fájl megfelelően be legyen zárva a művelet végén.</p>

        <div class="example">
            <h3>Példa: CSV fájl olvasása</h3>
            <pre><code class="language-python">
import csv

with open("adatok.csv", "r") as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)
            </code></pre>
        </div>
                        
                                <div class="exercise">
                                    <h3>Feladat: Naplózás fájlba</h3>
                                    <p>Írj egy programot, amely bekér a felhasználótól egy naplóbejegyzést, majd hozzáfűzi azt egy "naplo.txt" nevű fájlhoz. Minden bejegyzés előtt szerepeljen az aktuális dátum és idő. A program írja ki a fájl tartalmát a hozzáfűzés után.</p>
                                    <div class="code-editor">
                                        <textarea id="code-input" rows="12"></textarea>
                                    </div>
                                    <button id="run-code">Futtatás</button>
                                </div>
                            `;
                            validationFunction = (output) => {
            
                                return /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(output) && output.includes("naplo.txt");
                            };
                            break;
                            case "8":
    lessonHTML = `
        <h1>8. Kivételkezelés</h1>
        <p>A kivételkezelés lehetővé teszi a hibák kezelését és a program robusztusabbá tételét. A Python try-except blokkokat használ a kivételek kezelésére.</p>

        <h2>Alapvető kivételkezelés:</h2>
        <div class="example">
            <h3>Példa: Egyszerű kivételkezelés</h3>
            <pre><code class="language-python">
try:
    x = int(input("Adj meg egy számot: "))
    print(f"A megadott szám: {x}")
except ValueError:
    print("Hiba: Nem számot adtál meg!")
            </code></pre>
        </div>

        <h2>Több kivétel kezelése:</h2>
        <div class="example">
            <h3>Példa: Több kivétel kezelése</h3>
            <pre><code class="language-python">
try:
    num = int(input("Adj meg egy számot: "))
    result = 10 / num
    print(f"10 / {num} = {result}")
except ValueError:
    print("Hiba: Nem számot adtál meg!")
except ZeroDivisionError:
    print("Hiba: Nullával nem lehet osztani!")
except Exception as e:
    print(f"Váratlan hiba történt: {e}")
            </code></pre>
        </div>

        <h2>Finally blokk:</h2>
        <p>A finally blokk mindig végrehajtódik, függetlenül attól, hogy történt-e kivétel vagy sem.</p>

        <div class="example">
            <h3>Példa: Finally blokk használata</h3>
            <pre><code class="language-python">
try:
    f = open("pelda.txt", "r")
    content = f.read()
    print(content)
except FileNotFoundError:
    print("A fájl nem található!")
finally:
    f.close()
    print("A fájl bezárva.")
            </code></pre>
        </div>

        <h2>Saját kivételek:</h2>
        <p>Létrehozhatunk saját kivételosztályokat is speciális hibák kezelésére.</p>

        <div class="example">
            <h3>Példa: Saját kivétel</h3>
            <pre><code class="language-python">
class NegativeNumberError(Exception):
    pass

def check_positive(number):
    if number < 0:
        raise NegativeNumberError("A szám nem lehet negatív!")
    return number

try:
    result = check_positive(-5)
except NegativeNumberError as e:
    print(f"Hiba: {e}")
            </code></pre>
        </div>

        <div class="exercise">
            <h3>Feladat: Biztonságos osztás</h3>
            <p>Írj egy függvényt, amely két számot oszt el egymással. A függvény kezelje le a következő kivételeket: ValueError (ha nem számot adnak meg), ZeroDivisionError (ha nullával próbálnak osztani). A függvény kérje be a két számot a felhasználótól, és írja ki az eredményt vagy a megfelelő hibaüzenetet.</p>
            <div class="code-editor">
                <textarea id="code-input" rows="15"></textarea>
            </div>
            <button id="run-code">Futtatás</button>
        </div>
    `;
    validationFunction = (output) => {

        return /(\d+(\.\d+)?|Hiba:)/.test(output);
    };
    break;
    case "9":
        lessonHTML = `
            <h1><i class="fas fa-arrow-right"></i> 9. Lambda függvények</h1>
            <p>A lambda függvények kis, névtelen függvények, amelyeket gyakran egyszerű, egy soros műveletekhez használnak.</p>
            
            <h2>Lambda függvény szintaxisa:</h2>
            <pre><code class="language-python">
lambda paraméterek: kifejezés
            </code></pre>
        <p>A lambda függvények nagyon hasznosak lehetnek rövid, egyszerű műveletekhez, különösen ha egy adott függvényt csak egyszer használnánk.</p>
        
        <div class="example">
            <h3>Példa: Lambda függvény létrehozása és használata</h3>
            <pre><code class="language-python">
# Lambda függvény, amely két szám összegét adja vissza
összeg = lambda a, b: a + b
print(összeg(3, 4))  # 7

# Lambda függvény, amely megduplázza a bemenetet
dupláz = lambda x: x * 2
print(dupláz(5))  # 10
                </code></pre>
            </div>
            
            <div class="example">
                <h3>Példa: Lambda függvény használata beépített függvényekkel</h3>
                <pre><code class="language-python">
# Listában lévő számok megduplázása a map() függvénnyel és lambdával
számok = [1, 2, 3, 4, 5]
duplázott_számok = list(map(lambda x: x * 2, számok))
print(duplázott_számok)  # [2, 4, 6, 8, 10]

# Listában lévő számok szűrése a filter() függvénnyel és lambdával
páros_számok = list(filter(lambda x: x % 2 == 0, számok))
print(páros_számok)  # [2, 4]
                </code></pre>
            </div>
            
            <div class="exercise">
                <h3>Feladat: Lambda függvény írása</h3>
                <p>Írj egy lambda függvényt, amely két számot megszoroz és adja vissza az eredményt.</p>
                <div class="code-editor">
                    <textarea id="code-input" rows="5"></textarea>
                </div>
                <button id="run-code">Futtatás</button>
            </div>
        `;
        validationFunction = (output) => {
            const result = parseFloat(output.trim());
            return result === 12;  
        };
        break;
    
    case "10":
        lessonHTML = `
            <h1><i class="fas fa-expand"></i> 10. Hatókör (Scope)</h1>
            <p>A változók hatóköre meghatározza, hogy a változó hol érhető el a kódban. A Pythonban két fő hatókör létezik: a lokális és a globális hatókör.</p>
            
            <h2>Globális és lokális változók:</h2>
            <pre><code class="language-python">
x = "globális"

def my_function():
    x = "lokális"
    print("Lokális x:", x)

my_function()
    print("Globális x:", x)
            </code></pre>
            <p>Ebben a példában a globális és lokális változó neve ugyanaz, de mivel különböző hatókörben vannak definiálva, nem zavarják egymást.</p>
            
            <h2>Global és nonlocal kulcsszavak:</h2>
            <p>Ha egy függvényben szeretnénk egy globális változót módosítani, használhatjuk a <code>global</code> kulcsszót.</p>
            <pre><code class="language-python">
x = "globális"

def my_function():
    global x
    x = "módosított globális"
    print("A függvényben:", x)

my_function()
print("A függvényen kívül:", x)
            </code></pre>
            
            <p>A <code>nonlocal</code> kulcsszót akkor használjuk, ha egy beágyazott függvényben szeretnénk egy külső, de nem globális változót módosítani.</p>
            <pre><code class="language-python">
def outer_function():
    x = "külső"

    def inner_function():
        nonlocal x
        x = "módosított külső"
        print("Belső függvényben:", x)

    inner_function()
    print("Külső függvényben:", x)

outer_function()
            </code></pre>
    
            <div class="exercise">
                <h3>Feladat: Lokális változó használata</h3>
                <p>Írj egy függvényt, amely egy lokális változót használ a számítás elvégzéséhez, majd hívja meg a függvényt és írd ki az eredményt.</p>
                <div class="code-editor">
                    <textarea id="code-input" rows="5"></textarea>
                </div>
                <button id="run-code">Futtatás</button>
            </div>
        `;
        validationFunction = (output) => {
            return !isNaN(parseFloat(output.trim()));
        };
        break;
    
    case "11":
        lessonHTML = `
            <h1><i class="fas fa-square-root-alt"></i> 11. Matematikai műveletek (Math)</h1>
            <p>A Python számos beépített függvényt és modult kínál a matematikai műveletek elvégzéséhez. Ezek közül az egyik legfontosabb a <code>math</code> modul.</p>
            
            <h2>Gyakori matematikai műveletek:</h2>
            <ul>
                <li><strong>abs(x)</strong>: x abszolút értéke</li>
                <li><strong>pow(x, y)</strong>: x y-edik hatványa</li>
                <li><strong>round(x, n)</strong>: x kerekítése n tizedesjegyre</li>
                <li><strong>math.sqrt(x)</strong>: x négyzetgyöke</li>
                <li><strong>math.sin(x)</strong>: x szinusza (radiánban)</li>
                <li><strong>math.cos(x)</strong>: x koszinusza (radiánban)</li>
                <li><strong>math.log(x, base)</strong>: x logaritmusa a megadott alapra</li>
            </ul>
            
            <div class="example">
                <h3>Példa: Matematikai műveletek használata</h3>
                <pre><code class="language-python">
import math

# Négyzetgyök
print(math.sqrt(16))  # 4.0

# Színusz
print(math.sin(math.pi / 2))  # 1.0

# Hatvány
print(math.pow(2, 3))  # 8.0

# Logaritmus
print(math.log(100, 10))  # 2.0
                </code></pre>
            </div>
            
            <div class="example">
                <h3>Példa: A beépített abs() és round() függvények használata</h3>
                <pre><code class="language-python">
# Abszolút érték
print(abs(-7.5))  # 7.5

# Kerekítés
print(round(3.14159, 2))  # 3.14
                </code></pre>
            </div>
            
            <div class="exercise">
                <h3>Feladat: Matematikai művelet</h3>
                <p>Írj egy programot, amely kiszámolja és kiírja egy szám négyzetgyökét és köbét.</p>
                <div class="code-editor">
                    <textarea id="code-input" rows="5"></textarea>
                </div>
                <button id="run-code">Futtatás</button>
            </div>
        `;
        validationFunction = (output) => {
            const lines = output.trim().split('\n');
            return lines.length === 2 &&
                   parseFloat(lines[0]) === 4;
                   parseFloat(lines[1]) === 8;
        };
        break;
    case "12":
        lessonHTML = `
            <h1>12. Modulok és csomagok</h1>
            <p>A modulok és csomagok lehetővé teszik a kód újrafelhasználását és a program strukturálását. A Python gazdag standard könyvtárral rendelkezik, és lehetőséget ad saját modulok létrehozására is.</p>
    
            <h2>Beépített modulok használata:</h2>
            <div class="example">
                <h3>Példa: Math modul használata</h3>
                <pre><code class="language-python">
import math

print(math.pi)  # 3.141592653589793
print(math.sqrt(16))  # 4.0
print(math.sin(math.radians(30)))  # 0.5
            </code></pre>
        </div>

        <h2>Modulok részleges importálása:</h2>
        <div class="example">
            <h3>Példa: Részleges importálás</h3>
            <pre><code class="language-python">
from math import sqrt, pi

print(sqrt(25))  # 5.0
print(pi)  # 3.141592653589793
                </code></pre>
            </div>
    
            <h2>Saját modul létrehozása:</h2>
            <p>Hozzunk létre egy <code>my_math.py</code> nevű fájlt a következő tartalommal:</p>
            <pre><code class="language-python">
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

PI = 3.14159
        </code></pre>

        <p>Most használjuk ezt a modult:</p>
        <div class="example">
            <h3>Példa: Saját modul használata</h3>
            <pre><code class="language-python">
import my_math

print(my_math.add(5, 3))  # 8
print(my_math.PI)  # 3.14159
            </code></pre>
        </div>

        <h2>Csomagok:</h2>
        <p>A csomagok olyan könyvtárak, amelyek több modult tartalmaznak. Egy csomagot úgy hozhatunk létre, hogy létrehozunk egy könyvtárat egy <code>__init__.py</code> fájllal.</p>

        <div class="example">
            <h3>Példa: Csomag struktúra</h3>
            <pre><code class="language-plaintext">
my_package/
    __init__.py
    module1.py
    module2.py
                </code></pre>
            </div>
    
            <div class="exercise">
                <h3>Feladat: Geometriai számítások modul</h3>
                <p>Hozz létre egy <code>geometry</code> nevű modult, amely tartalmaz függvényeket a kör területének és kerületének kiszámítására, valamint a téglalap területének kiszámítására. Importáld és használd ezt a modult a főprogramban!</p>
                <div class="code-editor">
                    <textarea id="code-input" rows="15"></textarea>
                </div>
                <button id="run-code">Futtatás</button>
            </div>
        `;
        validationFunction = (output) => {
            // Ellenőrizzük, hogy a kimenet tartalmaz-e területet és kerületet
            return /\d+(\.\d+)?\s*(terület|kerület)/.test(output);
        };
        break;
    
    case "13":
        lessonHTML = `
            <h1>13. Objektumorientált programozás</h1>
            <p>Az objektumorientált programozás (OOP) egy programozási paradigma, amely lehetővé teszi objektumok létrehozását, amelyek adatokat és funkciókat tartalmaznak.</p>
    
            <h2>Osztályok és objektumok:</h2>
            <div class="example">
                <h3>Példa: Egyszerű osztály</h3>
                <pre><code class="language-python">
class Dog:
    def __init__(self, name):
        self.name = name
    
    def bark(self):
        return f"{self.name} says Woof!"

my_dog = Dog("Buddy")
print(my_dog.bark())  # Buddy says Woof!
            </code></pre>
        </div>

        <h2>Öröklődés:</h2>
        <p>Az öröklődés lehetővé teszi új osztályok létrehozását meglévő osztályok alapján.</p>
        <div class="example">
            <h3>Példa: Öröklődés</h3>
            <pre><code class="language-python">
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.speak())  # Buddy says Woof!
print(cat.speak())  # Whiskers says Meow!
            </code></pre>
        </div>

        <h2>Példányváltozók és osztályváltozók:</h2>
        <div class="example">
            <h3>Példa: Példány- és osztályváltozók</h3>
            <pre><code class="language-python">
class Car:
    total_cars = 0  # Osztályváltozó

    def __init__(self, brand, model):
        self.brand = brand  # Példányváltozó
        self.model = model  # Példányváltozó
        Car.total_cars += 1

car1 = Car("Toyota", "Corolla")
car2 = Car("Honda", "Civic")
print(Car.total_cars)  # 2
                </code></pre>
            </div>
    
            <div class="exercise">
                <h3>Feladat: Bankszámla osztály</h3>
                <p>Hozz létre egy <code>BankAccount</code> osztályt, amely rendelkezik <code>deposit</code> és <code>withdraw</code> metódusokkal, valamint egy <code>balance</code> attribútummal. Az osztály ne engedjen negatív egyenleget. Hozz létre néhány példányt, és mutasd be a működését!</p>
                <div class="code-editor">
                    <textarea id="code-input" rows="20"></textarea>
                </div>
                <button id="run-code">Futtatás</button>
            </div>
        `;
        validationFunction = (output) => {
            return /(\d+(\.\d+)?)\s*(egyenleg|befizetés|kivét)/.test(output);
        };
        break;
        case "14":
            lessonHTML = `
                <h1><i class="fas fa-calculator"></i> 14. Egyszerű számológép projekt</h1>
                <p>Ebben a projektben egy egyszerű számológépet fogunk készíteni Pythonban. A számológép képes lesz alapvető matematikai műveleteket végrehajtani: összeadás, kivonás, szorzás és osztás.</p>
        
                <h2>A projekt lépései:</h2>
                <ol>
                    <li>Függvények definiálása a matematikai műveletekhez</li>
                    <li>Műveletek végrehajtása előre meghatározott értékekkel</li>
                    <li>Eredmények kiírása</li>
                    <li>Hibakezelés (például nullával való osztás esetén)</li>
                </ol>
        
                <div class="example">
                    <h3>Példa: Számológép implementáció</h3>
                    <pre><code class="language-python">
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Hiba: Nullával nem lehet osztani!"
    return x / y

output = "Számológép működése:"\n

# Előre meghatározott műveletek és számok
operations = [('1', 5, 3), ('2', 10, 4), ('3', 7, 6), ('4', 15, 3)]

for choice, num1, num2 in operations:
    if choice == '1':
        result = add(num1, num2)
        output += f"{num1} + {num2} = {result} |"\n

    elif choice == '2':
        result = subtract(num1, num2)
        output += f"{num1} - {num2} = {result} |"\n

    elif choice == '3':
        result = multiply(num1, num2)
        output += f"{num1} * {num2} = {result} |"\n

    elif choice == '4':
        result = divide(num1, num2)
        output += f"{num1} / {num2} = {result} |"\n

print(output)

                    </code></pre>
                </div>
        
                <div class="exercise">
                    <h3>Feladat: Bővítsd a számológépet</h3>
                    <p>Egészítsd ki a fenti számológépet egy új művelettel: hatványozás. Adj hozzá egy új műveletet az 'operations' listához (használd az '5'-ös számot a hatványozáshoz), és implementáld a hatványozás függvényt!</p>
                    <div class="code-editor">
                        <textarea id="code-input" rows="10"></textarea>
                    </div>
                    <button id="run-code">Futtatás</button>
                </div>
            `;
            validationFunction = (output) => {
                return output.includes("^") && output.includes("5");
            };
            break;
        
        case "15":
            lessonHTML = `
                <h1><i class="fas fa-dice"></i> 15. Játék fejlesztés: Kő-papír-olló</h1>
                <p>Ebben a projektben egy egyszerű kő-papír-olló játékot fogunk implementálni Pythonban. A játékos a számítógép ellen fog játszani.</p>
        
                <h2>A projekt lépései:</h2>
                <ol>
                    <li>Játékos választásának bekérése</li>
                    <li>Számítógép véletlenszerű választásának generálása</li>
                    <li>A győztes meghatározása</li>
                    <li>Az eredmény kiírása</li>
                    <li>A játék újraindításának lehetősége</li>
                </ol>
        
                <div class="example">
                    <h3>Példa: Kő-papír-olló implementáció</h3>
                    <pre><code class="language-python">
import random

def get_player_choice():
    while True:
        choice = input("Válassz: kő, papír, vagy olló? ").lower()
        if choice in ["kő", "papír", "olló"]:
            return choice
        print("Érvénytelen választás. Kérlek, válassz: kő, papír, vagy olló.")

def get_computer_choice():
    return random.choice(["kő", "papír", "olló"])

def determine_winner(player, computer):
    if player == computer:
        return "Döntetlen!"
    elif (player == "kő" and computer == "olló") or 
            (player == "papír" and computer == "kő") or 
            (player == "olló" and computer == "papír"):
        return "Nyertél!"
    else:
        return "A számítógép nyert!"

while True:
    player_choice = get_player_choice()
    computer_choice = get_computer_choice()
    
    print(f"Te választottad: {player_choice}")
    print(f"A számítógép választotta: {computer_choice}")
    
    result = determine_winner(player_choice, computer_choice)
    print(result)
    
    play_again = input("Szeretnél újra játszani? (igen/nem): ").lower()
    if play_again != "igen":
        break

print("Köszönjük, hogy játszottál!")
                    </code></pre>
                </div>
        
                <div class="exercise">
                    <h3>Feladat: Bővítsd a játékot</h3>
                    <p>Egészítsd ki a kő-papír-olló játékot két új opcióval: gyík és Spock. (A bővített szabályok: Olló levágja a papírt, papír beborítja a követ, kő összezúzza a gyíkot, gyík megmérgezi Spockot, Spock eltöri az ollót, olló lefejezi a gyíkot, gyík megeszi a papírt, papír megcáfolja Spockot, Spock elpárologtatja a követ, és mint mindig, kő összetöri az ollót.) Módosítsd a játéklogikát az új szabályoknak megfelelően!</p>
                    <div class="code-editor">
                        <textarea id="code-input" rows="10"></textarea>
                    </div>
                    <button id="run-code">Futtatás</button>
                </div>
            `;
            validationFunction = (output) => {
                return output.toLowerCase().includes("gyík") && output.toLowerCase().includes("spock");
            };
            break;
   
            default:
                lessonHTML = `<h1>${lessonNumber}. lecke betöltése...</h1>`;
                validationFunction = () => true;
        }

    lessonContent.innerHTML = lessonHTML + `
        <div id="output">
            <pre></pre>
        </div>
    `;
    createCodeEditor();
    hljs.highlightAll();
    document.querySelectorAll('.lesson-list a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('data-lesson') === lessonNumber) {
            a.classList.add('active');
        }
    });
document.getElementById('code-input').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        this.value = this.value.substring(0, start) +
          "    " + this.value.substring(end);

        this.selectionStart =
        this.selectionEnd = start + 4;
    }
});
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



document.addEventListener('DOMContentLoaded', function() {
    const toggleLevel = document.querySelector('.toggle-level');
    const basicLessons = document.querySelector('.basic-lessons');
    const advancedLessons = document.querySelector('.advanced-lessons');
    const levelTitle = document.querySelector('.level-title');

    toggleLevel.addEventListener('click', function() {
        this.classList.toggle('active');
        basicLessons.style.display = basicLessons.style.display === 'none' ? 'block' : 'none';
        advancedLessons.style.display = advancedLessons.style.display === 'none' ? 'block' : 'none';
        levelTitle.textContent = levelTitle.textContent === 'Alapok' ? 'Haladó' : 'Alapok';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const lessons = document.querySelectorAll('.basic-lessons a, .advanced-lessons a');
    const progressBar = document.getElementById('lessonProgress');
    const progressPercentage = document.getElementById('progressPercentage');
    const searchInput = document.getElementById('lessonSearch');


    function updateProgress() {
        const completedLessons = document.querySelectorAll('.basic-lessons a.completed, .advanced-lessons a.completed').length;
        const totalLessons = lessons.length;
        const progress = (completedLessons / totalLessons) * 100;
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
    }


    lessons.forEach(lesson => {
        lesson.addEventListener('click', function() {
            this.classList.toggle('completed');
            updateProgress();
        });
    });


    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        lessons.forEach(lesson => {
            const lessonText = lesson.textContent.toLowerCase();
            if (lessonText.includes(searchTerm)) {
                lesson.style.display = 'block';
            } else {
                lesson.style.display = 'none';
            }
        });
    });


    updateProgress();
});