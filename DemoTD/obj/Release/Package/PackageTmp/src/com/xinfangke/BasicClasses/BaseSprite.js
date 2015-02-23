var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite() {
            _super.call(this);
            this.Type = "sprite1";
            this.MoveSpeed = 0.1;
            this.Hp = 100;
            this.Atk = 1;
            this.direction = "";
            this.id = game.CommonFunction.Token;
        }
        Object.defineProperty(BaseSprite.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseSprite.prototype, "Direction", {
            get: function () {
                return this.direction;
            },
            enumerable: true,
            configurable: true
        });

        BaseSprite.prototype.setHp = function (value) {
            this.Hp = value;
            this.dispatchEvent(new egret.Event("gm_hpChange"));
        };

        BaseSprite.prototype.setDirection = function (p) {
            var xNum = p.x - this.x;
            var yNum = p.y - this.y;
            var tempDirection;
            if (xNum == 0) {
                if (yNum > 0) {
                    tempDirection = "down";
                }
                if (yNum < 0) {
                    tempDirection = "up";
                }
            }
            if (yNum == 0) {
                if (xNum > 0) {
                    tempDirection = "right";
                }
                if (xNum < 0) {
                    tempDirection = "left";
                }
            }
            if (tempDirection != this.direction) {
                this.direction = tempDirection;
                this.dispatchEvent(new egret.Event("gm_directionChange"));
            }
            return;
        };

        BaseSprite.prototype.OnUpdate = function (passTime) {
        };
        BaseSprite.prototype.OnLoad = function (parent) {
        };

        BaseSprite.prototype.OnRelease = function () {
        };

        Object.defineProperty(BaseSprite.prototype, "Point", {
            get: function () {
                return new egret.Point(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        return BaseSprite;
    })(egret.Sprite);
    game.BaseSprite = BaseSprite;
})(game || (game = {}));
