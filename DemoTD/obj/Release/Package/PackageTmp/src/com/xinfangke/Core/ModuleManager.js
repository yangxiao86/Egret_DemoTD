var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;
(function (game) {
    var ModuleManager = (function (_super) {
        __extends(ModuleManager, _super);
        function ModuleManager() {
            _super.call(this);
            this.dicData = new Object();
            this.lastTime = 0;
            game.XFKLayer.Ins.Stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        Object.defineProperty(ModuleManager, "Instance", {
            get: function () {
                if (this.instance == null)
                    this.instance = new ModuleManager();
                return this.instance;
            },
            enumerable: true,
            configurable: true
        });

        ModuleManager.prototype.GetModuleList = function () {
            return this.dicData;
        };

        ModuleManager.prototype.RegisterModule = function (object) {
            this.dicData[object.ID.toString()] = object;
        };

        ModuleManager.prototype.UnRegisterModule = function (object) {
            delete this.dicData[object.ID.toString()];
        };

        ModuleManager.prototype.update = function (e) {
            for (var key in this.dicData) {
                this.dicData[key].OnUpdate(egret.getTimer());
            }
        };
        return ModuleManager;
    })(egret.EventDispatcher);
    game.ModuleManager = ModuleManager;
})(game || (game = {}));
