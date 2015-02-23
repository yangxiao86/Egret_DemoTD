var game;
(function (game) {
    var XFKConfig = (function () {
        function XFKConfig() {
            this.Glob = 0;
            this.Count = 0;
        }
        Object.defineProperty(XFKConfig, "Ins", {
            get: function () {
                if (this.ins == null)
                    this.ins = new XFKConfig();
                return this.ins;
            },
            enumerable: true,
            configurable: true
        });

        XFKConfig.prototype.addGlob = function (value) {
            this.Glob = this.Glob + value;
        };
        return XFKConfig;
    })();
    game.XFKConfig = XFKConfig;
})(game || (game = {}));
