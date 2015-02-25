module game {
    export class XFKScene implements game.IObject{
        public constructor() {

            this.id = game.CommonFunction.Token;

        }

        private id: number;

        public get ID(): number { return this.id;}

        private sceneKey: string = "scene1";

        private startTime: number;

        //传入场景的字符串
        public OnLoad(obj:any): void {

            this.OnRelease();

            game.ModuleManager.Instance.RegisterModule(this);

            this.sceneKey = obj;

            this.startTime = egret.getTimer();

            game.XFKControls.addEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.XFKControls.addEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.XFKControls.addEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);

            this.resLoad();

        }

        public OnRelease(): void {

            game.ModuleManager.Instance.UnRegisterModule(this);
            game.XFKControls.removeEventListener(game.BaseEvent.gm_headquarters_hpChange, this.gm_headquarters_hpChange, this);
            game.XFKControls.removeEventListener(game.BaseEvent.gm_activation_bullet, this.gm_activation_bullet, this);
            game.XFKControls.removeEventListener(game.BaseEvent.gm_monster_death, this.gm_monster_death, this);
            this.removeAll();
        }

        /**
         * 配置文件加载完成,开始预加载preload资源组。
         */
        private resLoad(): void {

            game.XFKLayer.Ins.LoadingViewOnOff();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.sceneKey);
        }
        /**
         * preload资源组加载完成
         */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
           
            if (event.groupName == this.sceneKey) {
                game.XFKLayer.Ins.LoadingViewOnOff();
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.init();
            }
        }
        /**
        * 资源组加载出错
        */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            //TODO
            console.warn("Group:" + event.groupName + " 中有加载失败的项目");
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        }
        /**
         * 资源组加载进度
         */
        private onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == this.sceneKey) {
                game.XFKLayer.Ins.SetLoadingView(event.itemsLoaded, event.itemsTotal);
            }
        }

        private isInit: boolean = false;

        private init(): void {

            this.createBG();
            this.creatDecration();
            this.creatTurret();
            this.creatAction();
            this.isInit = true;
        }

        private createBG(): void {
            var bitmap: egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(this.sceneKey+"bg_jpg");
            game.XFKLayer.Ins.BgLayer.addChild(bitmap);
        }
        
        //建立一个血量挂件
        private creatDecration(): void {

            var dt: game.XFKDecoration = new game.XFKDecoration();
            dt.x = 780;
            dt.y = 510;
            dt.setHp(10);
            dt.OnLoad(game.XFKLayer.Ins.DecorationLayer);
        }

        //建立塔防
        private creatTurret(): void {

            var data = RES.getRes(this.sceneKey+"turret_json");
            var td: game.XFKTurret;

            for (var i: number = 0; i < data.turret.length; i++) {

                td = new game.XFKTurret();
                td.Parse(data.turret[i]);
                td.OnLoad(game.XFKLayer.Ins.DecorationLayer);
            }
        }

        private action: any[];

        //创建一个精灵
        private creatAction(): void {

            var data = RES.getRes(this.sceneKey + "sprite_json");
           
            this.action = new Array();
            var index: number;
            for (var i: number = 0; i < data.sprite.length; i++) {

                data.sprite[i].path = data.Path;
                data.sprite[i].keyframe = false;
                data.sprite[i].delay = parseInt(data.sprite[i].delay);
                for (var j: number = 0; j < data.sprite[i].count; j++){
                    index=this.action.push(data.sprite[i]);
                    if (index == data.sprite[i].count) {
                        this.action[index-1].keyframe = true;
                    }
                }
            }


        }

        private creatSp(): void{

            if (this.action.length > 0) {
                console.log(this.startTime + this.action[0].delay, egret.getTimer());
                if ((this.startTime + this.action[0].delay) <= egret.getTimer()) {
                    var sp: game.XFKSprite
                    sp = new game.XFKSprite();
                    sp.Parse(this.action.shift());
                    sp.OnLoad(game.XFKLayer.Ins.NpcLayer);
                }
            }
        }

        //总部血量变化（主要处理总部0血量时候GAMEOVER）
        private gm_headquarters_hpChange(e: game.BaseEvent): void {
            egret.gui.Alert.show("游戏结束！", "弹窗", function () { location.reload() },"重新开始");
            game.ModuleManager.Instance.IsStop = true;
        }


        private gm_activation_bullet(e: game.BaseEvent): void {
            var bullet: game.XFKBullet = new game.XFKBullet();
            bullet.setTarget(e.object[0], e.object[1]);
            bullet.OnLoad(game.XFKLayer.Ins.NpcLayer);
        }


        private gm_monster_death(e: game.BaseEvent): void {
            var sp: game.XFKSprite = new game.XFKSprite();
            game.XFKConfig.Ins.addGlob(sp.Glob);
        }

        private removeAll(): void{

            while (game.XFKLayer.Ins.NpcLayer.numChildren > 0) {

                var obj: any = game.XFKLayer.Ins.NpcLayer.removeChildAt(0);
                (<ILoad>obj).OnRelease();
            }

            while (game.XFKLayer.Ins.BgLayer.numChildren > 0) {

                game.XFKLayer.Ins.BgLayer.removeChildAt(0);
            }

            while (game.XFKLayer.Ins.DecorationLayer.numChildren > 0) {

                var obj: any = game.XFKLayer.Ins.DecorationLayer.removeChildAt(0);
                (<ILoad>obj).OnRelease();
            }

        }

        private lastime: number = 0;

        public OnUpdate(passTime: number): void {
            if (this.isInit && passTime > this.lastime){

                this.creatSp();
                this.lastime = passTime + 800;

            }
        }

    }
} 