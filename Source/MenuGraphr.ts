// @echo '/// <reference path="AudioPlayr-0.2.1.ts" />'
// @echo '/// <reference path="ChangeLinr-0.2.0.ts" />'
// @echo '/// <reference path="EightBittr-0.2.0.ts" />'
// @echo '/// <reference path="FPSAnalyzr-0.2.1.ts" />'
// @echo '/// <reference path="GamesRunnr-0.2.0.ts" />'
// @echo '/// <reference path="GameStartr-0.2.0.ts" />'
// @echo '/// <reference path="GroupHoldr-0.2.1.ts" />'
// @echo '/// <reference path="InputWritr-0.2.0.ts" />'
// @echo '/// <reference path="LevelEditr-0.2.0.ts" />'
// @echo '/// <reference path="MapsCreatr-0.2.1.ts" />'
// @echo '/// <reference path="MapScreenr-0.2.1.ts" />'
// @echo '/// <reference path="MapsHandlr-0.2.0.ts" />'
// @echo '/// <reference path="ModAttachr-0.2.2.ts" />'
// @echo '/// <reference path="NumberMakr-0.2.2.ts" />'
// @echo '/// <reference path="ObjectMakr-0.2.2.ts" />'
// @echo '/// <reference path="PixelDrawr-0.2.0.ts" />'
// @echo '/// <reference path="PixelRendr-0.2.0.ts" />'
// @echo '/// <reference path="QuadsKeepr-0.2.1.ts" />'
// @echo '/// <reference path="ItemsHoldr-0.2.1.ts" />'
// @echo '/// <reference path="StringFilr-0.2.1.ts" />'
// @echo '/// <reference path="ThingHittr-0.2.0.ts" />'
// @echo '/// <reference path="TimeHandlr-0.2.0.ts" />'
// @echo '/// <reference path="TouchPassr-0.2.0.ts" />'
// @echo '/// <reference path="WorldSeedr-0.2.0.ts" />'
// @echo '/// <reference path="js_beautify.ts" />'

// @ifdef INCLUDE_DEFINITIONS
/// <reference path="References/AudioPlayr-0.2.1.ts" />
/// <reference path="References/ChangeLinr-0.2.0.ts" />
/// <reference path="References/EightBittr-0.2.0.ts" />
/// <reference path="References/FPSAnalyzr-0.2.1.ts" />
/// <reference path="References/GamesRunnr-0.2.0.ts" />
/// <reference path="References/GameStartr-0.2.0.ts" />
/// <reference path="References/GroupHoldr-0.2.1.ts" />
/// <reference path="References/InputWritr-0.2.0.ts" />
/// <reference path="References/LevelEditr-0.2.0.ts" />
/// <reference path="References/MapsCreatr-0.2.1.ts" />
/// <reference path="References/MapScreenr-0.2.1.ts" />
/// <reference path="References/MapsHandlr-0.2.0.ts" />
/// <reference path="References/ModAttachr-0.2.2.ts" />
/// <reference path="References/NumberMakr-0.2.2.ts" />
/// <reference path="References/ObjectMakr-0.2.2.ts" />
/// <reference path="References/PixelDrawr-0.2.0.ts" />
/// <reference path="References/PixelRendr-0.2.0.ts" />
/// <reference path="References/QuadsKeepr-0.2.1.ts" />
/// <reference path="References/ItemsHoldr-0.2.1.ts" />
/// <reference path="References/StringFilr-0.2.1.ts" />
/// <reference path="References/ThingHittr-0.2.0.ts" />
/// <reference path="References/TimeHandlr-0.2.0.ts" />
/// <reference path="References/TouchPassr-0.2.0.ts" />
/// <reference path="References/WorldSeedr-0.2.0.ts" />
/// <reference path="References/js_beautify.ts" />
/// <reference path="MenuGraphr.d.ts" />
// @endif

// @include ../Source/MenuGraphr.d.ts

module MenuGraphr {
    /**
     * 
     */
    export class MenuGraphr {
        private GameStarter: GameStartr.IGameStartr;

        private menus;

        private activeMenu;

        private schemas;

        private aliases;

        private replacements;

        private replacerKey;

        private replaceFromItemsHolder;

        private replacementStatistics;

        private killNormal;

        /**
         * 
         */
        constructor(settings: IMenuGraphrSettings) {
            this.GameStarter = settings.GameStarter;
            this.killNormal = settings.killNormal;

            this.schemas = settings.schemas || {};
            this.aliases = settings.aliases || {};
            this.replacements = settings.replacements || {};
            this.replacerKey = settings.replacerKey || "%%%%%%%";

            this.replaceFromItemsHolder = settings.replaceFromItemsHolder;
            this.replacementStatistics = settings.replacementStatistics;

            this.menus = {};
        }


        /* Simple gets
        */

        /**
         * 
         */
        getMenus() {
            return this.menus;
        }

        /**
         * 
         */
        getMenu(name) {
            return this.menus[name];
        }

        /**
         * 
         */
        getExistingMenu(name) {
            if (!this.menus[name]) {
                throw new Error("'" + name + "' menu does not exist.");
            }
            return this.menus[name];
        }

        /**
         * 
         */
        getAliases() {
            return this.aliases;
        }

        /**
         * 
         */
        getReplacements() {
            return this.replacements;
        }


        /* Menu positioning
        */

        /**
         * 
         */
        createMenu(name, attributes) {
            var schemaRaw = this.GameStarter.proliferate({}, this.schemas[name]),
                schema = this.GameStarter.proliferate(schemaRaw, attributes),
                menu = this.GameStarter.ObjectMaker.make("Menu", schema),
                container = schema.container
                    ? this.menus[schema.container]
                    : {
                        "top": 0,
                        "left": 0,
                        "right": this.GameStarter.MapScreener.width,
                        "bottom": this.GameStarter.MapScreener.height,
                        "width": Math.ceil(this.GameStarter.MapScreener.width / this.GameStarter.unitsize),
                        "height": Math.ceil(this.GameStarter.MapScreener.height / this.GameStarter.unitsize),
                        "GameStarter": this.GameStarter
                    };

            this.deleteMenu(name);

            this.menus[name] = menu;
            menu.name = name;
            this.positionItem(menu, schema.size, schema.position, container);

            menu.children = [];
            menu.textAreaWidth = (menu.width - menu.textXOffset * 2) * this.GameStarter.unitsize;

            if (menu.childrenSchemas) {
                menu.childrenSchemas.forEach(this.createChild.bind(undefined, name));
            }

            if (container.children) {
                container.children.push(menu);
            }

            this.GameStarter.proliferate(menu, attributes);
        }

        /**
         * 
         */
        createChild(name, schema, attributes) {
            switch (schema.type) {
                case "menu":
                    this.createMenu(schema.name, schema.attributes);
                    break;
                case "text":
                    this.createMenuWord(name, schema);
                    break;
                case "thing":
                    this.createMenuThing(name, schema);
                    break;
            }
        }

        /**
         * 
         */
        createMenuWord(name, schema) {
            var menu = this.getExistingMenu(name),
                container = this.GameStarter.ObjectMaker.make("Menu");

            this.positionItem(container, schema.size, schema.position, menu, true);

            menu.textX = container.left;
            this.addMenuWord(name, schema.words, 0, container.left, container.top)
        }

        /**
         * 
         */
        createMenuThing(name, schema) {
            var menu = this.getExistingMenu(name),
                thing = this.GameStarter.ObjectMaker.make(schema.thing, schema.args);

            this.positionItem(thing, schema.size, schema.position, menu);

            this.GameStarter.GroupHolder.switchObjectGroup(
                thing,
                thing.groupType,
                "Text");

            menu.children.push(thing);

            return thing;
        }

        /**
         * 
         */
        hideMenu(name) {
            var menu = this.menus[name];

            if (menu) {
                menu.hidden = true;
                this.deleteMenuChildren(name);
            }
        }

        /**
         * 
         */
        deleteMenu(name) {
            var menu = this.menus[name];

            if (menu) {
                this.deleteMenuChild(menu);
            }
        }

        /**
         * 
         */
        deleteActiveMenu() {
            if (this.activeMenu) {
                this.deleteMenu(this.activeMenu.name);
            }
        }

        /**
         * 
         */
        deleteMenuChild(child) {
            if (this.activeMenu === child) {
                if (child.backMenu) {
                    this.setActiveMenu(child.backMenu);
                } else {
                    this.activeMenu = undefined;
                }
            }

            if (child.killOnB) {
                child.killOnB.forEach(this.deleteMenu);
            }

            if (child.name) {
                delete this.menus[child.name];
            }

            this.killNormal(child);
            this.deleteMenuChildren(name);

            if (child.onMenuDelete) {
                child.onMenuDelete.call(this.GameStarter);
            }

            if (child.children) {
                child.children.forEach(this.deleteMenuChild)
            }
        }

        /**
         * 
         */
        deleteMenuChildren(name) {
            var menu = this.menus[name];
            if (menu && menu.children) {
                menu.children.forEach(this.deleteMenuChild);
            }
        }

        /**
         * 
         */
        positionItem(item, size, position, container, skipAdd?) {
            var offset, i;

            if (!position) {
                position = {};
                offset = {};
            } else {
                offset = position.offset || {};
            }

            if (!size) {
                size = {};
            }

            if (size.width) {
                this.GameStarter.setWidth(item, size.width);
            } else if (position.horizontal === "stretch") {
                this.GameStarter.setLeft(item, 0);
                this.GameStarter.setWidth(
                    item,
                    container.width - (offset.left || 0) - (offset.right || 0));
            }

            if (size.height) {
                this.GameStarter.setHeight(item, size.height);
            } else if (position.vertical === "stretch") {
                this.GameStarter.setTop(item, 0);
                this.GameStarter.setHeight(
                    item,
                    container.height - (offset.top || 0) - (offset.bottom || 0));
            }

            switch (position.horizontal) {
                case "center":
                    this.GameStarter.setMidXObj(item, container);
                    break;
                case "right":
                    this.GameStarter.setRight(item, container.right);
                    break;
                default:
                    this.GameStarter.setLeft(item, container.left);
                    break;
            }

            switch (position.vertical) {
                case "center":
                    this.GameStarter.setMidYObj(item, container);
                    break;
                case "bottom":
                    this.GameStarter.setBottom(item, container.bottom);
                    break;
                default:
                    this.GameStarter.setTop(item, container.top);
                    break;
            }

            if (offset.top) {
                this.GameStarter.shiftVert(
                    item, position.offset.top * this.GameStarter.unitsize);
            }

            if (offset.left) {
                this.GameStarter.shiftHoriz(
                    item, position.offset.left * this.GameStarter.unitsize);
            }

            if (!skipAdd) {
                this.GameStarter.addThing(item, item.left, item.top);
            }
        }


        /* Menu text
        */

        /**
         * 
         */
        addMenuDialog(name, dialog, onCompletion) {
            if (!dialog) {
                dialog = [""];
            } else if (dialog.constructor === String) {
                dialog = [dialog];
            } else if (!(dialog instanceof Array)) {
                dialog = [String(dialog)];
            }

            this.addMenuText(name, dialog[0], function () {
                if (dialog.length === 1) {
                    if (this.menus[name].deleteOnFinish) {
                        this.deleteMenu(name);
                    }
                    if (onCompletion) {
                        return onCompletion();
                    }
                    return true;
                }

                this.deleteMenuChildren(name);
                this.addMenuDialog(name, dialog.slice(1), onCompletion);

                return false;
            });
        }

        /**
         * 
         */
        addMenuText(name, words, onCompletion) {
            var menu = this.getExistingMenu(name),
                x = this.GameStarter.getMidX(menu), // - menu.textAreaWidth / 2,
                y = menu.top + menu.textYOffset * this.GameStarter.unitsize;

            switch (menu.textStartingX) {
                case "right":
                    x += menu.textAreaWidth / 2;
                    break;

                case "center":
                    break;

                default:
                    x -= menu.textAreaWidth / 2;
            }

            if (words.constructor === String) {
                words = words.split(/ /);
            }

            menu.callback = this.continueMenu;
            menu.textX = x;

            this.addMenuWord(name, words, 0, x, y, onCompletion);
        }

        /**
         * 
         * 
         * @todo The calculation of whether a word can fit assumes equal width for
         *       all children, although apostrophes are tiny.
         */
        addMenuWord(name, words, i, x, y, onCompletion?) {
            var menu = this.getExistingMenu(name),
                word = this.filterWord(words[i]),
                textProperties = this.GameStarter.ObjectMaker.getPropertiesOf("Text"),
                things = [],
                textWidth, textHeight, textPaddingX, textPaddingY, textSpeed,
                textWidthMultiplier,
                title, character, j;

            if (word.constructor === Object && word.command) {
                switch (word.command) {
                    case "attribute":
                        menu[word.attribute + "Old"] = menu[word.attribute];
                        menu[word.attribute] = word.value;
                        if (word.applyUnitsize) {
                            menu[word.attribute] *= this.GameStarter.unitsize;
                        }
                        break;

                    case "attributeReset":
                        menu[word.attribute] = menu[word.attribute + "Old"];
                        break;

                    case "position":
                        if (word.x) {
                            x += word.x;
                        }
                        if (word.y) {
                            y += word.y;
                        }
                        break;
                }
            }

            textSpeed = menu.textSpeed;
            textWidth = (menu.textWidth || textProperties.width) * this.GameStarter.unitsize,
            textHeight = (menu.textHeight || textProperties.height) * this.GameStarter.unitsize,
            textPaddingX = (menu.textPaddingX || textProperties.paddingX) * this.GameStarter.unitsize;
            textPaddingY = (menu.textPaddingY || textProperties.paddingY) * this.GameStarter.unitsize;
            textWidthMultiplier = menu.textWidthMultiplier || 1;

            if (word.constructor === Object && word.command) {
                title = this.filterWord(this.getCharacterEquivalent(word.word));

                switch (word.command) {
                    case "padLeft":
                        if (word.length.constructor === String) {
                            word = this.stringOf(
                                " ",
                                (
                                    this.filterWord(word.length).length
                                    - title.length
                                    )
                                ) + this.filterWord(title);
                        } else {
                            word = this.stringOf(
                                " ", word.length - title.length
                                ) + title;
                        }
                        break;
                }
            }

            if (
                (word.constructor === String && word !== "\n")
                || word.constructor === Array
                ) {
                for (j = 0; j < word.length; j += 1) {
                    if (word[j] !== " ") {
                        title = "Char" + this.getCharacterEquivalent(word[j]);
                        character = this.GameStarter.ObjectMaker.make(title);
                        character.paddingY = textPaddingY;
                        menu.children.push(character);
                        things.push(character);

                        if (textSpeed) {
                            this.GameStarter.TimeHandler.addEvent(
                                this.GameStarter.addThing.bind(this.GameStarter),
                                j * textSpeed,
                                character,
                                x,
                                y);
                        } else {
                            this.GameStarter.addThing(character, x, y);
                        }

                        x += textWidthMultiplier * (
                            character.width * this.GameStarter.unitsize + textPaddingX);
                    } else {
                        x += textWidth * textWidthMultiplier;
                    }
                }
            }

            if (i === words.length - 1) {
                menu.progress = {
                    "complete": true,
                    "onCompletion": onCompletion
                };
                if (menu.finishAutomatically) {
                    this.GameStarter.TimeHandler.addEvent(
                        onCompletion,
                        (word.length + (menu.finishAutomaticSpeed || 1)) * textSpeed);
                }
                return things;
            }

            if (!word.skipSpacing) {
                if (
                    word === "\n"
                    || (
                        x + (
                            (this.filterWord(words[i + 1]).length + .5)
                            * textWidthMultiplier * textWidth
                            + menu.textXOffset * this.GameStarter.unitsize
                            )
                        > this.GameStarter.getMidX(menu) + menu.textAreaWidth / 2)
                    ) {
                    x = menu.textX;
                    y += textPaddingY;
                } else {
                    x += textWidth * textWidthMultiplier;
                }
            }

            if (y >= menu.bottom - (menu.textYOffset - 1) * this.GameStarter.unitsize) {
                menu.progress = {
                    "words": words,
                    "i": i + 1,
                    "x": x,
                    "y": y - (textPaddingY),
                    "onCompletion": onCompletion
                };
                return things;
            }

            if (textSpeed) {
                this.GameStarter.TimeHandler.addEvent(
                    this.addMenuWord,
                    (j + 1) * textSpeed,
                    name,
                    words,
                    i + 1,
                    x,
                    y,
                    onCompletion);
            } else {
                this.addMenuWord(name, words, i + 1, x, y, onCompletion);
            }

            return things;
        }

        /**
         * 
         */
        continueMenu(name) {
            var menu = this.getExistingMenu(name),
                children = menu.children,
                progress = menu.progress,
                character, i;

            if (!progress || progress.working) {
                return;
            }

            progress.working = true;

            if (progress.complete) {
                if (!progress.onCompletion || progress.onCompletion(this.GameStarter, menu)) {
                    this.deleteMenu(name);
                }
                return;
            }

            for (i = 0; i < children.length; i += 1) {
                character = children[i];

                this.GameStarter.TimeHandler.addEventInterval(
                    this.scrollCharacterUp,
                    1,
                    character.paddingY / this.GameStarter.unitsize,
                    character,
                    menu,
                    -1);
            }

            this.GameStarter.TimeHandler.addEvent(
                this.addMenuWord,
                character.paddingY / this.GameStarter.unitsize + 1,
                name,
                progress.words,
                progress.i,
                progress.x,
                progress.y,
                progress.onCompletion);
        }


        /* Lists
        */

        /**
         * 
         */
        addMenuList(name, settings) {
            var menu = this.getExistingMenu(name),
                options = settings.options instanceof Function
                    ? settings.options()
                    : settings.options,
                left = menu.left + menu.textXOffset * this.GameStarter.unitsize,
                top = menu.top + menu.textYOffset * this.GameStarter.unitsize,
                textProperties = this.GameStarter.ObjectMaker.getPropertiesOf("Text"),
                textWidth = (menu.textWidth || textProperties.width) * this.GameStarter.unitsize,
                textHeight = (menu.textHeight || textProperties.height) * this.GameStarter.unitsize,
                textPaddingY = (menu.textPaddingY || textProperties.paddingY) * this.GameStarter.unitsize,
                arrowXOffset = (menu.arrowXOffset || 0) * this.GameStarter.unitsize,
                arrowYOffset = (menu.arrowYOffset || 0) * this.GameStarter.unitsize,
                selectedIndex = settings.selectedIndex || [0, 0],
                optionChildren = [],
                index = 0,
                y = top,
                option, optionChild, schema, title, character, column,
                x, i, j, k;

            menu.options = options;
            menu.optionChildren = optionChildren;

            menu.callback = this.selectMenuListOption;
            menu.onActive = this.activateMenuList;
            menu.onInactive = this.deactivateMenuList;

            menu.grid = [];
            menu.grid[0] = column = [];
            menu.gridRows = 0;

            if (!options.length) {
                return;
            }

            for (i = 0; i < options.length; i += 1) {
                x = left;
                option = options[i];
                optionChild = {
                    "option": option,
                    "things": []
                };

                optionChildren.push(optionChild);

                option.x = x;
                option.y = y;

                column.push(option);
                option.column = column;
                option.index = index;
                option.columnNumber = menu.grid.length - 1;
                option.rowNumber = column.length - 1;
                menu.gridRows = Math.max(menu.gridRows, column.length);
                index += 1;

                if (option.things) {
                    for (j = 0; j < option.things.length; j += 1) {
                        schema = option.things[j];
                        character = this.createMenuThing(name, schema);
                        menu.children.push(character);
                        optionChild.things.push(character);

                        if (!schema.position || !schema.position.relative) {
                            this.GameStarter.shiftVert(character, y - menu.top);
                        }
                    }
                }

                if (option.textsFloating) {
                    for (j = 0; j < option.textsFloating.length; j += 1) {
                        schema = option.textsFloating[j];

                        optionChild.things = optionChild.things.concat(
                            this.addMenuWord(
                                name,
                                [schema.text],
                                0,
                                x + schema.x * this.GameStarter.unitsize,
                                y + schema.y * this.GameStarter.unitsize)
                            );
                    }
                }

                option.schema = schema = this.filterWord(option.text);

                if (schema !== "\n") {
                    for (j = 0; j < schema.length; j += 1) {
                        if (schema[j].command) {
                            if (schema[j].x) {
                                x += schema[j].x * this.GameStarter.unitsize;
                            }
                            if (schema[j].y) {
                                y += schema[j].y * this.GameStarter.unitsize;
                            }
                        } else if (schema[j] !== " ") {
                            option.title = title = "Char" + this.getCharacterEquivalent(schema[j]);
                            character = this.GameStarter.ObjectMaker.make(title);
                            menu.children.push(character);
                            optionChild.things.push(character);

                            this.GameStarter.addThing(character, x, y);

                            x += character.width * this.GameStarter.unitsize;
                        } else {
                            x += textWidth;
                        }
                    }
                }

                y += textPaddingY;

                if (y > menu.bottom - textHeight + 1) {
                    y = top;
                    left += menu.textColumnWidth * this.GameStarter.unitsize;
                    column = [];
                    menu.grid.push(column);
                }
            }

            while (menu.grid[menu.grid.length - 1].length === 0) {
                menu.grid.pop();
            }
            menu.gridColumns = menu.grid.length;

            if (settings.bottom) {
                option = settings.bottom;
                option.schema = schema = this.filterWord(option.text);

                optionChild = {
                    "option": option,
                    "things": []
                }
                optionChildren.push(optionChild);

                x = menu.left + (menu.textXOffset + option.position.left) * this.GameStarter.unitsize;
                y = menu.top + (menu.textYOffset + option.position.top) * this.GameStarter.unitsize;

                option.x = x;
                option.y = y;

                // Copy & pasted from the above options loop
                // To do: make this into its own helper function?
                for (j = 0; j < schema.length; j += 1) {
                    if (schema[j].command) {
                        if (schema[j].x) {
                            x += schema[j].x * this.GameStarter.unitsize;
                        }
                        if (schema[j].y) {
                            y += schema[j].y * this.GameStarter.unitsize;
                        }
                    } else if (schema[j] !== " ") {
                        option.title = title = "Char" + this.getCharacterEquivalent(schema[j]);
                        character = this.GameStarter.ObjectMaker.make(title);
                        menu.children.push(character);
                        optionChild.things.push(character);

                        this.GameStarter.addThing(character, x, y);

                        x += character.width * this.GameStarter.unitsize;
                    } else {
                        x += textWidth;
                    }
                }

                menu.gridRows += 1;
                for (j = 0; j < menu.grid.length; j += 1) {
                    menu.grid[j].push(option);
                }
            }

            if (menu.scrollingItems) {
                menu.scrollingAmount = 0;
                menu.scrollingAmountReal = 0;

                for (i = menu.scrollingItems; i < menu.gridRows; i += 1) {
                    optionChild = optionChildren[i];
                    for (j = 0; j < optionChild.things.length; j += 1) {
                        optionChild.things[j].hidden = true;
                    }
                }
            }

            menu.selectedIndex = selectedIndex;
            menu.arrow = character = this.GameStarter.ObjectMaker.make("CharArrowRight");
            menu.children.push(character);
            character.hidden = (this.activeMenu !== menu);

            option = menu.grid[selectedIndex[0]][selectedIndex[1]];

            this.GameStarter.addThing(character);
            this.GameStarter.setRight(character, option.x - menu.arrowXOffset * this.GameStarter.unitsize);
            this.GameStarter.setTop(character, option.y + menu.arrowYOffset * this.GameStarter.unitsize);
        }

        /**
         * 
         */
        activateMenuList(name) {
            if (this.menus[name] && this.menus[name].arrow) {
                this.menus[name].arrow.hidden = false;
            }
        }

        /**
         * 
         */
        deactivateMenuList(name) {
            if (this.menus[name] && this.menus[name].arrow) {
                this.menus[name].arrow.hidden = true;
            }
        }

        /**
         * 
         */
        getMenuSelectedIndex(name) {
            return this.menus[name].selectedIndex;
        }

        /**
         * 
         */
        getMenuSelectedOption(name) {
            var menu = this.menus[name];

            return menu.grid[menu.selectedIndex[0]][menu.selectedIndex[1]];
        }

        /**
         * 
         */
        shiftSelectedIndex(name, dx, dy) {
            var menu = this.getExistingMenu(name),
                textProperties = this.GameStarter.ObjectMaker.getPropertiesOf("Text"),
                textWidth = textProperties.width * this.GameStarter.unitsize,
                textHeight = textProperties.height * this.GameStarter.unitsize,
                textPaddingY = (menu.textPaddingY || textProperties.paddingY) * this.GameStarter.unitsize,
                x, y, option;

            if (menu.scrollingItems) {
                x = menu.selectedIndex[0] + dx;
                y = menu.selectedIndex[1] + dy;

                x = Math.max(Math.min(menu.gridColumns - 1, x), 0);
                y = Math.max(Math.min(menu.gridRows - 1, y), 0);
            } else {
                x = (menu.selectedIndex[0] + dx) % menu.gridColumns;
                y = (menu.selectedIndex[1] + dy) % menu.gridRows;

                while (x < 0) {
                    x += menu.gridColumns;
                }

                while (y < 0) {
                    y += menu.gridRows;
                }
            }

            if (x === menu.selectedIndex[0] && y === menu.selectedIndex[1]) {
                return;
            }

            //y = Math.min(menu.grid[x].length - 1, y);

            menu.selectedIndex[0] = x;
            menu.selectedIndex[1] = y;
            option = this.getMenuSelectedOption(name);

            if (menu.scrollingItems) {
                this.adjustVerticalScrollingListThings(name, dy, textPaddingY);
            }

            this.GameStarter.setRight(
                menu.arrow, option.x - menu.arrowXOffset * this.GameStarter.unitsize);
            this.GameStarter.setTop(
                menu.arrow, option.y + menu.arrowYOffset * this.GameStarter.unitsize);
        }

        /**
         * 
         */
        setSelectedIndex(name, x, y) {
            var menu = this.getExistingMenu(name),
                selectedIndex = menu.selectedIndex;

            this.shiftSelectedIndex(name, x - selectedIndex[0], y - selectedIndex[1]);
        }

        /**
         * 
         */
        adjustVerticalScrollingListThings(name, dy, textPaddingY) {
            var menu = this.getExistingMenu(name),
                scrollingItems = menu.scrollingItems,
                scrollingOld = menu.scrollingAmount,
                offset = -dy * textPaddingY,
                scrollingNew, indexNew, option, optionChild, i, j;

            menu.scrollingAmount += dy;

            if (dy > 0) {
                if (scrollingOld < menu.scrollingItems - 2) {
                    return;
                }
            } else if (menu.scrollingAmount < menu.scrollingItems - 2) {
                return;
            }

            menu.scrollingAmountReal += dy;

            for (i = 0; i < menu.optionChildren.length; i += 1) {
                option = menu.options[i];
                optionChild = menu.optionChildren[i];

                option.y += offset;

                for (j = 0; j < optionChild.things.length; j += 1) {
                    this.GameStarter.shiftVert(optionChild.things[j], offset);
                    if (
                        i < menu.scrollingAmountReal
                        || i >= menu.scrollingItems + menu.scrollingAmountReal
                        ) {
                        optionChild.things[j].hidden = true;
                    } else {
                        optionChild.things[j].hidden = false;
                    }
                }
            }
        }

        /**
         * 
         */
        selectMenuListOption(name, index) {
            var menu = this.getExistingMenu(name),
                selected = this.getMenuSelectedOption(name);

            if (selected.callback) {
                selected.callback(name);
            }
        }


        /* Interactivity
        */

        /**
         * 
         */
        setActiveMenu(name) {
            if (this.activeMenu && this.activeMenu.onInactive) {
                this.activeMenu.onInactive(this.activeMenu.name);
            }

            this.activeMenu = this.menus[name];

            if (this.activeMenu && this.activeMenu.onActive) {
                this.activeMenu.onActive(name);
            }
        }

        /**
         * 
         */
        getActiveMenu = function () {
            return this.activeMenu;
        }

        /**
         * 
         */
        getActiveMenuName = function () {
            return this.activeMenu.name;
        }

        /**
         * 
         */
        registerDirection(direction) {
            switch (direction) {
                case 0:
                    return this.registerUp();
                case 1:
                    return this.registerRight();
                case 2:
                    return this.registerDown();
                case 3:
                    return this.registerLeft();
            }
        }

        /**
         * 
         */
        registerLeft() {
            if (!this.activeMenu) {
                return;
            }

            if (this.activeMenu.selectedIndex) {
                this.shiftSelectedIndex(this.activeMenu.name, -1, 0);
            }

            if (this.activeMenu.onLeft) {
                this.activeMenu.onLeft(this.GameStarter);
            }
        }

        /**
         * 
         */
        registerRight() {
            if (!this.activeMenu) {
                return;
            }

            if (this.activeMenu.selectedIndex) {
                this.shiftSelectedIndex(this.activeMenu.name, 1, 0);
            }

            if (this.activeMenu.onRight) {
                this.activeMenu.onRight(this.GameStarter);
            }
        }

        /**
         * 
         */
        registerUp = function () {
            if (!this.activeMenu) {
                return;
            }

            if (this.activeMenu.selectedIndex) {
                this.shiftSelectedIndex(this.activeMenu.name, 0, -1);
            }

            if (this.activeMenu.onUp) {
                this.activeMenu.onUp(this.GameStarter);
            }
        };

        /**
         * 
         */
        registerDown() {
            if (!this.activeMenu) {
                return;
            }

            if (this.activeMenu.selectedIndex) {
                this.shiftSelectedIndex(this.activeMenu.name, 0, 1);
            }

            if (this.activeMenu.onDown) {
                this.activeMenu.onDown(this.GameStarter);
            }
        }

        /**
         * 
         */
        registerA = function () {
            if (!this.activeMenu || this.activeMenu.ignoreA) {
                return;
            }

            if (this.activeMenu.callback) {
                this.activeMenu.callback(this.activeMenu.name);
            }
        }

        /**
         * 
         */
        registerB = function () {
            if (!this.activeMenu) {
                return;
            }

            if (this.activeMenu.progress && !this.activeMenu.ignoreProgressB) {
                return this.registerA();
            }

            if (this.activeMenu.ignoreB) {
                return;
            }

            if (this.activeMenu.onBPress) {
                this.activeMenu.onBPress(this.activeMenu.name);
                return;
            }

            if (this.activeMenu.keepOnBack) {
                this.setActiveMenu(this.activeMenu.backMenu);
            } else {
                this.deleteMenu(this.activeMenu.name);
            }
        }

        /**
         * 
         */
        registerStart = function () {
            if (!this.activeMenu) {
                return;
            }

            if (this.activeMenu.startMenu) {
                this.setActiveMenu(this.activeMenu.startMenu);
                // } else if (activeMenu.callback) {
                //     activeMenu.callback(activeMenu.name);
            }
        }


        /* Utilities
        */

        /**
         * 
         */
        private scrollCharacterUp(character, menu) {
            this.GameStarter.shiftVert(character, -this.GameStarter.unitsize);
            if (character.top < menu.top + (menu.textYOffset - 1) * this.GameStarter.unitsize) {
                this.killNormal(character);
                return true;
            }
        }

        /**
         * 
         */
        private getCharacterEquivalent(character) {
            if (this.aliases.hasOwnProperty(character)) {
                return this.aliases[character];
            }
            return character;
        }

        /**
         * 
         */
        private filterWord(word) {
            var start = 0,
                end, inside;

            if (word.constructor !== String) {
                return word;
            }

            while (true) {
                start = word.indexOf("%%%%%%%", start);
                end = word.indexOf("%%%%%%%", start + 1);
                if (start === -1 || end === -1) {
                    return word;
                }

                inside = word.substring(start + "%%%%%%%".length, end);
                word =
                word.substring(0, start)
                + this.getReplacement(inside)
                + word.substring(end + "%%%%%%%".length);

                start = end;
            }

            return word;
        }

        /**
         * 
         */
        private getReplacement(key) {
            var value = this.replacements[key];

            if (typeof value === "undefined") {
                return value;
            }

            if (this.replacementStatistics && this.replacementStatistics[value]) {
                return this.replacements[value](this.GameStarter);
            }

            if (this.replaceFromItemsHolder) {
                if (this.GameStarter.ItemsHolder.hasKey(value)) {
                    return this.GameStarter.ItemsHolder.getItem(value);
                }
            }

            return value;
        }

        /**
         * 
         */
        private getAliasOf(key, forced) {
            if (forced) {
                return this.aliases[key];
            } else {
                return typeof this.aliases[key] === "undefined" ? key : this.aliases[key];
            }
        }

        /**
         * Creates a new String equivalent to an old String repeated any number of
         * times. If times is 0, a blank String is returned.
         * 
         * @param {String} str The characters to repeat.
         * @param {Number} [times]   How many times to repeat (by default, 1).
         */
        private stringOf(str: string, times: number = 1) {
            return (times === 0) ? '' : new Array(1 + (times)).join(str);
        }
    }
}
