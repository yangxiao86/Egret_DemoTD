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
        var HScrollBar = (function (_super) {
            __extends(HScrollBar, _super);
            function HScrollBar() {
                _super.apply(this, arguments);
                this._thumbLengthRatio = 1;
            }
            HScrollBar.prototype._setViewportMetric = function (width, contentWidth) {
                var max = Math.max(0, contentWidth - width);
                this._setMaximun(max);
                this._setMinimun(0);
                this._thumbLengthRatio = (contentWidth > width) ? width / contentWidth : 1;
            };
            Object.defineProperty(HScrollBar.prototype, "trackAlpha", {
                get: function () {
                    return 1;
                },
                set: function (value) {
                    egret.Logger.warningWithErrorId(1016, "HScrollBar.trackAlpha");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HScrollBar.prototype, "thumbAlpha", {
                get: function () {
                    return 1;
                },
                set: function (value) {
                    egret.Logger.warningWithErrorId(1016, "HScrollBar.thumbAlpha");
                },
                enumerable: true,
                configurable: true
            });
            HScrollBar.prototype.setPosition = function (value) {
                this._setValue(value);
            };
            HScrollBar.prototype.getPosition = function () {
                return this._getValue();
            };
            HScrollBar.prototype._setValue = function (value) {
                value = Math.max(0, value);
                _super.prototype._setValue.call(this, value);
            };
            HScrollBar.prototype.setValue = function (value) {
                _super.prototype.setValue.call(this, value);
            };
            HScrollBar.prototype._animationUpdateHandler = function (animation) {
                this.pendingValue = animation.currentValue["value"];
                this.value = animation.currentValue["value"];
                this.dispatchEventWith(egret.Event.CHANGE);
            };
            HScrollBar.prototype.updateSkinDisplayList = function () {
                if (!this.thumb || !this.track)
                    return;
                var thumbWidth = this.track.layoutBoundsWidth * this._thumbLengthRatio;
                var oldThumbWidth = this.thumb.layoutBoundsWidth;
                var thumbRange = this.track.layoutBoundsWidth - this.thumb.layoutBoundsWidth;
                var range = this.maximum - this.minimum;
                var thumbPosTrackX = (range > 0) ? ((this.pendingValue - this.minimum) / range) * thumbRange : 0;
                var thumbPos = this.track.localToGlobal(thumbPosTrackX, 0);
                var thumbPosX = thumbPos.x;
                var thumbPosY = thumbPos.y;
                var thumbPosParentX = this.thumb.parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).x;
                this.thumb.setLayoutBoundsPosition(Math.round(thumbPosParentX), this.thumb.layoutBoundsY);
                if (thumbWidth != oldThumbWidth)
                    this.thumb.setLayoutBoundsSize(thumbWidth, this.thumb.layoutBoundsHeight);
            };
            return HScrollBar;
        })(gui.HSlider);
        gui.HScrollBar = HScrollBar;
        HScrollBar.prototype.__class__ = "egret.gui.HScrollBar";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
