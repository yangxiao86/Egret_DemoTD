var game;
(function (game) {
    var XFKScene = (function () {
        function XFKScene() {
            this.sceneKey = "scene1";
            this.isInit = false;
            this.lastime = 0;
            this.id = game.CommonFunction.Token;
        }
        Object.defineProperty(XFKScene.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });

        XFKScene.prototype.OnLoad = function (obj) {
            this.OnRelease();

            game.ModuleManager.Instance.RegisterModule(this);

            this.sceneKey = obj;

            this.startTime = egret.getTimer();

            game.XFKControls.addEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.XFKControls.addEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.XFKControls.addEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);

            this.resLoad();
        };

        XFKScene.prototype.OnRelease = function () {
            game.ModuleManager.Instance.UnRegisterModule(this);
            game.XFKControls.removeEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.XFKControls.removeEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.XFKControls.removeEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);
            this.removeAll();
        };

        XFKScene.prototype.resLoad = function () {
            game.XFKLayer.Ins.LoadingViewOnOff();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.sceneKey);
        };

        XFKScene.prototype.onResourceLoadComplete = function (event) {
            if (event.groupName == this.sceneKey) {
                game.XFKLayer.Ins.LoadingViewOnOff();
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.init();
            }
        };

        XFKScene.prototype.onResourceLoadError = function (event) {
            console.warn("Group:" + event.groupName + " 中有加载失败的项目");

            this.onResourceLoadComplete(event);
        };

        XFKScene.prototype.onResourceProgress = function (event) {
            if (event.groupName == this.sceneKey) {
                game.XFKLayer.Ins.SetLoadingView(event.itemsLoaded, event.itemsTotal);
            }
        };

        XFKScene.prototype.init = function () {
            this.createBG();
            this.creatDecration();
            this.creatTurret();
            this.creatAction();
            this.isInit = true;
        };

        XFKScene.prototype.createBG = function () {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(this.sceneKey + "bg_jpg");
            game.XFKLayer.Ins.BgLayer.addChild(bitmap);
        };

        XFKScene.prototype.creatDecration = function () {
            var dt = new game.XFKDecoration();
            dt.x = 780;
            dt.y = 510;
            dt.setHp(10);
            dt.OnLoad(game.XFKLayer.Ins.DecorationLayer);
        };

        XFKScene.prototype.creatTurret = function () {
            var data = RES.getRes(this.sceneKey + "turret_json");
            var td;

            for (var i = 0; i < data.turret.length; i++) {
                td = new game.XFKTurret();
                td.Parse(data.turret[i]);
                td.OnLoad(game.XFKLayer.Ins.DecorationLayer);
            }
        };

        XFKScene.prototype.creatAction = function () {
            var data = RES.getRes(this.sceneKey + "sprite_json");

            this.action = new Array();
            var index;
            for (var i = 0; i < data.sprite.length; i++) {
                data.sprite[i].path = data.Path;
                data.sprite[i].keyframe = false;
                data.sprite[i].delay = parseInt(data.sprite[i].delay);
                for (var j = 0; j < data.sprite[i].count; j++) {
                    index = this.action.push(data.sprite[i]);
                    if (index == data.sprite[i].count) {
                        this.action[index - 1].keyframe = true;
                    }
                }
            }
        };

        XFKScene.prototype.creatSp = function () {
            if (this.action.length > 0) {
                console.log(this.startTime + this.action[0].delay, egret.getTimer());
                if ((this.startTime + this.action[0].delay) <= egret.getTimer()) {
                    var sp;
                    sp = new game.XFKSprite();
                    sp.Parse(this.action.shift());
                    sp.OnLoad(game.XFKLayer.Ins.NpcLayer);
                }
            }
        };

        XFKScene.prototype.gm_headquarters_hpChange = function (e) {
        };

        XFKScene.prototype.gm_activation_bullet = function (e) {
            var bullet = new game.XFKBullet();
            bullet.setTarget(e.object[0], e.object[1]);
            bullet.OnLoad(game.XFKLayer.Ins.NpcLayer);
        };

        XFKScene.prototype.gm_monster_death = function (e) {
            var sp = new game.XFKSprite();
            game.XFKConfig.Ins.addGlob(sp.Glob);
        };

        XFKScene.prototype.removeAll = function () {
            while (game.XFKLayer.Ins.NpcLayer.numChildren > 0) {
                var obj = game.XFKLayer.Ins.NpcLayer.removeChildAt(0);
                obj.OnRelease();
            }

            while (game.XFKLayer.Ins.BgLayer.numChildren > 0) {
                game.XFKLayer.Ins.BgLayer.removeChildAt(0);
            }

            while (game.XFKLayer.Ins.DecorationLayer.numChildren > 0) {
                var obj = game.XFKLayer.Ins.DecorationLayer.removeChildAt(0);
                obj.OnRelease();
            }
        };

        XFKScene.prototype.OnUpdate = function (passTime) {
            if (this.isInit && passTime > this.lastime) {
                this.creatSp();
                this.lastime = passTime + 800;
            }
        };
        return XFKScene;
    })();
    game.XFKScene = XFKScene;
})(game || (game = {}));
