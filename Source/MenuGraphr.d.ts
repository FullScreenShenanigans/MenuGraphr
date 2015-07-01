declare module MenuGraphr {
    export interface IMenuGraphrSettings {
        GameStarter: GameStartr.IGameStartr;
        schemas?: any;
        aliases?: any;
        replacements?: any;
        replacerKey?: string;
        replaceFromItemsHolder?: any;
        replacementStatistics?: any;
    }

    export interface IMenuGraphr {

    }
}