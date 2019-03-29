/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SnakeService {
    constructor() { }
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
    snake() {
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
    }
}
SnakeService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] }
];
/** @nocollapse */
SnakeService.ctorParameters = () => [];
/** @nocollapse */ SnakeService.ngInjectableDef = i0.defineInjectable({ factory: function SnakeService_Factory() { return new SnakeService(); }, token: SnakeService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25ha2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tdWx0aS1tZWRpYS1hbGJ1bS1tYW5hZ2VtZW50LyIsInNvdXJjZXMiOlsibGliL3NoYXJlZC9lYXN0ZXJFZ2cvc25ha2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLFlBQVk7SUFDdkIsZ0JBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMEJoQixLQUFLOzs7OztZQUlDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsSUFBSSxNQUFNLENBQUMsMkJBQTJCOztZQUUxRixvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9COzs7Ozs7UUFFdEQsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUc7WUFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0QsQ0FBQzs7OztRQUVELFNBQVMsYUFBYTs7Z0JBQ2hCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7Ozs7WUFNRyxJQUFJLEdBQUcsS0FBSzs7O1lBR1osTUFBTSxHQUFHLEVBQUU7O1lBQ1gsS0FBSyxHQUFHLEVBQUU7OztZQUdWLEdBQUcsR0FBRyxFQUFFOzs7WUFHUixZQUFZLEdBQUcsSUFBSSxHQUFHLEdBQUc7OztZQUd6QixTQUFTLEdBQUc7WUFDZCxJQUFJLEVBQUUsQ0FBQztZQUNQLEVBQUUsRUFBRSxDQUFDO1lBQ0wsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQztTQUNSOzs7Ozs7O1FBS0QsU0FBUyxLQUFLO1lBQ1osc0NB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Q0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1FBQUUsVUFBUyxDQUFDO1lBQzdDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsS0FBSyxFQUFFO29CQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNqQixLQUFLLEVBQUUsQ0FBQzt3QkFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2I7b0JBQ0QsTUFBTTtnQkFDUixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7O2dDQUNoQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDM0IsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7NEJBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNaLElBQUksRUFBRSxDQUFDO3lCQUNSOzZCQUFNOzRCQUNMLEdBQUcsRUFBRSxDQUFDO3lCQUNQO3FCQUNGO29CQUNELE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTTthQUNUO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFobEJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBTbmFrZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gU3RhcnRpbmcgZnJvbSBEYW5paWwgQmVseWFrb3YgY29kZSBJIGFkYXB0ZWQgaXQgdG8gd29yayB3aXRoIFR5cGVzY3JpcHQvQW5ndWxhclxuICAvLyBIaXMgTGljZW5jZSBBZ3JlZW1lbnRcbiAgLy8gIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICAvL1xuICAvLyAgQ29weXJpZ2h0IChjKSAyMDE1IERhbmlpbCBCZWx5YWtvdlxuICAvL1xuICAvLyAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICAvLyAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICAvLyAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICAvLyAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICAvLyAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gIC8vICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAvL1xuICAvLyAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gIC8vICBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICAvL1xuICAvLyAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICAvLyAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gIC8vICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAgLy8gIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAgLy8gIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gIC8vICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICAvLyAgU09GVFdBUkUuXG5cbiAgc25ha2UoKSB7XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1VVElMSVRJRVM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICAgIHZhciBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VW5peFRpbWVNcygpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUNPTlNUQU5UUz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBUZXN0IG1vZGUgc3dpdGNoZXJcbiAgICB2YXIgVEVTVCA9IGZhbHNlO1xuXG4gICAgLy8gRGltZW5zaW9ucyBvZiB0aGUgc25ha2UgZmllbGRcbiAgICB2YXIgSEVJR0hUID0gMjA7XG4gICAgdmFyIFdJRFRIID0gNDA7XG5cbiAgICAvLyBBbW91bnQgb2YgZnJhbWVzIHBlciBzZWNvbmQgYWxzbyBkZWZpbmluZyB0aGUgc25ha2UgbW92aW5nIHNwZWVkXG4gICAgdmFyIEZQUyA9IDE1O1xuXG4gICAgLy8gVGhlIGZyYW1lIGxlbmd0aCBwYXJhbWV0ZXIgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHBhdXNlIGJldHdlZW4gZnJhbWVzXG4gICAgdmFyIEZSQU1FX0xFTkdUSCA9IDEwMDAgLyBGUFM7XG5cbiAgICAvLyBFbnVtZXJhdGVkIHZhbHVlcyBkZXNjcmliaW5nIGRpcmVjdGlvbnMgb2YgdGhlIHNuYWtlIG1vdmVtZW50XG4gICAgdmFyIERJUkVDVElPTiA9IHtcbiAgICAgIExFRlQ6IDAsXG4gICAgICBVUDogMSxcbiAgICAgIFJJR0hUOiAyLFxuICAgICAgRE9XTjogM1xuICAgIH07XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PVNOQUtFIENMQVNTIERFRklOSVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBTbmFrZSgpIHtcbiAgICAgIC8vIEFycmF5IG9mIGNvb3JkaW5hdGVzIG9mIHNuYWtlIHBhcnRzXG4gICAgICB0aGlzLnBhcnRzID0gW107XG5cbiAgICAgIC8vIFNpemUgb2YgdGhlIGZpZWxkIGluIHdoaWNoIHRoZSBzbmFrZSBsaXZlc1xuICAgICAgdGhpcy5ob21lV2lkdGggPSBXSURUSDtcbiAgICAgIHRoaXMuaG9tZUhlaWdodCA9IEhFSUdIVDtcblxuICAgICAgLy8gRGlyZWN0aW9uIG9mIHRoZSBzbmFrZVxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBESVJFQ1RJT04uUklHSFQ7XG5cbiAgICAgIC8vIEluZGljYXRvciBvZiBzbmFrZSBiZWluZyBzdHVubmVkXG4gICAgICB0aGlzLnN0dW5uZWQgPSBmYWxzZTtcblxuICAgICAgLy8gSUQgb2YgdGhlIGxhc3QgZnJhbWUgdGhlIHNuYWtlIHdhcyB1cGRhdGVkXG4gICAgICB0aGlzLmZyYW1lSWQgPSAwO1xuXG4gICAgICAvLyBJRCBvZiB0aGUgbGFzdCBmcmFtZSB0aGUgc25ha2UgY2hhbmdlZCBpdHMgZGlyZWN0aW9uc1xuICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uQ2hhbmdlRnJhbWVJZCA9IDA7XG5cbiAgICAgIC8vIEJ1aWxkIHRoZSBpbml0aWFsIHNuYWtlIGluIHRoZSBtaWRkbGUgb2YgaXRzIGhvbWVcbiAgICAgIHZhciBtaWRZID0gdGhpcy5ob21lSGVpZ2h0IC8gMi4wO1xuICAgICAgdmFyIG1pZFggPSB0aGlzLmhvbWVXaWR0aCAvIDIuMDtcbiAgICAgIGFkZFBhcnQodGhpcywgbWlkWSwgbWlkWCArIDIuMCk7XG4gICAgICBhZGRQYXJ0KHRoaXMsIG1pZFksIG1pZFggKyAxLjApO1xuICAgICAgYWRkUGFydCh0aGlzLCBtaWRZLCBtaWRYKTtcbiAgICAgIGFkZFBhcnQodGhpcywgbWlkWSwgbWlkWCAtIDEuMCk7XG4gICAgICBhZGRQYXJ0KHRoaXMsIG1pZFksIG1pZFggLSAyLjApO1xuXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzbmFrZSBtb3ZlbWVudFxuICAgICAgYWRkTW92ZW1lbnRMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc25ha2UgbW92ZW1lbnQ7IHRoZSBsaXN0ZW5lciByZXNwb25kcyB0byB0aGVcbiAgICAvLyBrZXkgcHJlc3NlcyBhbmQgdXBkYXRlcyB0aGUgc25ha2UgZGlyZWN0aW9uIGFjY29yZGluZ2x5LCBidXQgbm90IG1vcmUgb2Z0ZW5cbiAgICAvLyB0aGFuIG9uY2UgcGVyIGZyYW1lLlxuICAgIGZ1bmN0aW9uIGFkZE1vdmVtZW50TGlzdGVuZXIoc25ha2UpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIG9sZERpcmVjdGlvbiA9IHNuYWtlLmRpcmVjdGlvbjtcblxuICAgICAgICBpZiAoc25ha2UubGFzdERpcmVjdGlvbkNoYW5nZUZyYW1lSWQgPCBzbmFrZS5mcmFtZUlkKSB7XG4gICAgICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgIGlmIChzbmFrZS5kaXJlY3Rpb24gIT09IERJUkVDVElPTi5SSUdIVCkge1xuICAgICAgICAgICAgICAgIHNuYWtlLmRpcmVjdGlvbiA9IERJUkVDVElPTi5MRUZUO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgaWYgKHNuYWtlLmRpcmVjdGlvbiAhPT0gRElSRUNUSU9OLkRPV04pIHtcbiAgICAgICAgICAgICAgICBzbmFrZS5kaXJlY3Rpb24gPSBESVJFQ1RJT04uVVA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICBpZiAoc25ha2UuZGlyZWN0aW9uICE9PSBESVJFQ1RJT04uTEVGVCkge1xuICAgICAgICAgICAgICAgIHNuYWtlLmRpcmVjdGlvbiA9IERJUkVDVElPTi5SSUdIVDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgIGlmIChzbmFrZS5kaXJlY3Rpb24gIT09IERJUkVDVElPTi5VUCkge1xuICAgICAgICAgICAgICAgIHNuYWtlLmRpcmVjdGlvbiA9IERJUkVDVElPTi5ET1dOO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZERpcmVjdGlvbiAhPT0gc25ha2UuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgc25ha2UubGFzdERpcmVjdGlvbkNoYW5nZUZyYW1lSWQgPSBzbmFrZS5mcmFtZUlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYSBuZXcgcGFydCB3aXRoIGEgZ2l2ZW4gKHksIHgpIGxvY2F0aW9uXG4gICAgZnVuY3Rpb24gYWRkUGFydChzbmFrZSwgeSwgeCkge1xuICAgICAgc25ha2UucGFydHMucHVzaCh7XG4gICAgICAgIHk6IHksXG4gICAgICAgIHg6IHhcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXBwbGVFYXRhYmxlKHNuYWtlLCBhcHBsZSkge1xuICAgICAgdmFyIHBhcnRzID0gc25ha2UuZ2V0UGFydHMoKTtcbiAgICAgIHZhciBoZWFkID0gcGFydHNbMF07XG5cbiAgICAgIHJldHVybiBoZWFkLnggPT09IGFwcGxlLnggJiYgaGVhZC55ID09PSBhcHBsZS55O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlY29tZVN0dW5uZWQoc25ha2UpIHtcbiAgICAgIHNuYWtlLnN0dW5uZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIFNuYWtlLnByb3RvdHlwZS5ibG9ja0RpcmVjdGlvbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uQ2hhbmdlRnJhbWVJZCA9IHRoaXMuZnJhbWVJZDtcbiAgICB9O1xuXG4gICAgU25ha2UucHJvdG90eXBlLnVwZGF0ZUZyYW1lSWQgPSBmdW5jdGlvbihmcmFtZUlkKSB7XG4gICAgICB0aGlzLmZyYW1lSWQgPSBmcmFtZUlkO1xuICAgIH07XG5cbiAgICBTbmFrZS5wcm90b3R5cGUuaXNTdHVubmVkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHVubmVkO1xuICAgIH07XG5cbiAgICBTbmFrZS5wcm90b3R5cGUuZWF0QXBwbGUgPSBmdW5jdGlvbihhcHBsZSkge1xuICAgICAgdmFyIHBhcnRzID0gdGhpcy5nZXRQYXJ0cygpO1xuICAgICAgdmFyIHRhaWwgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGlzQXBwbGVFYXRhYmxlKHRoaXMsIGFwcGxlKSkge1xuICAgICAgICBhZGRQYXJ0KHRoaXMsIHRhaWwueSwgdGFpbC54KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgU25ha2UucHJvdG90eXBlLmdldFBhcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJ0cztcbiAgICB9O1xuXG4gICAgU25ha2UucHJvdG90eXBlLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uO1xuICAgIH07XG5cbiAgICBTbmFrZS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBhcnRzID0gdGhpcy5nZXRQYXJ0cygpO1xuICAgICAgdmFyIGhlYWQgPSBwYXJ0c1swXTtcbiAgICAgIHZhciBwYXJ0SWQ7XG5cbiAgICAgIGZvciAocGFydElkID0gcGFydHMubGVuZ3RoIC0gMTsgMCA8IHBhcnRJZDsgLS1wYXJ0SWQpIHtcbiAgICAgICAgcGFydHNbcGFydElkXS54ID0gcGFydHNbcGFydElkIC0gMV0ueDtcbiAgICAgICAgcGFydHNbcGFydElkXS55ID0gcGFydHNbcGFydElkIC0gMV0ueTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGhlYWRcbiAgICAgIHN3aXRjaCAodGhpcy5nZXREaXJlY3Rpb24oKSkge1xuICAgICAgICBjYXNlIERJUkVDVElPTi5MRUZUOlxuICAgICAgICAgIGhlYWQueCA9IChoZWFkLnggLSAxICsgdGhpcy5ob21lV2lkdGgpICUgdGhpcy5ob21lV2lkdGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRElSRUNUSU9OLlVQOlxuICAgICAgICAgIGhlYWQueSA9IChoZWFkLnkgLSAxICsgdGhpcy5ob21lSGVpZ2h0KSAlIHRoaXMuaG9tZUhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBESVJFQ1RJT04uUklHSFQ6XG4gICAgICAgICAgaGVhZC54ID0gKGhlYWQueCArIDEgKyB0aGlzLmhvbWVXaWR0aCkgJSB0aGlzLmhvbWVXaWR0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBESVJFQ1RJT04uRE9XTjpcbiAgICAgICAgICBoZWFkLnkgPSAoaGVhZC55ICsgMSArIHRoaXMuaG9tZUhlaWdodCkgJSB0aGlzLmhvbWVIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZvciAocGFydElkID0gMTsgcGFydElkIDwgcGFydHMubGVuZ3RoOyArK3BhcnRJZCkge1xuICAgICAgICBpZiAoaGVhZC54ID09PSBwYXJ0c1twYXJ0SWRdLnggJiYgaGVhZC55ID09PSBwYXJ0c1twYXJ0SWRdLnkpIHtcbiAgICAgICAgICBiZWNvbWVTdHVubmVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIERyYXcgdGhlIHNuYWtlIG9uIGEgZmllbGRcbiAgICBTbmFrZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgdGV4dCA9IGZpZWxkLmdldFRleHQoKTtcblxuICAgICAgLy8gQnVpbGQgYSBzbmFrZSBwYXJ0cyBtYXBcbiAgICAgIHZhciBzbmFrZVBhcnRzID0gdGhpcy5nZXRQYXJ0cygpO1xuXG4gICAgICAvLyBJZiB0aGUgb2xkIGFwcGxlIGNvb3JkaW5hdGUgaXMgbmVnYXRpdmUgdGhlbiBubyBhcHBsZSBoYXMgZXZlciBiZWVuIHNwYXduZWRcbiAgICAgIGlmIChmaWVsZC5vbGRTbmFrZVRhaWwueCA8IDApIHtcbiAgICAgICAgLy8gRnVsbCB2ZXJzaW9uIG9mIHRoZSBtZXRob2RcbiAgICAgICAgdmFyIHBhcnRzTWFwID0ge307XG5cbiAgICAgICAgZm9yICh2YXIgcGFydE51bSA9IDA7IHBhcnROdW0gPCBzbmFrZVBhcnRzLmxlbmd0aDsgKytwYXJ0TnVtKSB7XG4gICAgICAgICAgdmFyIHBhcnQgPSBzbmFrZVBhcnRzW3BhcnROdW1dO1xuXG4gICAgICAgICAgaWYgKHBhcnRzTWFwW3BhcnQueV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFydHNNYXBbcGFydC55XSA9IFtwYXJ0LnhdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJ0c01hcFtwYXJ0LnldLnB1c2gocGFydC54KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFydHNNYXBLZXlzID0gT2JqZWN0LmtleXMocGFydHNNYXApO1xuXG4gICAgICAgIGZvciAodmFyIHBhcnRzTWFwS2V5TnVtID0gMDsgcGFydHNNYXBLZXlOdW0gPCBwYXJ0c01hcEtleXMubGVuZ3RoOyArK3BhcnRzTWFwS2V5TnVtKSB7XG4gICAgICAgICAgLy8gQ29ycmVzcG9uZHMgdG8geSBjb29yZGluYXRlcyBvZiBzbmFrZSBlbGVtZW50cyBjb250YWluZWQgaW4gYSBjdXJyZW50IGxpbmVcbiAgICAgICAgICB2YXIgeSA9IHBhcnRzTWFwS2V5c1twYXJ0c01hcEtleU51bV07XG5cbiAgICAgICAgICAvLyBwYXJ0c01hcExpbmVzIGNvbnRhaW5zIHggY29vcmRpbmF0ZXMgb2YgdGhlIHNuYWtlIGVsZW1lbnRzXG4gICAgICAgICAgdmFyIHBhcnRzTWFwTGluZSA9IHBhcnRzTWFwW3ldO1xuXG4gICAgICAgICAgZm9yICh2YXIgY2hhck51bSA9IDA7IGNoYXJOdW0gPCBwYXJ0c01hcExpbmUubGVuZ3RoOyArK2NoYXJOdW0pIHtcbiAgICAgICAgICAgIHZhciB4ID0gcGFydHNNYXBMaW5lW2NoYXJOdW1dO1xuXG4gICAgICAgICAgICB2YXIgcGFydFBvc2l0aW9uID0gZ2V0VGV4dFBvc2l0aW9uKGZpZWxkLCB5LCB4KTtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigwLCBwYXJ0UG9zaXRpb24pICsgXCJAXCIgKyB0ZXh0LnN1YnN0cihwYXJ0UG9zaXRpb24gKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBmaWVsZC5vbGRTbmFrZVRhaWwueCAhPT0gc25ha2VQYXJ0c1tzbmFrZVBhcnRzLmxlbmd0aCAtIDFdLnggfHxcbiAgICAgICAgICBmaWVsZC5vbGRTbmFrZVRhaWwueSAhPT0gc25ha2VQYXJ0c1tzbmFrZVBhcnRzLmxlbmd0aCAtIDFdLnlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFyIG9sZFRhaWxQb3NpdGlvbiA9IGdldFRleHRQb3NpdGlvbihmaWVsZCwgZmllbGQub2xkU25ha2VUYWlsLnksIGZpZWxkLm9sZFNuYWtlVGFpbC54KTtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMCwgb2xkVGFpbFBvc2l0aW9uKSArIFwiIFwiICsgdGV4dC5zdWJzdHIob2xkVGFpbFBvc2l0aW9uICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3SGVhZFBvc2l0aW9uID0gZ2V0VGV4dFBvc2l0aW9uKGZpZWxkLCBzbmFrZVBhcnRzWzBdLnksIHNuYWtlUGFydHNbMF0ueCk7XG4gICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigwLCBuZXdIZWFkUG9zaXRpb24pICsgXCJAXCIgKyB0ZXh0LnN1YnN0cihuZXdIZWFkUG9zaXRpb24gKyAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2F2ZSB0aGUgbmV3IG9sZCBzbmFrZSB0YWlsIGNvb3JkaW5hdGVzXG4gICAgICBmaWVsZC5vbGRTbmFrZVRhaWwueSA9IHNuYWtlUGFydHNbc25ha2VQYXJ0cy5sZW5ndGggLSAxXS55O1xuICAgICAgZmllbGQub2xkU25ha2VUYWlsLnggPSBzbmFrZVBhcnRzW3NuYWtlUGFydHMubGVuZ3RoIC0gMV0ueDtcblxuICAgICAgLy8gVE9ETzogdXNlIGdldHRlcnMvc2V0dGVycyB0byBhY2Nlc3MgdGhlIHByb3BlcnRpZXMgb2YgZmllbGRcbiAgICAgIGZpZWxkLnRleHQgPSB0ZXh0O1xuICAgIH07XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PUZJRUxEIENMQVNTIERFRklOSVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBGaWVsZCgpIHtcbiAgICAgIHRoaXMud2lkdGggPSBXSURUSDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gSEVJR0hUO1xuICAgICAgdGhpcy50ZXh0ID0gXCJcIjtcbiAgICAgIHRoaXMub2xkU25ha2VUYWlsID0ge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogLTFcbiAgICAgIH07XG5cbiAgICAgIGJ1aWxkVGV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICBGaWVsZC5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLndpZHRoO1xuICAgIH07XG5cbiAgICBGaWVsZC5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfTtcblxuICAgIEZpZWxkLnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBidWlsZFRleHQoZmllbGQpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIGhvcml6b250YWxCb3JkZXIgPSBcIlwiO1xuXG4gICAgICBmaWVsZC50ZXh0ID0gXCJcIjtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGZpZWxkLmdldFdpZHRoKCkgKyAyOyArK2kpIHtcbiAgICAgICAgaG9yaXpvbnRhbEJvcmRlciArPSBcIiNcIjtcbiAgICAgIH1cblxuICAgICAgZmllbGQudGV4dCArPSBob3Jpem9udGFsQm9yZGVyICsgXCJcXG5cIjtcblxuICAgICAgdmFyIGZpZWxkTGluZSA9IFwiI1wiO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGQuZ2V0V2lkdGgoKTsgKytpKSB7XG4gICAgICAgIGZpZWxkTGluZSArPSBcIiBcIjtcbiAgICAgIH1cblxuICAgICAgZmllbGRMaW5lICs9IFwiI1wiO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGQuZ2V0SGVpZ2h0KCk7ICsraSkge1xuICAgICAgICBmaWVsZC50ZXh0ICs9IGZpZWxkTGluZSArIFwiXFxuXCI7XG4gICAgICB9XG5cbiAgICAgIGZpZWxkLnRleHQgKz0gaG9yaXpvbnRhbEJvcmRlcjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGV4dCB3aXRoIHNuYWtlIGFuZCBhcHBsZVxuICAgIEZpZWxkLnByb3RvdHlwZS5nZXRGdWxsVGV4dCA9IGZ1bmN0aW9uKHNuYWtlLCBhcHBsZSkge1xuICAgICAgLy8gRHJhdyB0aGUgc25ha2VcbiAgICAgIHNuYWtlLmRyYXcodGhpcyk7XG5cbiAgICAgIHZhciB0ZXh0ID0gdGhpcy50ZXh0O1xuXG4gICAgICAvLyBQcmludCB0aGUgYXBwbGVcbiAgICAgIHZhciBhcHBsZVBvc2l0aW9uID0gZ2V0VGV4dFBvc2l0aW9uKHRoaXMsIGFwcGxlLnksIGFwcGxlLngpO1xuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKDAsIGFwcGxlUG9zaXRpb24pICsgXCIkXCIgKyB0ZXh0LnN1YnN0cihhcHBsZVBvc2l0aW9uICsgMSk7XG5cbiAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG5cbiAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFRleHRQb3NpdGlvbihmaWVsZCwgeSwgeCkge1xuICAgICAgcmV0dXJuIChmaWVsZC5nZXRXaWR0aCgpICsgMykgKiAoeSAqIDEgKyAxKSArIHggKiAxICsgMTtcbiAgICB9XG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1HQU1FIENMQVNTIERFRklOSVRJT049PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBmdW5jdGlvbiBHYW1lKCkge1xuICAgICAgdGhpcy5mcmFtZUlkID0gMDtcbiAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgdGhpcy5zdGF0dXMgPSBcIlByZXNzIFNQQUNFIHRvIHN0YXJ0XCI7XG4gICAgICB0aGlzLmZyYW1lSGVhZGVyID0gXCJcIjtcbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5maWVsZCA9IG5ldyBGaWVsZCgpO1xuICAgICAgdGhpcy5zbmFrZSA9IG5ldyBTbmFrZSgpO1xuICAgICAgdGhpcy5hcHBsZSA9IGdlbmVyYXRlQXBwbGUoKTtcbiAgICAgIHVwZGF0ZUZyYW1lSGVhZGVyKHRoaXMpO1xuICAgIH1cblxuICAgIEdhbWUucHJvdG90eXBlLmluY3JlbWVudEZyYW1lSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICsrdGhpcy5mcmFtZUlkO1xuICAgICAgaWYgKFRFU1QpIHtcbiAgICAgICAgdXBkYXRlRnJhbWVIZWFkZXIodGhpcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmdldEZyYW1lSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmZyYW1lSWQ7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmdldFNjb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuc2V0U3RhdHVzID0gZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIHVwZGF0ZUZyYW1lSGVhZGVyKHRoaXMpO1xuICAgIH07XG5cbiAgICBHYW1lLnByb3RvdHlwZS5nZXRTdGF0dXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuc2V0UnVubmluZyA9IGZ1bmN0aW9uKHJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IHJ1bm5pbmc7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmlzUnVubmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucnVubmluZztcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuc2V0T3ZlciA9IGZ1bmN0aW9uKGdhbWVPdmVyKSB7XG4gICAgICB0aGlzLmdhbWVPdmVyID0gZ2FtZU92ZXI7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmlzT3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2FtZU92ZXI7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmluY3JlbWVudFNjb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICArK3RoaXMuc2NvcmU7XG4gICAgICB1cGRhdGVGcmFtZUhlYWRlcih0aGlzKTtcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuZ2V0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpZWxkO1xuICAgIH07XG5cbiAgICBHYW1lLnByb3RvdHlwZS5nZXRTbmFrZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc25ha2U7XG4gICAgfTtcblxuICAgIEdhbWUucHJvdG90eXBlLmdldEFwcGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBsZTtcbiAgICB9O1xuXG4gICAgR2FtZS5wcm90b3R5cGUuZHJvcEFwcGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmFwcGxlID0gZ2VuZXJhdGVBcHBsZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUFwcGxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogZ2V0UmFuZG9tSW50KDAsIFdJRFRIIC0gMSksXG4gICAgICAgIHk6IGdldFJhbmRvbUludCgwLCBIRUlHSFQgLSAxKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVGcmFtZUhlYWRlcihnYW1lKSB7XG4gICAgICB2YXIgZnJhbWVIZWFkZXIgPSBcIlwiO1xuXG4gICAgICBmcmFtZUhlYWRlciArPSBcIkdhbWUgYnkgRGFuaWlsIEJlbHlha292XCI7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgSEVJR0hUOyArK2opIHtcbiAgICAgICAgZnJhbWVIZWFkZXIgKz0gXCJcXG5cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKFRFU1QpIHtcbiAgICAgICAgZnJhbWVIZWFkZXIgKz0gXCJGcmFtZTogXCIgKyBnYW1lLmdldEZyYW1lSWQoKTtcbiAgICAgICAgZnJhbWVIZWFkZXIgKz0gXCIgfCBcIjtcbiAgICAgIH1cblxuICAgICAgZnJhbWVIZWFkZXIgKz0gXCJTY29yZTogXCIgKyBnYW1lLmdldFNjb3JlKCk7XG4gICAgICBmcmFtZUhlYWRlciArPSBcIiB8IFwiICsgZ2FtZS5nZXRTdGF0dXMoKTtcblxuICAgICAgZ2FtZS5mcmFtZUhlYWRlciA9IGZyYW1lSGVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZyYW1lSGVhZGVyKGdhbWUpIHtcbiAgICAgIHJldHVybiBnYW1lLmZyYW1lSGVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByaW50RnJhbWVIZWFkZXIoZ2FtZSkge1xuICAgICAgdmFyIGZyYW1lSGVhZGVyID0gZ2V0RnJhbWVIZWFkZXIoZ2FtZSk7XG4gICAgICBjb25zb2xlLmxvZyhmcmFtZUhlYWRlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0ZpZWxkKGdhbWUpIHtcbiAgICAgIHZhciBmaWVsZCA9IGdhbWUuZ2V0RmllbGQoKTtcbiAgICAgIHZhciBzbmFrZSA9IGdhbWUuZ2V0U25ha2UoKTtcbiAgICAgIHZhciBhcHBsZSA9IGdhbWUuZ2V0QXBwbGUoKTtcbiAgICAgIHZhciBmaWVsZFRleHQgPSBmaWVsZC5nZXRGdWxsVGV4dChzbmFrZSwgYXBwbGUpO1xuICAgICAgY29uc29sZS5sb2coZmllbGRUZXh0KTtcbiAgICB9XG5cbiAgICBHYW1lLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmludEZyYW1lSGVhZGVyKHRoaXMpO1xuXG4gICAgICBkcmF3RmllbGQodGhpcyk7XG4gICAgfTtcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09R0FNRT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoKTtcbiAgICB2YXIgdGltZXJJZCA9IDA7XG4gICAgdmFyIG9sZFRpbWUsIG5ld1RpbWU7XG4gICAgb2xkVGltZSA9IGdldFVuaXhUaW1lTXMoKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gICAgICB0aW1lcklkID0gMDtcbiAgICAgIG9sZFRpbWUgPSAwO1xuICAgICAgbmV3VGltZSA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIHZhciBzbmFrZSA9IGdhbWUuZ2V0U25ha2UoKTtcbiAgICAgIHZhciBhcHBsZSA9IGdhbWUuZ2V0QXBwbGUoKTtcblxuICAgICAgbmV3VGltZSA9IGdldFVuaXhUaW1lTXMoKTtcblxuICAgICAgaWYgKG5ld1RpbWUgLSBvbGRUaW1lID49IEZSQU1FX0xFTkdUSCkge1xuICAgICAgICAvLyBNb3ZlIHRoZSBzbmFrZSBhbmQgZWF0IHRoZSBhcHBsZVxuICAgICAgICBzbmFrZS5tb3ZlKCk7XG4gICAgICAgIGlmIChzbmFrZS5lYXRBcHBsZShhcHBsZSkpIHtcbiAgICAgICAgICBnYW1lLmluY3JlbWVudFNjb3JlKCk7XG4gICAgICAgICAgZ2FtZS5kcm9wQXBwbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzbmFrZS5pc1N0dW5uZWQoKSkge1xuICAgICAgICAgIGdhbWUuc2V0U3RhdHVzKFwiR2FtZSBPdmVyISB8IFByZXNzIEVOVEVSIHRvIHJlc2V0XCIpO1xuICAgICAgICAgIGdhbWUuc2V0UnVubmluZyhmYWxzZSk7XG4gICAgICAgICAgZ2FtZS5zZXRPdmVyKHRydWUpO1xuICAgICAgICAgIC8vIERyYXcgdGhlIGZyYW1lXG4gICAgICAgICAgZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIERyYXcgdGhlIGZyYW1lXG4gICAgICAgICAgZ2FtZS5kcmF3KCk7XG5cbiAgICAgICAgICAvLyBJbmNyZWFzZSB0aGUgZnJhbWUgY291bnRlclxuICAgICAgICAgIGdhbWUuaW5jcmVtZW50RnJhbWVJZCgpO1xuICAgICAgICAgIHZhciBmcmFtZUlkID0gZ2FtZS5nZXRGcmFtZUlkKCk7XG4gICAgICAgICAgc25ha2UudXBkYXRlRnJhbWVJZChmcmFtZUlkKTtcbiAgICAgICAgICBpZiAoZnJhbWVJZCAlIDIwMCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnNvbGUgZXZlcnkgTiBmcmFtZXNcbiAgICAgICAgICAgIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAgICAgICAgIGdhbWUuZHJhdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9sZFRpbWUgPSBnZXRVbml4VGltZU1zKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnYW1lLmlzUnVubmluZygpKSB7XG4gICAgICAgIHRpbWVySWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aW1lcklkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGltZXJJZCk7XG4gICAgICBnYW1lLnNldFJ1bm5pbmcoZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgIHRpbWVySWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICBnYW1lLnNldFN0YXR1cyhcIlJ1bm5pbmcgfCBQcmVzcyBTUEFDRSB0byBwYXVzZVwiKTtcbiAgICAgIGdhbWUuc2V0UnVubmluZyh0cnVlKTtcbiAgICB9XG5cbiAgICBnYW1lLmRyYXcoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgaWYgKGdhbWUuaXNPdmVyKCkpIHtcbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICBnYW1lLmRyYXcoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgaWYgKCFnYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBpZiAoZ2FtZS5pc1J1bm5pbmcoKSkge1xuICAgICAgICAgICAgICB2YXIgc25ha2UgPSBnYW1lLmdldFNuYWtlKCk7XG4gICAgICAgICAgICAgIHNuYWtlLmJsb2NrRGlyZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgIGdhbWUuc2V0U3RhdHVzKFwiUGF1c2VkIHwgUHJlc3MgU1BBQ0UgdG8gY29udGludWVcIik7XG4gICAgICAgICAgICAgIGdhbWUuZHJhdygpO1xuICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==