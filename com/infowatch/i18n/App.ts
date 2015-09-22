///<reference path="../../../typings/node/node.d.ts"/>

import * as fs          from "fs"
import * as readline    from "readline"
import {LocaleSet}      from "./LocaleSet"
import {LocaleMerge}    from "./LocaleMerge"
import {Explorer}       from "./Explorer"

/**
 * TODO: Make async with kind of Delegates
 */
export class App {
    
    /**
     * Root directory where App.instance was first time called. 
     * mainly it's a folder where node index.js was executed
     */
    public static get ROOT_DIRECTORY(): string { return App._rootDirectory }
    private static _rootDirectory: string


    /**
     * A singleton instance
     */
    public static get instance(): App {
        if (!App._instance) App._instance = new App();
        return App._instance;
    }
    private static _instance: App;

    
    /**
     * App is a singleton base class of your app
     */
    constructor() {
        if (App._instance) throw new Error("App is a singleton use App.instance instead of constuctor");
        App._instance = this;
        App._rootDirectory = process.cwd()
    }


    /**
     * Single readline interface for the App
     */
    public static get rl(): readline.ReadLine { return this._rl }
    private static _rl: readline.ReadLine = readline.createInterface({ input: process.stdin, output: process.stdout })
        

    /**
     * Single readline interface for the App
     */
    public static get exp(): Explorer { return this._exp }
    private static _exp: Explorer = new Explorer();


    /**
     * Explore for nuw files and suggest merge changes
     */
    public run(): void {
        console.log('i18n running, investigate for files');
        console.log("Start explore " + Explorer.RU + " locale into " + process.cwd() + "\n");
        
        App.exp.exploreSync();

        for (let name in App.exp.availableFiles) 
            App.rl.write("Found " + App.exp.availableFiles[name] + "\n");
            
        if(App.exp.availableFiles.length)
            this.handleMergeInput()
        else
            console.log('There is no any files in en-US and ru-RU folder')
    }

    /**
     * Ask user which file to merger
     */
    private handleMergeInput()
    {
        this._filesQueue = []
        
        App.rl.question("\nType pair's file name to merge or -all flag :",
            (answer) => {
                
                if (answer === "-all") {
                    this._filesQueue = App.exp.availableFiles.slice(0);
                    this.handleFile(this._filesQueue.shift())
                }
                
                else {
                        try{ 
                            
                            this.handleFile(answer)
                        }
                        catch (e) {
                            console.log('file not found');
                            this.handleMergeInput()
                        }
                }
            })
    }

    private _filesQueue: Array<string> = new Array<string>();

    private handleFile(file: string): void {
        console.log(file + " :");
        
        //prepare files
        var ls      : LocaleSet =   new LocaleSet   (readFileSync(file, Explorer.RU));
        var slave   : LocaleMerge = new LocaleMerge (readFileSync(file, Explorer.EN));

        slave.mergeFrom(ls);

        console.log(slave.mergeCount + ' keys for merge found');

        // Save or not ?
        App.rl.question("\n\nSave merged y/n? ",
            (answer: string) => {
                if (answer.toLowerCase() === 'y') {
                    saveFileSync(slave.raw, file, Explorer.EN);
                    console.log(file + ' locale files merged');
                }
                else      
                    console.log(file + ' not saved');
                
                // if there are any files in queue
                if (this._filesQueue.length) {
                    this.handleFile(this._filesQueue.shift());
                }
                else {
                    console.log('all files are merged')
                    setTimeout(this.handleMergeInput, 300)
                }
            }
        );
        
    }
}


function readFileSync(file: string, locale: string): string {
    return fs.readFileSync(App.ROOT_DIRECTORY + "/"+locale+"/" + file, "utf8")
}


function saveFileSync(data:string, file: string, locale: string): void {
    fs.writeFileSync(   App.ROOT_DIRECTORY + "/" + locale + "/" + file , 
                        data,
                        { encoding: 'utf8' })
}



