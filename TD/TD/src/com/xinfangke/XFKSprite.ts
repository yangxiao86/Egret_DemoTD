module game {
    export class XFKSprite extends game.BaseSprite
    {

        public Glob: number;

        private hpImg: game.XFKHpImg = new game.XFKHpImg();

        public constructor()
        {
            super();

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.addEventListener("gm_directionChange", this.onDirectionChange, this);
            this.addEventListener("gm_hpChange", this.onHpChange, this);

            this.x = this.Path[0].x;
            this.y = this.Path[0].y;
            this.setDirection(this.Path[1]);
        }

        public sp: egret.MovieClip;


        /**
        *  路径存放的列表
        */
        public Path: egret.Point[] =
        [

        ];

        public OnLoad(parent:egret.DisplayObjectContainer): void
        {

            super.OnLoad(parent);

            parent.addChild(this);

            game.ModuleManager.Instance.RegisterModule(this);

            this.hpImg.OnLoad(this);
        }

        public OnRelease(): void {

            super.OnRelease();

            if (this.sp != null) {
                this.sp.stop();
            }
            this.removeEventListener("gm_directionChange", this.onDirectionChange, this);
            this.removeEventListener("gm_hpChange", this.onHpChange, this);

            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.Instance.UnRegisterModule(this);

            this.hpImg.OnRelease();
        }

        private onDirectionChange(e: egret.Event): void
        {
            var _this: XFKSprite = (< game.XFKSprite > e.target);
            var data = RES.getRes(this.Type+"_"+_this.Direction+"_json");//获取描述

            var texture = RES.getRes(this.Type + "_" +this.Direction+"_png");//获取大图

            var mcFactory = new egret.MovieClipDataFactory(data, texture);//获取MovieClipData工厂类

            if (this.sp != null)
            {
                this.sp.parent.removeChild(this.sp);
                this.sp.stop();
            }
            this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.Type + "_" + this.Direction));//创建一个MC
            this.addChild(this.sp);//添加到显示列表
            
            this.sp.x = -20;
            this.sp.y = - 30;
            this.sp.gotoAndPlay(1, -1);

            //创建一个圆心，主要用来对点
            var shap: egret.Shape = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawRect(0, 0, 3, 3);
            shap.graphics.endFill();
            this.addChild(shap);//添加到显示列表
            
        }

        private onHpChange(e: egret.Event): void {

            this.hpImg.sethp(this.Hp, this.HpMax);
            if (this.Hp <= 0) {
                game.XFKControls.dispatchEvent(game.BaseEvent.gm_monster_death,this);
                this.OnRelease();
            }

        }
        /**
        *	 虚方法，需要Override
        * @param ElapsedSeconds 距离上次被更新的时间间隔
        *
        */
        public OnUpdate(passTime: number): void {
            super.OnUpdate(passTime);
            this.move(passTime);
        }


        private move(passTime: number): void {
            
            if (this.Path.length == 0) {
                return;
            }

            var point: egret.Point = this.Path[0];  //下一个节点

            var targetSpeed: egret.Point = game.CommonFunction.GetSpeed(point, new egret.Point(this.x, this.y),this.MoveSpeed);
            var xDistance: number = 10  * targetSpeed.x;
            var yDistance: number = 10  * targetSpeed.y;

            if (Math.abs(point.x - this.x) <= Math.abs(xDistance) && Math.abs(point.y - this.y) <= Math.abs(yDistance)) {

                this.x = point.x;
                this.y = point.y;
                this.Path.shift();
                
                if (this.Path.length == 0) {
                    game.XFKControls.dispatchEvent(game.BaseEvent.gm_moveEnd,this);
                    this.OnRelease();
                    return;
                }
                else {
                    this.setDirection(this.Path[0]);
                }
            }
            else {
                this.x = this.x + xDistance;
                this.y = this.y + yDistance;
            }

        }

        public Parse(obj: any): void {

            this.Hp = parseInt(obj.hp);
            this.HpMax = parseInt(obj.hp);
            this.Glob = parseInt(obj.glob);
            this.MoveSpeed = parseFloat(obj.speed);
            this.Type = obj.type;
            this.Path = [];
            
            for (var i: number = 0; i < obj.path.length; i++) {

                this.Path.push(new egret.Point(parseInt(obj.path[i].x), parseInt(obj.path[i].y)));
            }
        }

    }
} 