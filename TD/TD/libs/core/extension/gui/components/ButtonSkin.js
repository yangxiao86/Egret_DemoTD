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
        /**
         * @class egret.gui.StateSkin
         * @classdesc
         * 按钮组件的快速皮肤模板，能够快速制定哪个状态显示那个资源，实例化一次性专用的按钮皮肤。
         * @extends egret.gui.Skin
         */
        var ButtonSkin = (function (_super) {
            __extends(ButtonSkin, _super);
            /**
             * 构造函数
             * @method egret.gui.StateSkin#constructor
             * @param upSkinName {any} 按钮弹起状态的要显示的资源名
             * @param downSkinName {any} 按钮按下状态的要显示的资源名
             * @param disabledSkinName {any} 按钮禁用状态的要显示的资源名
             */
            function ButtonSkin(upSkinName, downSkinName, disabledSkinName) {
                if (upSkinName === void 0) { upSkinName = null; }
                if (downSkinName === void 0) { downSkinName = null; }
                if (disabledSkinName === void 0) { disabledSkinName = null; }
                _super.call(this);
                this.labelDisplay = new egret.gui.Label();
                this.iconDisplay = new egret.gui.UIAsset();
                var stateMap = {};
                stateMap["up"] = upSkinName;
                stateMap["down"] = downSkinName;
                stateMap["disabled"] = disabledSkinName;
                this.stateMap = stateMap;
                this._setStates(["up", "down", "disabled"]);
            }
            Object.defineProperty(ButtonSkin.prototype, "skinParts", {
                get: function () {
                    return ButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            ButtonSkin.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                var asset = new gui.UIAsset();
                asset.left = asset.top = asset.bottom = asset.right = 0;
                this.addElement(asset);
                this.backgroundAsset = asset;
                this.iconDisplay.includeInLayout = false;
                this.addElement(this.iconDisplay);
                this.labelDisplay.includeInLayout = false;
                this.labelDisplay.paddingLeft = 5;
                this.labelDisplay.paddingRight = 5;
                this.addElement(this.labelDisplay);
            };
            /**
             * @inheritDoc
             */
            ButtonSkin.prototype.commitCurrentState = function () {
                _super.prototype.commitCurrentState.call(this);
                var state = this.currentState;
                var source = this.stateMap[state];
                if (source) {
                    this.backgroundAsset.source = this.stateMap[state];
                }
            };
            ButtonSkin.prototype.measure = function () {
                _super.prototype.measure.call(this);
                var w = this.iconDisplay.preferredWidth + this.labelDisplay.preferredWidth + 20;
                var h = Math.max(this.iconDisplay.preferredHeight, this.labelDisplay.preferredHeight) + 20;
                if (w > this.measuredWidth) {
                    if (w < this.minWidth) {
                        w = this.minWidth;
                    }
                    if (w > this.maxWidth) {
                        w = this.maxWidth;
                    }
                    this.measuredWidth = w;
                }
                if (h > this.measuredHeight) {
                    if (h < this.minHeight) {
                        h = this.minHeight;
                    }
                    if (h > this.maxHeight) {
                        h = this.maxHeight;
                    }
                    this.measuredHeight = h;
                }
            };
            ButtonSkin.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                var iconWidth = this.iconDisplay.layoutBoundsWidth;
                var iconHeight = this.iconDisplay.layoutBoundsHeight;
                var labelWidth = this.labelDisplay.layoutBoundsWidth;
                var labelHeight = this.labelDisplay.layoutBoundsHeight;
                var iconX = (unscaledWidth - iconWidth - labelWidth) * 0.5;
                var iconY = (unscaledHeight - iconHeight) * 0.5;
                this.iconDisplay.setLayoutBoundsPosition(iconX, iconY);
                var labelX = iconX + iconWidth;
                var labelY = (unscaledHeight - labelHeight) * 0.5;
                this.labelDisplay.setLayoutBoundsPosition(labelX, labelY);
            };
            ButtonSkin._skinParts = ["labelDisplay", "iconDisplay"];
            return ButtonSkin;
        })(gui.Skin);
        gui.ButtonSkin = ButtonSkin;
        ButtonSkin.prototype.__class__ = "egret.gui.ButtonSkin";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
