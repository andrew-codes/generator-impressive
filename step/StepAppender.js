'use strict';

var StepAppender = module.exports = function StepAppender(id) {
    this.filename = id + '.html';
    this.id = id;
};

StepAppender.prototype.appendStepsTo = function (steps) {
    var X = 3000;
    var Y = 0;
    var Z = 0;
    if (steps.length > 1) {
        var lastItem = steps[steps.length - 1];
        var ntlItem = steps[steps.length - 2];
        X = 2 * lastItem.data.x - ntlItem.data.x;
        Y = 2 * lastItem.data.y - ntlItem.data.y;
        Z = 2 * lastItem.data.z - ntlItem.data.z;
    }
    steps.push(
        {
            uri: this.filename,
            id: this.id,
            class: 'step',
            data: {
                x: X,
                y: Y,
                z: Z,
                scale: 1,
                "rotate-x": 0,
                "rotate-y": 0,
                "rotate-z": 90
            }
        });
    return steps;
};