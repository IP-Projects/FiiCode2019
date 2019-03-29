import { APP_BASE_HREF } from '@angular/common';
import { PdfModuleModule } from '@multimedia-album-management/extras/pdf-module';
import { SvgModuleModule } from '@multimedia-album-management/extras/svg-module';
import { YoutubeModuleModule } from '@multimedia-album-management/extras/youtube-module';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as Hammer from 'hammerjs';
import { Pan, DIRECTION_ALL } from 'hammerjs';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SpeechService, SpeechModule } from 'ngx-speech';
import { EMPTY, Subject } from 'rxjs';
import * as $_ from 'jquery';
import { getDocument } from 'pdfjs-dist';
import { catchError, map, take, takeUntil } from 'rxjs/operators';
import { Component, Injectable, NgModule, Pipe, Input, EventEmitter, Output, HostListener, defineInjectable, inject } from '@angular/core';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMultiMediaAlbumManagementComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
NgxMultiMediaAlbumManagementComponent.decorators = [
    { type: Component, args: [{
                selector: "app-ngx-MultiMediaAlbumManagement",
                template: `
    <router-outlet></router-outlet>
  `
            }] }
];
/** @nocollapse */
NgxMultiMediaAlbumManagementComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ApiService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getData(url) {
        return this.http.get(url);
    }
    /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    postData(url, data) {
        return this.http.post(url, data);
    }
    /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    putData(url, data) {
        return this.http.put(url, data);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    deleteData(url) {
        return this.http.delete(url);
    }
}
ApiService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] }
];
/** @nocollapse */
ApiService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient)); }, token: ApiService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SnakeService {
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
/** @nocollapse */ SnakeService.ngInjectableDef = defineInjectable({ factory: function SnakeService_Factory() { return new SnakeService(); }, token: SnakeService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FloatingMicrophoneService {
    constructor() { }
    // if it doesn't work right, remove touch events and uncomment prevent default
    /**
     * @param {?} speechComponent
     * @return {?}
     */
    makeFloatingMicrophone(speechComponent) {
        /** @type {?} */
        var elem = document.getElementById("floatingMicrophone");
        /** @type {?} */
        var moveFlag = false;
        /** @type {?} */
        var speech = speechComponent;
        /** @type {?} */
        var pos1 = 0;
        /** @type {?} */
        var pos2 = 0;
        /** @type {?} */
        var pos3 = 0;
        /** @type {?} */
        var pos4 = 0;
        elem.style.top = window.innerHeight - 75 + "px";
        elem.style.left = window.innerWidth - 75 + "px";
        if (elem) {
            elem.onmousedown = dragMouseDown;
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.touchInputsListeners();
        }
        /**
         * @return {?}
         */
        function toggleMic() {
            if (elem.classList.contains("notRecording")) {
                elem.classList.remove("notRecording");
                elem.classList.add("recording");
                speech.start();
            }
            else {
                elem.classList.remove("recording");
                elem.classList.add("notRecording");
                speech.stop();
            }
        }
        /**
         * @param {?} e
         * @return {?}
         */
        function dragMouseDown(e) {
            moveFlag = false;
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        /**
         * @param {?} e
         * @return {?}
         */
        function elementDrag(e) {
            moveFlag = true;
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elem.style.top = elem.offsetTop - pos2 + "px";
            elem.style.left = elem.offsetLeft - pos1 + "px";
        }
        /**
         * @return {?}
         */
        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            if (moveFlag == false) {
                toggleMic();
            }
        }
    }
    /**
     * @return {?}
     */
    touchInputsListeners() {
        /** @type {?} */
        var elem = document.getElementById("floatingMicrophone");
        /** @type {?} */
        var mc = new Hammer(elem);
        mc.add(new Pan({ direction: DIRECTION_ALL, threshold: 0 }));
        mc.on("pan", handleDrag);
        // drag event
        /** @type {?} */
        var lastPosX = 0;
        /** @type {?} */
        var lastPosY = 0;
        /** @type {?} */
        var isDragging = false;
        /**
         * @param {?} ev
         * @return {?}
         */
        function handleDrag(ev) {
            if (!isDragging) {
                isDragging = true;
                lastPosX = elem.offsetLeft;
                lastPosY = elem.offsetTop;
            }
            /** @type {?} */
            var posX = ev.deltaX + lastPosX;
            /** @type {?} */
            var posY = ev.deltaY + lastPosY;
            elem.style.left = posX + "px";
            elem.style.top = posY + "px";
            if (ev.isFinal) {
                isDragging = false;
            }
        }
    }
}
FloatingMicrophoneService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] }
];
/** @nocollapse */
FloatingMicrophoneService.ctorParameters = () => [];
/** @nocollapse */ FloatingMicrophoneService.ngInjectableDef = defineInjectable({ factory: function FloatingMicrophoneService_Factory() { return new FloatingMicrophoneService(); }, token: FloatingMicrophoneService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CollectionOfMultimediaAlbumsComponent {
    /**
     * @param {?} api
     * @param {?} formBuilder
     * @param {?} speech
     * @param {?} snake
     * @param {?} router
     * @param {?} floatingMicrophone
     */
    constructor(api, formBuilder, speech, snake, router, floatingMicrophone) {
        this.api = api;
        this.formBuilder = formBuilder;
        this.speech = speech;
        this.snake = snake;
        this.router = router;
        this.floatingMicrophone = floatingMicrophone;
        this._loadedFirstTime = false;
        this._noMoreData = false;
        this._modalDeleteConfirmation = "";
        this._destroyed = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._addNewCollectionForm = this.formBuilder.group({
            collectionName: ["", Validators.required],
            collectionType: ["", Validators.required],
            keywords: ["", Validators.required]
        });
        this.loadInputOptionsOrDefault();
        this.speechActions();
        this.floatingMicrophone.makeFloatingMicrophone(this.speech);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * @return {?}
     */
    speechActions() {
        this.speech.message
            .pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            this.toggleMic();
            return EMPTY;
        })), takeUntil(this._destroyed))
            .subscribe((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => {
            console.log(msg);
            if (msg.message == "delete") {
                document.getElementById("deleteCollectionButton").click();
            }
            if (msg.message == "add") {
                document.getElementById("addCollectionButton").click();
            }
            if (msg.message == "suggestions" ||
                msg.message == "tip" ||
                msg.message == "recommendations") {
                document.getElementById("suggestionsCollectionButton").click();
            }
            if (msg.message == "snake") {
                this.snake.snake();
            }
            this.toggleMic();
        }));
    }
    /**
     * @return {?}
     */
    toggleMic() {
        /** @type {?} */
        var elem = document.getElementById("floatingMicrophone");
        if (elem.classList.contains("notRecording")) {
            elem.classList.remove("notRecording");
            elem.classList.add("recording");
            this.speech.start();
        }
        else {
            elem.classList.remove("recording");
            elem.classList.add("notRecording");
            this.speech.stop();
        }
    }
    /**
     * @return {?}
     */
    getCollections() {
        this.api
            .getData(this.collectionUrl
            .replace("/$userId", `/${this.userId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/${this.skip}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (typeof this._collectionData == "undefined") {
                this._collectionData = [];
            }
            data["collection"].forEach((/**
             * @param {?} collection
             * @return {?}
             */
            (collection) => {
                console.log(collection);
                console.log(collection["placeholder"].length);
                if (collection["placeholder"].length == 0) {
                    collection["placeholder"] = [
                        {
                            data: "../../../assets/new-collection.jpg"
                        }
                    ];
                }
            }));
            if (data["collection"].length != 0) {
                console.log(this._collectionData);
                this._collectionData = [...this._collectionData, ...data["collection"]];
                this.skip += this.take;
                /** @type {?} */
                var str = "";
                this._collectionData.forEach((/**
                 * @param {?} collection
                 * @return {?}
                 */
                (collection) => {
                    str += "," + collection["keywords"];
                }));
                this._mostUsedKeywords = this.mostUsedKeywords(str);
                console.log(typeof this.suggestedCollectionUrl);
                if (typeof this.suggestedCollectionUrl != "undefined") {
                    console.log(typeof this.suggestedCollectionUrl);
                    this.getSuggestedCollections();
                }
                this._loadedFirstTime = true;
            }
            else {
                this._noMoreData = true;
            }
        }));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    mostUsedKeywords(str) {
        /** @type {?} */
        var wordCounts = {};
        /** @type {?} */
        var words = str.split(",");
        for (var i = 0; i < words.length; i++) {
            wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
        }
        delete wordCounts["_"];
        /** @type {?} */
        var wordsList = "";
        wordCounts = JSON.parse(JSON.stringify(wordCounts).replace(/_/g, ""));
        for (var k in wordCounts) {
            wordsList += "," + k;
        }
        wordsList = wordsList.replace(",", "");
        console.log(wordsList);
        return wordsList;
    }
    /**
     * @return {?}
     */
    getSuggestedCollections() {
        //for suggestions we skip 0 since we want only the best suggestions
        this.api
            .getData(this.suggestedCollectionUrl
            .replace("/$userId", `/${this.userId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/0`) + `/${this._mostUsedKeywords}`)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data.forEach((/**
             * @param {?} collection
             * @return {?}
             */
            (collection) => {
                console.log(collection);
                console.log(collection["placeholder"].length);
                if (collection["placeholder"].length == 0) {
                    collection["placeholder"] = [
                        {
                            data: "../../../assets/new-collection.jpg"
                        }
                    ];
                }
            }));
            this._suggestedCollectionData = data;
        }));
    }
    /**
     * @return {?}
     */
    onWindowScroll() {
        //In chrome and some browser scroll is given to body tag
        /** @type {?} */
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) +
            document.documentElement.offsetHeight;
        /** @type {?} */
        let max = document.documentElement.scrollHeight;
        console.log(pos);
        console.log(max);
        if (typeof this._scrollAmount == "undefined") {
            this._scrollAmount = pos;
        }
        else {
            // move the floating microphone at the same time with the screen
            /** @type {?} */
            var elem = document.getElementById("floatingMicrophone");
            elem.style.top = parseFloat(elem.style.top) + (pos - this._scrollAmount) + "px";
            this._scrollAmount = pos;
        }
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (pos == max ||
            Math.ceil(pos) == Math.ceil(max) ||
            Math.floor(pos) == Math.floor(max) ||
            Math.floor(pos) == Math.ceil(max) ||
            Math.ceil(pos) == Math.floor(max)) {
            if (this._loadedFirstTime) {
                this.getCollections();
            }
        }
    }
    /**
     * @return {?}
     */
    loadCollectionsUntilScrollbarAppears() {
        this.getCollections();
        /** @type {?} */
        let max = document.documentElement.scrollHeight;
        /** @type {?} */
        var interval = setInterval((/**
         * @return {?}
         */
        () => {
            if (this._loadedFirstTime == true) {
                if (max < document.documentElement.scrollHeight || this._noMoreData == true) {
                    clearInterval(interval);
                }
                else {
                    this.getCollections();
                }
            }
        }), 1000);
    }
    /**
     * @return {?}
     */
    toggleDeleteButton() {
        if (this._deleteAccent == this.bootstrapAccentPrimary) {
            this._deleteAccent = this.bootstrapAccentSecondary;
            this._modalDeleteConfirmation = "#deleteConfirmationModal";
        }
        else {
            this._deleteAccent = this.bootstrapAccentPrimary;
            this._modalDeleteConfirmation = "";
        }
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    accessOrDelete(collection) {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  here put redirect on click
        if (this._deleteAccent == this.bootstrapAccentSecondary) {
            console.log(collection);
            this._markedForDeletion = collection;
        }
        else {
            console.log(collection);
            this.router.navigate([`/${collection.id}`]);
        }
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    accessRecommendedCollection(collection) {
        this.router.navigate([`/${collection.id}`]);
    }
    /**
     * @return {?}
     */
    deleteCollection() {
        this.api
            .deleteData(this.deleteCollectionUrl.replace("/$collectionId", `/${this._markedForDeletion["id"]}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => { }));
        this._collectionData = this._collectionData.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item != this._markedForDeletion));
    }
    /**
     * @return {?}
     */
    addCollection() {
        console.log(this._addNewCollectionForm);
        // let headers = new HttpHeaders();
        // headers.append("Content-Type", "application/json");
        this.api
            .postData(this.addCollectionUrl, {
            Name: `${this._addNewCollectionForm.value.collectionName}`,
            Type: this._addNewCollectionForm.value.collectionType,
            Keywords: `${this._addNewCollectionForm.value.keywords}`,
            UserId: `${this.userId}`
        })
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            console.log(data);
            data["placeholder"] = [
                {
                    data: "../../../assets/new-collection.jpg"
                }
            ];
            this._collectionData = [...this._collectionData, data];
        }));
    }
    /**
     * @return {?}
     */
    loadInputOptionsOrDefault() {
        if (typeof this.configPath != "undefined") {
            this.api
                .getData(this.configPath)
                .pipe(catchError((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.loadDefault();
                if (typeof this.collectionUrl != "undefined") {
                    this.loadCollectionsUntilScrollbarAppears();
                    this.onWindowScroll();
                }
                return EMPTY;
            })), take(1), map((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                console.log("here");
                return data;
            })))
                .subscribe((/**
             * @param {?} config
             * @return {?}
             */
            (config) => {
                if (typeof config["userId"] != "undefined" && typeof this.userId == "undefined") {
                    this.userId = config["userId"];
                }
                if (typeof config["gridSize"] != "undefined" && typeof this.gridSize == "undefined") {
                    this.gridSize = config["gridSize"];
                }
                if (typeof config["gridSizeSuggestions"] != "undefined" &&
                    typeof this.gridSizeSuggestions == "undefined") {
                    this.gridSizeSuggestions = config["gridSizeSuggestions"];
                }
                if (typeof config["collectionUrl"] != "undefined" &&
                    typeof this.collectionUrl == "undefined") {
                    this.collectionUrl = config["collectionUrl"];
                }
                if (typeof config["suggestedCollectionUrl"] != "undefined" &&
                    typeof this.suggestedCollectionUrl == "undefined") {
                    this.suggestedCollectionUrl = config["suggestedCollectionUrl"];
                }
                if (typeof config["deleteCollectionUrl"] != "undefined" &&
                    typeof this.deleteCollectionUrl == "undefined") {
                    this.deleteCollectionUrl = config["deleteCollectionUrl"];
                }
                if (typeof config["addCollectionUrl"] != "undefined" &&
                    typeof this.addCollectionUrl == "undefined") {
                    this.addCollectionUrl = config["addCollectionUrl"];
                }
                if (typeof config["skip"] != "undefined" && typeof this.skip == "undefined") {
                    this.skip = config["skip"];
                }
                if (typeof config["take"] != "undefined" && typeof this.take == "undefined") {
                    this.take = config["take"];
                }
                if (typeof config["bootstrapAccentPrimary"] != "undefined" &&
                    typeof this.bootstrapAccentPrimary == "undefined") {
                    this.bootstrapAccentPrimary = config["bootstrapAccentPrimary"];
                }
                if (typeof config["bootstrapAccentSecondary"] != "undefined" &&
                    typeof this.bootstrapAccentSecondary == "undefined") {
                    this.bootstrapAccentSecondary = config["bootstrapAccentSecondary"];
                }
                if (typeof config["albumUrl"] != "undefined" && typeof this.albumUrl == "undefined") {
                    this.albumUrl = config["albumUrl"];
                }
                if (typeof config["suggestedEntityUrl"] != "undefined" &&
                    typeof this.suggestedEntityUrl == "undefined") {
                    this.suggestedEntityUrl = config["suggestedEntityUrl"];
                }
                if (typeof config["deleteEntityUrl"] != "undefined" &&
                    typeof this.deleteEntityUrl == "undefined") {
                    this.deleteEntityUrl = config["deleteEntityUrl"];
                }
                if (typeof config["addEntitiesUrl"] != "undefined" &&
                    typeof this.addEntitiesUrl == "undefined") {
                    this.addEntitiesUrl = config["addEntitiesUrl"];
                }
                if (typeof config["getEntityUrl"] != "undefined" &&
                    typeof this.getEntityUrl == "undefined") {
                    this.getEntityUrl = config["getEntityUrl"];
                }
                if (typeof config["slideShow"] != "undefined" && typeof this.slideShow == "undefined") {
                    this.slideShow = config["slideShow"];
                }
                if (typeof config["lockSlideShow"] != "undefined" &&
                    typeof this.lockSlideShow == "undefined") {
                    this.lockSlideShow = config["lockSlideShow"];
                }
                if (typeof config["slideShowTimeBeforeNext"] != "undefined" &&
                    typeof this.slideShowTimeBeforeNext == "undefined") {
                    this.slideShowTimeBeforeNext = config["slideShowTimeBeforeNext"];
                }
                this.loadDefault();
                if (typeof this.collectionUrl != "undefined") {
                    this.loadCollectionsUntilScrollbarAppears();
                    this.onWindowScroll();
                }
            }));
        }
        else {
            this.loadDefault();
            if (typeof this.collectionUrl != "undefined") {
                this.loadCollectionsUntilScrollbarAppears();
                this.onWindowScroll();
            }
        }
    }
    /**
     * @return {?}
     */
    loadDefault() {
        if (typeof this.userId == "undefined") {
            this.userId = "00000000-0000-0000-0000-000000000000";
        }
        if (typeof this.gridSize == "undefined") {
            this.gridSize = 10;
        }
        if (typeof this.gridSizeSuggestions == "undefined") {
            this.gridSizeSuggestions = 3;
        }
        if (typeof this.collectionUrl == "undefined") {
            this.collectionUrl = "";
        }
        if (typeof this.suggestedCollectionUrl == "undefined") {
            this.suggestedCollectionUrl = "";
        }
        if (typeof this.deleteCollectionUrl == "undefined") {
            this.deleteCollectionUrl = "";
        }
        if (typeof this.addCollectionUrl == "undefined") {
            this.addCollectionUrl = "";
        }
        if (typeof this.skip == "undefined") {
            this.skip = 0;
        }
        if (typeof this.take == "undefined") {
            this.take = 10;
        }
        if (typeof this.bootstrapAccentPrimary == "undefined") {
            this.bootstrapAccentPrimary = "danger";
        }
        if (typeof this.bootstrapAccentSecondary == "undefined") {
            this.bootstrapAccentSecondary = "dark";
        }
        if (typeof this.albumUrl == "undefined") {
            this.albumUrl = "";
        }
        if (typeof this.suggestedEntityUrl == "undefined") {
            this.suggestedEntityUrl = "";
        }
        if (typeof this.deleteEntityUrl == "undefined") {
            this.deleteEntityUrl = "";
        }
        if (typeof this.addEntitiesUrl == "undefined") {
            this.addEntitiesUrl = "";
        }
        if (typeof this.getEntityUrl == "undefined") {
            this.getEntityUrl = "";
        }
        if (typeof this.slideShow == "undefined") {
            this.slideShow = false;
        }
        if (typeof this.lockSlideShow == "undefined") {
            this.lockSlideShow = false;
        }
        if (typeof this.slideShowTimeBeforeNext == "undefined") {
            this.slideShowTimeBeforeNext = 5000;
        }
        /** @type {?} */
        var albumInputs = {
            gridSize: this.gridSize,
            gridSizeSuggestions: this.gridSizeSuggestions,
            skip: this.skip,
            take: this.take,
            bootstrapAccentPrimary: this.bootstrapAccentPrimary,
            bootstrapAccentSecondary: this.bootstrapAccentSecondary,
            albumUrl: this.albumUrl,
            suggestedEntityUrl: this.suggestedEntityUrl,
            deleteEntityUrl: this.deleteEntityUrl,
            addEntitiesUrl: this.addEntitiesUrl,
            getEntityUrl: this.getEntityUrl,
            lockSlideShow: this.lockSlideShow,
            slideShow: this.slideShow,
            slideShowTimeBeforeNext: this.slideShowTimeBeforeNext
        };
        sessionStorage.setItem("albumInputs", JSON.stringify(albumInputs));
        this._deleteAccent = this.bootstrapAccentPrimary;
    }
}
CollectionOfMultimediaAlbumsComponent.decorators = [
    { type: Component, args: [{
                selector: "app-collection-of-multimedia-albums",
                template: "<div id=\"collection-of-multimedia-albums\" class=\"w-100 h-100 p-2 box roboto-font\">\n  <!--Button Area-->\n  <div id=\"button-area\" class=\"w-100 d-flex-block justify-content-between box\">\n    <div class=\"w-resizable-35 d-flex justify-content-between-start\">\n      <button\n        type=\"button\"\n        id=\"addCollectionButton\"\n        class=\"btn btn-{{ bootstrapAccentPrimary }} w-min-140px\"\n        data-toggle=\"modal\"\n        data-target=\"#addCollectionModal\"\n      >\n        Add Collection\n      </button>\n      <button\n        type=\"button\"\n        id=\"deleteCollectionButton\"\n        class=\"btn btn-{{ _deleteAccent }} w-min-140px\"\n        (click)=\"toggleDeleteButton()\"\n      >\n        Delete Collection\n      </button>\n    </div>\n\n    <div class=\"w-resizable-20 d-flex justify-content-between-end box\">\n      <!-- Toggle Switch -->\n      <div class=\"w-140px d-flex flex-nowrap\">\n        <div class=\"w-60px ml-2 d-flex align-items-center box\">\n          <label class=\"switch box\">\n            <input type=\"checkbox\" [(ngModel)]=\"_toggleView\" />\n            <span class=\"slider round\"></span>\n          </label>\n        </div>\n        <button\n          type=\"button\"\n          id=\"suggestionsCollectionButton\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }} w-80px\"\n          data-toggle=\"modal\"\n          data-target=\"#seeSuggestionsModal\"\n        >\n          Tip\n        </button>\n      </div>\n      <!-- Filter Box -->\n      <div class=\"w-min-140px w-max-140px box\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"Search..\" [(ngModel)]=\"_searchText\" />\n      </div>\n    </div>\n  </div>\n\n  <!--Collections Area-->\n  <div id=\"collections-area\" class=\"w-100 h-85 mt-3 d-flex-block flex-wrap box\">\n    <div\n      class=\"{{ 'grid-size-' + gridSize }}\"\n      *ngFor=\"let collection of (_collectionData | filterCollections: _searchText)\"\n      (click)=\"accessOrDelete(collection)\"\n      data-toggle=\"modal\"\n      [attr.data-target]=\"_modalDeleteConfirmation\"\n    >\n      <!--Placeholder Area-->\n      <div [ngSwitch]=\"_toggleView\" class=\"w-99 box position-relative\">\n        <div *ngSwitchDefault id=\"placeholder2d\" class=\"w-99 box position-relative\">\n          <img class=\"w-100 thumbnail hover-shadow\" src=\"{{ collection.placeholder[0].data }}\" />\n        </div>\n        <div\n          *ngSwitchCase=\"1\"\n          id=\"placeholder3d\"\n          class=\"w-99 box position-relative h-min-250px d-flex justify-content-center\"\n        >\n          <img\n            *ngFor=\"let placeholder of collection.placeholder.slice(0, 5); let i = index\"\n            src=\"{{ placeholder.data }}\"\n            class=\"w-max-200px thumbnail layer-stack  layer-{{ i }} \"\n          />\n        </div>\n      </div>\n\n      <!--Collection's Name Area-->\n      <div\n        id=\"collection-name\"\n        class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n      >\n        {{ collection.name }}\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal add Collection -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"addCollectionModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"addCollection\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"addCollection\">Create a new Collection?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"_addNewCollectionForm\">\n          <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control d-none\" formControlName=\"collectionName\" />\n            <label for=\"Name\" class=\"col-form-label\">Name:</label>\n            <input type=\"text\" class=\"form-control\" id=\"Name\" formControlName=\"collectionName\" />\n            <label class=\"\" for=\"collectionType\">Type</label>\n            <select class=\"custom-select\" id=\"collectionType\" formControlName=\"collectionType\">\n              <option selected disabled>Choose...</option>\n              <option value=\"0\">Public</option>\n              <option value=\"1\">Private</option>\n            </select>\n            <label for=\"Keywords\" class=\"col-form-label\">Keywords:</label>\n            <input type=\"text\" class=\"form-control\" id=\"keywords\" formControlName=\"keywords\" />\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Close\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          data-dismiss=\"modal\"\n          (click)=\"addCollection()\"\n        >\n          Save changes\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal see Suggestions -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"seeSuggestionsModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"seeSuggestions\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"seeSuggestions\">Suggestions</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body d-flex-block flex-wrap box\">\n        <div\n          class=\"{{ 'grid-size-' + gridSizeSuggestions }}\"\n          *ngFor=\"let collection of _suggestedCollectionData\"\n          (click)=\"accessRecommendedCollection(collection)\"\n          data-dismiss=\"modal\"\n        >\n          <!--Placeholder Area-->\n          <div class=\"w-99 box position-relative\">\n            <div id=\"placeholder2d\" class=\"w-99 box position-relative\">\n              <img\n                class=\"w-100 thumbnail hover-shadow\"\n                src=\"{{ collection.placeholder[0].data }}\"\n              />\n            </div>\n          </div>\n          <!--Collection's Name Area-->\n          <div\n            id=\"collection-name\"\n            class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n          >\n            {{ collection.name }}\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Close\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Delete Confirmation Modal -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"deleteConfirmationModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"deleteConfirmation\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\" id=\"deleteConfirmation\">Confirm Delete</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      </div>\n\n      <div class=\"modal-body\">\n        <p>Are you sure you want to delete the collection, this procedure is irreversible.</p>\n        <p>Do you want to proceed?</p>\n      </div>\n\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Cancel\n        </button>\n        <button\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          (click)=\"deleteCollection()\"\n          data-dismiss=\"modal\"\n        >\n          Delete\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- Microphone Button -->\n<div id=\"floatingMicrophone\" class=\"notRecording\">\n  <img class=\"w-50\" src=\"../../../assets/microphoneIcon.png\" />\n</div>\n",
                styles: [".switch{position:relative;display:inline-block;width:60px;height:34px;margin:0}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s}.slider:before{position:absolute;content:\"\";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;transition:.4s}.switch>input:checked+.slider{background-color:#2196f3}.switch>input:focus+.slider{box-shadow:0 0 1px #2196f3}.switch>input:checked+.slider:before{-webkit-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}"]
            }] }
];
/** @nocollapse */
CollectionOfMultimediaAlbumsComponent.ctorParameters = () => [
    { type: ApiService },
    { type: FormBuilder },
    { type: SpeechService },
    { type: SnakeService },
    { type: Router },
    { type: FloatingMicrophoneService }
];
CollectionOfMultimediaAlbumsComponent.propDecorators = {
    gridSize: [{ type: Input }],
    gridSizeSuggestions: [{ type: Input }],
    userId: [{ type: Input }],
    collectionUrl: [{ type: Input }],
    suggestedCollectionUrl: [{ type: Input }],
    deleteCollectionUrl: [{ type: Input }],
    addCollectionUrl: [{ type: Input }],
    skip: [{ type: Input }],
    take: [{ type: Input }],
    albumUrl: [{ type: Input }],
    suggestedEntityUrl: [{ type: Input }],
    deleteEntityUrl: [{ type: Input }],
    addEntitiesUrl: [{ type: Input }],
    getEntityUrl: [{ type: Input }],
    slideShow: [{ type: Input }],
    lockSlideShow: [{ type: Input }],
    slideShowTimeBeforeNext: [{ type: Input }],
    configPath: [{ type: Input }],
    bootstrapAccentPrimary: [{ type: Input }],
    bootstrapAccentSecondary: [{ type: Input }],
    onWindowScroll: [{ type: HostListener, args: ["window:scroll",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MultimediaAlbumComponent {
    /**
     * @param {?} api
     * @param {?} speech
     * @param {?} snake
     * @param {?} router
     * @param {?} route
     * @param {?} floatingMicrophone
     */
    constructor(api, speech, snake, router, route, floatingMicrophone) {
        this.api = api;
        this.speech = speech;
        this.snake = snake;
        this.router = router;
        this.route = route;
        this.floatingMicrophone = floatingMicrophone;
        this._loadedFirstTime = false;
        this._noMoreData = false;
        this._modalDeleteConfirmation = "";
        this._slideIndex = 1;
        this._showSuggestedEntityModal = 0;
        this._suggestedSlideIndex = 1;
        this._destroyed = new Subject();
        this._upload = false;
        this._cancel = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        (params) => {
            this.collectionId = params["id"];
        }));
        this.loadInputOptions();
        this.speechActions();
        this.floatingMicrophone.makeFloatingMicrophone(this.speech);
        this.lockSlideShow;
        if (this.slideShow) {
            this._showEntityModal = 1;
        }
        else {
            this._showEntityModal = 0;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    //to modify actions
    /**
     * @return {?}
     */
    speechActions() {
        this.speech.message
            .pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            this.toggleMic();
            return EMPTY;
        })), takeUntil(this._destroyed))
            .subscribe((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => {
            console.log(msg);
            if (msg.message == "delete") {
                document.getElementById("deleteEntityButton").click();
            }
            if (msg.message == "add") {
                document.getElementById("addEntityButton").click();
            }
            if (msg.message == "suggestions" ||
                msg.message == "tip" ||
                msg.message == "recommendations") {
                document.getElementById("suggestionsEntityButton").click();
            }
            if (msg.message == "snake") {
                this.snake.snake();
            }
            this.toggleMic();
        }));
    }
    /**
     * @return {?}
     */
    toggleMic() {
        /** @type {?} */
        var elem = document.getElementById("floatingMicrophone");
        if (elem.classList.contains("notRecording")) {
            elem.classList.remove("notRecording");
            elem.classList.add("recording");
            this.speech.start();
        }
        else {
            elem.classList.remove("recording");
            elem.classList.add("notRecording");
            this.speech.stop();
        }
    }
    //delete and add is missing
    /**
     * @return {?}
     */
    getAlbum() {
        this.api
            .getData(this.albumUrl
            .replace("/$collectionId", `/${this.collectionId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/${this.skip}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (typeof this._albumData == "undefined") {
                this._albumData = [];
            }
            if (data["placeholder"].length != 0) {
                console.log(this._albumData);
                this._albumData = [...this._albumData, ...data["placeholder"]];
                this.skip += this.take;
                /** @type {?} */
                var str = "";
                this._albumData.forEach((/**
                 * @param {?} placeholder
                 * @return {?}
                 */
                (placeholder) => {
                    str += "," + placeholder["keywords"];
                }));
                this._mostUsedKeywords = this.mostUsedKeywords(str);
                console.log(typeof this.suggestedEntityUrl);
                if (typeof this.suggestedEntityUrl != "undefined") {
                    console.log(typeof this.suggestedEntityUrl);
                    this.getSuggestedEntities();
                }
                this._loadedFirstTime = true;
            }
            else {
                this._noMoreData = true;
            }
        }));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    mostUsedKeywords(str) {
        /** @type {?} */
        var wordCounts = {};
        /** @type {?} */
        var words = str.split(",");
        for (var i = 0; i < words.length; i++) {
            wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
        }
        delete wordCounts["_"];
        /** @type {?} */
        var wordsList = "";
        wordCounts = JSON.parse(JSON.stringify(wordCounts).replace(/_/g, ""));
        for (var k in wordCounts) {
            wordsList += "," + k;
        }
        wordsList = wordsList.replace(",", "");
        wordsList = wordsList.replace(/,null/g, "");
        console.log(wordsList);
        return wordsList;
    }
    /**
     * @return {?}
     */
    getSuggestedEntities() {
        //for suggestions we skip 0 since we want only the best suggestions
        //we use collection id to skip those from the search results since we already have them
        this.api
            .getData(this.suggestedEntityUrl
            .replace("/$collectionId", `/${this.collectionId}`)
            .replace("/$take", `/${this.take}`)
            .replace("/$skip", `/0`) + `/${this._mostUsedKeywords}`)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this._suggestedEntities = data;
            console.log(data);
        }));
    }
    /**
     * @return {?}
     */
    onWindowScroll() {
        //In chrome and some browser scroll is given to body tag
        /** @type {?} */
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) +
            document.documentElement.offsetHeight;
        /** @type {?} */
        let max = document.documentElement.scrollHeight;
        console.log(pos);
        console.log(max);
        if (typeof this._scrollAmount == "undefined") {
            this._scrollAmount = pos;
        }
        else {
            // move the floating microphone at the same time with the screen
            /** @type {?} */
            var elem = document.getElementById("floatingMicrophone");
            elem.style.top = parseFloat(elem.style.top) + (pos - this._scrollAmount) + "px";
            this._scrollAmount = pos;
        }
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (pos == max ||
            Math.ceil(pos) == Math.ceil(max) ||
            Math.floor(pos) == Math.floor(max) ||
            Math.floor(pos) == Math.ceil(max) ||
            Math.ceil(pos) == Math.floor(max)) {
            if (this._loadedFirstTime) {
                this.getAlbum();
            }
        }
    }
    /**
     * @param {?} placeholder
     * @param {?} i
     * @return {?}
     */
    accessOrDelete(placeholder, i) {
        if (this._deleteAccent == this.bootstrapAccentSecondary) {
            this._markedForDeletion = placeholder;
            console.log(this._markedForDeletion);
            console.log(placeholder);
        }
        else {
            this._showEntityModal = 1;
            this._slideIndex = i;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    noEntityModal(event) {
        console.log(event);
        this._showEntityModal = event;
    }
    /**
     * @param {?} i
     * @return {?}
     */
    accessSuggested(i) {
        this._showSuggestedEntityModal = 1;
        this._suggestedSlideIndex = i;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    noSuggestedEntityModal(event) {
        console.log(event);
        this._showSuggestedEntityModal = event;
    }
    /**
     * @return {?}
     */
    deleteEntity() {
        this.api
            .deleteData(this.deleteEntityUrl.replace("/$entityId", `/${this._markedForDeletion["id"]}`))
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => { }));
        this._albumData = this._albumData.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item != this._markedForDeletion));
    }
    /**
     * @return {?}
     */
    loadEntitiesUntilScrollbarAppears() {
        this.getAlbum();
        /** @type {?} */
        let max = document.documentElement.scrollHeight;
        /** @type {?} */
        var interval = setInterval((/**
         * @return {?}
         */
        () => {
            if (this._loadedFirstTime == true) {
                if (max < document.documentElement.scrollHeight || this._noMoreData == true) {
                    clearInterval(interval);
                }
                else {
                    this.getAlbum();
                }
            }
        }), 1000);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    loadMore(event) {
        this.getAlbum();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addNewData(event) {
        console.log(this._albumData);
        this._albumData = [...this._albumData, ...event];
        console.log(this._albumData);
        this._upload = false;
    }
    /**
     * @return {?}
     */
    upload() {
        this._upload = true;
    }
    /**
     * @return {?}
     */
    cancel() {
        this._cancel = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    discardedData(event) {
        this._cancel = event;
    }
    /**
     * @return {?}
     */
    toggleDeleteButton() {
        if (this._deleteAccent == this.bootstrapAccentPrimary) {
            this._deleteAccent = this.bootstrapAccentSecondary;
            this._modalDeleteConfirmation = "#deleteConfirmationModal";
        }
        else {
            this._deleteAccent = this.bootstrapAccentPrimary;
            this._modalDeleteConfirmation = "";
        }
    }
    /**
     * @return {?}
     */
    loadInputOptions() {
        if (typeof sessionStorage.getItem("albumInputs") == "undefined") {
            /** @type {?} */
            var albumInputOptions = JSON.parse(sessionStorage.getItem("albumInputs"));
            this.gridSize = albumInputOptions.gridSize;
            this.gridSizeSuggestions = albumInputOptions.gridSizeSuggestions;
            this.skip = albumInputOptions.skip;
            this.take = albumInputOptions.take;
            this.albumUrl = albumInputOptions.albumUrl;
            this.suggestedEntityUrl = albumInputOptions.suggestedEntityUrl;
            this.deleteEntityUrl = albumInputOptions.deleteEntityUrl;
            this.addEntitiesUrl = albumInputOptions.addEntitiesUrl;
            this.getEntityUrl = albumInputOptions.getEntityUrl;
            this.lockSlideShow = albumInputOptions.lockSlideShow;
            this.slideShow = albumInputOptions.slideShow;
            this.slideShowTimeBeforeNext = albumInputOptions.slideShowTimeBeforeNext;
            this.bootstrapAccentPrimary = albumInputOptions.bootstrapAccentPrimary;
            this.bootstrapAccentSecondary = albumInputOptions.bootstrapAccentSecondary;
            this._deleteAccent = this.bootstrapAccentPrimary;
            if (typeof this.albumUrl != "undefined") {
                this.loadEntitiesUntilScrollbarAppears();
                this.onWindowScroll();
            }
        }
        else {
            setTimeout(this.loadInputOptions, 2000);
        }
    }
}
MultimediaAlbumComponent.decorators = [
    { type: Component, args: [{
                selector: "app-multimedia-album",
                template: "<div id=\"multimedia-album\" class=\"w-100 h-100 p-2 box roboto-font\">\n  <!--Button Area-->\n  <div id=\"button-area\" class=\"w-100 d-flex-block justify-content-between box\">\n    <div class=\"w-resizable-35 d-flex justify-content-between-start\">\n      <button\n        type=\"button\"\n        id=\"addEntityButton\"\n        class=\"btn btn-{{ bootstrapAccentPrimary }} w-min-140px\"\n        data-toggle=\"modal\"\n        data-target=\"#addCollectionModal\"\n      >\n        Add\n      </button>\n      <button\n        type=\"button\"\n        id=\"deleteEntityButton\"\n        class=\"btn btn-{{ _deleteAccent }} w-min-140px\"\n        (click)=\"toggleDeleteButton()\"\n      >\n        Delete\n      </button>\n    </div>\n\n    <div class=\"w-resizable-20 d-flex justify-content-between-end box\">\n      <!-- Suggestions Button -->\n      <div class=\"w-80px d-flex flex-nowrap\">\n        <button\n          type=\"button\"\n          id=\"suggestionsEntityButton\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }} w-80px\"\n          data-toggle=\"modal\"\n          data-target=\"#seeSuggestionsModal\"\n        >\n          Tip\n        </button>\n      </div>\n      <!-- Filter Box -->\n      <div class=\"w-min-140px w-max-140px box\">\n        <input class=\"form-control\" type=\"text\" placeholder=\"Search..\" [(ngModel)]=\"_searchText\" />\n      </div>\n    </div>\n  </div>\n\n  <!--Album Area-->\n  <div id=\"album-area\" class=\"w-100 h-85 mt-3 d-flex-block flex-wrap box\">\n    <div\n      class=\"{{ 'grid-size-' + gridSize }}\"\n      *ngFor=\"let entity of (_albumData | filterAlbum: _searchText); let i = index\"\n      data-toggle=\"modal\"\n      [attr.data-target]=\"_modalDeleteConfirmation\"\n      (click)=\"accessOrDelete(entity, i)\"\n    >\n      <!--Placeholder Area-->\n      <div class=\"w-99 box position-relative\">\n        <div id=\"placeholder2d\" class=\"w-99 box position-relative\">\n          <img class=\"w-100 thumbnail hover-shadow\" src=\"{{ entity.data }}\" />\n        </div>\n      </div>\n\n      <!--Entity's Name Area-->\n      <div\n        id=\"entity-name\"\n        class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n      >\n        {{ entity.name }}\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal Upload Files and Urls -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"addCollectionModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"addCollection\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"addCollection\">Upload</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <app-upload\n          class=\"w-100 h-100\"\n          [upload]=\"_upload\"\n          [cancel]=\"_cancel\"\n          [collectionId]=\"collectionId\"\n          [addEntitiesUrl]=\"addEntitiesUrl\"\n          [bootstrapAccentSecondary]=\"bootstrapAccentSecondary\"\n          (newData)=\"addNewData($event)\"\n          (discarded)=\"discardedData($event)\"\n        ></app-upload>\n      </div>\n      <div class=\"modal-footer\">\n        <button\n          type=\"button\"\n          class=\"btn btn-{{ bootstrapAccentSecondary }}\"\n          data-dismiss=\"modal\"\n          (click)=\"cancel()\"\n        >\n          Close\n        </button>\n        <button\n          type=\"button\"\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          data-dismiss=\"modal\"\n          (click)=\"upload()\"\n        >\n          Save changes\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal see Suggestions -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"seeSuggestionsModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"seeSuggestions\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"seeSuggestions\">Suggestions</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"false\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body d-flex-block flex-wrap box \">\n        <div\n          class=\"{{ 'grid-size-' + gridSizeSuggestions }} \"\n          *ngFor=\"let entity of _suggestedEntities; let i = index\"\n          (click)=\"accessSuggested(i)\"\n        >\n          <!--Placeholder Area-->\n          <div class=\"w-99 box position-relative \">\n            <div id=\"placeholder2d\" class=\"w-99 box position-relative\">\n              <img class=\"w-100 thumbnail hover-shadow\" src=\"{{ entity.data }}\" />\n            </div>\n          </div>\n          <!--Entity's Name Area-->\n          <div\n            id=\"entity-name\"\n            class=\"w-99 d-flex align-items-center justify-content-center text-center box break-word text-overflow-ellipsis\"\n          >\n            {{ entity.name }}\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Close\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Delete Confirmation Modal -->\n<div\n  class=\"modal fade roboto-font\"\n  id=\"deleteConfirmationModal\"\n  tabindex=\"-1\"\n  role=\"dialog\"\n  aria-labelledby=\"deleteConfirmation\"\n  aria-hidden=\"true\"\n>\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\" id=\"deleteConfirmation\">Confirm Delete</h4>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n      </div>\n\n      <div class=\"modal-body\">\n        <p>Are you sure you want to delete the collection, this procedure is irreversible.</p>\n        <p>Do you want to proceed?</p>\n      </div>\n\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-{{ bootstrapAccentSecondary }}\" data-dismiss=\"modal\">\n          Cancel\n        </button>\n        <button\n          class=\"btn btn-{{ bootstrapAccentPrimary }}\"\n          (click)=\"deleteEntity()\"\n          data-dismiss=\"modal\"\n        >\n          Delete\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Microphone Button -->\n<div id=\"floatingMicrophone\" class=\"notRecording\">\n  <img class=\"w-50\" src=\"../../../assets/microphoneIcon.png\" />\n</div>\n\n<!-- Modal for displaying multimedia files -->\n<app-lightbox\n  (noShow)=\"noEntityModal($event)\"\n  (loadMore)=\"loadMore($event)\"\n  [show]=\"_showEntityModal\"\n  [data]=\"_albumData | filterAlbum: _searchText\"\n  [entityUrl]=\"getEntityUrl\"\n  type=\"entity\"\n  [index]=\"_slideIndex\"\n  [noMoreData]=\"_noMoreData\"\n  [lockSlideShow]=\"lockSlideShow\"\n  [slideShow]=\"slideShow\"\n  [slideShowTimeBeforeNext]=\"slideShowTimeBeforeNext\"\n></app-lightbox>\n\n<!-- Modal for displaying suggested multimedia files -->\n<app-lightbox\n  (noShow)=\"noSuggestedEntityModal($event)\"\n  [show]=\"_showSuggestedEntityModal\"\n  [data]=\"_suggestedEntities\"\n  [entityUrl]=\"getEntityUrl\"\n  type=\"suggestedEntity\"\n  [index]=\"_suggestedSlideIndex\"\n  noMoreData=\"1\"\n  lockSlideShow=\"false\"\n  slideShow=\"false\"\n  slideShowTimeBeforeNext=\"5000\"\n></app-lightbox>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MultimediaAlbumComponent.ctorParameters = () => [
    { type: ApiService },
    { type: SpeechService },
    { type: SnakeService },
    { type: Router },
    { type: ActivatedRoute },
    { type: FloatingMicrophoneService }
];
MultimediaAlbumComponent.propDecorators = {
    onWindowScroll: [{ type: HostListener, args: ["window:scroll",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const routes = [
    {
        path: "",
        component: CollectionOfMultimediaAlbumsComponent
    },
    {
        path: ":id",
        component: MultimediaAlbumComponent
    },
    {
        path: "**",
        redirectTo: ""
    }
];
class AppRoutingModule {
}
AppRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forRoot(routes)],
                exports: [RouterModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FilterCollectionsPipe {
    /**
     * @param {?} items
     * @param {?} searchText
     * @return {?}
     */
    transform(items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLowerCase();
        return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            var type = item.type;
            if (type == 0) {
                type = "public";
            }
            else {
                type = "private";
            }
            return (item.name.toLowerCase().includes(searchText) ||
                item.keywords.split(",").some((/**
                 * @param {?} word
                 * @return {?}
                 */
                (word) => {
                    return word.toLowerCase().includes(searchText);
                })) ||
                type.includes(searchText));
        }));
    }
}
FilterCollectionsPipe.decorators = [
    { type: Pipe, args: [{
                name: "filterCollections"
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlbumLoaderComponent {
    /**
     * @param {?} api
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getEntity(this.sourceUrl.replace("/$entityId", `/${this.entityId}`));
    }
    /**
     * @param {?} entityUrl
     * @return {?}
     */
    getEntity(entityUrl) {
        this.api.getData(entityUrl).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.source = data.data;
            this.extension = data.extension;
        }));
    }
}
AlbumLoaderComponent.decorators = [
    { type: Component, args: [{
                selector: "app-album-loader",
                template: "<div [ngSwitch]=\"extension\" class=\"wh-100 \">\n  <div *ngSwitchCase=\"'audio'\" class=\"wh-100\">\n    <app-audio-module source=\"{{ source }}\" class=\"wh-100\"> </app-audio-module>\n  </div>\n  <div *ngSwitchCase=\"'video'\" class=\"wh-100\">\n    <app-video-module source=\"{{ source }}\" class=\"wh-100\"> </app-video-module>\n  </div>\n  <div *ngSwitchCase=\"'image'\" class=\"wh-100\">\n    <app-image-module source=\"{{ source }}\" class=\"wh-100\"> </app-image-module>\n  </div>\n  <div *ngSwitchCase=\"'pdf'\" class=\"wh-100\">\n    <app-pdf-module source=\"{{ source }}\" class=\"wh-100\"> </app-pdf-module>\n  </div>\n  <div *ngSwitchCase=\"'svg'\" class=\"wh-100 \">\n    <app-svg-module source=\"{{ source }}\" class=\"wh-100 \"> </app-svg-module>\n  </div>\n  <div *ngSwitchCase=\"'youtube'\" class=\"wh-100 h-90\">\n    <app-youtube-module source=\"{{ source }}\" class=\"wh-100 \"> </app-youtube-module>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
AlbumLoaderComponent.ctorParameters = () => [
    { type: ApiService }
];
AlbumLoaderComponent.propDecorators = {
    sourceUrl: [{ type: Input }],
    entityId: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LightboxComponent {
    constructor() {
        this.noShow = new EventEmitter();
        this.loadMore = new EventEmitter();
        this.ready = 0;
        this.startSlideShow = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (typeof this.slideShow == "string") {
            this.slideShow = this.slideShow == "true";
        }
        if (typeof this.lockSlideShow == "string") {
            this.lockSlideShow = this.lockSlideShow == "true";
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.ready = 1;
        }), 1000);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.start();
    }
    /**
     * @return {?}
     */
    start() {
        if (this.ready == 1) {
            if (this.show == 1) {
                this.slideIndex = this.index;
                this.openEntityModal();
                this.currentSlide(this.slideIndex + 1);
                console.log(this.slideShow);
                if (this.slideShow == true && this.startSlideShow == false) {
                    this.startSlideShow = true;
                    setInterval((/**
                     * @return {?}
                     */
                    () => {
                        this.plusSlides(1);
                        console.log("here");
                    }), this.slideShowTimeBeforeNext);
                }
            }
        }
        else {
            setTimeout(this.start, 1000);
        }
    }
    /**
     * @return {?}
     */
    openEntityModal() {
        document.getElementById(`${this.type}Modal`).style.display = "block";
    }
    /**
     * @return {?}
     */
    closeEntityModal() {
        console.log(typeof this.lockSlideShow);
        if (this.lockSlideShow == false) {
            document.getElementById(`${this.type}Modal`).style.display = "none";
            this.noShow.emit(0);
        }
    }
    /**
     * @param {?} n
     * @return {?}
     */
    plusSlides(n) {
        this.showSlides((this.slideIndex += n));
    }
    /**
     * @param {?} n
     * @return {?}
     */
    currentSlide(n) {
        this.showSlides((this.slideIndex = n));
    }
    /**
     * @param {?} n
     * @return {?}
     */
    showSlides(n) {
        /** @type {?} */
        var i;
        /** @type {?} */
        var slides = document.getElementsByClassName(`my${this.type}Slides`);
        // console.log(slides);
        if (n > slides.length) {
            if (this.noMoreData) {
                this.slideIndex = 1;
            }
            else {
                this.loadMore.emit(true);
                this.slideIndex = this.slideIndex - 1;
            }
        }
        console.log(slides);
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i]["style"].display = "none";
        }
        slides[this.slideIndex - 1]["style"].display = "block";
    }
}
LightboxComponent.decorators = [
    { type: Component, args: [{
                selector: "app-lightbox",
                template: "<!-- Modal for displaying multimedia files -->\n<div\n  id=\"{{ type + 'Modal' }}\"\n  class=\"modalEntity  roboto-font\"\n  (swipeleft)=\"plusSlides(-1)\"\n  (swiperight)=\"plusSlides(1)\"\n>\n  <span class=\"close cursor \" (click)=\"closeEntityModal()\">&times;</span>\n  <div class=\"modalEntity-content  d-flex justify-content-center align-items-center\">\n    <div class=\"{{ 'my' + type + 'Slides' + ' wh-98' }}\" *ngFor=\"let entity of data; let i = index\">\n      <app-album-loader\n        *ngIf=\"slideIndex == i + 1\"\n        sourceUrl=\"{{ entityUrl }}\"\n        entityId=\"{{ entity.id }}\"\n      ></app-album-loader>\n    </div>\n  </div>\n  <a class=\"prev\" (click)=\"plusSlides(-1)\">&#10094;</a>\n  <a class=\"next\" (click)=\"plusSlides(1)\">&#10095;</a>\n</div>\n",
                styles: [".modalEntity{display:none;position:fixed;z-index:100000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000}.modalEntity-content{position:relative;background-color:#000;margin:auto;padding:0;width:80%;height:100%}.close{color:#fff;position:absolute;top:10px;right:25px;font-size:35px;font-weight:700}.close:focus,.close:hover{color:#999;text-decoration:none;cursor:pointer}.mySlides{display:none}.cursor{cursor:pointer}.next,.prev{cursor:pointer;position:absolute;top:50%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;transition:.6s;border-radius:0 3px 3px 0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.next{right:0;border-radius:3px 0 0 3px}.next:hover,.prev:hover{background-color:rgba(0,0,0,.8)}"]
            }] }
];
/** @nocollapse */
LightboxComponent.ctorParameters = () => [];
LightboxComponent.propDecorators = {
    data: [{ type: Input }],
    type: [{ type: Input }],
    index: [{ type: Input }],
    show: [{ type: Input }],
    noMoreData: [{ type: Input }],
    entityUrl: [{ type: Input }],
    slideShow: [{ type: Input }],
    lockSlideShow: [{ type: Input }],
    slideShowTimeBeforeNext: [{ type: Input }],
    noShow: [{ type: Output }],
    loadMore: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FilterAlbumPipe {
    /**
     * @param {?} items
     * @param {?} searchText
     * @return {?}
     */
    transform(items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLowerCase();
        return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            return (item.name.toLowerCase().includes(searchText) ||
                item.extension.toLowerCase().includes(searchText) ||
                item.keywords.split(",").some((/**
                 * @param {?} word
                 * @return {?}
                 */
                (word) => {
                    return word.toLowerCase().includes(searchText);
                })));
        }));
    }
}
FilterAlbumPipe.decorators = [
    { type: Pipe, args: [{
                name: "filterAlbum"
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StandAloneComponent {
    /**
     * @param {?} api
     */
    constructor(api) {
        this.api = api;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    loadInputOptionsOrDefault() {
        this.configPath = "../../../assets/config.json";
        if (typeof this.configPath != "undefined") {
            this.api
                .getData(this.configPath)
                .pipe(catchError((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                this.loadDefault();
                return EMPTY;
            })), take(1), map((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                console.log("here");
                return data;
            })))
                .subscribe((/**
             * @param {?} config
             * @return {?}
             */
            (config) => {
                if (typeof config["gridSize"] != "undefined" && typeof this.gridSize == "undefined") {
                    this.gridSize = config["gridSize"];
                }
                if (typeof config["gridSizeSuggestions"] != "undefined" &&
                    typeof this.gridSizeSuggestions == "undefined") {
                    this.gridSizeSuggestions = config["gridSizeSuggestions"];
                }
                if (typeof config["skip"] != "undefined" && typeof this.skip == "undefined") {
                    this.skip = config["skip"];
                }
                if (typeof config["take"] != "undefined" && typeof this.take == "undefined") {
                    this.take = config["take"];
                }
                if (typeof config["bootstrapAccentPrimary"] != "undefined" &&
                    typeof this.bootstrapAccentPrimary == "undefined") {
                    this.bootstrapAccentPrimary = config["bootstrapAccentPrimary"];
                }
                if (typeof config["bootstrapAccentSecondary"] != "undefined" &&
                    typeof this.bootstrapAccentSecondary == "undefined") {
                    this.bootstrapAccentSecondary = config["bootstrapAccentSecondary"];
                }
                if (typeof config["albumUrl"] != "undefined" && typeof this.albumUrl == "undefined") {
                    this.albumUrl = config["albumUrl"];
                }
                if (typeof config["suggestedEntityUrl"] != "undefined" &&
                    typeof this.suggestedEntityUrl == "undefined") {
                    this.suggestedEntityUrl = config["suggestedEntityUrl"];
                }
                if (typeof config["deleteEntityUrl"] != "undefined" &&
                    typeof this.deleteEntityUrl == "undefined") {
                    this.deleteEntityUrl = config["deleteEntityUrl"];
                }
                if (typeof config["addEntitiesUrl"] != "undefined" &&
                    typeof this.addEntitiesUrl == "undefined") {
                    this.addEntitiesUrl = config["addEntitiesUrl"];
                }
                if (typeof config["getEntityUrl"] != "undefined" &&
                    typeof this.getEntityUrl == "undefined") {
                    this.getEntityUrl = config["getEntityUrl"];
                }
                if (typeof config["slideShow"] != "undefined" && typeof this.slideShow == "undefined") {
                    this.slideShow = config["slideShow"];
                }
                if (typeof config["lockSlideShow"] != "undefined" &&
                    typeof this.lockSlideShow == "undefined") {
                    this.lockSlideShow = config["lockSlideShow"];
                }
                if (typeof config["slideShowTimeBeforeNext"] != "undefined" &&
                    typeof this.slideShowTimeBeforeNext == "undefined") {
                    this.slideShowTimeBeforeNext = config["slideShowTimeBeforeNext"];
                }
                this.loadDefault();
            }));
        }
        else {
            this.loadDefault();
        }
    }
    /**
     * @return {?}
     */
    loadDefault() {
        if (typeof this.gridSize == "undefined") {
            this.gridSize = 10;
        }
        if (typeof this.gridSizeSuggestions == "undefined") {
            this.gridSizeSuggestions = 3;
        }
        if (typeof this.skip == "undefined") {
            this.skip = 0;
        }
        if (typeof this.take == "undefined") {
            this.take = 10;
        }
        if (typeof this.bootstrapAccentPrimary == "undefined") {
            this.bootstrapAccentPrimary = "danger";
        }
        if (typeof this.bootstrapAccentSecondary == "undefined") {
            this.bootstrapAccentSecondary = "dark";
        }
        if (typeof this.albumUrl == "undefined") {
            this.albumUrl = "";
        }
        if (typeof this.suggestedEntityUrl == "undefined") {
            this.suggestedEntityUrl = "";
        }
        if (typeof this.deleteEntityUrl == "undefined") {
            this.deleteEntityUrl = "";
        }
        if (typeof this.addEntitiesUrl == "undefined") {
            this.addEntitiesUrl = "";
        }
        if (typeof this.getEntityUrl == "undefined") {
            this.getEntityUrl = "";
        }
        if (typeof this.slideShow == "undefined") {
            this.slideShow = false;
        }
        if (typeof this.lockSlideShow == "undefined") {
            this.lockSlideShow = false;
        }
        if (typeof this.slideShowTimeBeforeNext == "undefined") {
            this.slideShowTimeBeforeNext = 5000;
        }
        /** @type {?} */
        var albumInputs = {
            gridSize: this.gridSize,
            gridSizeSuggestions: this.gridSizeSuggestions,
            skip: this.skip,
            take: this.take,
            bootstrapAccentPrimary: this.bootstrapAccentPrimary,
            bootstrapAccentSecondary: this.bootstrapAccentSecondary,
            albumUrl: this.albumUrl,
            suggestedEntityUrl: this.suggestedEntityUrl,
            deleteEntityUrl: this.deleteEntityUrl,
            addEntitiesUrl: this.addEntitiesUrl,
            getEntityUrl: this.getEntityUrl,
            lockSlideShow: this.lockSlideShow,
            slideShow: this.slideShow,
            slideShowTimeBeforeNext: this.slideShowTimeBeforeNext
        };
        sessionStorage.setItem("albumInputs", JSON.stringify(albumInputs));
    }
}
StandAloneComponent.decorators = [
    { type: Component, args: [{
                selector: "app-stand-alone",
                template: "<app-multimedia-album class=\"w-100 h-100\"> </app-multimedia-album>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
StandAloneComponent.ctorParameters = () => [
    { type: ApiService }
];
StandAloneComponent.propDecorators = {
    gridSize: [{ type: Input }],
    gridSizeSuggestions: [{ type: Input }],
    skip: [{ type: Input }],
    take: [{ type: Input }],
    albumUrl: [{ type: Input }],
    suggestedEntityUrl: [{ type: Input }],
    deleteEntityUrl: [{ type: Input }],
    addEntitiesUrl: [{ type: Input }],
    getEntityUrl: [{ type: Input }],
    slideShow: [{ type: Input }],
    lockSlideShow: [{ type: Input }],
    slideShowTimeBeforeNext: [{ type: Input }],
    configPath: [{ type: Input }],
    bootstrapAccentPrimary: [{ type: Input }],
    bootstrapAccentSecondary: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UploadComponent {
    /**
     * @param {?} api
     */
    constructor(api) {
        this.api = api;
        this.newData = new EventEmitter();
        this.discarded = new EventEmitter();
        this.$ = $_;
        this.imageFormats = ["jpeg", "jpg", "png", "webp", "gif"];
        this.videoFormats = ["webm", "ogv", "mp4"];
        this.audioFormats = ["mp3", "wave", "ogg", "oga"];
        this.bypassCors = "http://cors-anywhere.herokuapp.com/";
        this.arrayOfEntityAndPlaceholder = [];
        this.urlInput = "";
        this.urlInputClass = "";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.makeUploadArea();
        // setInterval(() => {
        //   console.log(this.arrayOfEntityAndPlaceholder);
        // }, 1000);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.upload == true) {
            this.uploadFiles();
        }
        if (this.cancel == true) {
            this.uploadFiles();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { }
    /**
     * @param {?} entity
     * @return {?}
     */
    discardFile(entity) {
        this.arrayOfEntityAndPlaceholder = this.arrayOfEntityAndPlaceholder.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item != entity));
        console.log(this.arrayOfEntityAndPlaceholder);
    }
    /**
     * @return {?}
     */
    discardChanges() {
        this.arrayOfEntityAndPlaceholder = [];
        this.discarded.emit(0);
    }
    /**
     * @return {?}
     */
    uploadFiles() {
        console.log(this.addEntitiesUrl);
        console.log(this.arrayOfEntityAndPlaceholder);
        /** @type {?} */
        var sendData = [];
        /** @type {?} */
        var totalStorage = 0;
        this.arrayOfEntityAndPlaceholder.forEach((/**
         * @param {?} entity
         * @return {?}
         */
        (entity) => {
            console.log(entity.fileSize);
            if (entity.fileSize <= 21) {
                if (totalStorage <= 21 && totalStorage + entity.fileSize <= 21) {
                    sendData.push(entity);
                    totalStorage += entity.fileSize;
                }
                else {
                    this.postData(sendData);
                    totalStorage = 0;
                    sendData = [];
                    sendData.push(entity);
                    totalStorage += entity.fileSize;
                }
            }
        }));
        if (sendData.length > 0) {
            this.postData(sendData);
        }
        this.arrayOfEntityAndPlaceholder = [];
    }
    /**
     * @param {?} sendData
     * @return {?}
     */
    postData(sendData) {
        this.api
            .postData(this.addEntitiesUrl, sendData)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            for (var i = 0; i < sendData.length; i++) {
                sendData[i]["entityFile"] = null;
                sendData[i]["id"] = data[i]["id"];
            }
            this.newData.emit(sendData);
        }));
    }
    /**
     * @return {?}
     */
    makeUploadArea() {
        $("#uploadModal").on({
            "dragover dragenter": (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                e.preventDefault();
                e.stopPropagation();
            }),
            drop: (/**
             * @param {?} e
             * @param {?} ui
             * @return {?}
             */
            (e, ui) => {
                /** @type {?} */
                var dataTransfer = e.originalEvent["dataTransfer"];
                console.log(dataTransfer);
                if (dataTransfer && dataTransfer.files.length) {
                    console.log(dataTransfer);
                    e.preventDefault();
                    e.stopPropagation();
                    this.readUploadedFilesAndGetPlaceholders(dataTransfer.files, this.collectionId);
                }
            })
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    uploadFilesFromButton(event) {
        this.readUploadedFilesAndGetPlaceholders(event.target.files, this.collectionId);
    }
    /**
     * @param {?} e
     * @param {?} collectionId
     * @return {?}
     */
    readUploadedFilesAndGetPlaceholders(e, collectionId) {
        /** @type {?} */
        const width = 200;
        /** @type {?} */
        const height = 200;
        console.log(e);
        Object.keys(e).forEach((/**
         * @param {?} file
         * @return {?}
         */
        (file) => {
            console.log(e[file]);
            console.log(e[file].name);
            /** @type {?} */
            const fileName = e[file].name;
            /** @type {?} */
            const fileSize = e[file].size / 1024000;
            /** @type {?} */
            const reader = new FileReader();
            reader.readAsDataURL(e[file]);
            (reader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                var readerMetaData = event.target["result"].split(";")[0];
                if (readerMetaData.includes("image") && readerMetaData.includes("svg")) {
                    this.imageData(event.target["result"], width, height, "svg", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("image") && !readerMetaData.includes("svg")) {
                    this.imageData(event.target["result"], width, height, "image", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("audio")) {
                    this.audioData(event.target["result"], width, height, "audio", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("video")) {
                    this.videoData(event.target["result"], width, height, "video", fileName, 0, collectionId, fileSize);
                }
                if (readerMetaData.includes("pdf")) {
                    this.pdfData(event.target["result"], width, height, "pdf", fileName, 0, collectionId, fileSize);
                }
                console.log(this.arrayOfEntityAndPlaceholder);
            })),
                (reader.onerror = (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => console.log(error)));
        }));
    }
    /**
     * @return {?}
     */
    scrapUrl() {
        this.getPlaceholderFromUrl(this.collectionId);
    }
    /**
     * @param {?} collectionId
     * @return {?}
     */
    getPlaceholderFromUrl(collectionId) {
        /** @type {?} */
        const width = 200;
        /** @type {?} */
        const height = 200;
        /** @type {?} */
        var url = this.urlInput.split("?")[0];
        /** @type {?} */
        var extensionArr = url.split(".");
        /** @type {?} */
        var extension = extensionArr[extensionArr.length - 1];
        /** @type {?} */
        var fileSize = 0.05;
        /** @type {?} */
        var fileName = "File From Url";
        if (typeof url != "undefined") {
            if (this.imageFormats.includes(extension) ||
                this.audioFormats.includes(extension) ||
                this.videoFormats.includes(extension) ||
                extension == "pdf" ||
                extension == "svg" ||
                url.includes("youtube")) {
                if (extension == "svg") {
                    this.imageData(url, width, height, "svg", fileName, 1, collectionId, fileSize);
                }
                if (this.imageFormats.includes(extension)) {
                    this.imageData(url, width, height, "image", fileName, 1, collectionId, fileSize);
                }
                if (this.audioFormats.includes(extension)) {
                    this.audioData(url, width, height, "audio", fileName, 1, collectionId, fileSize);
                }
                if (this.videoFormats.includes(extension)) {
                    this.videoData(url, width, height, "video", fileName, 1, collectionId, fileSize);
                }
                if (extension == "pdf") {
                    this.pdfData(url, width, height, "pdf", fileName, 1, collectionId, fileSize);
                }
                if (url.includes("youtube")) {
                    this.youtubeData(this.urlInput, width, height, "youtube", fileName, 1, collectionId, fileSize);
                }
                this.urlInputClass = "";
            }
            else {
                this.urlInputClass = "text-danger";
            }
        }
        else {
            this.urlInputClass = "text-danger";
        }
        this.urlInput = "";
    }
    /**
     * @param {?} data
     * @param {?} canvas
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize) {
        return {
            name: fileName.split(".")[0],
            data: canvas.toDataURL("image/jpeg", 1),
            collectionId: collectionId,
            extension: extension,
            keywords: "",
            fileSize: fileSize,
            entityFile: [
                {
                    name: fileName,
                    extension: extension,
                    isUrl: isUrl,
                    data: data
                }
            ]
        };
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    imageData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        const img = new Image();
        if (isUrl == 1) {
            img.crossOrigin = "Anonymous";
            img.src = this.bypassCors + data;
        }
        else {
            img.src = data;
        }
        img.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
            console.log(this.arrayOfEntityAndPlaceholder);
        });
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    audioData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        const img = new Image();
        img.src = "../../../assets/music-icon.jpg";
        img.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
        });
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    pdfData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        var dataBypass;
        if (isUrl == 1) {
            dataBypass = this.bypassCors + data;
        }
        else {
            dataBypass = data;
        }
        getDocument(dataBypass).then((/**
         * @param {?} pdf
         * @return {?}
         */
        (pdf) => {
            pdf.getPage(1).then((/**
             * @param {?} page
             * @return {?}
             */
            (page) => {
                /** @type {?} */
                var canvas = document.createElement("canvas");
                /** @type {?} */
                var viewport = page.getViewport(1.0);
                /** @type {?} */
                var context = canvas.getContext("2d");
                canvas.height = height;
                canvas.width = width;
                page
                    .render({
                    canvasContext: context,
                    viewport: viewport
                })
                    .then((/**
                 * @return {?}
                 */
                () => {
                    this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
                }));
            }));
        }));
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    videoData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        const video = document.createElement("video");
        if (isUrl == 1) {
            video.crossOrigin = "Anonymous";
            video.src = this.bypassCors + data;
        }
        else {
            video.src = data;
        }
        video.onloadeddata = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(video, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
        });
    }
    /**
     * @param {?} data
     * @param {?} width
     * @param {?} height
     * @param {?} extension
     * @param {?} fileName
     * @param {?} isUrl
     * @param {?} collectionId
     * @param {?} fileSize
     * @return {?}
     */
    youtubeData(data, width, height, extension, fileName, isUrl, collectionId, fileSize) {
        /** @type {?} */
        var url = "https://img.youtube.com/vi/" + data.split("/watch?v=")[1] + "/0.jpg";
        /** @type {?} */
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = this.bypassCors + url;
        img.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            this.arrayOfEntityAndPlaceholder.push(this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId, fileSize));
        });
    }
}
UploadComponent.decorators = [
    { type: Component, args: [{
                selector: "app-upload",
                template: "<div id=\"uploadModal\" class=\"w-100 h-100 h-min-300px roboto-font\">\n  <div class=\"d-flex flex-wrap align-items-center justify-content-between\">\n    <div class=\"d-flex  flex-nowrap w-resizable-70 mb-1\">\n      <input\n        type=\"text\"\n        [(ngModel)]=\"urlInput\"\n        class=\"form-control mr-1 {{ urlInputClass }}\"\n        data-toggle=\"tooltip\"\n        title=\"The url must end with a known file extension\"\n      />\n      <button class=\"btn btn-{{ bootstrapAccentSecondary }} w-min-100px\" (click)=\"scrapUrl()\">\n        Insert Url\n      </button>\n    </div>\n    <div class=\"d-flex  flex-nowrap justify-content-end w-resizable-30 mb-1\">\n      <input hidden type=\"file\" #uploader (change)=\"uploadFilesFromButton($event)\" multiple />\n      <button class=\"btn btn-{{ bootstrapAccentSecondary }}\" (click)=\"uploader.click()\">\n        Select Files\n      </button>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let entity of arrayOfEntityAndPlaceholder; let i = index\"\n    class=\"d-flex flex-nowrap  align-items-center w-100 mb-2\"\n  >\n    <div class=\"d-flex flex-wrap  align-items-center mr-1\">\n      <input\n        [(ngModel)]=\"arrayOfEntityAndPlaceholder[i].name\"\n        placeholder=\"Name\"\n        class=\"{{ entity.fileSize > 21 ? 'text-danger' : '' }} form-control\"\n      />\n      <input\n        [(ngModel)]=\"arrayOfEntityAndPlaceholder[i].keywords\"\n        placeholder=\"Keyword1,Keyword2,Keyword3\"\n        class=\"{{ entity.fileSize > 21 ? 'text-danger' : '' }} form-control\"\n      />\n    </div>\n    <div class=\"d-flex  flex-nowrap justify-content-end w-min-100px \">\n      <button class=\"btn btn-danger\" (click)=\"discardFile(entity)\">\n        Discard File\n      </button>\n    </div>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
UploadComponent.ctorParameters = () => [
    { type: ApiService }
];
UploadComponent.propDecorators = {
    upload: [{ type: Input }],
    cancel: [{ type: Input }],
    collectionId: [{ type: Input }],
    addEntitiesUrl: [{ type: Input }],
    bootstrapAccentSecondary: [{ type: Input }],
    newData: [{ type: Output }],
    discarded: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AudioModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
AudioModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-audio-module",
                template: "<audio style=\"height:100%;width:100%;border: 0px;\" controls>\n  <source [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\" />\n</audio>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
AudioModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
AudioModuleComponent.propDecorators = {
    source: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
ImageModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-image-module",
                template: "<img\n  [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\"\n  style=\"height:100%;width:100%;border: 0px;\"\n/>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ImageModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
ImageModuleComponent.propDecorators = {
    source: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VideoModuleComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
VideoModuleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-video-module",
                template: "<video style=\"height:100%;width:100%;border: 0px;\" controls>\n  <source [src]=\"sanitizer.bypassSecurityTrustResourceUrl(source)\" />\n</video>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
VideoModuleComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
VideoModuleComponent.propDecorators = {
    source: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMultiMediaAlbumManagementModule {
}
NgxMultiMediaAlbumManagementModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgxMultiMediaAlbumManagementComponent,
                    MultimediaAlbumComponent,
                    CollectionOfMultimediaAlbumsComponent,
                    AlbumLoaderComponent,
                    ImageModuleComponent,
                    VideoModuleComponent,
                    AudioModuleComponent,
                    FilterCollectionsPipe,
                    FilterAlbumPipe,
                    StandAloneComponent,
                    LightboxComponent,
                    UploadComponent
                ],
                imports: [
                    BrowserModule,
                    AppRoutingModule,
                    FormsModule,
                    ReactiveFormsModule,
                    HttpClientModule,
                    SpeechModule,
                    PdfModuleModule,
                    SvgModuleModule,
                    YoutubeModuleModule
                ],
                providers: [
                    { provide: APP_BASE_HREF, useValue: "/" },
                    { provide: "SPEECH_LANG", useValue: "en-US" }
                ],
                exports: [CollectionOfMultimediaAlbumsComponent, StandAloneComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxMultiMediaAlbumManagementComponent, NgxMultiMediaAlbumManagementModule, AppRoutingModule as ɵo, CollectionOfMultimediaAlbumsComponent as ɵe, FilterCollectionsPipe as ɵj, AlbumLoaderComponent as ɵf, LightboxComponent as ɵm, MultimediaAlbumComponent as ɵa, FilterAlbumPipe as ɵk, StandAloneComponent as ɵl, UploadComponent as ɵn, ApiService as ɵb, SnakeService as ɵc, AudioModuleComponent as ɵi, ImageModuleComponent as ɵg, VideoModuleComponent as ɵh, FloatingMicrophoneService as ɵd };

//# sourceMappingURL=ngx-multi-media-album-management.js.map