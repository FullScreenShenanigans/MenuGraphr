declare module MenuGraphr {
    export interface IMenusContainer {
        [i: string]: IMenu;
    }

    export interface IMenu extends GameStartr.IThing {
        backMenu?: string;
        callback?: (...args: any[]) => void;
        children: GameStartr.IThing[];
        childrenSchemas: IMenuChildSchema[];
        finishAutomatically?: boolean;
        finishAutomaticSpeed?: number;
        ignoreA?: boolean;
        ignoreB?: boolean;
        ignoreProgressB?: boolean;
        keepOnBack?: boolean;
        killOnB?: string[];
        onActive?: (name: string) => void;
        onBPress?: (name: string) => void;
        onDown?: (GameStartr: GameStartr.IGameStartr) => void;
        onInactive?: (name: string) => void;
        onLeft?: (GameStartr: GameStartr.IGameStartr) => void;
        onMenuDelete?: (GameStartr: GameStartr.IGameStartr) => void;
        onRight?: (GameStartr: GameStartr.IGameStartr) => void;
        onUp?: (GameStartr: GameStartr.IGameStartr) => void;
        progress?: IMenuProgress;
        startMenu?: string;
        textAreaWidth?: number;
        textArrowXOffset?: number;
        textArrowYOffset?: number;
        textHeight?: number;
        textPaddingX?: number;
        textPaddingY?: number;
        textSpeed?: number;
        textStartingX?: string;
        textWidth?: number;
        textWidthMultiplier?: number;
        textX?: number;
        textXOffset?: number;
        textYOffset?: number;
    }

    export interface IMenuProgress {
        complete?: boolean;
        onCompletion?: (...args: any[]) => void;
        working?: boolean;
    }

    export interface IListMenu extends IMenu {
        arrow: GameStartr.IThing;
        arrowXOffset?: number;
        arrowYOffset?: number;
        grid: any[][];
        gridColumns: number;
        gridRows: number;
        options: any[];
        optionChildren: any;
        progress: IListMenuProgress;
        scrollingAmount?: number;
        scrollingAmountReal?: number;
        scrollingItems?: number;
        selectedIndex: number[];
        textColumnWidth: number;
    }

    export interface IListMenuOptions {
        bottom?: any;
        options: any[]| { (): any[]; };
        selectedIndex?: number[];
    }

    export interface IListMenuProgress extends IMenuProgress {
        words: any;
        i: any;
        x: any;
        y: any;
    }

    export interface IMenuSchema {
        backMenu?: string;
        container?: string;
        finishAutomatically?: boolean;
        finishAutomaticSpeed?: number;
        ignoreA?: boolean;
        ignoreB?: boolean;
        ignoreProgressB?: boolean;
        keepOnBack?: boolean;
        position?: IMenuSchemaPosition;
        size?: IMenuSchemaSize;
        startMenu?: string;
        textAreaWidth?: number;
        textArrowXOffset?: number;
        textArrowYOffset?: number;
        textHeight?: number;
        textPaddingX?: number;
        textPaddingY?: number;
        textSpeed?: number;
        textStartingX?: string;
        textWidth?: number;
        textWidthMultiplier?: number;
        textXOffset?: number;
        textYOffset?: number;
    }

    export interface IMenuSchemaSize {
        width?: number;
        height?: number;
    }

    export interface IMenuSchemaPosition {
        horizontal?: string;
        offset?: IMenuSchemaPositionOffset;
        relative?: boolean;
        vertical?: string;
    }

    export interface IMenuSchemaPositionOffset {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    }

    export interface IMenuChildSchema {
        type: string;
    }

    export interface IMenuChildMenuSchema extends IMenuChildSchema {
        attributes: IMenuSchema;
        name: string;
    }

    export interface IMenuWordSchema extends IMenuChildSchema {
        position: IMenuSchemaPosition;
        size: IMenuSchemaSize;
        words: string[];
    }

    export interface IMenuThingSchema extends IMenuChildSchema {
        position: IMenuSchemaPosition;
        size: IMenuSchemaSize;
        thing: string;
        args: any;
    }

    export interface IMenuWordFiltered {
        command: string;
        length?: number;
        skipSpacing?: boolean;
        word?: string;
    }

    export interface IMenuWordCommand extends IMenuWordFiltered {
        applyUnitsize?: boolean;
        attribute: string;
        value: any;
    }

    export interface IMenuWordReset extends IMenuWordFiltered {
        attribute: string;
    }

    export interface IMenuWordPosition extends IMenuWordFiltered {
        x?: number;
        y?: number;
    }

    export interface IMenuWordLength extends IMenuWordFiltered { }

    export interface IText extends GameStartr.IThing {
        paddingY: number;
    }

    export interface IKillFunction {
        (thing: GameStartr.IThing): void;
    }

    export interface IMenuGraphrSettings {
        GameStarter: GameStartr.IGameStartr;
        killNormal: IKillFunction;
        schemas?: {
            [i: string]: IMenuSchema;
        };
        aliases?: {
            [i: string]: string;
        };
        replacements?: {
            [i: string]: string;
        };
        replacerKey?: string;
        replaceFromItemsHolder?: boolean;
        replacementStatistics?: {
            [i: string]: boolean;
        };
    }

    export interface IMenuGraphr {
        getMenus(): IMenusContainer;
        getMenu(name: string): IMenu;
        getExistingMenu(name: string): IMenu;
        getAliases(): { [i: string]: string };
        getReplacements(): { [i: string]: string };
        createMenu(name: string, attributes: IMenuSchema): void;
        createChild(name: string, schema: IMenuChildSchema): void;
        createMenuWord(name: string, schema: IMenuWordSchema): void;
        createMenuThing(name: string, schema: IMenuThingSchema): GameStartr.IThing;
        hideMenu(name: string): void;
        deleteMenu(name: string): void;
        deleteActiveMenu(): void;
        deleteMenuChild(child: IMenu): void;
        deleteMenuChildren(name: string): void;
        positionItem(
            item: GameStartr.IThing,
            size: IMenuSchemaSize,
            position: IMenuSchemaPosition,
            container: IMenu,
            skipAdd?: boolean): void;
        addMenuDialog(name: string, dialog?: any, onCompletion?: () => any): void;
        addMenuText(name: string, words: string | string[], onCompletion?: (...args: any[]) => void): void;
        addMenuWord(
            name: string,
            words: string[],
            i: number,
            x: number,
            y: number,
            onCompletion?: (...args: any[]) => void): GameStartr.IThing[];
        continueMenu(name: string): void;
        addMenuList(name: string, settings: IListMenuOptions): void;
        activateMenuList(name: string): void;
        deactivateMenuList(name: string): void;
        getMenuSelectedIndex(name: string): number[];
        getMenuSelectedOption(name: string): any;
        shiftSelectedIndex(name: string, dx: number, dy: number): void;
        setSelectedIndex(name: string, x: number, y: number): void;
        adjustVerticalScrollingListThings(name: string, dy: number, textPaddingY: number): void;
        selectMenuListOption(name: string): void;
        setActiveMenu(name: string): void;
        getActiveMenu(): IMenu;
        getActiveMenuName(): string;
        registerDirection(direction: number): void;
        registerLeft(): void;
        registerRight(): void;
        registerUp(): void;
        registerDown(): void;
        registerA(): void;
        registerB(): void;
        registerStart(): void;
    }
}
