import * as fs  from "fs"
import {App}    from "./App"

export class LocaleSet
{
    /**
     *
     */
    constructor(
                public raw: string/*,
                public locale: string = "ru-RU"*/
                )
    {
        this.obj = JSON.parse(raw)
    }

    
    public obj: any;

    /**
    public get filename(): string {
        return App.ROOT_DIRECTORY +"/" + this.locale + "/" + this.file;
    }

  
    private _ident              : number    = 4;
    private _inheritNewLines    : boolean   = true;
    private _alignValue         : boolean   = true;

    private writeObject(startIdent:number = 4)
    {

    }

    private getIdent(obj: any): number {
        var length: number = 1;
        for (let prop in obj) {
            length = prop.length > length ? prop.length : length
        }
        return Math.ceil((length + 1) / this._ident)
    }


    public flatKeys: Array<string> = new Array<string>()
    public definitions: any = {}


    private parseFileSync() {
        this.raw = fs.readFileSync(this.filename, "utf8");
        this.obj = JSON.parse(this.raw);

    }


    public saveFileSync() {
        fs.writeFileSync(this.filename, this.raw)
        console.log(this.filename+' saved');
    }
    **/

}