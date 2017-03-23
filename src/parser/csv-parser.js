/**
 * @file Csv Parser
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */


import { ParserRegistry } from "../globals.js";
import Parser from "./parser.js";


class CsvParser extends Parser{

    constructor( streamer, params ){

        super( streamer, params );

        this.table = {
            name: this.name,
            path: this.path,
            colNames: [],
            data: []
        };

    }

    get type (){ return "csv"; }
    get __objName(){ return "table"; }

    _parse(){

        var data = this.table.data;
        var reDelimiter = /\s*,\s*/;

        this.streamer.eachChunkOfLines( function( chunk, chunkNo/*, chunkCount*/ ){

            var n = chunk.length;

            for( var i = 0; i < n; ++i ){

                var line = chunk[ i ].trim();
                var values = line.split( reDelimiter );

                if( chunkNo === 0 && i === 0 ){

                    this.table.colNames = values;

                }else if( line ){

                    data.push( values );

                }

            }

        }.bind( this ) );

    }

}

ParserRegistry.add( "csv", CsvParser );


export default CsvParser;
