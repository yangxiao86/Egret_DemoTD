var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);

        egret.gui.Theme.load("resource/theme.thm");

        game.XFKLayer.Ins.OnLoad(this.stage);

        this.loadingView = new LoadingUI();
        this.loadingView.x = (egret.StageDelegate.getInstance()._stageWidth - this.loadingView.width) >> 1;
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };

    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
        RES.loadGroup("scene1");
    };

    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
        } else if (event.groupName == "scene1") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    };

    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " 中有加载失败的项目");

        this.onResourceLoadComplete(event);
    };

    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    Main.prototype.createScene = function () {
        var button1 = new egret.gui.Button();
        button1.left = 0;
        button1.top = 0;
        button1.label = "场景1";
        button1.name = "scene1";
        button1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        var button2 = new egret.gui.Button();
        button2.right = 0;
        button2.top = 0;
        button2.label = "场景2";
        button2.name = "scene2";
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        game.XFKLayer.Ins.GuiLayer.addElement(button1);
        game.XFKLayer.Ins.GuiLayer.addElement(button2);
    };

    Main.prototype.onButtonClick = function (event) {
        if (this.scene) {
            this.scene.OnRelease();
        }
        this.scene = new game.XFKScene();
        this.scene.OnLoad(event.target.name);
    };
    return Main;
})(egret.DisplayObjectContainer);
