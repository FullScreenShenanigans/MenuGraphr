declare module MenuGraphr {
    export interface IMenusContainer {
        [i: string]: IMenu;
    }

    export interface IMenu extends GameStartr.IThing {
        backMenu?: string;
        callback?: (...args: any[]) => void;
        children: GameStartr.IThing[];
        finishAutomatically?: boolean;
        finishAutomaticSpeed?: number;
        ignoreA?: boolean;
        ignoreB?: boolean;
        ignoreProgressB?: boolean;
        keepOnBack?: boolean;
        onActive?: (name: string) => void;
        onBPress?: (name: string) => void;
        onDown?: (GameStartr: GameStartr.IGameStartr) => void;
        onInactive?: (name: string) => void;
        onLeft?: (GameStartr: GameStartr.IGameStartr) => void;
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
        progress: IMenuListProgress;
        scrollingAmount?: number;
        scrollingAmountReal?: number;
        scrollingItems?: number;
        selectedIndex: number[];
        textColumnWidth: number;
    }

    export interface IMenuListProgress extends IMenuProgress {
        words: any;
        i: any;
        x: any;
        y: any;
    }

    export interface IMenuSchema {
        backMenu?: string;
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
        width: number;
        height: number;
    }

    export interface IMenuSchemaPosition {
        horizontal?: string;
        vertical?: string;
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