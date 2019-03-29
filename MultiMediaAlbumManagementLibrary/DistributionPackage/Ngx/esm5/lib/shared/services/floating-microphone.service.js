/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as Hammer from 'hammerjs';
import * as i0 from "@angular/core";
var FloatingMicrophoneService = /** @class */ (function () {
    function FloatingMicrophoneService() {
    }
    // if it doesn't work right, remove touch events and uncomment prevent default
    // if it doesn't work right, remove touch events and uncomment prevent default
    /**
     * @param {?} speechComponent
     * @return {?}
     */
    FloatingMicrophoneService.prototype.makeFloatingMicrophone = 
    // if it doesn't work right, remove touch events and uncomment prevent default
    /**
     * @param {?} speechComponent
     * @return {?}
     */
    function (speechComponent) {
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
    };
    /**
     * @return {?}
     */
    FloatingMicrophoneService.prototype.touchInputsListeners = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elem = document.getElementById("floatingMicrophone");
        /** @type {?} */
        var mc = new Hammer(elem);
        mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
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
    };
    FloatingMicrophoneService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] }
    ];
    /** @nocollapse */
    FloatingMicrophoneService.ctorParameters = function () { return []; };
    /** @nocollapse */ FloatingMicrophoneService.ngInjectableDef = i0.defineInjectable({ factory: function FloatingMicrophoneService_Factory() { return new FloatingMicrophoneService(); }, token: FloatingMicrophoneService, providedIn: "root" });
    return FloatingMicrophoneService;
}());
export { FloatingMicrophoneService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbWljcm9waG9uZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2Zsb2F0aW5nLW1pY3JvcGhvbmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQzs7QUFFbkM7SUFJRTtJQUFlLENBQUM7SUFFaEIsOEVBQThFOzs7Ozs7SUFDOUUsMERBQXNCOzs7Ozs7SUFBdEIsVUFBdUIsZUFBZTs7WUFDaEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7O1lBQ3BELFFBQVEsR0FBRyxLQUFLOztZQUNoQixNQUFNLEdBQUcsZUFBZTs7WUFDeEIsSUFBSSxHQUFHLENBQUM7O1lBQ1YsSUFBSSxHQUFHLENBQUM7O1lBQ1IsSUFBSSxHQUFHLENBQUM7O1lBQ1IsSUFBSSxHQUFHLENBQUM7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7U0FDbEM7UUFDRCxJQUNFLGdFQUFnRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQzFGO1lBQ0EsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7Ozs7UUFFRCxTQUFTLFNBQVM7WUFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFj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QzNCOztnQkFDRyxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFROztnQkFDM0IsSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEdBQUcsUUFBUTtZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNkLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDcEI7UUFDSCxDQUFDO0lBQ0gsQ0FBQzs7Z0JBckdGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O29DQUxEO0NBeUdDLEFBdEdELElBc0dDO1NBbkdZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tICdoYW1tZXJqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdNaWNyb3Bob25lU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBpZiBpdCBkb2Vzbid0IHdvcmsgcmlnaHQsIHJlbW92ZSB0b3VjaCBldmVudHMgYW5kIHVuY29tbWVudCBwcmV2ZW50IGRlZmF1bHRcbiAgbWFrZUZsb2F0aW5nTWljcm9waG9uZShzcGVlY2hDb21wb25lbnQpIHtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXRpbmdNaWNyb3Bob25lXCIpO1xuICAgIHZhciBtb3ZlRmxhZyA9IGZhbHNlO1xuICAgIHZhciBzcGVlY2ggPSBzcGVlY2hDb21wb25lbnQ7XG4gICAgdmFyIHBvczEgPSAwLFxuICAgICAgcG9zMiA9IDAsXG4gICAgICBwb3MzID0gMCxcbiAgICAgIHBvczQgPSAwO1xuICAgIGVsZW0uc3R5bGUudG9wID0gd2luZG93LmlubmVySGVpZ2h0IC0gNzUgKyBcInB4XCI7XG4gICAgZWxlbS5zdHlsZS5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLSA3NSArIFwicHhcIjtcbiAgICBpZiAoZWxlbSkge1xuICAgICAgZWxlbS5vbm1vdXNlZG93biA9IGRyYWdNb3VzZURvd247XG4gICAgfVxuICAgIGlmIChcbiAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuICAgICkge1xuICAgICAgdGhpcy50b3VjaElucHV0c0xpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU1pYygpIHtcbiAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcIm5vdFJlY29yZGluZ1wiKSkge1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJub3RSZWNvcmRpbmdcIik7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcInJlY29yZGluZ1wiKTtcbiAgICAgICAgc3BlZWNoLnN0YXJ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJyZWNvcmRpbmdcIik7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcIm5vdFJlY29yZGluZ1wiKTtcbiAgICAgICAgc3BlZWNoLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGUpIHtcbiAgICAgIG1vdmVGbGFnID0gZmFsc2U7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBnZXQgdGhlIG1vdXNlIGN1cnNvciBwb3NpdGlvbiBhdCBzdGFydHVwOlxuICAgICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBjbG9zZURyYWdFbGVtZW50O1xuXG4gICAgICAvLyBjYWxsIGEgZnVuY3Rpb24gd2hlbmV2ZXIgdGhlIGN1cnNvciBtb3ZlczpcbiAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZWxlbWVudERyYWc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWxlbWVudERyYWcoZSkge1xuICAgICAgbW92ZUZsYWcgPSB0cnVlO1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY2FsY3VsYXRlIHRoZSBuZXcgY3Vyc29yIHBvc2l0aW9uOlxuICAgICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgLy8gc2V0IHRoZSBlbGVtZW50J3MgbmV3IHBvc2l0aW9uOlxuICAgICAgZWxlbS5zdHlsZS50b3AgPSBlbGVtLm9mZnNldFRvcCAtIHBvczIgKyBcInB4XCI7XG4gICAgICBlbGVtLnN0eWxlLmxlZnQgPSBlbGVtLm9mZnNldExlZnQgLSBwb3MxICsgXCJweFwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoKSB7XG4gICAgICAvKiBzdG9wIG1vdmluZyB3aGVuIG1vdXNlIGJ1dHRvbiBpcyByZWxlYXNlZDoqL1xuICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcblxuICAgICAgaWYgKG1vdmVGbGFnID09IGZhbHNlKSB7XG4gICAgICAgIHRvZ2dsZU1pYygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRvdWNoSW5wdXRzTGlzdGVuZXJzKCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdGluZ01pY3JvcGhvbmVcIik7XG5cbiAgICB2YXIgbWMgPSBuZXcgSGFtbWVyKGVsZW0pO1xuICAgIG1jLmFkZChuZXcgSGFtbWVyLlBhbih7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwsIHRocmVzaG9sZDogMCB9KSk7XG4gICAgbWMub24oXCJwYW5cIiwgaGFuZGxlRHJhZyk7XG5cbiAgICAvLyBkcmFnIGV2ZW50XG4gICAgdmFyIGxhc3RQb3NYID0gMDtcbiAgICB2YXIgbGFzdFBvc1kgPSAwO1xuICAgIHZhciBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gaGFuZGxlRHJhZyhldikge1xuICAgICAgaWYgKCFpc0RyYWdnaW5nKSB7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBsYXN0UG9zWCA9IGVsZW0ub2Zmc2V0TGVmdDtcbiAgICAgICAgbGFzdFBvc1kgPSBlbGVtLm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICAgIHZhciBwb3NYID0gZXYuZGVsdGFYICsgbGFzdFBvc1g7XG4gICAgICB2YXIgcG9zWSA9IGV2LmRlbHRhWSArIGxhc3RQb3NZO1xuICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gcG9zWCArIFwicHhcIjtcbiAgICAgIGVsZW0uc3R5bGUudG9wID0gcG9zWSArIFwicHhcIjtcbiAgICAgIGlmIChldi5pc0ZpbmFsKSB7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==