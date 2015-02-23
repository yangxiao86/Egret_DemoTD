var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var XFKBullet = (function (_super) {
        __extends(XFKBullet, _super);
        function XFKBullet() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        XFKBullet.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };

        XFKBullet.prototype.setTarget = function (source, target) {
            this.x = source.x;
            this.y = source.y;
            this.target = target;

            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("bullet1");
            bitmap.x = -bitmap.width / 2;
            bitmap.y = -bitmap.height / 2;
            this.addChild(bitmap);

            this.radius = 10;
            this.MoveSpeed = 1;
        };

        XFKBullet.prototype.OnLoad = function (parent) {
            parent.addChild(this);

            game.ModuleManager.Instance.RegisterModule(this);
        };

        XFKBullet.prototype.OnRelease = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);
        };

        XFKBullet.prototype.OnUpdate = function (passTime) {
            _super.prototype.OnUpdate.call(this, passTime);
            this.move(passTime);
        };

        XFKBullet.prototype.move = function (passTime) {
            var distance = game.CommonFunction.GetDistance(this.Point, this.target.Point);
            if (distance <= this.radius) {
                this.target.setHp(this.target.Hp - this.Atk);
                this.target = null;
                this.OnRelease();
            } else {
                var targetSpeed = game.CommonFunction.GetSpeed(this.target.Point, this.Point, this.MoveSpeed);
                var xDistance = 10 * targetSpeed.x;
                var yDistance = 10 * targetSpeed.y;
                this.x = this.x + xDistance;
                this.y = this.y + yDistance;
            }
        };
        return XFKBullet;
    })(game.BaseSprite);
    game.XFKBullet = XFKBullet;
})(game || (game = {}));
