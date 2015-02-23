/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var gui;
    (function (gui) {
        var VScrollBar = (function (_super) {
            __extends(VScrollBar, _super);
            function VScrollBar() {
                _super.call(this);
                this._thumbLengthRatio = 1;
            }
            VScrollBar.prototype._setViewportMetric = function (height, contentHeight) {
                var max = Math.max(0, contentHeight - height);
                this._thumbLengthRatio = contentHeight <= height ? 1 : height / contentHeight;
                this._setMaximun(max);
                this._setMinimun(0);
            };
            Object.defineProperty(VScrollBar.prototype, "trackAlpha", {
                get: function () {
                    return 1;
                },
                set: function (value) {
                    egret.Logger.warningWithErrorId(1016, "VScrollBar.trackAlpha");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VScrollBar.prototype, "thumbAlpha", {
                get: function () {
                    return 1;
                },
                set: function (value) {
                    egret.Logger.warningWithErrorId(1016, "VScrollBar.thumbAlpha");
                },
                enumerable: true,
                configurable: true
            });
            VScrollBar.prototype.setPosition = function (value) {
                this._setValue(value);
            };
            VScrollBar.prototype.getPosition = function () {
                return this._getValue();
            };
            VScrollBar.prototype._setValue = function (value) {
                value = Math.max(0, value);
                _super.prototype._setValue.call(this, value);
            };
            VScrollBar.prototype.setValue = function (value) {
                _super.prototype.setValue.call(this, value);
            };
            VScrollBar.prototype._animationUpdateHandler = function (animation) {
                this.pendingValue = animation.currentValue["value"];
                this.value = animation.currentValue["value"];
                this.dispatchEventWith(egret.Event.CHANGE);
            };
            /**
             * @param x {number}
             * @param y {number}
             * @returns {number}
             */
            VScrollBar.prototype.pointToValue = function (x, y) {
                if (!this.thumb || !this.track)
                    return 0;
                var range = this.maximum - this.minimum;
                var thumbRange = this.track.layoutBoundsHeight - this.thumb.layoutBoundsHeight;
                return this.minimum + ((thumbRange != 0) ? (y / thumbRange) * range : 0);
            };
            VScrollBar.prototype.updateSkinDisplayList = function () {
                if (!this.thumb || !this.track)
                    return;
                var thumbHeight = this.track.layoutBoundsHeight * this._thumbLengthRatio;
                var oldThumbHeight = this.thumb.layoutBoundsHeight;
                var thumbRange = this.track.layoutBoundsHeight - thumbHeight;
                var range = this.maximum - this.minimum;
                var thumbPosTrackY = (range > 0) ? ((this.pendingValue - this.minimum) / range) * thumbRange : 0;
                var thumbPos = this.track.localToGlobal(0, thumbPosTrackY);
                var thumbPosX = thumbPos.x;
                var thumbPosY = thumbPos.y;
                var thumbPosParentY = this.thumb.parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).y;
                this.thumb.setLayoutBoundsPosition(this.thumb.layoutBoundsX, Math.round(thumbPosParentY));
                if (thumbHeight != oldThumbHeight)
                    this.thumb.setLayoutBoundsSize(this.thumb.layoutBoundsWidth, thumbHeight);
            };
            return VScrollBar;
        })(gui.VSlider);
        gui.VScrollBar = VScrollBar;
        VScrollBar.prototype.__class__ = "egret.gui.VScrollBar";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
