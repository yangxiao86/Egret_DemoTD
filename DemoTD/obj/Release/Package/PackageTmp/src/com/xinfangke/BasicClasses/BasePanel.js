var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            _super.call(this);
            this.isOpen = false;
        }
        BasePanel.prototype.backGround = function () {
            if (this.backBG) {
                return;
            }
            this.backBG = new egret.Bitmap();
            this.backBG.name = "panelbackground";
            this.backBG.texture = RES.getRes("panelbackground");
            this.backBG.alpha = 0.6;
            this.backBG.width = game.XFKLayer.Ins.Stage.width;
            this.backBG.height = game.XFKLayer.Ins.Stage.height;
            game.XFKLayer.Ins.UiLayer.addChild(this.backBG);
        };

        BasePanel.prototype.show = function (type) {
            if (typeof type === "undefined") { type = 0; }
            this.isOpen = true;

            if (type == 0) {
                this.backGround();
            }

            game.XFKLayer.Ins.UiLayer.addChild(this);
        };

        BasePanel.prototype.close = function () {
            this.isOpen = false;

            if (this.backBG && this.backBG.parent) {
                game.XFKLayer.Ins.UiLayer.removeChild(this.backBG);
                this.backBG = null;
            }

            if (this.parent) {
                this.parent.removeChild(this);
            }
        };

        BasePanel.prototype.setWindowCenter = function () {
            this.x = game.XFKLayer.Ins.Stage.width - this.width >> 1;
            this.y = game.XFKLayer.Ins.Stage.height - this.height >> 1;
        };

        BasePanel.prototype.setPoint = function (point) {
            this.x = point.x - (this.width >> 1);
            this.y = point.y - (this.height >> 1);
        };
        return BasePanel;
    })(egret.Sprite);
    game.BasePanel = BasePanel;
})(game || (game = {}));
