module game {
    export class BasePanel extends egret.Sprite {


        public isOpen: boolean = false;

        private backBG: egret.Bitmap;
        public constructor() {
            super();
        }

        private backGround(): void
        {
            if (this.backBG) { return; }
            this.backBG = new egret.Bitmap();
            this.backBG.name = "panelbackground";
            this.backBG.texture = RES.getRes("panelbackground");
            this.backBG.alpha = 0.6;
            this.backBG.width = game.XFKLayer.Ins.Stage.width;
            this.backBG.height = game.XFKLayer.Ins.Stage.height;
            game.XFKLayer.Ins.UiLayer.addChild(this.backBG);
        }


        public show(type: number= 0): void {

            this.isOpen = true;
            //灰色遮罩显示与否
            if (type == 0) {
                this.backGround();
            }

            game.XFKLayer.Ins.UiLayer.addChild(this);
        }


		public close(): void {
            this.isOpen = false;

            if (this.backBG && this.backBG.parent) {
                game.XFKLayer.Ins.UiLayer.removeChild(this.backBG);
                this.backBG = null;
            }

            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public setWindowCenter(): void {

            this.x = game.XFKLayer.Ins.Stage.width - this.width >> 1;
            this.y = game.XFKLayer.Ins.Stage.height - this.height >> 1;
        } 

        public setPoint(point: egret.Point): void {

            this.x = point.x - (this.width>>1);
            this.y = point.y - (this.height>>1);
        }


    }
}