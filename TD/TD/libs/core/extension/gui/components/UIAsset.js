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
         * @class egret.gui.UIAsset
         * @classdesc
         * 素材和非GUI显示对象包装器。<p/>
         * @extends egret.gui.UIComponent
         * @implements egret.gui.ISkinnableClient
         */
        var UIAsset = (function (_super) {
            __extends(UIAsset, _super);
            /**
             * @method egret.gui.UIAsset#constructor
             * @param source {any} 素材标识符
             */
            function UIAsset(source, autoScale) {
                if (autoScale === void 0) { autoScale = true; }
                _super.call(this);
                /**
                 * 矩形区域，它定义素材对象的九个缩放区域。
                 * 注意:此属性仅在source的解析结果为Texture并且fileMode为BitmapFillMode.SCALE时有效。
                 * @member {egret.Texture} egret.gui.UIAsset#scale9Grid
                 */
                this.scale9Grid = null;
                /**
                 * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
                 * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
                 * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
                 * 注意:此属性仅在source的解析结果为Texture时有效
                 * @member {egret.Texture} egret.gui.UIAsset#fillMode
                 */
                this.fillMode = "scale";
                this.sourceChanged = false;
                this._source = null;
                this._content = null;
                this.createChildrenCalled = false;
                this.contentReused = false;
                /**
                 * 是自动否缩放content对象，以符合UIAsset的尺寸。默认值true。
                 */
                this.autoScale = true;
                this.touchChildren = false;
                if (source) {
                    this.source = source;
                }
                this.autoScale = autoScale;
            }
            Object.defineProperty(UIAsset.prototype, "source", {
                /**
                 * 素材标识符。可以为Class,String,或DisplayObject实例等任意类型，具体规则由项目注入的素材适配器决定，
                 * 适配器根据此属性值解析获取对应的显示对象，并赋值给content属性。
                 * @member egret.gui.UIAsset#source
                 */
                get: function () {
                    return this._source;
                },
                set: function (value) {
                    if (this._source == value)
                        return;
                    this._source = value;
                    if (this.createChildrenCalled) {
                        this.parseSource();
                    }
                    else {
                        this.sourceChanged = true;
                    }
                    this._setSizeDirty();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIAsset.prototype, "content", {
                /**
                 * 解析source得到的对象，通常为显示对象或Texture。
                 * @member egret.gui.UIAsset#content
                 */
                get: function () {
                    return this._content;
                },
                enumerable: true,
                configurable: true
            });
            /**
             */
            UIAsset.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                if (this.sourceChanged) {
                    this.parseSource();
                }
                this.createChildrenCalled = true;
            };
            /**
             * 解析source
             */
            UIAsset.prototype.parseSource = function () {
                this.sourceChanged = false;
                var adapter = UIAsset.assetAdapter;
                if (!adapter) {
                    adapter = this.getAdapter();
                }
                if (!this._source) {
                    this.contentChanged(null, null);
                }
                else {
                    var reuseContent = this.contentReused ? null : this._content;
                    this.contentReused = true;
                    adapter.getAsset(this._source, this.contentChanged, this, reuseContent);
                }
            };
            /**
             * 获取资源适配器
             */
            UIAsset.prototype.getAdapter = function () {
                var adapter;
                try {
                    adapter = egret.Injector.getInstance("egret.gui.IAssetAdapter");
                }
                catch (e) {
                    adapter = new gui.DefaultAssetAdapter();
                }
                UIAsset.assetAdapter = adapter;
                return adapter;
            };
            /**
             * 皮肤发生改变
             */
            UIAsset.prototype.contentChanged = function (content, source) {
                if (source !== this._source)
                    return;
                var oldContent = this._content;
                this._content = content;
                if (this._content instanceof egret.Texture) {
                    this._texture_to_render = content;
                }
                else {
                    this._texture_to_render = null;
                }
                if (oldContent !== content) {
                    if (oldContent instanceof egret.DisplayObject) {
                        if (oldContent.parent == this) {
                            oldContent._sizeChangeCallBack = null;
                            oldContent._sizeChangeCallTarget = null;
                            this._removeFromDisplayList(oldContent);
                        }
                    }
                    if (content instanceof egret.DisplayObject) {
                        content._sizeChangeCallBack = this.invalidateSize;
                        content._sizeChangeCallTarget = this;
                        this._addToDisplayListAt(content, 0);
                    }
                }
                this.invalidateSize();
                this.invalidateDisplayList();
                this.contentReused = false;
                if (this.hasEventListener(gui.UIEvent.CONTENT_CHANGED)) {
                    gui.UIEvent.dispatchUIEvent(this, gui.UIEvent.CONTENT_CHANGED);
                }
            };
            UIAsset.prototype.measure = function () {
                _super.prototype.measure.call(this);
                var content = this._content;
                if (content instanceof egret.DisplayObject) {
                    if ("preferredWidth" in content) {
                        this.measuredWidth = (content).preferredWidth;
                        this.measuredHeight = (content).preferredHeight;
                    }
                    else {
                        var oldW = content.explicitWidth;
                        var oldH = content.explicitHeight;
                        content.width = NaN;
                        content.height = NaN;
                        this.measuredWidth = content.measuredWidth * content.scaleX;
                        this.measuredHeight = content.measuredHeight * content.scaleY;
                        content.width = oldW;
                        content.height = oldH;
                    }
                }
                else if (content instanceof egret.Texture) {
                    this.measuredWidth = content._textureWidth;
                    this.measuredHeight = content._textureHeight;
                }
            };
            /**
             * @param unscaledWidth {number}
             * @param unscaledHeight {number}
             */
            UIAsset.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
                _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
                var content = this._content;
                if (this.autoScale && content instanceof egret.DisplayObject) {
                    if ("setLayoutBoundsSize" in content) {
                        (content).setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                    }
                    else {
                        content.width = unscaledWidth / content.scaleX;
                        content.height = unscaledHeight / content.scaleY;
                    }
                }
                this._setSizeDirty();
            };
            UIAsset.prototype._render = function (renderContext) {
                if (this._content instanceof egret.Texture) {
                    var texture = this._content;
                    var w;
                    var h;
                    if (this.autoScale) {
                        w = this._width;
                        h = this._height;
                    }
                    else {
                        w = texture._textureWidth;
                        h = texture._textureHeight;
                    }
                    egret.Bitmap._drawBitmap(renderContext, w, h, this);
                }
                _super.prototype._render.call(this, renderContext);
            };
            /**
             * @returns {Rectangle}
             * @private
             */
            UIAsset.prototype._measureBounds = function () {
                if (this._content instanceof egret.Texture) {
                    var texture = this._content;
                    var textureW = texture._textureWidth;
                    var textureH = texture._textureHeight;
                    var w = this.width;
                    var h = this.height;
                    var x = Math.floor(texture._offsetX * w / textureW);
                    var y = Math.floor(texture._offsetY * h / textureH);
                    return egret.Rectangle.identity.initialize(x, y, w, h);
                }
                return _super.prototype._measureBounds.call(this);
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            UIAsset.prototype.addChild = function (child) {
                throw (new Error(egret.getString(3004, egret.getString(3003))));
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             * @returns {DisplayObject}
             */
            UIAsset.prototype.addChildAt = function (child, index) {
                throw (new Error(egret.getString(3005, egret.getString(3003))));
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @returns {DisplayObject}
             */
            UIAsset.prototype.removeChild = function (child) {
                throw (new Error(egret.getString(3006, egret.getString(3003))));
            };
            /**
             * @deprecated
             * @param index {number}
             * @returns {DisplayObject}
             */
            UIAsset.prototype.removeChildAt = function (index) {
                throw (new Error(egret.getString(3007, egret.getString(3003))));
            };
            /**
             * @deprecated
             * @param child {DisplayObject}
             * @param index {number}
             */
            UIAsset.prototype.setChildIndex = function (child, index) {
                throw (new Error(egret.getString(3008, egret.getString(3003))));
            };
            /**
             * @deprecated
             * @param child1 {DisplayObject}
             * @param child2 {DisplayObject}
             */
            UIAsset.prototype.swapChildren = function (child1, child2) {
                throw (new Error(egret.getString(3009, egret.getString(3003))));
            };
            /**
             * @deprecated
             * @param index1 {number}
             * @param index2 {number}
             */
            UIAsset.prototype.swapChildrenAt = function (index1, index2) {
                throw (new Error(egret.getString(3010, egret.getString(3003))));
            };
            /**
             * 皮肤解析适配器
             */
            UIAsset.assetAdapter = null;
            return UIAsset;
        })(gui.UIComponent);
        gui.UIAsset = UIAsset;
        UIAsset.prototype.__class__ = "egret.gui.UIAsset";
    })(gui = egret.gui || (egret.gui = {}));
})(egret || (egret = {}));
