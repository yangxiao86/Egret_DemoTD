var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var TDSelectPanel = (function (_super) {
        __extends(TDSelectPanel, _super);
        function TDSelectPanel() {
            _super.call(this);
        }
        Object.defineProperty(TDSelectPanel, "Ins", {
            get: function () {
                if (this.ins == null)
                    this.ins = new TDSelectPanel();
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });

        TDSelectPanel.prototype.showPanel = function (callFun, callObject) {
            if (this.isOpen) {
                return;
            }
            this.show(0);

            this.callObject = callObject;
            this.callFun = callFun;

            var data = RES.getRes("turretskin");

            var mcData;
            var mcTexture;

            for (var key in data) {
                mcData = RES.getRes(key + "_json");
                mcTexture = RES.getRes(key + "_png");
                var mcFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
                var mc = new egret.MovieClip(mcFactory.generateMovieClipData(key));

                this.addChild(mc);
                mc.x = Math.abs(this.numChildren - 1) * mc.width + 10;
                mc.gotoAndPlay(1, -1);
                mc.name = key;
                mc.touchEnabled = true;
            }

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        };

        TDSelectPanel.prototype.onTouchTab = function (e) {
            if (e.target instanceof egret.MovieClip) {
                this.callFun.apply(this.callObject, [e.target.name]);
            }
            this.closePanel();
        };

        TDSelectPanel.prototype.closePanel = function () {
            if (!this.isOpen) {
                return;
            }
            this.close();

            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);

            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this.callObject = null;
            this.callFun = null;
        };
        return TDSelectPanel;
    })(game.BasePanel);
    game.TDSelectPanel = TDSelectPanel;
})(game || (game = {}));
