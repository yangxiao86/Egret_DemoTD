module game {

    export class XFKHpImg extends game.BaseDecoration {

        public constructor() {
            super();
        }
        private hpBg: egret.Bitmap;
        private hp: egret.Bitmap;
        private hpWidth: number = 44;
        private parentSprite: egret.DisplayObjectContainer;

        public OnLoad(parent: egret.DisplayObjectContainer): void {
            this.parentSprite = parent;
            this.init();
        }

        public OnRelease(): void {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this.parentSprite = null;
        }

        private init(): void {
            this.hpBg = new egret.Bitmap();
            this.hpBg.texture = RES.getRes("spritehpbg_png");

            this.hp = new egret.Bitmap();
            this.hp.texture = RES.getRes("spritehp_png");
            this.hp.x = 1;
            this.hp.y = 1;

            this.addChild(this.hpBg);
            this.addChild(this.hp);
        }

        public sethp(cnum: number,mnum:number): void {
            this.hp.width = game.CommonFunction.numPrecentage(cnum, mnum, this.hpWidth);
            this.hp.x = 1;
            this.hp.y = 1;
            if (this.parent == null) {
                this.parentSprite.addChild(this);
                this.x = - this.width >> 1;
                this.y = - 40;
            }
        }
    }
} 