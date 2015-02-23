var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var BaseDecoration = (function (_super) {
        __extends(BaseDecoration, _super);
        function BaseDecoration() {
            _super.call(this);
        }
        BaseDecoration.prototype.OnUpdate = function (type, value) {
        };
        return BaseDecoration;
    })(egret.Sprite);
    game.BaseDecoration = BaseDecoration;
})(game || (game = {}));
