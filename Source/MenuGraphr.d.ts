declare module MenuGraphr {
    export interface IGameStartr extends EightBittr.IEightBittr {
        GroupHolder: GroupHoldr.IGroupHoldr;
        MapScreener: MapScreenr.IMapScreenr;
        ObjectMaker: ObjectMakr.IObjectMakr;
        TimeHandler: TimeHandlr.ITimeHandlr;
        addThing(thing: IThing | string | any[], left?: number, top?: number): IThing;
        killNormal(thing: IThing): void;
        setHeight(thing: IThing, height: number): void;
        setWidth(thing: IThing, width: number): void;
    }

    export interface IThing extends EightBittr.IThing {
        GameStarter: IGameStartr;
        name: string;
        groupType: string;
        hidden: boolean;
    }

    export interface IMenusContainer {
        [i: string]: IMenu;
    }

    export interface IMenu extends IThing, IMenuSchema {
        children: IThing[];
        height: number;
        progress?: IMenuProgress;
        textX?: number;
        width: number;
    }

    export interface IMenuProgress {
        complete?: boolean;
        onCompletion?: (...args: any[]) => void;
        working?: boolean;
    }

    export interface IListMenu extends IListMenuSchema, IMenu {
        arrow: IThing;
        arrowXOffset?: number;
        arrowYOffset?: number;
        grid: IGridCell[][];
        gridColumns: number;
        gridRows: number;
        height: number;
        options: IGridCell[];
        optionChildren: any;
        progress: IListMenuProgress;

        /**
         * How many rows the menu has visually scrolled.
         */
        scrollingVisualOffset?: number;

        /**
         * Whether the list should be a single column, rather than auto-flow.
         */
        singleColumnList: boolean;

        selectedIndex: number[];
        textColumnWidth: number;
        width: number;
    }

    export interface IGridCell {
        callback?: (...args: any[]) => void;
        column: IGridCell[];
        columnNumber: number;
        index: number;
        rowNumber: number;
        // These two will likely need to be confirmed...
        schema: (string | IMenuWordCommand)[];
        text: (string | IMenuWordCommand)[];
        title: string;
        x: number;
        y: number;
    }

    export interface IListMenuOptions {
        bottom?: any;
        options: any[] | { (): any[]; };
        selectedIndex?: number[];
    }

    export interface IListMenuProgress extends IMenuProgress {
        words: any;
        i: any;
        x: any;
        y: any;
    }

    /**
     * General attributes for both Menus and MenuSchemas.
     */
    export interface IMenuBase {
        backMenu?: string;
        callback?: (...args: any[]) => void;
        childrenSchemas?: IMenuChildSchema[];
        container?: string;
        deleteOnFinish?: boolean;
        finishAutomatically?: boolean;
        finishAutomaticSpeed?: number;
        height?: number;
        ignoreA?: boolean;
        ignoreB?: boolean;
        ignoreProgressB?: boolean;
        keepOnBack?: boolean;
        killOnB?: string[];
        onActive?: (name: string) => void;
        onBPress?: (name: string) => void;
        onDown?: (GameStartr: IGameStartr) => void;
        onInactive?: (name: string) => void;
        onLeft?: (GameStartr: IGameStartr) => void;
        onMenuDelete?: (GameStartr: IGameStartr) => void;
        onRight?: (GameStartr: IGameStartr) => void;
        onUp?: (GameStartr: IGameStartr) => void;
        size?: IMenuSchemaSize;

        /**
         * A menu to set as active if the start button is pressed while this menu is active.
         */
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
        width?: number;
    }

    /**
     * Known menu schemas, keyed by name.
     */
    export interface IMenuSchemas {
        [i: string]: IMenuSchema;
    }

    export interface IMenuSchema extends IMenuBase {
        position?: IMenuSchemaPosition;
    }

    export interface IListMenuSchema extends IMenuSchema {
        scrollingItems?: number;
        scrollingItemsComputed?: boolean | number;
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

    /**
     * A description of a menu child to create, including name and child type.
     */
    export interface IMenuChildSchema extends IMenuSchema {
        name?: string;
        type: string;
        words?: IMenuDialogRaw;
    }

    export interface IMenuChildMenuSchema extends IMenuChildSchema {
        attributes: IMenuSchema;
        name: string;
    }

    export interface IMenuWordSchema extends IMenuChildSchema {
        position: IMenuSchemaPosition;
        size: IMenuSchemaSize;
        words: (string | IMenuWordCommand)[];
    }

    export interface IMenuThingSchema extends IMenuChildSchema {
        args?: any;
        position?: IMenuSchemaPosition;
        size?: IMenuSchemaSize;
        thing: string;
    }

    export interface IMenuWordFiltered {
        length?: number | string;
        word?: string;
    }

    /**
     * Various raw forms of dialog that may be used. A single String is common
     * for short dialogs, and longer ones may use a String for each word or character,
     * as well as filtered Objects.
     */
    export type IMenuDialogRaw = string | (string | string[] | (string | string[])[] | IMenuWordFiltered)[]

    export interface IMenuWordCommand extends IMenuWordFiltered {
        applyUnitsize?: boolean;
        attribute: string;
        command: string;
        value: any;
    }

    export interface IMenuWordPadLeftCommand extends IMenuWordFiltered {
        alignRight?: boolean;
    }

    export interface IMenuWordReset extends IMenuWordFiltered {
        attribute: string;
    }

    export interface IMenuWordPosition extends IMenuWordFiltered {
        x?: number;
        y?: number;
    }

    export interface IMenuWordLength extends IMenuWordFiltered { }

    export interface IText extends IThing {
        paddingY: number;
    }

    /**
     * Alternate Thing titles for characters, such as " " for "space".
     */
    export interface IAliases {
        [i: string]: string;
    }

    /**
     * Programmatic replacements for deliniated words.
     */
    export interface IReplacements {
        [i: string]: string[] | IReplacerFunction;
    }

    export interface IReplacerFunction {
        (GameStarter: IGameStartr): string[];
    }

    /**
     * Settings to initialize a new IMenuGraphr.
     */
    export interface IMenuGraphrSettings {
        /**
         * The parent IGameStartr managing Things.
         */
        GameStarter: IGameStartr;

        /**
         * Known menu schemas, keyed by name.
         */
        schemas?: IMenuSchemas;

        /**
         * Alternate Thing titles for charactes, such as " " for "space".
         */
        aliases?: IAliases;

        /**
         * Programmatic replacements for deliniated words.
         */
        replacements?: IReplacements;

        /**
         * The separator for words to replace using replacements.
         */
        replacerKey?: string;
    }

    /**
     * A menu management sysstem. Menus can have dialog-style text, scrollable
     * and unscrollable grids, and children menus or decorations added.
     */
    export interface IMenuGraphr {

    }
}
