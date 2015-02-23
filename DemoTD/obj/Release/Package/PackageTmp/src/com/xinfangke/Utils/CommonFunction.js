var game;
(function (game) {
    var CommonFunction = (function () {
        function CommonFunction() {
        }
        Object.defineProperty(CommonFunction, "Token", {
            get: function () {
                return this.token++;
            },
            enumerable: true,
            configurable: true
        });

        CommonFunction.GetDistance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };

        CommonFunction.GetSpeed = function (targetP2, currentP1, SpeedNum) {
            var speed = new egret.Point();
            var hypotenuse = game.CommonFunction.GetDistance(targetP2, currentP1);
            if (hypotenuse == 0) {
                speed.x = 0;
                speed.y = 0;
                return speed;
            }
            speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
            speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
            return speed;
        };
        CommonFunction.token = 0;
        return CommonFunction;
    })();
    game.CommonFunction = CommonFunction;
})(game || (game = {}));
