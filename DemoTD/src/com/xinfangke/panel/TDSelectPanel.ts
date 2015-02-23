module game {
    export class TDSelectPanel extends game.BasePanel {

        public constructor() { super(); }

        private static ins: TDSelectPanel;

        public static get Ins(): TDSelectPanel {
            if (this.ins == null) this.ins = new TDSelectPanel();
            return this.ins;
        }

        private text: string;

        private callObject: any;
        private callFun: any;

        public showPanel(callFun, callObject) {

            if (this.isOpen)
            {
                return;
            }
            this.show(0);
            ///////////////////////////////////////////////////
            this.callObject = callObject;
            this.callFun = callFun;

            var data = RES.getRes("turretskin");

            var mcData: any;
            var mcTexture :any;

            for (var key in data) {

                mcData = RES.getRes(key + "_json");
                mcTexture = RES.getRes(key + "_png");
                var mcFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
                var mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(key));

                this.addChild(mc);
                mc.x = Math.abs(this.numChildren - 1) * mc.width+10;
                mc.gotoAndPlay(1, -1);
                mc.name = key;
                mc.touchEnabled = true;
            }

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }

        private onTouchTab(e: egret.TouchEvent): void {

            if (e.target instanceof egret.MovieClip) {
                this.callFun.apply(this.callObject, [e.target.name]);
            }
            this.closePanel();
        }

        public closePanel()
        {
            if (!this.isOpen) {
                return;
            }
            this.close();
            ///////////////////////////////////////////////////
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);

            while (this.numChildren > 0) {
                this.removeChildAt(0)
                //mc.stop();//不用暂停了.
            }
            this.callObject = null;
            this.callFun = null;
        }



    }
}