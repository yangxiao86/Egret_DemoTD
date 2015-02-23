var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var XFKSprite = (function (_super) {
        __extends(XFKSprite, _super);
        function XFKSprite() {
            _super.call(this);
            this.Path = [];

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        XFKSprite.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.addEventListener("gm_directionChange", this.onDirectionChange, this);
            this.addEventListener("gm_hpChange", this.onHpChange, this);

            this.x = this.Path[0].x;
            this.y = this.Path[0].y;
            this.setDirection(this.Path[1]);
        };

        XFKSprite.prototype.OnLoad = function (parent) {
            _super.prototype.OnLoad.call(this, parent);

            parent.addChild(this);

            game.ModuleManager.Instance.RegisterModule(this);
        };

        XFKSprite.prototype.OnRelease = function () {
            _super.prototype.OnRelease.call(this);

            if (this.sp != null) {
                this.sp.stop();
            }
            this.removeEventListener("gm_directionChange", this.onDirectionChange, this);
            this.removeEventListener("gm_hpChange", this.onHpChange, this);

            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);
        };

        XFKSprite.prototype.onDirectionChange = function (e) {
            var _this = e.target;
            var data = RES.getRes(this.Type + "_" + _this.Direction + "_json");

            var texture = RES.getRes(this.Type + "_" + this.Direction + "_png");

            var mcFactory = new egret.MovieClipDataFactory(data, texture);

            if (this.sp != null) {
                this.sp.parent.removeChild(this.sp);
                this.sp.stop();
            }
            this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.Type + "_" + this.Direction));
            this.addChild(this.sp);

            this.sp.x = -20;
            this.sp.y = -30;
            this.sp.gotoAndPlay(1, -1);

            var shap = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawRect(0, 0, 3, 3);
            shap.graphics.endFill();
            this.addChild(shap);
        };

        XFKSprite.prototype.onHpChange = function (e) {
            if (this.Hp <= 0) {
                game.XFKControls.dispatchEvent(game.BaseEvent.gm_monster_death, this);
                this.OnRelease();
            }
        };

        XFKSprite.prototype.OnUpdate = function (passTime) {
            _super.prototype.OnUpdate.call(this, passTime);
            this.move(passTime);
        };

        XFKSprite.prototype.move = function (passTime) {
            if (this.Path.length == 0) {
                return;
            }

            var point = this.Path[0];

            var targetSpeed = game.CommonFunction.GetSpeed(point, new egret.Point(this.x, this.y), this.MoveSpeed);
            var xDistance = 10 * targetSpeed.x;
            var yDistance = 10 * targetSpeed.y;

            if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {
                this.x = point.x;
                this.y = point.y;
                this.Path.shift();

                if (this.Path.length == 0) {
                    game.XFKControls.dispatchEvent(game.BaseEvent.gm_moveEnd, this);
                    this.OnRelease();
                    return;
                } else {
                    this.setDirection(this.Path[0]);
                }
            } else {
                this.x = this.x + xDistance;
                this.y = this.y + yDistance;
            }
        };

        XFKSprite.prototype.Parse = function (obj) {
            this.Hp = parseInt(obj.hp);
            this.Glob = parseInt(obj.glob);
            this.MoveSpeed = parseFloat(obj.speed);
            this.Type = obj.type;
            this.Path = [];

            for (var i = 0; i < obj.path.length; i++) {
                this.Path.push(new egret.Point(parseInt(obj.path[i].x), parseInt(obj.path[i].y)));
            }
        };
        return XFKSprite;
    })(game.BaseSprite);
    game.XFKSprite = XFKSprite;
})(game || (game = {}));
