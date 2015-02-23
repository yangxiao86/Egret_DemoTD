module game {
    export class XFKTurret extends game.BaseSprite {
        public constructor() {
            super();
        }

        private offsetx: number;
        private offsety: number;
        private skin: string;
        private radius: number; 
        private glob: number; 

        private lastTime: number=0; 
        private sp: egret.MovieClip;
        private radiusShap: egret.Shape;

        private creatSp(): void {

            var data = RES.getRes(this.skin + "_json");
            var texture = RES.getRes(this.skin + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);

            if (this.sp != null) {
                this.sp.parent.removeChild(this.sp);
                this.sp.stop();
            }

            this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
            this.addChild(this.sp);//添加到显示列表

            this.sp.x = -this.sp.width / 2 + this.offsetx;
            this.sp.y = -this.sp.height / 2 + this.offsety;

            this.sp.gotoAndPlay(1, -1);

            this.sp.touchEnabled = true;

            /*
            var shap:egret.Shape = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawCircle(0, 0,2);
            shap.graphics.endFill();
            this.addChild(shap);
            */
        }

        private creatBullet(source:game.BaseSprite, target:game.BaseSprite): void {

            var nowTime: number = egret.getTimer();
            console.log(nowTime, this.lastTime);
            if (nowTime > this.lastTime) {
                this.lastTime = nowTime + this.MoveSpeed;//下次执行时间
                game.XFKControls.dispatchEvent(game.BaseEvent.gm_activation_bullet, [source, target]);
                this.changOrientation(target.Point);
            }
           
        }

        private searchTarget(): void {
            var objectList: Object = game.ModuleManager.Instance.GetModuleList();
            var tempSp: game.XFKSprite;

            for (var key in objectList) {

                if (objectList[key] instanceof game.XFKSprite) {
                    tempSp = objectList[key];
                    if (game.CommonFunction.GetDistance(tempSp.Point, this.Point) <= this.radius) {
                        this.creatBullet(this, tempSp);
                    }
                    
                }
            }
        }

        private changOrientation(point:egret.Point): void//根据敌人的位置改变方向
		{
            var xx:number = point.x - this.x;
            var yy: number = point.y - this.y;
            var angle: number = Math.atan2(yy, xx);
            angle *= 180 / Math.PI;
            angle -= 180;
            if (angle < 0) angle += 360;
            //_angle = angle;
            //var child:Sprite = _tower.getChildAt(0) as Sprite;帧
            var index: number = Math.round(this.sp.totalFrames * angle / 360) ;// angle/360/72
            this.sp.gotoAndStop(index);
		}

        public OnLoad(parent: egret.DisplayObjectContainer): void {

            super.OnLoad(parent);
            parent.addChild(this);
            this.creatSp();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
            game.ModuleManager.Instance.RegisterModule(this);
        }

        public OnRelease(): void {

            super.OnRelease();
            if (this.sp != null) {
                this.sp.stop();
            }
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
            game.ModuleManager.Instance.UnRegisterModule(this);
        }

       
        /**
        *	 虚方法，需要Override
        * @param ElapsedSeconds 距离上次被更新的时间间隔
        *
        */
        public OnUpdate(passTime: number): void {
            super.OnUpdate(passTime);
            if (this.MoveSpeed == 0){
                return;
            }
            this.searchTarget();
        }

        private onTouchTab(e: egret.TouchEvent): void {

            if (this.radiusShap == null) {
                this.radiusShap = new egret.Shape();
                this.radiusShap.graphics.beginFill(0xffff60, 1);
                this.radiusShap.graphics.drawCircle(0, 0, this.radius);
                this.radiusShap.graphics.endFill();
                this.radiusShap.alpha = 0.2;
                this.addChild(this.radiusShap);
            }

            game.TDSelectPanel.Ins.showPanel(this.onChange,this);
            game.TDSelectPanel.Ins.setPoint(new egret.Point(this.Point.x, this.Point.y+this.sp.height));//与预期不一样
        }

        private onChange(item:string): void {

            this.parseSkin(item);
            this.creatSp();

            if (this.radiusShap != null) {
                this.removeChild(this.radiusShap);
                this.radiusShap = null;
            }
        }

        public Parse(obj: any): void {

            this.name = obj.name;
            this.x = parseInt(obj.x);
            this.y = parseInt(obj.y);
            this.parseSkin(obj.type);
        }

        private parseSkin(key:string): void {

            var data = RES.getRes("turretskin");//这里遇到一个文件编码问题,主要是中文,为了方便,文件统一utf-8吧

            this.skin = key;
            this.offsetx = parseInt(data[key].offsetx);
            this.offsety = parseInt(data[key].offsety);
            this.radius = parseInt(data[key].radius);
            this.MoveSpeed = parseInt(data[key].speed);
            this.glob = parseInt(data[key].glob);
        }

    }
} 