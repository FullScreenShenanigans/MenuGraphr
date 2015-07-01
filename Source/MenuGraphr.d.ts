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

    }
}