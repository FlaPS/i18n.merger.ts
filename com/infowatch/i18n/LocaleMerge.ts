import {LocaleSet} from "./LocaleSet";


function isPrimitive(value: any): boolean {
    return  typeof value == 'string'    ||
            typeof value == 'number'    ||
            typeof value == 'boolean'   ||
            value == null
}

export class LocaleMerge extends LocaleSet {

    constructor(source: string)
    {
        super(source)
    }

    private _objTemp: any = {}
    private _rawTemp: string = ''

    /**
     * Fetch new keys from origin locale and set default values from one
     * @param master locale
     */
    public mergeFrom(origin: LocaleSet): string {
        
        // copy original string
        this.raw = origin.raw;
        this.obj = this.mergeObjects(origin.obj, this.obj)

        return this.raw;
    }

    //private cursor: number = 0;

    //private tail: string;

    public get mergeCount(): number {
        return this._mergeCount
    }
    private _mergeCount:number = 0;


    /**
     * Add undefined properties from master to slave
     * TODO: string.replace - replaces all accurancies, 
     * looks like ok - but in case of equal  key and value first accurence will be replaced
     * add reg exps and cursor/tail of string with first match to explude duplicate key values
     */
    private mergeObjects(master: any, slave: any) {
        
        // For each property of master object
        for (var prop in master) {


            var template:RegExp = new RegExp("\""+master[prop]+"\"");
            
            // if slave object is not defined
            if ( slave[prop] === undefined) {
                
                console.log(" key '" + prop + "' not found -> replaced with: " +"!!!"+ master[prop]+"!!!")
                    
                    // copy property in case of primitive
                    if (isPrimitive(master[prop])) {
                        this.mergeCount++;
                        this.raw = this.raw.replace(template, "\"!!!" + master[prop] + "!!!\"");
                    }
                    // or create new object 
                    else {
                        this.mergeObjects(master[prop], {})
                    }
                
            }
     
            else {
                // if propety is primitive - just copy one
                if (isPrimitive(master[prop])) {
             
                    this.raw = this.raw.replace(template, "\""+slave[prop]+"\"");
                }
                // otherwise deep cloning with mergeObjects method
                else {
                    this.mergeObjects(master[prop], slave[prop])
                }

             
            }
        }
    }

 
}