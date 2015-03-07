'use strict';

/**
 * Sequencer
 *
 * A helper for handling sequences of events
 */

var keymap = require('./keymap'),
    mousemap = require('./mousemap');

function Sequencer() {
    // The current sequence that is being inputted
    this.sequence = [];
    this.events = [];

    // The keys/buttons that are currently active
    this.active = [];

    this.previousSequences = [];
}


Sequencer.prototype.feed =
function(e, cb) {
    this.events.push(e);

    return this;
};


Sequencer.prototype.end =
function(cb) {
    this.previousSequences.push({
        events: this.events.split(),
        sequence: this.sequence.split()
    });

    this.sequence = [];
    this.events = [];
    this.current = [];

    return this;
};


Sequencer.prototype.read =
function(cb) {
    return this;
};


Sequencer.prototype.match =
function(sequence) {
};


module.exports = sequencer;
