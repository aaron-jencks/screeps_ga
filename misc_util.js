/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('misc_util');
 * mod.thing == 'a thing'; // true
 */
 
 let ascii_start = 33;
 let ascii_stop = 126;
 
 module.exports.ascii_start = ascii_start;
 module.exports.ascii_stop = ascii_stop;
 
 
 function letter_to_map_coord(c) {
     let max_squares = 2500;
     let diff = ascii_stop - ascii_start;
     let pixel = ((c.CharCodeAt(0) - ascii_start) / diff) * max_squares;
     let y = Math.floor(pixel / 50);
     let x = pixel - (y * 50);
     return {'x': x, 'y': y };
 }
 
 module.exports.letter_to_map_coord = letter_to_map_coord;
 

module.exports = {
    
};