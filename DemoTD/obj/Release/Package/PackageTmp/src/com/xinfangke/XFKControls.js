var game;
(function (game) {
    var XFKControls = (function () {
        function XFKControls() {
        }
        XFKControls.dispatchEvent = function (type, object) {
            var event = new game.BaseEvent(type);
            event.object = object;
            this.dispatcher.dispatchEvent(event);
        };

        XFKControls.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        };

        XFKControls.removeEventListener = function (type, listener, thisObject, useCapture) {
            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        };
        XFKControls.dispatcher = new egret.EventDispatcher();
        return XFKControls;
    })();
    game.XFKControls = XFKControls;
})(game || (game = {}));
