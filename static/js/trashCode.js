// static/js/trashCode.js
// Removed originalText and fragments declarations here

// Main initialization wrapper
async function initializeTrashInterface() {
    try {
        // Fetch secure content from server
        const response = await fetch('/api/trash/data');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const { originalText, fragments } = await response.json();
   
        
        // Constants that can stay client-side
        const demonicAsciiArt = `  
        
                                                                                                   ...            ...                                         
                                                                                           .....                                                      
                                                                                           .......          ....                                      
                                                                                           ..............   .....                                     
                                                                     .   .   ...          ....................  .                                     
                                                                       ..................................                                             
                                                                   .:.....................:::............                                             
                                                                   .:.:.::.:..::.:::...:::::::::.........                                             
                                                                  ..:....:::.::.....::::---=-----::........                                           
                                      .                       .....:....:::::--:::::----==-::::--::::..........                                       
                                    .:...  ..            .......::::.::::----=--=-----=++*+::::::..............                                       
                                   ....... ..            ... ...:-=:.::::---++=-=+-=--:-==+-:::::::..:.........                                       
                                  ......                 ...  ...::.:::::::=+++++*=+====+---:::::--=--:::.:...                                        
                                  ...  ..      .         ...  ...::.:.......:---=+=++-=++++==---:-=---:-:-:.......                                    
                                               . ........... ........      .   ....-+==+*****++++-=++=---:-=-:....                                    
                                            .........::.....                     ...-=-=*#***+*****#*+=--::-:.:-:.....                                
                                 . ...     ..::::..----:...                        ...:=*##***####%###**+=--:..::......                               
                                    ......::---:::::==-::.                        .....:=+**##%##%#*++++=*+=--::.::-::..                              
                               ...  ....:--===-....::-::..                           ..:=*#*#**#**#*=+++*++---+=-:::::-:.                             
                            ............:::---:.:..::=-..                             .:=*##*#####***+===+=--:-==-::--:......                         
                         ...............::::::::::--:::.                              ..:+###%##******##%%#*+==---:--:-:.......                       
                       . ......:.....::------------=--..                              ...=+#%@@@@%***###%#####**+=::-::-:.......                      
                      .....:..:..:::-=+**+++==-===-=+-...                              ...-*%%@@@@####%%%%%%%##**====:::........                      
                      ....::::...:::=+*++++++=:-==--=:...                              ...=*#%%@@%%#%%%#%%%%%###+===+==-::......                      
                       ..::--=:::.:-=+++++===-==--=+-....                              ...=+##%%@@%%%%%%%@%%#**##*+++=--==-:........                  
                     ...::----::::-=+**+==----=----=-....                              ...-=*%%%@@@@@%@@#%%%%##*#*+++*+===---:........                
                      ...:.::--:::--===--:::------==-....                              ...-=+%@@@@@@@@@@@%@@@%###++++**++==--::::......               
                    ......:::::::-=++===--=--=+++===:...                      ..:---......:++##@@@@@@@@@@@@@%%%%#*+++***++==--=::::.......            
            ..     .......::::::-====++=-=+====++==+-..                      ..+%=:-*=.....==+#%@@@@@@@@@@@@@%###%#######*+=--::::::...:...           
           ...     .......--::-=====++=--++++***=-=+=..     .::.....        ..+%-...-*:....=+*%@@@@@@@@@@@@@@%%%#####%%##*++==--::::::::::..          
                  ......:.::::---===+===+++++++===--=..    -#++##:..       ..:*+.....+=....-+*#%@@@@@@@@@@@@@@@@%####%%%%##**+==-=------:.:..         
                  ......:-::.:-=++++**+=+*#***++==++=.....:%=..:*#:.       ..-%+....:+=....=#*#%%@@@@@@@@@@@@@@@@@%###%%###*++=+==----:-:::...        
                  ......::::--======+**+++*###*+=-+*=.....-@-...:%+..       .:*=....-*-....-**++*%%%@@@@@@@@@@@@@@%%%%######***==+==-----:::...       
                  .....:::::-=====++*++*##%%%%@#++*++... .-@=....##..        .::.....:....:=%*++#%@@@@@@@@@@@@@@@@%%@@%%%###**+++++===-::::....       
                  .....::::---=-=+**##+**####%#**++*+... .:@@:...+*..          ...  ..  ...=##**#@%@@@@@@@@@@@@@@@@@@@%%%####***+*+=-----::.......    
                 ........::::-===+*###*##%%#####***+-......-@=.......           .   ..  ..:*#%#*#@@@@@@@@@@@@@@@@@@@@@@@@%%%##**+**++===---:.......   
                  ...:..:.:-====+*#%%%%%####****###*-.. ....::.   ...          .. .... ...-%#%##%@@@@@@@@@@@@@@@@@@@@@@@@@%%%#***++======----:.....   
                 ....:..:.:-==+++*#%%####*#***++*#*#-..    ...                 .. ...  ...=@@@%%@@@%@@@@@@@@@@@@@@@@%%%%%@%@@%%#***+=====--::::....   
                 ....:::::-=++++++###*##**#**+=+++++-..          .        .      ..    ...-@@@%@@@@%@@@@#@@@@@@@@@@@@@@@@%%%@@@%%#*+====-==--:::....  
             .   ..:.:-::-==++**+*#####*******==+++*-..                 .. .    ...    ...*@@@@@%%@%@@@@%@@@@@@@@@@@@@@@@@@@%%%@%%**+*+==-===---:.... 
             .  .:.-:-:::-==+++***####***+**+*+++==+-..                . ..     .........:@@@@@@@@%%@@@@%@@@@@@@@@@@@@@@@@@@@@%#%##****=*==--::-::... 
               ...::---=---==++*=+*##**#**#*+++****#=..         ..    ....     ... ......-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%######**+==--:.::....
             .....::--=---=+**++++**##%*+**%%*******=..                ...   ..... ......#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#%%##*##*++=-:-:.:....
        ..........--===+===***+****#**#***###****#*++..                   ..      .  ....%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%####****++==--:::...
      ...........:::--=-==+==++++*###*#*++*****+**+*+..                    .   ....  ...:@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%####*****+==---....
     ..........:::-----:--===++***+*###****##*+=++++=..                            .....:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@%%%%%%%%%%#****+++==-:--:.
    ............::-:::--==++++++=+***#**++***++=+++++:.                              ...:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%##**+=+===-::::
     ...........:---:--=====+***+**+++****+++++=+*##*-.                ..            ...:@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%####**++==----::
     ..........:---------=====+++++***++++++**++=++++=.                              ...:@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%##**+=+==-----
.  ............:-===-:---======+++***+**+***#*++=++**+.                              ....#@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@%%%@@@%@%%%%%%%####**====---::
   ............::-----=---=========+=+**##*****+++=+++:.                             ..::*@@@@@@@@@@@@%@@%@@@@@@@@@@@@@@@%%%%#%%%@%%%#%###****+=----::
     ... .......:-----:-=====+==----=+*#*******+++=++=:.                             ..:-%@@@@@@@@@@@%%@@@@@@@@@@@@@@@@%@@@%%%%%#%%%%%###***+++===-:::
      .....  ...::--:::===++*===--:=++*#***#***+*#****-.                            ...:*@@@@@@%@@@%%%@@@@@@@@@@@@@@@@@@@%%%%%@%%%%##%##***+==+-----::
        ........::::::-===++=======++******==+**#####+=..                            ..-%@@@@@@%@@#@%%@@@@@@@@@@@@@@@@@@@%%%%%%%%###%#*****+=+=---::::
     .   ........::-----===+==++=++*+*=+++**#**###**+==-....                     ......+@@@@@@%@@@#%%@@@@%@@@@@@@@@@@@@@@@@@%%%%%%######+**++=----:::.
        .........:::---::-===--++++**==++**#%****++****+:...                      ....=%@@@@@@@@@@%%%%%%@@@@@@@@@@@@@@@@@@@%%%######***+#*+++=----:::.
       ...........::::::-:::-==+****+=+*##****++++**###*-...                      ...:=%@@%@@@@@@@#%%%@%@@@@@@@%@@@@@@@@@%@@%####%%##***+==*+==--::::.
        .... ......::.::::::-=++++***#**##*==#%#*******+-...                      ...-#%%@@@@@@@%@#%%@@%@@@@@@@@@@%%@@@@@@@@@%########*+++==++-:::::..
           .........::....:::---=+***+****+*##%#**+=+**#*-..                      ..:*%%%@@@@@@@@@%@@@%%@@@%@@@@@%%%%@%@@@%%%%%#####****++====---:....
         .........:::..:.::::::-==++=+++*****#***+++==**+-..                      ..-%%%@@@@@@@@@@@@@@%%%@@@@%@@@%%%%%%%%%%%%%%%#####*+++===--:::::...
         .  .........:.....:::-=---=====++****+++++==+***=:.                      ..+#@@@@@@@@@@@@@@@@%%@%@@%@@@@%%%%@@%%%%%@@%%#####**+====-::::.....
         ......  ............:-::--===+==+++=+=====+*++*+=-.                      .-*%@@@@@@@@@@@@@@%%%%%%@@@@@@@@%%%%%%%%%%@%%%%##***+*++=---:.:.....
         ..   ..   ...........::----=++=++=-----=++++*+++==:.                     .=+#@@@@@@@@@@@@@%##%%##%%@@@@@@%%%%%%%%%%%%%%%#******+++=---::.... 
                       .....:-::::--==--===:-===-==+*++===+-..                    .=*%%%@%@@@@@@@@%#####%%@@@@@@%@%%%%%%%%%%%%@%%#**+***+++==--...... 
                       .......:::::---:--------=-====---===-..                   .-*#%%@@%#@@@@@@%@%%#%%%%@@@@@%%%%%%%##@%%%%%%%%%##*++++++=----..... 
                       ......:....:..::::::::-=-========--::..                  .:=*+#@@@%#%@@@%%%%@%%%@%%@@@@@%%#%%%%###%%%###%%%##***+=+==---:......
                       ...............::---::-:----=====-:-:.                 ..==-***#%%#%#%%%%%@@%@@@@%@@@@@%%##########%%#########*+++==-:-::......
                                 ......:::-:--:----=-=+===-:.               ...=#*=*#*+**#######%@%%@@@@@@@@@%%%#########%%%####***##**+===-:::...... 
                                  ......::-=-:-==----===-:::.               ..-#@%+*###**#%%%**#*%%%%@@@@@@@@%%####**####%%###*#*#*****+==--::......  
                                 .......::-::::-::::----::...               .:*@@@*+*##***##%###*%%@@@@@@@@@@%%##########%%%#***+***++===---::....    
                                   ............:::---=--:..                 :=%@@@%++=+++*+*#%@%*%@@@@@@@@%@%%%%%#*##*######*****++++++==--:::....    
                                 ............:----:----:.                 ..-#@@@@@*====+++*#%@%#%%%@@@@@@@%#%@@%%####********++++++++=----:.:.....   
                                 ............::::::----...                .-*%@@@@@+++==+++**###*%##@@@@@%%%#%%%%%%###**+++++==+++===+=---::.:..      
                                 ......:......-:-=--==-...              ..-*%@@@@@@#+++++=++*****####%%%%%##%###%%##****+=====-=------=-::::....      
                                  .....:....:--=------:....            .:-+%@@@@@@@%+=++==-*+++++######%%###%#**####****+=-=----:-:.::::::.::..       
                                   ........:----:--::::....           .:-=*%@@@@@@@@+=-=+--==+++***#*##*##****++*****++++=--=----:::............      
                                   .......:::::::::..:....           .:-=+#@@@@@@@@@%--:==:--===++***###**++*+++****+====+=--:::::-:.........  .      
                                   ....:....:..........-:.          .:-=+*#@@@@@@@@@@*+-::=--=-=++*#####*++=+==++=+++=+==++=--::::::.... ...          
                                   ...................-+:..         .-:+*#@@@@@@@@@@@%#%=::::-=-++++*###*++++====--=======+==---:-:....               
                                   ...       .... ..:=*=.  .        .:=*##@@@@@@@@@@@@*%@*-:-----=+==+*#*+=+++====---=--=++==--::::..                 
                                             ......:+#+:.           .:=*##%@@@@@@@@@@@%+@@%=-:::::---=++*+=++=--=-:---=--====--::....                 
                                             .. ..:+#%=.            .-+*##%@@@@@@@@@@@@#+@@%+--:::::::-========----:----------::...                   
                                             ....:+###:.           .:=*###%@@@@@@@@@@@@@+-#%%*-:..:....---=---=---:::-----:::--.:..                   
                                             ...:+*#*-.            .:+*###%%@@@@@@@@@@@@%=-#%%*-.......::::--:----:-:::::::::::....                   
                                             ..:=***+..            .-+####%%@@@@@@@@@@@%@#--#%%*:........::::::--:-:::.......:..:..                   
                                             .:+****-..            .=***#%%%@@@@@@@@@@@%%%+-*%%%+:....  ..::::::::::::.. .........                    
                                             .=****+..          ...:+**##%%%%%@@@@@@@@%%%#*--#%%#+.................:::............                    
                                            .=+****=...     .....::-+**###%%%%%@@@@@%%%%%#*=:*#%%*=......................                             
                                            :+++*+=:....    ....:::-**#####%##%%%%%%%%%%###=-*####*=.....  .   ....  ..                               
                                        ...:-++++=-..    ....:::-::=***##*######%%%%######*-=*####*#+:...    .  .                                     
                                        ...-==+++=-..    ...:-:---:=***##**###############*-+***##*##=...                                             
                                        ..:-==+++==:.    ...:------=************#########*+=++**##**#*-..                                             
                                        .:==+++++==:........:-----==+********#****######*++*****##****=:...                                           
                                       ..-===++++==--...   .:---=--=++++++**********###**=++**+*#*****+=:.                                            
                                       :--===++++===+-...  .:::-----=+++++++++**+++*****+**++*++*******+=:.                                           
                                      .:-=====+++++++=-:.....::-----===++=+++++++++++++****+++++++++***++-:.                                          
                                      .:---====+==+++=+=:....:::----====+==++=+++++++++****++++++++++++++=-:.                                         
                                     ..::--=-=======+=+==-:....::--======+======+++++++*****++++===+=++====-..                                        
                                     ...::---=-==========---::..::-----======-===+==++++++++===+===========-:.                                        
                                     ..:--------=====-==--:---:....::----------==+==+++==========----====----:.                                       
                                   . ...:::-----=====------::-::.....:--::::--==++=======--==----------:--:-::..                                      
                                     .....::::------------::::::::::::-----=========-----------=-:::::-::-::::...                                     
                                     ......::::-----------::::::::::::-------==----------=-------:::::-:::::.::...                                    
                                     ......:::::::--------::::::::::::::::-----::---:::----:::::::.:::::::::.....                                     
                                      .......:::::-----:::--:::::.::::::-----:::.:-:::::::::::::-:..::::.........                                     
                                        .......:::::---:::---::::.:::::-----:::::::-:::.::::::::::...:...........                                     
                                       .........:..:---::::::::::::::::-----:--:::::::::::::..::::..............                                      
                                           .........::::::::::::::::::::-------::--::::::::::..::..............                                       
                                          ..........:::::::::::.::::::::------------::::.::::..::.............                                        
        
        `;
        const symbols = ['█','░','▒'];
        const corruptionRate = 0.15;
        let isDragging = false;
        let currentZIndex = 1;
        let dragOffset = {x:0, y:0};
        let currentElement = null;
        let demonicPhase = 0;
        let positionInterval;
        const intervalMap = new Map();

        // Rest of your existing functions (modified to use closure variables)
        function redactText(text) {
            const currentRate = demonicPhase >= 2 ? 1.0 : corruptionRate;

            return text.split('').map(c => Math.random() < currentRate ? 
                symbols[Math.floor(Math.random()*symbols.length)] : c).join('');
        }

        function createFragment(fragData, isCentral=false) {
            const element = document.createElement('div');
            element.className = `text-fragment${isCentral ? ' central-fragment' : ''}`;
            element.id = `fragment-${crypto.randomUUID()}`;
            element.dataset.originalHeader = fragData.header;
            element.dataset.originalContent = fragData.text;

            const header = document.createElement('div');
            header.className = 'window-header';
            header.innerHTML = `
                <span>${redactText(fragData.header)}</span>
                <div class="window-controls">
                    <span class="minimize-btn">[_]</span>
                    <span class="close-btn">[✕]</span>
                </div>
            `;

            const content = document.createElement('div');
            content.className = 'window-content';
            content.textContent = fragData.text;

            element.appendChild(header);
            element.appendChild(content);

            header.querySelector('.minimize-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                element.classList.toggle('minimized');
                updateTaskbar(element, startCorruption(fragData.header));
            });

            header.querySelector('.close-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                document.body.classList.add('content-hidden');
                const security = document.getElementById('security');
                security.innerHTML = `<div class="loading">[LOADING]</div>`;
                security.style.display = 'flex';

                setTimeout(() => {
                    security.innerHTML = `
                        <div class="demonic-message">
                            <pre class="demonic-ascii">${demonicAsciiArt}</pre>
                            <div class="security-text ${demonicPhase>1?'demonic-phase':''}">
                                ${demonicPhase>1?'You will not escape your guilt.<br>You will be fuel for the soul forge.':
                                'You will not escape your guilt.<br>You will be fuel for the soul forge.'}
                            </div>
                        </div>`;
                }, 2000);

                setTimeout(() => {
                    security.style.display = 'none';
                    document.body.classList.remove('content-hidden');
                    if(demonicPhase === 0) {
                        document.querySelectorAll('.window-header').forEach(h => {
                            h.innerHTML = `<div class="window-controls">${
                                Array(3).fill('<span class="close-btn">[✕]</span>').join('')
                            }</div>`;
                            h.querySelectorAll('.close-btn').forEach(btn => {
                                btn.addEventListener('click', function(e) {
                                    document.body.classList.add('demonic-crt');
                                    demonicPhase = 2;
                                    document.body.classList.add('content-hidden');
                                    security.innerHTML = `<div class="loading">[uh oh! bad decision erasmus!]</div>`;
                                    security.style.display = 'flex';
                                    
                                    setTimeout(() => {
                                        security.innerHTML = `
                                            <div class="demonic-message">
                                                <pre class="demonic-ascii" style="filter:hue-rotate(180deg)">
                                                    ${demonicAsciiArt}
                                                </pre>
                                                <div class="security-text demonic-phase">
                                                    guilt is not flesh.<br>
                                                    and you are not the real you.
                                                </div>
                                            </div>`;
                                    }, 5000);

                                    setTimeout(() => {
                                        security.style.display = 'none';
                                        document.body.classList.remove('content-hidden');
                                        document.body.style.animation = 'crt-flicker-red 0.03s infinite';
                                        document.querySelectorAll('.text-fragment').forEach(frag => {
                                            startCorruption(frag, 500);
                                        });
                                        if(positionInterval) clearInterval(positionInterval);
                                        positionInterval = setInterval(() => {
                                            document.querySelectorAll('.text-fragment:not(.central-fragment)')
                                            .forEach(frag => {
                                                const maxX = window.innerWidth - frag.offsetWidth;
                                                const maxY = window.innerHeight - frag.offsetHeight;
                                                frag.style.left = `${Math.random()*maxX}px`;
                                                frag.style.top = `${Math.random()*maxY}px`;
                                            });
                                        }, 5000);
                                    }, 3000);
                                });
                            });
                        });
                        demonicPhase = 1;
                    }
                }, 5000);
            });

            if(isCentral) {
                element.style.left = '50%';
                element.style.top = '50%';
                element.style.transform = 'translate(-50%, -50%)';
            } else {
                element.style.left = `${Math.random()*70}%`;
                element.style.top = `${Math.random()*70}%`;
            }

            startCorruption(element);
            return element;
        }

        function startCorruption(element, speed=1000) {
            if(intervalMap.has(element.id)) {
                clearInterval(intervalMap.get(element.id));
            }
            const interval = setInterval(() => {
                const header = element.querySelector('.window-header span:first-child');
                const content = element.querySelector('.window-content');
                if(header) header.textContent = redactText(element.dataset.originalHeader);
                if(content) content.textContent = redactText(element.dataset.originalContent);
            }, speed);
            intervalMap.set(element.id, interval);
        }

        function updateTaskbar(element, headerText) {
            const taskbar = document.querySelector('.taskbar');
            const existingItem = taskbar.querySelector(`[data-id="${element.id}"]`);
            
            if(element.classList.contains('minimized')) {
                if(!existingItem) {
                    const item = document.createElement('div');
                    item.className = 'taskbar-item';
                    item.textContent = headerText;
                    item.dataset.title = headerText;
                    item.dataset.id = element.id;
                    item.addEventListener('click', () => {
                        element.classList.remove('minimized');
                        item.remove();
                    });
                    taskbar.appendChild(item);
                }
            } else {
                existingItem?.remove();
            }
        }

        // Fragment initialization with server-provided data
        const centralFragment = createFragment(
            {header: "UNSENT LETTER TO DR. ELEANOR VOSS", text: originalText}, 
            true
        );
        document.body.appendChild(centralFragment);

        fragments.forEach(frag => {
            const element = createFragment(frag);
            document.body.appendChild(element);
        });

        // Existing event listeners
        document.addEventListener('mousedown', e => {
            if(!e.target.closest('.text-fragment') || 
               document.body.classList.contains('reset-state')) return;
            
            currentElement = e.target.closest('.text-fragment');
            if(currentElement.classList.contains('central-fragment')) return;

            isDragging = true;
            currentZIndex++;
            currentElement.style.zIndex = currentZIndex;
            const rect = currentElement.getBoundingClientRect();
            dragOffset = {x:e.clientX - rect.left, y:e.clientY - rect.top};
        });

        document.addEventListener('mousemove', e => {
            if(isDragging && currentElement && !document.body.classList.contains('reset-state')) {
                const maxX = window.innerWidth - currentElement.offsetWidth;
                const maxY = window.innerHeight - currentElement.offsetHeight;
                let newX = Math.max(0, Math.min(e.clientX - dragOffset.x, maxX));
                let newY = Math.max(0, Math.min(e.clientY - dragOffset.y, maxY));
                currentElement.style.left = `${newX}px`;
                currentElement.style.top = `${newY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            currentElement = null;
        });

        // Security system
        let securityActive = false;
        document.addEventListener('keydown', e => {
            if(securityActive) return;
            const forbiddenKeys = new Set(['F11','PrintScreen','s','S']);
            if(forbiddenKeys.has(e.key) || (e.ctrlKey && forbiddenKeys.has(e.key.toLowerCase()))) {
                securityActive = true;
                document.getElementById('security').style.display = 'flex';
                setTimeout(() => window.location.href = 'about:blank', 3000);
            }
        });

        document.addEventListener('contextmenu', e => e.preventDefault());

    } catch (error) {
        console.error('Failed to initialize secure content:', error);
        document.body.innerHTML = `<div class="error-message">
            CONTENT UNAVAILABLE - CONSULT SYSTEM ADMINISTRATOR
        </div>`;
    }
}

// Start the initialization
initializeTrashInterface();