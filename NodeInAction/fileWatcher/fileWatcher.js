var events = require('events');
var util = require('util');

util.inherits(Watcher, events.EventEmitter); // Inherits!

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}
