Game.registerMod("RaysMenu", {
    init: function () {
        console.log("Rays Menu V2 (CC) loaded!");

        let panel = null;
        let content = null;
        let contentWrap = null;
        let tabBar = null;
        let headerTitle = null;
        let sizeButton = null;
        let searchInput = null;
        let clearSearchButton = null;

        let menuVisible = true;
        let currentTab = "cookies";
        let currentMode = null;
        let modeLocked = false;

        let searchText = "";
        let activeSearchText = "";
        let searchMode = false;

        let menuSmallMode = false;
        let upgradeAllMode = false;

        let autoGoldenPopOn = false;
        let autoGoldenPopInterval = null;

        let autoFarmOn = false;
        let autoFarmInterval = null;

        const cookieButtons = [
            ["Add 1,000 Cookies", 1e3],
            ["Add 100,000 Cookies", 1e5],
            ["Add 1,000,000 Cookies", 1e6],
            ["Add 1 Billion Cookies", 1e9],
            ["Add 10 Billion Cookies", 1e10],
            ["Add 100 Billion Cookies", 1e11],
            ["Add 1 Trillion Cookies", 1e12],
            ["Add 10 Trillion Cookies", 1e13],
            ["Add 100 Trillion Cookies", 1e14],
            ["Add 1 Quadrillion Cookies", 1e15],
            ["Add 10 Quadrillion Cookies", 1e16],
            ["Add 100 Quadrillion Cookies", 1e17],
            ["Add 1 Quintillion Cookies", 1e18],
            ["Add 10 Quintillion Cookies", 1e19],
            ["Add 100 Quintillion Cookies", 1e20],
            ["Add 1 Sextillion Cookies", 1e21],
            ["Add 10 Sextillion Cookies", 1e22],
            ["Add 100 Sextillion Cookies", 1e23],
            ["Add 1 Septillion Cookies", 1e24],
            ["Add 10 Septillion Cookies", 1e25],
            ["Add 100 Septillion Cookies", 1e26],
            ["Add 1 Octillion Cookies", 1e27],
            ["Add 10 Octillion Cookies", 1e28],
            ["Add 100 Octillion Cookies", 1e29],
            ["Add 1 Nonillion Cookies", 1e30],
            ["Add 10 Nonillion Cookies", 1e31],
            ["Add 100 Nonillion Cookies", 1e32],
            ["Add 1 Decillion Cookies", 1e33],
            ["Add 10 Decillion Cookies", 1e34],
            ["Add 100 Decillion Cookies", 1e35],
            ["Add 1 Undecillion Cookies", 1e36],
            ["Add 10 Undecillion Cookies", 1e37],
            ["Add 100 Undecillion Cookies", 1e38],
            ["Add 1 Duodecillion Cookies", 1e39],
            ["Add 10 Duodecillion Cookies", 1e40],
            ["Add 100 Duodecillion Cookies", 1e41],
            ["Add 1 Tredecillion Cookies", 1e42],
            ["Add 10 Tredecillion Cookies", 1e43],
            ["Add 100 Tredecillion Cookies", 1e44],
            ["Add 1 Quattuordecillion Cookies", 1e45],
            ["Add 10 Quattuordecillion Cookies", 1e46],
            ["Add 100 Quattuordecillion Cookies", 1e47],
            ["Add 1 Quindecillion Cookies", 1e48],
            ["Add 10 Quindecillion Cookies", 1e49],
            ["Add 100 Quindecillion Cookies", 1e50],
            ["Add 1 Sexdecillion Cookies", 1e51],
            ["Add 10 Sexdecillion Cookies", 1e52],
            ["Add 100 Sexdecillion Cookies", 1e53],
            ["Add 1 Septendecillion Cookies", 1e54],
            ["Add 10 Septendecillion Cookies", 1e55],
            ["Add 100 Septendecillion Cookies", 1e56],
            ["Add 1 Octodecillion Cookies", 1e57],
            ["Add 10 Octodecillion Cookies", 1e58],
            ["Add 100 Octodecillion Cookies", 1e59],
            ["Add 1 Novemdecillion Cookies", 1e60],
            ["Add 10 Novemdecillion Cookies", 1e61],
            ["Add 100 Novemdecillion Cookies", 1e62],
            ["Add 1 Vigintillion Cookies", 1e63],
            ["Add 10 Vigintillion Cookies", 1e64],
            ["Add 100 Vigintillion Cookies", 1e65],
            ["Add 1 Unvigintillion Cookies", 1e66],
            ["Add 10 Unvigintillion Cookies", 1e67],
            ["Add 100 Unvigintillion Cookies", 1e68],
            ["Add 1 Duovigintillion Cookies", 1e69],
            ["Add 10 Duovigintillion Cookies", 1e70],
            ["Add 100 Duovigintillion Cookies", 1e71],
            ["Add 1 Trevigintillion Cookies", 1e72],
            ["Add 10 Trevigintillion Cookies", 1e73],
            ["Add 100 Trevigintillion Cookies", 1e74],
            ["Add 1 Quattuorvigintillion Cookies", 1e75],
            ["Add 10 Quattuorvigintillion Cookies", 1e76],
            ["Add 100 Quattuorvigintillion Cookies", 1e77],
            ["Add 1 Quinvigintillion Cookies", 1e78],
            ["Add 10 Quinvigintillion Cookies", 1e79],
            ["Add 100 Quinvigintillion Cookies", 1e80],
            ["Add 1 Sexvigintillion Cookies", 1e81],
            ["Add 10 Sexvigintillion Cookies", 1e82],
            ["Add 100 Sexvigintillion Cookies", 1e83],
            ["Add 1 Septemvigintillion Cookies", 1e84],
            ["Add 10 Septemvigintillion Cookies", 1e85],
            ["Add 100 Septemvigintillion Cookies", 1e86],
            ["Add 1 Octovigintillion Cookies", 1e87],
            ["Add 10 Octovigintillion Cookies", 1e88],
            ["Add 100 Octovigintillion Cookies", 1e89],
            ["Add 1 Novemvigintillion Cookies", 1e90],
            ["Add 10 Novemvigintillion Cookies", 1e91],
            ["Add 100 Novemvigintillion Cookies", 1e92],
            ["Add 1 Trigintillion Cookies", 1e93],
            ["Add 10 Trigintillion Cookies", 1e94],
            ["Add 100 Trigintillion Cookies", 1e95]
        ];

        function refreshGameStuff() {
            Game.recalculateGains = 1;
            if (typeof Game.CalculateGains === "function") Game.CalculateGains();
            if (typeof Game.RefreshStore === "function") Game.RefreshStore();
            if (typeof Game.RebuildUpgrades === "function") Game.RebuildUpgrades();
            if (typeof Game.UpdateMenu === "function") Game.UpdateMenu();
        }

        function addCookies(amount) {
            Game.cookies += amount;
            Game.cookiesEarned += amount;
            refreshGameStuff();
        }

        function addHeavenlyChips(amount) {
            Game.heavenlyChips = (Game.heavenlyChips || 0) + amount;
            Game.heavenlyChipsEarned = (Game.heavenlyChipsEarned || 0) + amount;
            refreshGameStuff();
        }

        function removeAllMoney() {
            Game.cookies = 0;
            Game.cookiesEarned = 0;
            Game.cookiesReset = 0;
            refreshGameStuff();
        }

        function resetAllProgress() {
            try {
                if (typeof Game.CloseNotes === "function") Game.CloseNotes();
                if (typeof Game.HardReset === "function") Game.HardReset(2);
                else if (typeof Game.Reset === "function") Game.Reset(2);
            } catch (err) {
                console.error("Reset failed:", err);
            }
        }

        function applyUpgradeAmount(times) {
            try {
                if (!Game || !Game.ObjectsById) return;
                for (let i = 0; i < Game.ObjectsById.length; i++) {
                    const obj = Game.ObjectsById[i];
                    if (!obj) continue;
                    if (!upgradeAllMode && (!obj.bought || obj.bought < 1)) continue;

                    obj.amount = (obj.amount || 0) + times;
                    if (typeof obj.bought === "number") obj.bought += times;
                    if (typeof obj.free === "number") obj.free += times;
                    if (typeof obj.highest === "number") obj.highest = Math.max(obj.highest, obj.amount);
                    if (typeof Game.BuildingsOwned === "number") Game.BuildingsOwned += times;
                }
                refreshGameStuff();
            } catch (err) {
                console.error("Upgrade failed:", err);
            }
        }

        function spawnGoldenCookie() {
            try {
                if (Game.shimmerTypes && Game.shimmerTypes.golden) {
                    new Game.shimmer("golden");
                }
            } catch (err) {
                console.error("Golden cookie spawn failed:", err);
            }
        }

        function popAllGoldenCookies() {
            try {
                if (!Game.shimmers) return;
                for (let i = Game.shimmers.length - 1; i >= 0; i--) {
                    const s = Game.shimmers[i];
                    if (s && s.type === "golden" && typeof s.pop === "function") {
                        s.pop();
                    }
                }
            } catch (err) {
                console.error("Auto golden pop failed:", err);
            }
        }

        function updateAutoGoldenPop() {
            if (autoGoldenPopInterval) {
                clearInterval(autoGoldenPopInterval);
                autoGoldenPopInterval = null;
            }
            if (!autoGoldenPopOn) return;
            autoGoldenPopInterval = setInterval(function () {
                popAllGoldenCookies();
            }, 250);
        }

        function getGarden() {
            try {
                const farm = Game.Objects["Farm"];
                if (!farm) return null;
                return farm.minigame || null;
            } catch (err) {
                return null;
            }
        }

        function harvestAllMature() {
            try {
                const M = getGarden();
                if (!M || !M.plot) return;

                for (let y = 0; y < M.plot.length; y++) {
                    for (let x = 0; x < M.plot[y].length; x++) {
                        const tile = M.plot[y][x];
                        const id = tile[0];
                        const age = tile[1];
                        if (id > 0) {
                            const plant = M.plantsById[id - 1];
                            if (plant && age >= plant.mature) {
                                M.harvest(x, y);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Harvest mature failed:", err);
            }
        }

        function plantBakersWheatAll() {
            try {
                const M = getGarden();
                if (!M || !M.plot || !M.plants || !M.plants["bakerWheat"]) return;
                const plant = M.plants["bakerWheat"];
                if (!plant.unlocked) plant.unlocked = 1;

                for (let y = 0; y < M.plot.length; y++) {
                    for (let x = 0; x < M.plot[y].length; x++) {
                        const tile = M.plot[y][x];
                        if (tile[0] === 0) {
                            M.useTool(plant.id, x, y);
                        }
                    }
                }
            } catch (err) {
                console.error("Plant Bakers Wheat failed:", err);
            }
        }

        function updateAutoFarm() {
            if (autoFarmInterval) {
                clearInterval(autoFarmInterval);
                autoFarmInterval = null;
            }
            if (!autoFarmOn) return;
            autoFarmInterval = setInterval(function () {
                harvestAllMature();
            }, 1000);
        }

        function parseCustomAmount(input) {
            const raw = String(input || "").trim().toLowerCase().replace(/,/g, "");
            if (!raw) return null;
            const match = raw.match(/^([0-9]*\.?[0-9]+)\s*([a-z]*)$/);
            if (!match) return null;
            const num = parseFloat(match[1]);
            const suf = match[2];

            const map = {
                "": 1, k: 1e3, m: 1e6, b: 1e9, t: 1e12,
                q: 1e15, qa: 1e15, qi: 1e18, sx: 1e21, sp: 1e24,
                oc: 1e27, no: 1e30, dc: 1e33
            };

            if (!(suf in map)) return null;
            return num * map[suf];
        }

        function matchesSearch(text) {
            if (!searchMode || !activeSearchText.trim()) return true;
            return text.toLowerCase().includes(activeSearchText.toLowerCase());
        }

        function getButtonPadding() {
            return menuSmallMode ? "7px" : "10px";
        }

        function getButtonFontSize() {
            return menuSmallMode ? "12px" : "14px";
        }

        function makeButton(text, action) {
            const btn = document.createElement("button");
            btn.textContent = text;
            btn.style.display = "block";
            btn.style.width = "100%";
            btn.style.marginBottom = "8px";
            btn.style.padding = getButtonPadding();
            btn.style.background = "#2a2a2a";
            btn.style.color = "white";
            btn.style.border = "1px solid #666";
            btn.style.borderRadius = "6px";
            btn.style.cursor = "pointer";
            btn.style.fontSize = getButtonFontSize();
            btn.onmouseenter = function () { btn.style.background = "#3a3a3a"; };
            btn.onmouseleave = function () { btn.style.background = "#2a2a2a"; };
            btn.onclick = action;
            return btn;
        }

        function makeInput(placeholder) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = placeholder;
            input.style.width = "100%";
            input.style.boxSizing = "border-box";
            input.style.padding = menuSmallMode ? "7px" : "9px";
            input.style.marginBottom = "8px";
            input.style.borderRadius = "6px";
            input.style.border = "1px solid #666";
            input.style.background = "#1c1c1c";
            input.style.color = "white";
            input.style.fontSize = menuSmallMode ? "12px" : "14px";
            return input;
        }

        function makeInfo(text) {
            const div = document.createElement("div");
            div.textContent = text;
            div.style.fontSize = menuSmallMode ? "11px" : "13px";
            div.style.opacity = "0.9";
            div.style.marginBottom = "8px";
            return div;
        }

        function appendIfMatch(parent, text, element) {
            if (matchesSearch(text)) parent.appendChild(element);
        }

        function clearSearch() {
            searchMode = false;
            activeSearchText = "";
            searchText = "";
            if (searchInput) searchInput.value = "";
            if (clearSearchButton) clearSearchButton.style.display = "none";
            renderTab();
        }

        function applyMenuSize() {
            if (!panel) return;

            panel.style.width = menuSmallMode ? "280px" : "360px";
            panel.style.padding = menuSmallMode ? "8px" : "12px";

            if (headerTitle) headerTitle.style.fontSize = menuSmallMode ? "15px" : "18px";

            if (sizeButton) {
                sizeButton.textContent = "Size: " + (menuSmallMode ? "Small" : "Normal");
                sizeButton.style.fontSize = menuSmallMode ? "11px" : "12px";
                sizeButton.style.padding = menuSmallMode ? "5px 8px" : "6px 10px";
            }

            if (searchInput) {
                searchInput.style.padding = menuSmallMode ? "7px" : "9px";
                searchInput.style.fontSize = menuSmallMode ? "12px" : "14px";
            }

            if (clearSearchButton) {
                clearSearchButton.style.padding = menuSmallMode ? "7px 9px" : "9px 12px";
                clearSearchButton.style.fontSize = menuSmallMode ? "12px" : "14px";
            }

            if (tabBar) tabBar.style.gap = menuSmallMode ? "6px" : "8px";
            if (contentWrap) contentWrap.style.maxHeight = menuSmallMode ? "260px" : "380px";

            refreshTabs();
            renderTab();
        }

        function buildModePicker(parent) {
            parent.appendChild(makeInfo("Pick one mode. You can’t switch back unless you restart the game."));
            parent.appendChild(makeButton("Mods", function () {
                currentMode = "mods";
                currentTab = "cookies";
                modeLocked = true;
                renderTab();
                refreshTabs();
            }));
            parent.appendChild(makeButton("Farming", function () {
                currentMode = "farming";
                currentTab = "farming";
                modeLocked = true;
                renderTab();
                refreshTabs();
            }));
        }

        function buildCookiesTab(parent) {
            const customInput = makeInput("Custom cookies amount, like 1e6 or 10m");
            parent.appendChild(customInput);
            parent.appendChild(makeButton("Give Custom Cookies", function () {
                const val = parseCustomAmount(customInput.value);
                if (val) addCookies(val);
            }));

            for (const [label, amount] of cookieButtons) {
                appendIfMatch(parent, label, makeButton(label, function () {
                    addCookies(amount);
                }));
            }
        }

        function buildGoldTab(parent) {
            appendIfMatch(parent, "Spawn Golden Cookie", makeButton("Spawn Golden Cookie", function () {
                spawnGoldenCookie();
            }));
            appendIfMatch(parent, "Auto Pop Golden Cookies", makeButton("Auto Pop Golden Cookies: " + (autoGoldenPopOn ? "ON" : "OFF"), function () {
                autoGoldenPopOn = !autoGoldenPopOn;
                updateAutoGoldenPop();
                renderTab();
            }));
        }

        function buildProfileTab(parent) {
            appendIfMatch(parent, "Remove All Money", makeButton("Remove All Money", function () {
                removeAllMoney();
            }));
            appendIfMatch(parent, "Reset All Progress", makeButton("Reset All Progress", function () {
                resetAllProgress();
            }));
        }

        function buildUpgradesTab(parent) {
            const topRow = document.createElement("div");
            topRow.style.display = "flex";
            topRow.style.justifyContent = "space-between";
            topRow.style.alignItems = "center";
            topRow.style.marginBottom = "10px";

            const modeLabel = document.createElement("div");
            modeLabel.textContent = "Mode: " + (upgradeAllMode ? "ALL" : "BOUGHT ONLY");
            modeLabel.style.fontSize = menuSmallMode ? "11px" : "13px";
            modeLabel.style.fontWeight = "bold";

            const allToggle = document.createElement("button");
            allToggle.textContent = "All: " + (upgradeAllMode ? "ON" : "OFF");
            allToggle.style.padding = menuSmallMode ? "5px 8px" : "6px 10px";
            allToggle.style.background = upgradeAllMode ? "#4a4a4a" : "#2a2a2a";
            allToggle.style.color = "white";
            allToggle.style.border = "1px solid #666";
            allToggle.style.borderRadius = "6px";
            allToggle.style.cursor = "pointer";
            allToggle.style.fontSize = menuSmallMode ? "11px" : "12px";
            allToggle.onclick = function () {
                upgradeAllMode = !upgradeAllMode;
                renderTab();
            };

            topRow.appendChild(modeLabel);
            topRow.appendChild(allToggle);
            parent.appendChild(topRow);

            appendIfMatch(parent, "Upgrade Everything 100", makeButton("Upgrade Everything 100", function () {
                applyUpgradeAmount(100);
            }));
            appendIfMatch(parent, "Upgrade Everything 1000", makeButton("Upgrade Everything 1000", function () {
                applyUpgradeAmount(1000);
            }));
            appendIfMatch(parent, "Upgrade Everything 10000", makeButton("Upgrade Everything 10000", function () {
                applyUpgradeAmount(10000);
            }));
        }

        function buildGiveItemsTab(parent) {
            const hcInput = makeInput("Custom heavenly chips amount");
            parent.appendChild(hcInput);
            parent.appendChild(makeButton("Give Custom Heavenly Chips", function () {
                const val = parseCustomAmount(hcInput.value);
                if (val) addHeavenlyChips(val);
            }));

            [100, 1000, 10000, 100000].forEach(v => {
                appendIfMatch(parent, "Give " + v + " Heavenly Chips", makeButton("Give " + v + " Heavenly Chips", function () {
                    addHeavenlyChips(v);
                }));
            });

            appendIfMatch(parent, "Heavenly Chips Info", makeInfo("This tab only gives heavenly chips."));
        }

        function buildFarmingTab(parent) {
            appendIfMatch(parent, "Auto Farm", makeButton("Auto Farm Mature Harvest: " + (autoFarmOn ? "ON" : "OFF"), function () {
                autoFarmOn = !autoFarmOn;
                updateAutoFarm();
                renderTab();
            }));
            appendIfMatch(parent, "Harvest All Mature", makeButton("Harvest All Mature", function () {
                harvestAllMature();
            }));
            appendIfMatch(parent, "Plant Bakers Wheat Everywhere", makeButton("Plant Bakers Wheat Everywhere", function () {
                plantBakersWheatAll();
            }));
            appendIfMatch(parent, "Farming Info", makeInfo("Open the Farm minigame first. Auto Farm harvests mature plants every second."));
        }

        function renderSearchResults() {
            const title = document.createElement("div");
            title.textContent = 'Search Results: "' + activeSearchText + '"';
            title.style.fontSize = menuSmallMode ? "13px" : "15px";
            title.style.fontWeight = "bold";
            title.style.marginBottom = "10px";
            content.appendChild(title);

            if (currentMode === "mods") {
                buildCookiesTab(content);
                buildGoldTab(content);
                buildProfileTab(content);
                buildUpgradesTab(content);
                buildGiveItemsTab(content);
            } else if (currentMode === "farming") {
                buildFarmingTab(content);
            }
        }

        function renderTab() {
            if (!content) return;
            content.innerHTML = "";

            if (!modeLocked || !currentMode) {
                buildModePicker(content);
            } else if (searchMode && activeSearchText.trim()) {
                renderSearchResults();
            } else if (currentMode === "mods") {
                if (currentTab === "cookies") buildCookiesTab(content);
                else if (currentTab === "gold") buildGoldTab(content);
                else if (currentTab === "profile") buildProfileTab(content);
                else if (currentTab === "upgrades") buildUpgradesTab(content);
                else if (currentTab === "items") buildGiveItemsTab(content);
            } else if (currentMode === "farming") {
                buildFarmingTab(content);
            }

            if (!content.children.length) {
                const none = document.createElement("div");
                none.textContent = "No results.";
                none.style.fontSize = menuSmallMode ? "12px" : "14px";
                none.style.opacity = "0.8";
                content.appendChild(none);
            }

            if (contentWrap) contentWrap.scrollTop = 0;
        }

        function createTabButton(name, tabName) {
            const btn = document.createElement("button");
            btn.textContent = name;
            btn.style.flex = "1";
            btn.style.padding = menuSmallMode ? "6px" : "8px";
            btn.style.background = (!searchMode && currentTab === tabName) ? "#4a4a4a" : "#2a2a2a";
            btn.style.color = "white";
            btn.style.border = "1px solid #666";
            btn.style.cursor = "pointer";
            btn.style.borderRadius = "6px";
            btn.style.fontSize = menuSmallMode ? "11px" : "13px";
            btn.onclick = function () {
                currentTab = tabName;
                if (!searchMode) renderTab();
                refreshTabs();
            };
            return btn;
        }

        function refreshTabs() {
            if (!tabBar) return;
            tabBar.innerHTML = "";

            if (!modeLocked || !currentMode) return;

            if (currentMode === "mods") {
                tabBar.appendChild(createTabButton("Cookies", "cookies"));
                tabBar.appendChild(createTabButton("Gold", "gold"));
                tabBar.appendChild(createTabButton("Profile", "profile"));
                tabBar.appendChild(createTabButton("Upgrades", "upgrades"));
                tabBar.appendChild(createTabButton("Give Items", "items"));
            } else if (currentMode === "farming") {
                tabBar.appendChild(createTabButton("Farming", "farming"));
            }
        }

        function makeDraggable(handle, target) {
            let dragging = false;
            let offsetX = 0;
            let offsetY = 0;

            handle.addEventListener("mousedown", function (e) {
                dragging = true;
                offsetX = e.clientX - target.offsetLeft;
                offsetY = e.clientY - target.offsetTop;
                e.preventDefault();
            });

            document.addEventListener("mousemove", function (e) {
                if (!dragging) return;
                target.style.left = (e.clientX - offsetX) + "px";
                target.style.top = (e.clientY - offsetY) + "px";
                target.style.right = "auto";
            });

            document.addEventListener("mouseup", function () {
                dragging = false;
            });
        }

        function createMenu() {
            if (document.getElementById("raysMenuPanel")) return;

            panel = document.createElement("div");
            panel.id = "raysMenuPanel";
            panel.style.position = "fixed";
            panel.style.top = "20px";
            panel.style.right = "20px";
            panel.style.width = "360px";
            panel.style.background = "rgba(20,20,20,0.97)";
            panel.style.color = "white";
            panel.style.border = "2px solid white";
            panel.style.padding = "12px";
            panel.style.zIndex = "999999";
            panel.style.fontFamily = "Arial, sans-serif";
            panel.style.borderRadius = "10px";
            panel.style.boxShadow = "0 0 15px rgba(0,0,0,0.5)";
            panel.style.userSelect = "none";

            const headerRow = document.createElement("div");
            headerRow.style.display = "flex";
            headerRow.style.justifyContent = "space-between";
            headerRow.style.alignItems = "center";
            headerRow.style.marginBottom = "10px";
            panel.appendChild(headerRow);

            headerTitle = document.createElement("div");
            headerTitle.textContent = "Rays Menu V2 (CC) (F1)";
            headerTitle.style.fontSize = "18px";
            headerTitle.style.fontWeight = "bold";
            headerTitle.style.cursor = "move";
            headerTitle.style.padding = "4px 0";
            headerRow.appendChild(headerTitle);

            sizeButton = document.createElement("button");
            sizeButton.textContent = "Size: Normal";
            sizeButton.style.padding = "6px 10px";
            sizeButton.style.background = "#2a2a2a";
            sizeButton.style.color = "white";
            sizeButton.style.border = "1px solid #666";
            sizeButton.style.borderRadius = "6px";
            sizeButton.style.cursor = "pointer";
            sizeButton.style.fontSize = "12px";
            sizeButton.onclick = function () {
                menuSmallMode = !menuSmallMode;
                applyMenuSize();
            };
            headerRow.appendChild(sizeButton);

            const searchWrap = document.createElement("div");
            searchWrap.style.display = "flex";
            searchWrap.style.gap = "8px";
            searchWrap.style.marginBottom = "10px";

            searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.placeholder = "Search mod menu...";
            searchInput.style.flex = "1";
            searchInput.style.boxSizing = "border-box";
            searchInput.style.padding = "9px";
            searchInput.style.borderRadius = "6px";
            searchInput.style.border = "1px solid #666";
            searchInput.style.background = "#1c1c1c";
            searchInput.style.color = "white";
            searchInput.oninput = function () {
                searchText = searchInput.value;
            };
            searchInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    activeSearchText = searchText.trim();
                    searchMode = activeSearchText.length > 0;
                    if (clearSearchButton) clearSearchButton.style.display = searchMode ? "block" : "none";
                    refreshTabs();
                    renderTab();
                }
            });

            clearSearchButton = document.createElement("button");
            clearSearchButton.textContent = "X";
            clearSearchButton.style.display = "none";
            clearSearchButton.style.padding = "9px 12px";
            clearSearchButton.style.borderRadius = "6px";
            clearSearchButton.style.border = "1px solid #666";
            clearSearchButton.style.background = "#2a2a2a";
            clearSearchButton.style.color = "white";
            clearSearchButton.style.cursor = "pointer";
            clearSearchButton.onclick = function () {
                clearSearch();
                refreshTabs();
            };

            searchWrap.appendChild(searchInput);
            searchWrap.appendChild(clearSearchButton);
            panel.appendChild(searchWrap);

            tabBar = document.createElement("div");
            tabBar.id = "raysTabBar";
            tabBar.style.display = "flex";
            tabBar.style.flexWrap = "wrap";
            tabBar.style.gap = "8px";
            tabBar.style.marginBottom = "12px";
            panel.appendChild(tabBar);

            contentWrap = document.createElement("div");
            contentWrap.style.maxHeight = "380px";
            contentWrap.style.overflowY = "auto";
            contentWrap.style.paddingRight = "4px";
            panel.appendChild(contentWrap);

            content = document.createElement("div");
            contentWrap.appendChild(content);

            document.body.appendChild(panel);

            refreshTabs();
            renderTab();
            applyMenuSize();
            makeDraggable(headerTitle, panel);
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "F1") {
                e.preventDefault();
                if (!panel) return;
                menuVisible = !menuVisible;
                panel.style.display = menuVisible ? "block" : "none";
            }
        });

        const waitForGame = setInterval(function () {
            if (typeof Game !== "undefined" && document.body) {
                clearInterval(waitForGame);
                createMenu();
            }
        }, 300);
    }
});
