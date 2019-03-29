/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var SnakeService = /** @class */ (function () {
    function SnakeService() {
    }
    // Starting from Daniil Belyakov code I adapted it to work with Typescript/Angular
    // His Licence Agreement
    //  The MIT License (MIT)
    //
    //  Copyright (c) 2015 Daniil Belyakov
    //
    //  Permission is hereby granted, free of charge, to any person obtaining a copy
    //  of this software and associated documentation files (the "Software"), to deal
    //  in the Software without restriction, including without limitation the rights
    //  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    //  copies of the Software, and to permit persons to whom the Software is
    //  furnished to do so, subject to the following conditions:
    //
    //  The above copyright notice and this permission notice shall be included in all
    //  copies or substantial portions of the Software.
    //
    //  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    //  SOFTWARE.
    // Starting from Daniil Belyakov code I adapted it to work with Typescript/Angular
    // His Licence Agreement
    //  The MIT License (MIT)
    //
    //  Copyright (c) 2015 Daniil Belyakov
    //
    //  Permission is hereby granted, free of charge, to any person obtaining a copy
    //  of this software and associated documentation files (the "Software"), to deal
    //  in the Software without restriction, including without limitation the rights
    //  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    //  copies of the Software, and to permit persons to whom the Software is
    //  furnished to do so, subject to the following conditions:
    //
    //  The above copyright notice and this permission notice shall be included in all
    //  copies or substantial portions of the Software.
    //
    //  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    //  SOFTWARE.
    /**
     * @return {?}
     */
    SnakeService.prototype.snake = 
    // Starting from Daniil Belyakov code I adapted it to work with Typescript/Angular
    // His Licence Agreement
    //  The MIT License (MIT)
    //
    //  Copyright (c) 2015 Daniil Belyakov
    //
    //  Permission is hereby granted, free of charge, to any person obtaining a copy
    //  of this software and associated documentation files (the "Software"), to deal
    //  in the Software without restriction, including without limitation the rights
    //  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    //  copies of the Software, and to permit persons to whom the Software is
    //  furnished to do so, subject to the following conditions:
    //
    //  The above copyright notice and this permission notice shall be included in all
    //  copies or substantial portions of the Software.
    //
    //  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    //  SOFTWARE.
    /**
     * @return {?}
     */
    function () {
        //==============================================================================
        //==================================UTILITIES===================================
        //==============================================================================
        /** @type {?} */
        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        /** @type {?} */
        var cancelAnimationFrame = window.cancelAnimationFrame;
        /**
         * @param {?} min
         * @param {?} max
         * @return {?}
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        /**
         * @return {?}
         */
        function getUnixTimeMs() {
            /** @type {?} */
            var date = new Date();
            return date.getTime();
        }
        //==============================================================================
        //==================================CONSTANTS===================================
        //==============================================================================
        // Test mode switcher
        /** @type {?} */
        var TEST = false;
        // Dimensions of the snake field
        /** @type {?} */
        var HEIGHT = 20;
        /** @type {?} */
        var WIDTH = 40;
        // Amount of frames per second also defining the snake moving speed
        /** @type {?} */
        var FPS = 15;
        // The frame length parameter used to determine the pause between frames
        /** @type {?} */
        var FRAME_LENGTH = 1000 / FPS;
        // Enumerated values describing directions of the snake movement
        /** @type {?} */
        var DIRECTION = {
            LEFT: 0,
            UP: 1,
            RIGHT: 2,
            DOWN: 3
        };
        //==============================================================================
        //============================SNAKE CLASS DEFINITION============================
        //==============================================================================
        /**
         * @return {?}
         */
        function Snake() {
            // Array of coordinates of snake parts
            this.parts = [];
            // Size of the field in which the snake lives
            this.homeWidth = WIDTH;
            this.homeHeight = HEIGHT;
            // Direction of the snake
            this.direction = DIRECTION.RIGHT;
            // Indicator of snake being stunned
            this.stunned = false;
            // ID of the last frame the snake was updated
            this.frameId = 0;
            // ID of the last frame the snake changed its directions
            this.lastDirectionChangeFrameId = 0;
            // Build the initial snake in the middle of its home
            /** @type {?} */
            var midY = this.homeHeight / 2.0;
            /** @type {?} */
            var midX = this.homeWidth / 2.0;
            addPart(this, midY, midX + 2.0);
            addPart(this, midY, midX + 1.0);
            addPart(this, midY, midX);
            addPart(this, midY, midX - 1.0);
            addPart(this, midY, midX - 2.0);
            // Add event listener for the snake movement
            addMovementListener(this);
        }
        // Adds an event listener for the snake movement; the listener responds to the
        // key presses and updates the snake direction accordingly, but not more often
        // than once per frame.
        /**
         * @param {?} snake
         * @return {?}
         */
        function addMovementListener(snake) {
            document.addEventListener("keydown", (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var oldDirection = snake.direction;
                if (snake.lastDirectionChangeFrameId < snake.frameId) {
                    switch (e.keyCode) {
                        case 37:
                            if (snake.direction !== DIRECTION.RIGHT) {
                                snake.direction = DIRECTION.LEFT;
                            }
                            break;
                        case 38:
                            if (snake.direction !== DIRECTION.DOWN) {
                                snake.direction = DIRECTION.UP;
                            }
                            break;
                        case 39:
                            if (snake.direction !== DIRECTION.LEFT) {
                                snake.direction = DIRECTION.RIGHT;
                            }
                            break;
                        case 40:
                            if (snake.direction !== DIRECTION.UP) {
                                snake.direction = DIRECTION.DOWN;
                            }
                            break;
                        default:
                            break;
                    }
                }
                if (oldDirection !== snake.direction) {
                    snake.lastDirectionChangeFrameId = snake.frameId;
                }
            }));
        }
        // Add a new part with a given (y, x) location
        /**
         * @param {?} snake
         * @param {?} y
         * @param {?} x
         * @return {?}
         */
        function addPart(snake, y, x) {
            snake.parts.push({
                y: y,
                x: x
            });
        }
        /**
         * @param {?} snake
         * @param {?} apple
         * @return {?}
         */
        function isAppleEatable(snake, apple) {
            /** @type {?} */
            var parts = snake.getParts();
            /** @type {?} */
            var head = parts[0];
            return head.x === apple.x && head.y === apple.y;
        }
        /**
         * @param {?} snake
         * @return {?}
         */
        function becomeStunned(snake) {
            snake.stunned = true;
        }
        Snake.prototype.blockDirectionChange = (/**
         * @return {?}
         */
        function () {
            this.lastDirectionChangeFrameId = this.frameId;
        });
        Snake.prototype.updateFrameId = (/**
         * @param {?} frameId
         * @return {?}
         */
        function (frameId) {
            this.frameId = frameId;
        });
        Snake.prototype.isStunned = (/**
         * @return {?}
         */
        function () {
            return this.stunned;
        });
        Snake.prototype.eatApple = (/**
         * @param {?} apple
         * @return {?}
         */
        function (apple) {
            /** @type {?} */
            var parts = this.getParts();
            /** @type {?} */
            var tail = parts[parts.length - 1];
            if (isAppleEatable(this, apple)) {
                addPart(this, tail.y, tail.x);
                return true;
            }
            return false;
        });
        Snake.prototype.getParts = (/**
         * @return {?}
         */
        function () {
            return this.parts;
        });
        Snake.prototype.getDirection = (/**
         * @return {?}
         */
        function () {
            return this.direction;
        });
        Snake.prototype.move = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var parts = this.getParts();
            /** @type {?} */
            var head = parts[0];
            /** @type {?} */
            var partId;
            for (partId = parts.length - 1; 0 < partId; --partId) {
                parts[partId].x = parts[partId - 1].x;
                parts[partId].y = parts[partId - 1].y;
            }
            // Update head
            switch (this.getDirection()) {
                case DIRECTION.LEFT:
                    head.x = (head.x - 1 + this.homeWidth) % this.homeWidth;
                    break;
                case DIRECTION.UP:
                    head.y = (head.y - 1 + this.homeHeight) % this.homeHeight;
                    break;
                case DIRECTION.RIGHT:
                    head.x = (head.x + 1 + this.homeWidth) % this.homeWidth;
                    break;
                case DIRECTION.DOWN:
                    head.y = (head.y + 1 + this.homeHeight) % this.homeHeight;
                    break;
                default:
                    break;
            }
            for (partId = 1; partId < parts.length; ++partId) {
                if (head.x === parts[partId].x && head.y === parts[partId].y) {
                    becomeStunned(this);
                }
            }
        });
        // Draw the snake on a field
        Snake.prototype.draw = (/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            /** @type {?} */
            var text = field.getText();
            // Build a snake parts map
            /** @type {?} */
            var snakeParts = this.getParts();
            // If the old apple coordinate is negative then no apple has ever been spawned
            if (field.oldSnakeTail.x < 0) {
                // Full version of the method
                /** @type {?} */
                var partsMap = {};
                for (var partNum = 0; partNum < snakeParts.length; ++partNum) {
                    /** @type {?} */
                    var part = snakeParts[partNum];
                    if (partsMap[part.y] === undefined) {
                        partsMap[part.y] = [part.x];
                    }
                    else {
                        partsMap[part.y].push(part.x);
                    }
                }
                /** @type {?} */
                var partsMapKeys = Object.keys(partsMap);
                for (var partsMapKeyNum = 0; partsMapKeyNum < partsMapKeys.length; ++partsMapKeyNum) {
                    // Corresponds to y coordinates of snake elements contained in a current line
                    /** @type {?} */
                    var y = partsMapKeys[partsMapKeyNum];
                    // partsMapLines contains x coordinates of the snake elements
                    /** @type {?} */
                    var partsMapLine = partsMap[y];
                    for (var charNum = 0; charNum < partsMapLine.length; ++charNum) {
                        /** @type {?} */
                        var x = partsMapLine[charNum];
                        /** @type {?} */
                        var partPosition = getTextPosition(field, y, x);
                        text = text.substr(0, partPosition) + "@" + text.substr(partPosition + 1);
                    }
                }
            }
            else {
                if (field.oldSnakeTail.x !== snakeParts[snakeParts.length - 1].x ||
                    field.oldSnakeTail.y !== snakeParts[snakeParts.length - 1].y) {
                    /** @type {?} */
                    var oldTailPosition = getTextPosition(field, field.oldSnakeTail.y, field.oldSnakeTail.x);
                    text = text.substr(0, oldTailPosition) + " " + text.substr(oldTailPosition + 1);
                }
                /** @type {?} */
                var newHeadPosition = getTextPosition(field, snakeParts[0].y, snakeParts[0].x);
                text = text.substr(0, newHeadPosition) + "@" + text.substr(newHeadPosition + 1);
            }
            // Save the new old snake tail coordinates
            field.oldSnakeTail.y = snakeParts[snakeParts.length - 1].y;
            field.oldSnakeTail.x = snakeParts[snakeParts.length - 1].x;
            // TODO: use getters/setters to access the properties of field
            field.text = text;
        });
        //==============================================================================
        //============================FIELD CLASS DEFINITION============================
        //==============================================================================
        /**
         * @return {?}
         */
        function Field() {
            this.width = WIDTH;
            this.height = HEIGHT;
            this.text = "";
            this.oldSnakeTail = {
                x: -1,
                y: -1
            };
            buildText(this);
        }
        Field.prototype.getWidth = (/**
         * @return {?}
         */
        function () {
            return this.width;
        });
        Field.prototype.getHeight = (/**
         * @return {?}
         */
        function () {
            return this.height;
        });
        Field.prototype.getText = (/**
         * @return {?}
         */
        function () {
            return this.text;
        });
        /**
         * @param {?} field
         * @return {?}
         */
        function buildText(field) {
            /** @type {?} */
            var i;
            /** @type {?} */
            var horizontalBorder = "";
            field.text = "";
            for (i = 0; i < field.getWidth() + 2; ++i) {
                horizontalBorder += "#";
            }
            field.text += horizontalBorder + "\n";
            /** @type {?} */
            var fieldLine = "#";
            for (i = 0; i < field.getWidth(); ++i) {
                fieldLine += " ";
            }
            fieldLine += "#";
            for (i = 0; i < field.getHeight(); ++i) {
                field.text += fieldLine + "\n";
            }
            field.text += horizontalBorder;
        }
        // Get text with snake and apple
        Field.prototype.getFullText = (/**
         * @param {?} snake
         * @param {?} apple
         * @return {?}
         */
        function (snake, apple) {
            // Draw the snake
            snake.draw(this);
            /** @type {?} */
            var text = this.text;
            // Print the apple
            /** @type {?} */
            var applePosition = getTextPosition(this, apple.y, apple.x);
            text = text.substr(0, applePosition) + "$" + text.substr(applePosition + 1);
            this.text = text;
            return this.text;
        });
        /**
         * @param {?} field
         * @param {?} y
         * @param {?} x
         * @return {?}
         */
        function getTextPosition(field, y, x) {
            return (field.getWidth() + 3) * (y * 1 + 1) + x * 1 + 1;
        }
        //==============================================================================
        //=============================GAME CLASS DEFINITION============================
        //==============================================================================
        /**
         * @return {?}
         */
        function Game() {
            this.frameId = 0;
            this.score = 0;
            this.status = "Press SPACE to start";
            this.frameHeader = "";
            this.running = false;
            this.gameOver = false;
            this.field = new Field();
            this.snake = new Snake();
            this.apple = generateApple();
            updateFrameHeader(this);
        }
        Game.prototype.incrementFrameId = (/**
         * @return {?}
         */
        function () {
            ++this.frameId;
            if (TEST) {
                updateFrameHeader(this);
            }
        });
        Game.prototype.getFrameId = (/**
         * @return {?}
         */
        function () {
            return this.frameId;
        });
        Game.prototype.getScore = (/**
         * @return {?}
         */
        function () {
            return this.score;
        });
        Game.prototype.setStatus = (/**
         * @param {?} status
         * @return {?}
         */
        function (status) {
            this.status = status;
            updateFrameHeader(this);
        });
        Game.prototype.getStatus = (/**
         * @return {?}
         */
        function () {
            return this.status;
        });
        Game.prototype.setRunning = (/**
         * @param {?} running
         * @return {?}
         */
        function (running) {
            this.running = running;
        });
        Game.prototype.isRunning = (/**
         * @return {?}
         */
        function () {
            return this.running;
        });
        Game.prototype.setOver = (/**
         * @param {?} gameOver
         * @return {?}
         */
        function (gameOver) {
            this.gameOver = gameOver;
        });
        Game.prototype.isOver = (/**
         * @return {?}
         */
        function () {
            return this.gameOver;
        });
        Game.prototype.incrementScore = (/**
         * @return {?}
         */
        function () {
            ++this.score;
            updateFrameHeader(this);
        });
        Game.prototype.getField = (/**
         * @return {?}
         */
        function () {
            return this.field;
        });
        Game.prototype.getSnake = (/**
         * @return {?}
         */
        function () {
            return this.snake;
        });
        Game.prototype.getApple = (/**
         * @return {?}
         */
        function () {
            return this.apple;
        });
        Game.prototype.dropApple = (/**
         * @return {?}
         */
        function () {
            this.apple = generateApple();
        });
        /**
         * @return {?}
         */
        function generateApple() {
            return {
                x: getRandomInt(0, WIDTH - 1),
                y: getRandomInt(0, HEIGHT - 1)
            };
        }
        /**
         * @param {?} game
         * @return {?}
         */
        function updateFrameHeader(game) {
            /** @type {?} */
            var frameHeader = "";
            frameHeader += "Game by Daniil Belyakov";
            for (var j = 0; j < HEIGHT; ++j) {
                frameHeader += "\n";
            }
            if (TEST) {
                frameHeader += "Frame: " + game.getFrameId();
                frameHeader += " | ";
            }
            frameHeader += "Score: " + game.getScore();
            frameHeader += " | " + game.getStatus();
            game.frameHeader = frameHeader;
        }
        /**
         * @param {?} game
         * @return {?}
         */
        function getFrameHeader(game) {
            return game.frameHeader;
        }
        /**
         * @param {?} game
         * @return {?}
         */
        function printFrameHeader(game) {
            /** @type {?} */
            var frameHeader = getFrameHeader(game);
            console.log(frameHeader);
        }
        /**
         * @param {?} game
         * @return {?}
         */
        function drawField(game) {
            /** @type {?} */
            var field = game.getField();
            /** @type {?} */
            var snake = game.getSnake();
            /** @type {?} */
            var apple = game.getApple();
            /** @type {?} */
            var fieldText = field.getFullText(snake, apple);
            console.log(fieldText);
        }
        Game.prototype.draw = (/**
         * @return {?}
         */
        function () {
            printFrameHeader(this);
            drawField(this);
        });
        //==============================================================================
        //=====================================GAME=====================================
        //==============================================================================
        /** @type {?} */
        var game = new Game();
        /** @type {?} */
        var timerId = 0;
        /** @type {?} */
        var oldTime;
        /** @type {?} */
        var newTime;
        oldTime = getUnixTimeMs();
        /**
         * @return {?}
         */
        function reset() {
            game = new Game();
            timerId = 0;
            oldTime = 0;
            newTime = 0;
        }
        /**
         * @return {?}
         */
        function tick() {
            /** @type {?} */
            var snake = game.getSnake();
            /** @type {?} */
            var apple = game.getApple();
            newTime = getUnixTimeMs();
            if (newTime - oldTime >= FRAME_LENGTH) {
                // Move the snake and eat the apple
                snake.move();
                if (snake.eatApple(apple)) {
                    game.incrementScore();
                    game.dropApple();
                }
                if (snake.isStunned()) {
                    game.setStatus("Game Over! | Press ENTER to reset");
                    game.setRunning(false);
                    game.setOver(true);
                    // Draw the frame
                    game.draw();
                    stop();
                }
                else {
                    // Draw the frame
                    game.draw();
                    // Increase the frame counter
                    game.incrementFrameId();
                    /** @type {?} */
                    var frameId = game.getFrameId();
                    snake.updateFrameId(frameId);
                    if (frameId % 200 === 0) {
                        // Clear the console every N frames
                        console.clear();
                        game.draw();
                    }
                }
                oldTime = getUnixTimeMs();
            }
            if (game.isRunning()) {
                timerId = requestAnimationFrame(tick);
            }
            else {
                cancelAnimationFrame(timerId);
            }
        }
        /**
         * @return {?}
         */
        function stop() {
            cancelAnimationFrame(timerId);
            game.setRunning(false);
        }
        /**
         * @return {?}
         */
        function run() {
            timerId = requestAnimationFrame(tick);
            game.setStatus("Running | Press SPACE to pause");
            game.setRunning(true);
        }
        game.draw();
        document.addEventListener("keydown", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            switch (e.keyCode) {
                case 13:
                    if (game.isOver()) {
                        reset();
                        game.draw();
                    }
                    break;
                case 32:
                    if (!game.isOver()) {
                        if (game.isRunning()) {
                            /** @type {?} */
                            var snake = game.getSnake();
                            snake.blockDirectionChange();
                            game.setStatus("Paused | Press SPACE to continue");
                            game.draw();
                            stop();
                        }
                        else {
                            run();
                        }
                    }
                    break;
                default:
                    break;
            }
        }));
    };
    SnakeService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] }
    ];
    /** @nocollapse */
    SnakeService.ctorParameters = function () { return []; };
    /** @nocollapse */ SnakeService.ngInjectableDef = i0.defineInjectable({ factory: function SnakeService_Factory() { return new SnakeService(); }, token: SnakeService, providedIn: "root" });
    return SnakeService;
}());
export { SnakeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25ha2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9lYXN0ZXJFZ2cvc25ha2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7SUFJRTtJQUFlLENBQUM7SUFFaEIsa0ZBQWtGO0lBQ2xGLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsRUFBRTtJQUNGLHNDQUFzQztJQUN0QyxFQUFFO0lBQ0YsZ0ZBQWdGO0lBQ2hGLGlGQUFpRjtJQUNqRixnRkFBZ0Y7SUFDaEYsNkVBQTZFO0lBQzdFLHlFQUF5RTtJQUN6RSw0REFBNEQ7SUFDNUQsRUFBRTtJQUNGLGtGQUFrRjtJQUNsRixtREFBbUQ7SUFDbkQsRUFBRTtJQUNGLDhFQUE4RTtJQUM5RSw0RUFBNEU7SUFDNUUsK0VBQStFO0lBQy9FLDBFQUEwRTtJQUMxRSxpRkFBaUY7SUFDakYsaUZBQWlGO0lBQ2pGLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUViLDRCQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTDs7Ozs7WUFJTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMscUJBQXFCLElBQUksTUFBTSxDQUFDLDJCQUEyQjs7WUFFMUYsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLG9CQUFvQjs7Ozs7O1FBRXRELFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNELENBQUM7Ozs7UUFFRCxTQUFTLGFBQWE7O2dCQUNoQixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFD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QU07aUJBQ25COzs7Ozt1QkFKRDtDQW1sQkMsQUFqbEJELElBaWxCQztTQTlrQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBTbmFrZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gU3RhcnRpbmcgZnJvbSBEYW5paWwgQmVseWFrb3YgY29kZSBJIGFkYXB0ZWQgaXQgdG8gd29yayB3aXRoIFR5cGVzY3JpcHQvQW5ndWxhclxuICAvLyBIaXMgTGljZW5jZSBBZ3JlZW1lbnRcbiAgLy8gIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICAvL1xuICAvLyAgQ29weXJpZ2h0IChjKSAyMDE1IERhbmlpbCBCZWx5YWtvdlxuICAvL1xuICAvLyAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICAvLyAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICAvLyAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICAvLyAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICAvLyAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gIC8vICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAvL1xuICAvLyAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gIC8vICBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICAvL1xuICAvLyAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICAvLyAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gIC8vICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAgLy8gIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAgLy8gIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gIC8vICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICAvLyAgU09GVFdBUkUuXG5cbiAgc25ha2UoKSB7XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1VVElMSVRJRVM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICAgIHZhciBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VW5peFRpbWVNcygpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUNPTlNUQU5UUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBUZXN0IG1vZGUgc3dpdGNoZXJcbiAgICB2YXIgVEVTVCA9IGZhbHNlO1xuXG4gICAgLy8gRGltZW5zaW9ucyBvZiB0aGUgc25ha2UgZmllbGRcbiAgICB2YXIgSEVJR0hUID0gMjA7XG4gICAgdmFyIFdJRFRIID0gNDA7XG5cbiAgICAvLyBBbW91bnQgb2YgZnJhbWVzIHBlciBzZWNvbmQgYWxzbyBkZWZpbmluZyB0aGUgc25ha2UgbW92aW5nIHNwZWVkXG4gICAgdmFyIEZQUyA9IDE1O1xuXG4gICAgLy8gVGhlIGZyYW1lIGxlbmd0aCBwYXJhbWV0ZXIgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHBhdXNlIGJldHdlZW4gZnJhbWVzXG4gICAgdmFyIEZSQU1FX0xFTkdUSCA9IDEwMDAgLyBGUFM7XG5cbiAgICAvLyBFbnVtZXJhdGVkIHZhbHVlcyBkZXNjcmliaW5nIGRpcmVjdGlvbnMgb2YgdGhlIHNuYWtlIG1vdmVtZW50XG4gICAgdmFyIERJUkVDVElPTiA9IHtcbiAgICAgIExFRlQ6IDAsXG4gICAgICBVUDogMSxcbiAgICAgIFJJR0hUOiAyLFxuICAgICAgRE9XTjogM1xuICAgIH07XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PVNOQUtFIENMQVNTIERFRklOSVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBTbmFrZSgpIHtcbiAgICAgIC8vIEFycmF5IG9mIGNvb3JkaW5hdGVzIG9mIHNuYWtlIHBhcnRzXG4gICAgICB0aGlzLnBhcnRzID0gW107XG5cbiAgICAgIC8vIFNpemUgb2YgdGhlIGZpZWxkIGluIHdoaWNoIHRoZSBzbmFrZSBsaXZlc1xuICAgICAgdGhpcy5ob21lV2lkdGggPSBXSURUSDtcbiAgICAgIHRoaXMuaG9tZUhlaWdodCA9IEhFSUdIVDtcblxuICAgICAgLy8gRGlyZWN0aW9uIG9mIHRoZSBzbmFrZVxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBESVJFQ1RJT04uUklHSFQ7XG5cbiAgICAgIC8vIEluZGljYXRvciBvZiBzbmFrZSBiZWluZyBzdHVubmVkXG4gICAgICB0aGlzLnN0dW5uZWQgPSBmYWxzZTtcblxuICAgICAgLy8gSUQgb2YgdGhlIGxhc3QgZnJhbWUgdGhlIHNuYWtlIHdhcyB1cGRhdGVkXG4gICAgICB0aGlzLmZyYW1lSWQgPSAwO1xuXG4gICAgICAvLyBJRCBvZiB0aGUgbGFzdCBmcmFtZSB0aGUgc25ha2UgY2hhbmdlZCBpdHMgZGlyZWN0aW9uc1xuICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uQ2hhbmdlRnJhbWVJZCA9IDA7XG5cbiAgICAgIC8vIEJ1aWxkIHRoZSBpbml0aWFsIHNuYWtlIGluIHRoZSBtaWRkbGUgb2YgaXRzIGhvbWVcbiAgICAgIHZhciBtaWRZID0gdGhpcy5ob21lSGVpZ2h0IC8gMi4wO1xuICAgICAgdmFyIG1pZFggPSB0aGlzLmhvbWVXaWR0aCAvIDIuMDtcbiAgICAgIGFkZFBhcnQodGhpcywgbWlkWSwgbWlkWCArIDIuMCk7XG4gICAgICBhZGRQYXJ0KHRoaXMsIG1pZFksIG1pZFggKyAxLjApO1xuICAgICAgYWRkUGFydCh0aGlzLCBtaWRZLCBtaWRYKTtcbiAgICAgIGFkZFBhcnQodGhpcywgbWlkWSwgbWlkWCAtIDEuMCk7XG4gICAgICBhZGRQYXJ0KHRoaXMsIG1pZFksIG1pZFggLSAyLjApO1xuXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzbmFrZSBtb3ZlbWVudFxuICAgICAgYWRkTW92ZW1lbnRMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc25ha2UgbW92ZW1lbnQ7IHRoZSBsaXN0ZW5lciByZXNwb25kcyB0byB0aGVcbiAgICAvLyBrZXkgcHJlc3NlcyBhbmQgdXBkYXRlcyB0aGUgc25ha2UgZGlyZWN0aW9uIGFjY29yZGluZ2x5LCBidXQgbm90IG1vcmUgb2Z0ZW5cbiAgICAvLyB0aGFuIG9uY2UgcGVyIGZyYW1lLlxuICAgIGZ1bmN0aW9uIGFkZE1vdmVtZW50TGlzdGVuZXIoc25ha2UpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIG9sZERpcmVjdGlvbiA9IHNuYWtlLmRpcmVjdGlvbjtcblxuICAgICAgICBpZiAoc25ha2UubGFzdERpcmVjdGlvbkNoYW5nZUZyYW1lSWQgPCBzbmFrZS5mcmFtZUlkKSB7XG4gICAgICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgIGlmIChzbmFrZS5kaXJlY3Rpb24gIT09IERJUkVDVElPTi5SSUdIVCkge1xuICAgICAgICAgICAgICAgIHNuYWtlLmRpcmVjdGlvbiA9IERJUkVDVElPTi5MRUZUO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgaWYgKHNuYWtlLmRpcmVjdGlvbiAhPT0gRElSRUNUSU9OLkRPV04pIHtcbiAgICAgICAgICAgICAgICBzbmFrZS5kaXJlY3Rpb24gPSBESVJFQ1RJT04uVVA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICBpZiAoc25ha2UuZGlyZWN0aW9uICE9PSBESVJFQ1RJT04uTEVGVCkge1xuICAgICAgICAgICAgICAgIHNuYWtlLmRpcmVjdGlvbiA9IERJUkVDVElPTi5SSUdIVDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgIGlmIChzbmFrZS5kaXJlY3Rpb24gIT09IERJUkVDVElPTi5VUCkge1xuICAgICAgICAgICAgICAgIHNuYWtlLmRpcmVjdGlvbiA9IERJUkVDVElPTi5ET1dOO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZERpcmVjdGlvbiAhPT0gc25ha2UuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgc25ha2UubGFzdERpcmVjdGlvbkNoYW5nZUZyYW1lSWQgPSBzbmFrZS5mcmFtZUlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYSBuZXcgcGFydCB3aXRoIGEgZ2l2ZW4gKHksIHgpIGxvY2F0aW9uXG4gICAgZnVuY3Rpb24gYWRkUGFydChzbmFrZSwgeSwgeCkge1xuICAgICAgc25ha2UucGFydHMucHVzaCh7XG4gICAgICAgIHk6IHksXG4gICAgICAgIHg6IHhcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXBwbGVFYXRhYmxlKHNuYWtlLCBhcHBsZSkge1xuICAgICAgdmFyIHBhcnRzID0gc25ha2UuZ2V0UGFydHMoKTtcbiAgICAgIHZhciBoZWFkID0gcGFydHNbMF07XG5cbiAgICAgIHJldHVybiBoZWFkLnggPT09IGFwcGxlLnggJiYgaGVhZC55ID09PSBhcHBsZS55O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlY29tZVN0dW5uZWQoc25ha2UpIHtcbiAgICAgIHNuYWtlLnN0dW5uZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIFNuYWtlLnByb3RvdHlwZS5ibG9ja0RpcmVjdGlvbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uQ2hhbmdlRnJhbWVJZCA9IHRoaXMuZnJhbWVJZDtcbiAgICB9O1xuXG4gICAgU25ha2UucHJvdG90eXBlLnVwZGF0ZUZyYW1lSWQgPSBmdW5jdGlvbihmcmFtZUlkKSB7XG4gICAgICB0aGlzLmZyYW1lSWQgPSBmcmFtZUlkO1xuICAgIH07XG5cbiAgICBTbmFrZS5wcm90b3R5cGUuaXNTdHVubmVkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHVubmVkO1xuICAgIH07XG5cbiAgICBTbmFrZS5wcm90b3R5cGUuZWF0QXBwbGUgPSBmdW5jdGlvbihhcHBsZSkge1xuICAgICAgdmFyIHBhcnRzID0gdGhpcy5nZXRQYXJ0cygpO1xuICAgICAgdmFyIHRhaWwgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGlzQXBwbGVFYXRhYmxlKHRoaXMsIGFwcGxlKSkge1xuICAgICAgICBhZGRQYXJ0KHRoaXMsIHRhaWwueSwgdGFpbC54KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgU25ha2UucHJvdG90eXBlLmdldFBhcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJ0cztcbiAgICB9O1xuXG4gICAgU25ha2UucHJvdG90eXBlLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uO1xuICAgIH07XG5cbiAgICBTbmFrZS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBhcnRzID0gdGhpcy5nZXRQYXJ0cygpO1xuICAgICAgdmFyIGhlYWQgPSBwYXJ0c1swXTtcbiAgICAgIHZhciBwYXJ0SWQ7XG5cbiAgICAgIGZvciAocGFydElkID0gcGFydHMubGVuZ3RoIC0gMTsgMCA8IHBhcnRJZDsgLS1wYXJ0SWQpIHtcbiAgICAgICAgcGFydHNbcGFydElkXS54ID0gcGFydHNbcGFydElkIC0gMV0ueDtcbiAgICAgICAgcGFydHNbcGFydElkXS55ID0gcGFydHNbcGFydElkIC0gMV0ueTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGhlYWRcbiAgICAgIHN3aXRjaCAodGhpcy5nZXREaXJlY3Rpb24oKSkge1xuICAgICAgICBjYXNlIERJUkVDVElPTi5MRUZUOlxuICAgICAgICAgIGhlYWQueCA9IChoZWFkLnggLSAxICsgdGhpcy5ob21lV2lkdGgpICUgdGhpcy5ob21lV2lkdGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRElSRUNUSU9OLlVQOlxuICAgICAgICAgIGhlYWQueSA9IChoZWFkLnkgLSAxICsgdGhpcy5ob21lSGVpZ2h0KSAlIHRoaXMuaG9tZUhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBESVJFQ1RJT04uUklHSFQ6XG4gICAgICAgICAgaGVhZC54ID0gKGhlYWQueCArIDEgKyB0aGlzLmhvbWVXaWR0aCkgJSB0aGlzLmhvbWVXaWR0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBESVJFQ1RJT04uRE9XTjpcbiAgICAgICAgICBoZWFkLnkgPSAoaGVhZC55ICsgMSArIHRoaXMuaG9tZUhlaWdodCkgJSB0aGlzLmhvbWVIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZvciAocGFydElkID0gMTsgcGFydElkIDwgcGFydHMubGVuZ3RoOyArK3BhcnRJZCkge1xuICAgICAgICBpZiAoaGVhZC54ID09PSBwYXJ0c1twYXJ0SWRdLnggJiYgaGVhZC55ID09PSBwYXJ0c1twYXJ0SWRdLnkpIHtcbiAgICAgICAgICBiZWNvbWVTdHVubmVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERyYXcgdGhlIHNuYWtlIG9uIGEgZmllbGRcbiAgICBTbmFrZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgdGV4dCA9IGZpZWxkLmdldFRleHQoKTtcblxuICAgICAgLy8gQnVpbGQgYSBzbmFrZSBwYXJ0cyBtYXBcbiAgICAgIHZhciBzbmFrZVBhcnRzID0gdGhpcy5nZXRQYXJ0cygpO1xuXG4gICAgICAvLyBJZiB0aGUgb2xkIGFwcGxlIGNvb3JkaW5hdGUgaXMgbmVnYXRpdmUgdGhlbiBubyBhcHBsZSBoYXMgZXZlciBiZWVuIHNwYXduZWRcbiAgICAgIGlmIChmaWVsZC5vbGRTbmFrZVRhaWwueCA8IDApIHtcbiAgICAgICAgLy8gRnVsbCB2ZXJzaW9uIG9mIHRoZSBtZXRob2RcbiAgICAgICAgdmFyIHBhcnRzTWFwID0ge307XG5cbiAgICAgICAgZm9yICh2YXIgcGFydE51bSA9IDA7IHBhcnROdW0gPCBzbmFrZVBhcnRzLmxlbmd0aDsgKytwYXJ0TnVtKSB7XG4gICAgICAgICAgdmFyIHBhcnQgPSBzbmFrZVBhcnRzW3BhcnROdW1dO1xuXG4gICAgICAgICAgaWYgKHBhcnRzTWFwW3BhcnQueV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFydHNNYXBbcGFydC55XSA9IFtwYXJ0LnhdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJ0c01hcFtwYXJ0LnldLnB1c2gocGFydC54KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydHNNYXBLZXlzID0gT2JqZWN0LmtleXMocGFydHNNYXApO1xuXG4gICAgICAgIGZvciAodmFyIHBhcnRzTWFwS2V5TnVtID0gMDsgcGFydHNNYXBLZXlOdW0gPCBwYXJ0c01hcEtleXMubGVuZ3RoOyArK3BhcnRzTWFwS2V5TnVtKSB7XG4gICAgICAgICAgLy8gQ29ycmVzcG9uZHMgdG8geSBjb29yZGluYXRlcyBvZiBzbmFrZSBlbGVtZW50cyBjb250YWluZWQgaW4gYSBjdXJyZW50IGxpbmVcbiAgICAgICAgICB2YXIgeSA9IHBhcnRzTWFwS2V5c1twYXJ0c01hcEtleU51bV07XG5cbiAgICAgICAgICAvLyBwYXJ0c01hcExpbmVzIGNvbnRhaW5zIHggY29vcmRpbmF0ZXMgb2YgdGhlIHNuYWtlIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIHBhcnRzTWFwTGluZSA9IHBhcnRzTWFwW3ldO1xuXG4gICAgICAgICAgZm9yICh2YXIgY2hhck51bSA9IDA7IGNoYXJOdW0gPCBwYXJ0c01hcExpbmUubGVuZ3RoOyArK2NoYXJOdW0pIHtcbiAgICAgICAgICAgIHZhciB4ID0gcGFydHNNYXBMaW5lW2NoYXJOdW1dO1xuXG4gICAgICAgICAgICB2YXIgcGFydFBvc2l0aW9uID0gZ2V0VGV4dFBvc2l0aW9uKGZpZWxkLCB5LCB4KTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigwLCBwYXJ0UG9zaXRpb24pICsgXCJAXCIgKyB0ZXh0LnN1YnN0cihwYXJ0UG9zaXRpb24gKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBmaWVsZC5vbGRTbmFrZVRhaWwueCAhPT0gc25ha2VQYXJ0c1tzbmFrZVBhcnRzLmxlbmd0aCAtIDFdLnggfHxcbiAgICAgICAgICBmaWVsZC5vbGRTbmFrZVRhaWwueSAhPT0gc25ha2VQYXJ0c1tzbmFrZVBhcnRzLmxlbmd0aCAtIDFdLnlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFyIG9sZFRhaWxQb3NpdGlvbiA9IGdldFRleHRQb3NpdGlvbihmaWVsZCwgZmllbGQub2xkU25ha2VUYWlsLnksIGZpZWxkLm9sZFNuYWtlVGFpbC54KTtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMCwgb2xkVGFpbFBvc2l0aW9uKSArIFwiIFwiICsgdGV4dC5zdWJzdHIob2xkVGFpbFBvc2l0aW9uICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3SGVhZFBvc2l0aW9uID0gZ2V0VGV4dFBvc2l0aW9uKGZpZWxkLCBzbmFrZVBhcnRzWzBdLnksIHNuYWtlUGFydHNbMF0ueCk7XG4gICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigwLCBuZXdIZWFkUG9zaXRpb24pICsgXCJAXCIgKyB0ZXh0LnN1YnN0cihuZXdIZWFkUG9zaXRpb24gKyAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2F2ZSB0aGUgbmV3IG9sZCBzbmFrZSB0YWlsIGNvb3JkaW5hdGVzXG4gICAgICBmaWVsZC5vbGRTbmFrZVRhaWwueSA9IHNuYWtlUGFydHNbc25ha2VQYXJ0cy5sZW5ndGggLSAxXS55O1xuICAgICAgZmllbGQub2xkU25ha2VUYWlsLnggPSBzbmFrZVBhcnRzW3NuYWtlUGFydHMubGVuZ3RoIC0gMV0ueDtcblxuICAgICAgLy8gVE9ETzogdXNlIGdldHRlcnMvc2V0dGVycyB0byBhY2Nlc3MgdGhlIHByb3BlcnRpZXMgb2YgZmllbGRcbiAgICAgIGZpZWxkLnRleHQgPSB0ZXh0O1xuICAgIH07XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PUZJRUxEIENMQVNTIERFRklOSVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBGaWVsZCgpIHtcbiAgICAgIHRoaXMud2lkdGggPSBXSURUSDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gSEVJR0hUO1xuICAgICAgdGhpcy50ZXh0ID0gXCJcIjtcbiAgICAgIHRoaXMub2xkU25ha2VUYWlsID0ge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogLTFcbiAgICAgIH07XG5cbiAgICAgIGJ1aWxkVGV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICBGaWVsZC5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLndpZHRoO1xuICAgIH07XG5cbiAgICBGaWVsZC5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfTtcblxuICAgIEZpZWxkLnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBidWlsZFRleHQoZmllbGQpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIGhvcml6b250YWxCb3JkZXIgPSBcIlwiO1xuXG4gICAgICBmaWVsZC50ZXh0ID0gXCJcIjtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGZpZWxkLmdldFdpZHRoKCkgKyAyOyArK2kpIHtcbiAgICAgICAgaG9yaXpvbnRhbEJvcmRlciArPSBcIiNcIjtcbiAgICAgIH1cblxuICAgICAgZmllbGQudGV4dCArPSBob3Jpem9udGFsQm9yZGVyICsgXCJcXG5cIjtcblxuICAgICAgdmFyIGZpZWxkTGluZSA9IFwiI1wiO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGQuZ2V0V2lkdGgoKTsgKytpKSB7XG4gICAgICAgIGZpZWxkTGluZSArPSBcIiBcIjtcbiAgICAgIH1cblxuICAgICAgZmllbGRMaW5lICs9IFwiI1wiO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGQuZ2V0SGVpZ2h0KCk7ICsraSkge1xuICAgICAgICBmaWVsZC50ZXh0ICs9IGZpZWxkTGluZSArIFwiXFxuXCI7XG4gICAgICB9XG5cbiAgICAgIGZpZWxkLnRleHQgKz0gaG9yaXpvbnRhbEJvcmRlcjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGV4dCB3aXRoIHNuYWtlIGFuZCBhcHBsZVxuICAgIEZpZWxkLnByb3RvdHlwZS5nZXRGdWxsVGV4dCA9IGZ1bmN0aW9uKHNuYWtlLCBhcHBsZSkge1xuICAgICAgLy8gRHJhdyB0aGUgc25ha2VcbiAgICAgIHNuYWtlLmRyYXcodGhpcyk7XG5cbiAgICAgIHZhciB0ZXh0ID0gdGhpcy50ZXh0O1xuXG4gICAgICAvLyBQcmludCB0aGUgYXBwbGVcbiAgICAgIHZhciBhcHBsZVBvc2l0aW9uID0gZ2V0VGV4dFBvc2l0aW9uKHRoaXMsIGFwcGxlLnksIGFwcGxlLngpO1xuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKDAsIGFwcGxlUG9zaXRpb24pICsgXCIkXCIgKyB0ZXh0LnN1YnN0cihhcHBsZVBvc2l0aW9uICsgMSk7XG5cbiAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG5cbiAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFRleHRQb3NpdGlvbihmaWVsZCwgeSwgeCkge1xuICAgICAgcmV0dXJuIChmaWVsZC5nZXRXaWR0aCgpICsgMykgKiAoeSAqIDEgKyAxKSArIHggKiAxICsgMTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1HQU1FIENMQVNTIERFRklOSVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBHYW1lKCkge1xuICAgICAgdGhpcy5mcmFtZUlkID0gMDtcbiAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgdGhpcy5zdGF0dXMgPSBcIlByZXNzIFNQQUNFIHRvIHN0YXJ0XCI7XG4gICAgICB0aGlzLmZyYW1lSGVhZGVyID0gXCJcIjtcbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5maWVsZCA9IG5ldyBGaWVsZCgpO1xuICAgICAgdGhpcy5zbmFrZSA9IG5ldyBTbmFrZSgpO1xuICAgICAgdGhpcy5hcHBsZSA9IGdlbmVyYXRlQXBwbGUoKTtcbiAgICAgIHVwZGF0ZUZyYW1lSGVhZGVyKHRoaXMpO1xuICAgIH1cblxuICAgIEdhbWUucHJvdG90eXBlLmluY3JlbWVudEZyYW1lSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICsrdGhpcy5mcmFtZUlkO1xuICAgICAgaWYgKFRFU1QpIHtcbiAgICAgICAgdXBkYXRlRnJhbWVIZWFkZXIodGhpcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmdldEZyYW1lSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmZyYW1lSWQ7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmdldFNjb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuc2V0U3RhdHVzID0gZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIHVwZGF0ZUZyYW1lSGVhZGVyKHRoaXMpO1xuICAgIH07XG5cbiAgICBHYW1lLnByb3RvdHlwZS5nZXRTdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuc2V0UnVubmluZyA9IGZ1bmN0aW9uKHJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IHJ1bm5pbmc7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmlzUnVubmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucnVubmluZztcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuc2V0T3ZlciA9IGZ1bmN0aW9uKGdhbWVPdmVyKSB7XG4gICAgICB0aGlzLmdhbWVPdmVyID0gZ2FtZU92ZXI7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmlzT3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2FtZU92ZXI7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmluY3JlbWVudFNjb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICArK3RoaXMuc2NvcmU7XG4gICAgICB1cGRhdGVGcmFtZUhlYWRlcih0aGlzKTtcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuZ2V0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpZWxkO1xuICAgIH07XG5cbiAgICBHYW1lLnByb3RvdHlwZS5nZXRTbmFrZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc25ha2U7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmdldEFwcGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBsZTtcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuZHJvcEFwcGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmFwcGxlID0gZ2VuZXJhdGVBcHBsZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUFwcGxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogZ2V0UmFuZG9tSW50KDAsIFdJRFRIIC0gMSksXG4gICAgICAgIHk6IGdldFJhbmRvbUludCgwLCBIRUlHSFQgLSAxKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGcmFtZUhlYWRlcihnYW1lKSB7XG4gICAgICB2YXIgZnJhbWVIZWFkZXIgPSBcIlwiO1xuXG4gICAgICBmcmFtZUhlYWRlciArPSBcIkdhbWUgYnkgRGFuaWlsIEJlbHlha292XCI7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgSEVJR0hUOyArK2opIHtcbiAgICAgICAgZnJhbWVIZWFkZXIgKz0gXCJcXG5cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKFRFU1QpIHtcbiAgICAgICAgZnJhbWVIZWFkZXIgKz0gXCJGcmFtZTogXCIgKyBnYW1lLmdldEZyYW1lSWQoKTtcbiAgICAgICAgZnJhbWVIZWFkZXIgKz0gXCIgfCBcIjtcbiAgICAgIH1cblxuICAgICAgZnJhbWVIZWFkZXIgKz0gXCJTY29yZTogXCIgKyBnYW1lLmdldFNjb3JlKCk7XG4gICAgICBmcmFtZUhlYWRlciArPSBcIiB8IFwiICsgZ2FtZS5nZXRTdGF0dXMoKTtcblxuICAgICAgZ2FtZS5mcmFtZUhlYWRlciA9IGZyYW1lSGVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZyYW1lSGVhZGVyKGdhbWUpIHtcbiAgICAgIHJldHVybiBnYW1lLmZyYW1lSGVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByaW50RnJhbWVIZWFkZXIoZ2FtZSkge1xuICAgICAgdmFyIGZyYW1lSGVhZGVyID0gZ2V0RnJhbWVIZWFkZXIoZ2FtZSk7XG4gICAgICBjb25zb2xlLmxvZyhmcmFtZUhlYWRlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0ZpZWxkKGdhbWUpIHtcbiAgICAgIHZhciBmaWVsZCA9IGdhbWUuZ2V0RmllbGQoKTtcbiAgICAgIHZhciBzbmFrZSA9IGdhbWUuZ2V0U25ha2UoKTtcbiAgICAgIHZhciBhcHBsZSA9IGdhbWUuZ2V0QXBwbGUoKTtcbiAgICAgIHZhciBmaWVsZFRleHQgPSBmaWVsZC5nZXRGdWxsVGV4dChzbmFrZSwgYXBwbGUpO1xuICAgICAgY29uc29sZS5sb2coZmllbGRUZXh0KTtcbiAgICB9XG5cbiAgICBHYW1lLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmludEZyYW1lSGVhZGVyKHRoaXMpO1xuXG4gICAgICBkcmF3RmllbGQodGhpcyk7XG4gICAgfTtcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09R0FNRT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoKTtcbiAgICB2YXIgdGltZXJJZCA9IDA7XG4gICAgdmFyIG9sZFRpbWUsIG5ld1RpbWU7XG4gICAgb2xkVGltZSA9IGdldFVuaXhUaW1lTXMoKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gICAgICB0aW1lcklkID0gMDtcbiAgICAgIG9sZFRpbWUgPSAwO1xuICAgICAgbmV3VGltZSA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIHZhciBzbmFrZSA9IGdhbWUuZ2V0U25ha2UoKTtcbiAgICAgIHZhciBhcHBsZSA9IGdhbWUuZ2V0QXBwbGUoKTtcblxuICAgICAgbmV3VGltZSA9IGdldFVuaXhUaW1lTXMoKTtcblxuICAgICAgaWYgKG5ld1RpbWUgLSBvbGRUaW1lID49IEZSQU1FX0xFTkdUSCkge1xuICAgICAgICAvLyBNb3ZlIHRoZSBzbmFrZSBhbmQgZWF0IHRoZSBhcHBsZVxuICAgICAgICBzbmFrZS5tb3ZlKCk7XG4gICAgICAgIGlmIChzbmFrZS5lYXRBcHBsZShhcHBsZSkpIHtcbiAgICAgICAgICBnYW1lLmluY3JlbWVudFNjb3JlKCk7XG4gICAgICAgICAgZ2FtZS5kcm9wQXBwbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzbmFrZS5pc1N0dW5uZWQoKSkge1xuICAgICAgICAgIGdhbWUuc2V0U3RhdHVzKFwiR2FtZSBPdmVyISB8IFByZXNzIEVOVEVSIHRvIHJlc2V0XCIpO1xuICAgICAgICAgIGdhbWUuc2V0UnVubmluZyhmYWxzZSk7XG4gICAgICAgICAgZ2FtZS5zZXRPdmVyKHRydWUpO1xuICAgICAgICAgIC8vIERyYXcgdGhlIGZyYW1lXG4gICAgICAgICAgZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIERyYXcgdGhlIGZyYW1lXG4gICAgICAgICAgZ2FtZS5kcmF3KCk7XG5cbiAgICAgICAgICAvLyBJbmNyZWFzZSB0aGUgZnJhbWUgY291bnRlclxuICAgICAgICAgIGdhbWUuaW5jcmVtZW50RnJhbWVJZCgpO1xuICAgICAgICAgIHZhciBmcmFtZUlkID0gZ2FtZS5nZXRGcmFtZUlkKCk7XG4gICAgICAgICAgc25ha2UudXBkYXRlRnJhbWVJZChmcmFtZUlkKTtcbiAgICAgICAgICBpZiAoZnJhbWVJZCAlIDIwMCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnNvbGUgZXZlcnkgTiBmcmFtZXNcbiAgICAgICAgICAgIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAgICAgICAgIGdhbWUuZHJhdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9sZFRpbWUgPSBnZXRVbml4VGltZU1zKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnYW1lLmlzUnVubmluZygpKSB7XG4gICAgICAgIHRpbWVySWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aW1lcklkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGltZXJJZCk7XG4gICAgICBnYW1lLnNldFJ1bm5pbmcoZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgIHRpbWVySWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICBnYW1lLnNldFN0YXR1cyhcIlJ1bm5pbmcgfCBQcmVzcyBTUEFDRSB0byBwYXVzZVwiKTtcbiAgICAgIGdhbWUuc2V0UnVubmluZyh0cnVlKTtcbiAgICB9XG5cbiAgICBnYW1lLmRyYXcoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgaWYgKGdhbWUuaXNPdmVyKCkpIHtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICBnYW1lLmRyYXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgaWYgKCFnYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBpZiAoZ2FtZS5pc1J1bm5pbmcoKSkge1xuICAgICAgICAgICAgICB2YXIgc25ha2UgPSBnYW1lLmdldFNuYWtlKCk7XG4gICAgICAgICAgICAgIHNuYWtlLmJsb2NrRGlyZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgIGdhbWUuc2V0U3RhdHVzKFwiUGF1c2VkIHwgUHJlc3MgU1BBQ0UgdG8gY29udGludWVcIik7XG4gICAgICAgICAgICAgIGdhbWUuZHJhdygpO1xuICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==