var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        function BaseEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        BaseEvent.gm_activation_bullet = "gm_activation_bullet";

        BaseEvent.gm_moveEnd = "gm_moveEnd";

        BaseEvent.gm_headquarters_hpChange = "gm_headquarters_hpChange";

        BaseEvent.gm_monster_death = "gm_monster_death";
        return BaseEvent;
    })(egret.Event);
    game.BaseEvent = BaseEvent;
})(game || (game = {}));
