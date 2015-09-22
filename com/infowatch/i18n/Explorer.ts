import * as fs  from "fs"
import {App}    from "./App"

export enum KnownLocales {
    RU,
    EN
}

export class Explorer
{
    public static get RU(): string { return "ru-RU" };

    public static get EN(): string { return "en-US" };
    
    
    private _fileNames: Array<string> = new Array<string>();
    
    
    /**
     * Array of file names in russian locale
     */
    private _rusFiles: Array<string>

    /**
     * Array of file names in english locale
     */
    private _engFiles: Array<string>

    /**
     * Available file pairs for merging in two locales
     */
    public get availableFiles(): Array<string> {
        return this._fileNames
    }


    /**
     * Explore for locale file pairs
     * Stores last result in alailableFiles
     */
    public exploreSync():Array<string>
    {
        this._rusFiles = fs.readdirSync(App.ROOT_DIRECTORY  + "/" + Explorer.RU + "/");
        this._engFiles = fs.readdirSync(App.ROOT_DIRECTORY  + "/" + Explorer.EN + "/");

        for (var name in this._rusFiles) {
            if (this._engFiles.indexOf(this._rusFiles[name]) > -1)
                this._fileNames.push(this._rusFiles[name])
            
        }
        
        return this.availableFiles
    }

    


}