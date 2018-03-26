<!-- {{Top}} -->
# MenuGraphr
[![Greenkeeper badge](https://badges.greenkeeper.io/FullScreenShenanigans/MenuGraphr.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/FullScreenShenanigans/MenuGraphr.svg?branch=master)](https://travis-ci.org/FullScreenShenanigans/MenuGraphr)
[![NPM version](https://badge.fury.io/js/menugraphr.svg)](http://badge.fury.io/js/menugraphr)

In-game menu and dialog creation and management for GameStartr.
<!-- {{/Top}} -->

MenuGraphr automates creating in-game menus containing paragraphs or scrolling lists of text.
Each menu has a unique name by which its globally identified as well as a rectangular position relative to its parent.
Menus can be positioned as children of the root game's MapScreenr viewport or of each other.

## Usage

MenuGraphr instances take in, at the very least, a GameStartr game to create Things within.
The game should have have a `"Menu"` Thing defined.

### Constructor

```typescript
const gameStarter = new GameStartr({ ... });
const menuGrapher = new MenuGraphr({ gameStarter });
```

#### `gameStarter`

The parent GameStartr managing Things.
This is the only mandatory settings field.

#### `aliases`

Alternate Thing titles for characters, such as `" "` for `"Space"`.
Normally, Things used as menu text have titles equal to `"Text"` plus the name of the character.
These will replace the name of the character in that computation.

```typescript
// Uses "TextSpace" instead of "Text "
new MenuGraphr({
    aliases: {
        " ": "Space",
    },
    gameStarter,
});
```

#### `sounds`

Sounds that should be played for certain menu actions.
So far, this is only `onInteraction`, which is whenever a menu is interacted with
(usually off the A or B buttons being pressed).
These are played with the GameStartr's AudioPlayr.

```typescript
new MenuGraphr({
    gameStarter,
    sounds: {
        onInteraction: "Bloop",
    }
});
```

#### `replacements`

Programmatic replacements for deliniated words.
Allows texts in menus to contain dynamic values using predetermined strings.

These can be hardcoded strings or functions to generate them.

```typescript
new MenuGraphr({
    gameStarter,
    replacements: {
        "DYNAMIC": () => gameStarter.itemsHolder.get("dynamic-value"),
        "STATIC": "My name here!",
    },
});
```

Menu dialogs and lists will directly replace the values of replacements between the menu's `replacerKey` (see below):

```typescript
menuGrapher.addMenuDialog("GeneralText", [
    // Inserts the value of gameStarter.itemsHolder.get("dynamic-value")
    "Dynamic value: %%%%%%%DYNAMIC%%%%%%%",

    // Inserts "My name here!"
    "Static value: %%%%%%%STATIC%%%%%%%",
]);
```

#### `replacerKey`

Separator for words to replace using `replacements`.
Defaults to `"%%%%%%%"`.

```typescript
new MenuGraphr({
    gameStarter,
    replacements: {
        "STATIC": "My name here!",
    },
    replacerKey: "|",
});
```

```typescript
menuGrapher.addMenuDialog("GeneralText", [
    // Inserts "My name here!"
    "Static value: |STATIC|",
]);
```

#### `schemas`

Known menu schemas, keyed by name.
Those properties are defined on `IMenuSchema`.
See [`docs/schemas.md`](./docs/schemas.md).

```typescript
new MenuGraphr({
    gameStarter,
    schemas: {
        GeneralText: {
            size: {
                height: 96,
                width: 320,
            },
        },
    },
});
```

####

### `createMenu`

Menus are created with `createMenu`, which takes in the string name of the menu and any additional properties.

```typescript
menuGrapher.createMenu("GeneralText");
```

Each menu is identified by a unique string name.
When `createMenu` creates a menu, any existing menu under that name is disposed of.

### `setActiveMenu`



<!-- {{Development}} -->
## Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo/):

```
git clone https://github.com/<your-name-here>/MenuGraphr
cd MenuGraphr
npm install
npm run setup
npm run verify
```

* `npm run setup` creates a few auto-generated setup files locally.
* `npm run verify` builds, lints, and runs tests.

### Building

```shell
npm run watch
```

Source files are written under `src/` in TypeScript and compile in-place to JavaScript files.
`npm run watch` will directly run the TypeScript compiler on source files in watch mode.
Use it in the background while developing to keep the compiled files up-to-date.

### Running Tests

```shell
npm run test
```

Test files are alongside source files under `src/` and named `*.test.ts?`.
Whenever you add, remove, or rename a `*.test.t*` file under `src/`, `watch` will re-run `npm run test:setup` to regenerate the list of static test files in `test/index.html`.
You can open that file in a browser to debug through the tests.
`npm run test:run` will run that setup and execute tests using [Puppeteer](https://github.com/GoogleChrome/puppeteer).
<!-- {{/Development}} -->
