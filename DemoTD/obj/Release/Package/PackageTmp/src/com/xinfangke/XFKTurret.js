var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var XFKTurret = (function (_super) {
        __extends(XFKTurret, _super);
        function XFKTurret() {
            _super.call(this);
            this.lastTime = 0;
        }
        XFKTurret.prototype.creatSp = function () {
            var data = RES.getRes(this.skin + "_json");
            var texture = RES.getRes(this.skin + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);

            if (this.sp != null) {
                this.sp.parent.removeChild(this.sp);
                this.sp.stop();
            }

            this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
            this.addChild(this.sp);

            this.sp.x = -this.sp.width / 2 + this.offsetx;
            this.sp.y = -this.sp.height / 2 + this.offsety;

            this.sp.gotoAndPlay(1, -1);

            this.sp.touchEnabled = true;
        };

        XFKTurret.prototype.creatBullet = function (source, target) {
            var nowTime = egret.getTimer();
            console.log(nowTime, this.lastTime);
            if (nowTime > this.lastTime) {
                this.lastTime = nowTime + this.MoveSpeed;
                game.XFKControls.dispatchEvent(game.BaseEvent.gm_activation_bullet, [source, target]);
                this.changOrientation(target.Point);
            }
        };

        XFKTurret.prototype.searchTarget = function () {
            var objectList = game.ModuleManager.Instance.GetModuleList();
            var tempSp;

            for (var key in objectList) {
                if (objectList[key] instanceof game.XFKSprite) {
                    tempSp = objectList[key];
                    if (game.CommonFunction.GetDistance(tempSp.Point, this.Point) <= this.radius) {
                        this.creatBullet(this, tempSp);
                    }
                }
            }
        };

        XFKTurret.prototype.changOrientation = function (point) {
            var xx = point.x - this.x;
            var yy = point.y - this.y;
            var angle = Math.atan2(yy, xx);
            angle *= 180 / Math.PI;
            angle -= 180;
            if (angle < 0)
                angle += 360;

            var index = Math.round(this.sp.totalFrames * angle / 360);
            this.sp.gotoAndStop(index);
        };

        XFKTurret.prototype.OnLoad = function (parent) {
            _super.prototype.OnLoad.call(this, parent);
            parent.addChild(this);
            this.creatSp();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
            game.ModuleManager.Instance.RegisterModule(this);
        };

        XFKTurret.prototype.OnRelease = function () {
            _super.prototype.OnRelease.call(this);
            if (this.sp != null) {
                this.sp.stop();
            }
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
            game.ModuleManager.Instance.UnRegisterModule(this);
        };

        XFKTurret.prototype.OnUpdate = function (passTime) {
            _super.prototype.OnUpdate.call(this, passTime);
            if (this.MoveSpeed == 0) {
                return;
            }
            this.searchTarget();
        };

        XFKTurret.prototype.onTouchTab = function (e) {
            if (this.radiusShap == null) {
                this.radiusShap = new egret.Shape();
                this.radiusShap.graphics.beginFill(0xffff60, 1);
                this.radiusShap.graphics.drawCircle(0, 0, this.radius);
                this.radiusShap.graphics.endFill();
                this.radiusShap.alpha = 0.2;
                this.addChild(this.radiusShap);
            }

            game.TDSelectPanel.Ins.showPanel(this.onChange, this);
            game.TDSelectPanel.Ins.setPoint(new egret.Point(this.Point.x, this.Point.y + this.sp.height));
        };

        XFKTurret.prototype.onChange = function (item) {
            this.parseSkin(item);
            this.creatSp();

            if (this.radiusShap != null) {
                this.removeChild(this.radiusShap);
                this.radiusShap = null;
            }
        };

        XFKTurret.prototype.Parse = function (obj) {
            this.name = obj.name;
            this.x = parseInt(obj.x);
            this.y = parseInt(obj.y);
            this.parseSkin(obj.type);
        };

        XFKTurret.prototype.parseSkin = function (key) {
            var data = RES.getRes("turretskin");

            this.skin = key;
            this.offsetx = parseInt(data[key].offsetx);
            this.offsety = parseInt(data[key].offsety);
            this.radius = parseInt(data[key].radius);
            this.MoveSpeed = parseInt(data[key].speed);
            this.glob = parseInt(data[key].glob);
        };
        return XFKTurret;
    })(game.BaseSprite);
    game.XFKTurret = XFKTurret;
})(game || (game = {}));
