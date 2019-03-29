/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as Hammer from 'hammerjs';
import * as i0 from "@angular/core";
export class FloatingMicrophoneService {
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
    }
}
FloatingMicrophoneService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] }
];
/** @nocollapse */
FloatingMicrophoneService.ctorParameters = () => [];
/** @nocollapse */ FloatingMicrophoneService.ngInjectableDef = i0.defineInjectable({ factory: function FloatingMicrophoneService_Factory() { return new FloatingMicrophoneService(); }, token: FloatingMicrophoneService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctbWljcm9waG9uZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW11bHRpLW1lZGlhLWFsYnVtLW1hbmFnZW1lbnQvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3NlcnZpY2VzL2Zsb2F0aW5nLW1pY3JvcGhvbmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQzs7QUFLbkMsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxnQkFBZSxDQUFDOzs7Ozs7SUFHaEIsc0JBQXNCLENBQUMsZUFBZTs7WUFDaEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7O1lBQ3BELFFBQVEsR0FBRyxLQUFLOztZQUNoQixNQUFNLEdBQUcsZUFBZTs7WUFDeEIsSUFBSSxHQUFHLENBQUM7O1lBQ1YsSUFBSSxHQUFHLENBQUM7O1lBQ1IsSUFBSSxHQUFHLENBQUM7O1lBQ1IsSUFBSSxHQUFHLENBQUM7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7U0FDbEM7UUFDRCxJQUNFLGdFQUFnRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQzFGO1lBQ0EsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7Ozs7UUFFRCxTQUFTLFNBQVM7WUFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMs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SSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEdBQUcsUUFBUTs7Z0JBQzNCLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFHLFFBQVE7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQztJQUNILENBQUM7OztZQXJHRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBIYW1tZXIgZnJvbSAnaGFtbWVyanMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nTWljcm9waG9uZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gaWYgaXQgZG9lc24ndCB3b3JrIHJpZ2h0LCByZW1vdmUgdG91Y2ggZXZlbnRzIGFuZCB1bmNvbW1lbnQgcHJldmVudCBkZWZhdWx0XG4gIG1ha2VGbG9hdGluZ01pY3JvcGhvbmUoc3BlZWNoQ29tcG9uZW50KSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0aW5nTWljcm9waG9uZVwiKTtcbiAgICB2YXIgbW92ZUZsYWcgPSBmYWxzZTtcbiAgICB2YXIgc3BlZWNoID0gc3BlZWNoQ29tcG9uZW50O1xuICAgIHZhciBwb3MxID0gMCxcbiAgICAgIHBvczIgPSAwLFxuICAgICAgcG9zMyA9IDAsXG4gICAgICBwb3M0ID0gMDtcbiAgICBlbGVtLnN0eWxlLnRvcCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDc1ICsgXCJweFwiO1xuICAgIGVsZW0uc3R5bGUubGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gNzUgKyBcInB4XCI7XG4gICAgaWYgKGVsZW0pIHtcbiAgICAgIGVsZW0ub25tb3VzZWRvd24gPSBkcmFnTW91c2VEb3duO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgIHRoaXMudG91Y2hJbnB1dHNMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVNaWMoKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJub3RSZWNvcmRpbmdcIikpIHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwibm90UmVjb3JkaW5nXCIpO1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJyZWNvcmRpbmdcIik7XG4gICAgICAgIHNwZWVjaC5zdGFydCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwicmVjb3JkaW5nXCIpO1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJub3RSZWNvcmRpbmdcIik7XG4gICAgICAgIHNwZWVjaC5zdG9wKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ01vdXNlRG93bihlKSB7XG4gICAgICBtb3ZlRmxhZyA9IGZhbHNlO1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gZ2V0IHRoZSBtb3VzZSBjdXJzb3IgcG9zaXRpb24gYXQgc3RhcnR1cDpcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gY2xvc2VEcmFnRWxlbWVudDtcblxuICAgICAgLy8gY2FsbCBhIGZ1bmN0aW9uIHdoZW5ldmVyIHRoZSBjdXJzb3IgbW92ZXM6XG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGVsZW1lbnREcmFnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGUpIHtcbiAgICAgIG1vdmVGbGFnID0gdHJ1ZTtcbiAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbmV3IGN1cnNvciBwb3NpdGlvbjpcbiAgICAgIHBvczEgPSBwb3MzIC0gZS5jbGllbnRYO1xuICAgICAgcG9zMiA9IHBvczQgLSBlLmNsaWVudFk7XG4gICAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICAgIC8vIHNldCB0aGUgZWxlbWVudCdzIG5ldyBwb3NpdGlvbjpcbiAgICAgIGVsZW0uc3R5bGUudG9wID0gZWxlbS5vZmZzZXRUb3AgLSBwb3MyICsgXCJweFwiO1xuICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gZWxlbS5vZmZzZXRMZWZ0IC0gcG9zMSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KCkge1xuICAgICAgLyogc3RvcCBtb3Zpbmcgd2hlbiBtb3VzZSBidXR0b24gaXMgcmVsZWFzZWQ6Ki9cbiAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG5cbiAgICAgIGlmIChtb3ZlRmxhZyA9PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGVNaWMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b3VjaElucHV0c0xpc3RlbmVycygpIHtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXRpbmdNaWNyb3Bob25lXCIpO1xuXG4gICAgdmFyIG1jID0gbmV3IEhhbW1lcihlbGVtKTtcbiAgICBtYy5hZGQobmV3IEhhbW1lci5QYW4oeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMLCB0aHJlc2hvbGQ6IDAgfSkpO1xuICAgIG1jLm9uKFwicGFuXCIsIGhhbmRsZURyYWcpO1xuXG4gICAgLy8gZHJhZyBldmVudFxuICAgIHZhciBsYXN0UG9zWCA9IDA7XG4gICAgdmFyIGxhc3RQb3NZID0gMDtcbiAgICB2YXIgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIGhhbmRsZURyYWcoZXYpIHtcbiAgICAgIGlmICghaXNEcmFnZ2luZykge1xuICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgbGFzdFBvc1ggPSBlbGVtLm9mZnNldExlZnQ7XG4gICAgICAgIGxhc3RQb3NZID0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICB9XG4gICAgICB2YXIgcG9zWCA9IGV2LmRlbHRhWCArIGxhc3RQb3NYO1xuICAgICAgdmFyIHBvc1kgPSBldi5kZWx0YVkgKyBsYXN0UG9zWTtcbiAgICAgIGVsZW0uc3R5bGUubGVmdCA9IHBvc1ggKyBcInB4XCI7XG4gICAgICBlbGVtLnN0eWxlLnRvcCA9IHBvc1kgKyBcInB4XCI7XG4gICAgICBpZiAoZXYuaXNGaW5hbCkge1xuICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=