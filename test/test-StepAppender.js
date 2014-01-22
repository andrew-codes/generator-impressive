/*global describe, beforeEach, it*/

var assert = require('assert');

describe('StepAppender', function () {
    "use strict";

    var SUT = require('../step/StepAppender');
    var sut;
    var steps;

    beforeEach(function () {
        sut = new SUT('file_01.md', 'file_01');
    });

    describe('given no existing steps', function () {
        beforeEach(function () {
            steps = [];
        });
        describe('when appending a new step', function () {
            beforeEach(function () {
                steps = sut.appendStepsTo(steps);
            });
            it('should return json with only one step', function () {
                assert(steps.length === 1);
            });
            it('should set the x value to 3000', function () {
                assert(steps[0].data.x === 3000);
            });
        });
    });


    describe('given a json of existing steps', function () {
        beforeEach(function () {
            steps = [
                {
                    uri: 'file_00.md',
                    id: 'file_00',
                    class: '',
                    data: {
                        x: 0,
                        y: 0,
                        z: 0,
                        scale: 1,
                        "rotate-x": 0,
                        "rotate-y": 0,
                        "rotate-z": 90
                    }
                }
            ];
        });
        describe('when appending a new step', function () {
            beforeEach(function () {
                steps = sut.appendStepsTo(steps);
            });
            it('should return the json of steps with the addition of the new step', function () {
                assert(steps.length === 2);
            });
            describe('and there are at least 2 steps', function () {
                beforeEach(function () {
                    steps = sut.appendStepsTo(steps);
                });
                it('should set the x value to double the last step\'s x value minus the second to last step\'s value', function () {
                    assert(steps[2].data.x === steps[1].data.x * 2 - steps[0].data.x);
                });
            });
        });
    });
});
