var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var XFKDecoration = (function (_super) {
        __extends(XFKDecoration, _super);
        function XFKDecoration() {
            _super.call(this);
            this._hp = 10;

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        XFKDecoration.prototype.onAddToStage = function (event) {
            this.init();
            this.draw();
        };

        XFKDecoration.prototype.setHp = function (value) {
            this._hp = value;
            this.draw();
        };
        Object.defineProperty(XFKDecoration.prototype, "hp", {
            get: function () {
                return this._hp;
            },
            set: function (value) {
                if (value == this.hp) {
                    return;
                }
                this.setHp(value);
                this.hpText.text = value.toString();
                if (this._hp <= 0) {
                    game.XFKControls.dispatchEvent(game.BaseEvent.gm_headquarters_hpChange, this);
                }
            },
            enumerable: true,
            configurable: true
        });

        XFKDecoration.prototype.OnUpdate = function (type, value) {
            this.OnUpdate(type, value);
        };

        XFKDecoration.prototype.OnLoad = function (parent) {
            parent.addChild(this);

            game.XFKControls.addEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        };

        XFKDecoration.prototype.OnRelease = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.XFKControls.removeEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        };

        XFKDecoration.prototype.init = function () {
            var data = RES.getRes("num_fnt");

            this.hpText = new egret.BitmapText();
            this.hpText.font = data;
            this.hpText.text = this.hp.toString();
            this.addChild(this.hpText);

            var shap = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawRect(0, 0, 8, 8);
            shap.graphics.endFill();
            this.addChild(shap);
        };

        XFKDecoration.prototype.draw = function () {
            if (this.parent == null) {
                return;
            }
            this.hpText.x = -this.hpText.width >> 1;
            this.hpText.y = -this.hpText.height >> 1;
        };

        XFKDecoration.prototype.gm_moveEnd = function (e) {
            if (e.object instanceof game.XFKSprite) {
                this.hp = this.hp - e.object.Atk;
            }
        };
        return XFKDecoration;
    })(game.BaseDecoration);
    game.XFKDecoration = XFKDecoration;
})(game || (game = {}));
