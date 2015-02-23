module game {

    export class XFKDecoration extends game.BaseDecoration {

        public constructor() {
            super();
            
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(event: egret.Event) {

            this.init();
            this.draw();
        }

        private _hp: number = 10;

        public setHp(value: number): void {
            this._hp = value;
            this.draw();
        }
        private set hp(value: number) {
            if (value == this.hp) {
                return;
            }
            this.setHp(value);
            this.hpText.text = value.toString();
            if (this._hp <= 0) {
                game.XFKControls.dispatchEvent(game.BaseEvent.gm_headquarters_hpChange, this);
            }
        }
        private get hp(): number {
            return this._hp;
        }

        public OnUpdate(type: number, value: any): void {

            this.OnUpdate(type, value);
        }

        public OnLoad(parent: egret.DisplayObjectContainer): void {
            parent.addChild(this);
            
            game.XFKControls.addEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        }

        public OnRelease(): void {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            game.XFKControls.removeEventListener(game.BaseEvent.gm_moveEnd, this.gm_moveEnd, this);
        }

        private hpText: egret.BitmapText;

        private init(): void {

            var data = RES.getRes("num_fnt");

            this.hpText = new egret.BitmapText();
            this.hpText.font = data;
            this.hpText.text = this.hp.toString();
            this.addChild(this.hpText);

            var shap: egret.Shape = new egret.Shape();
            shap.graphics.beginFill(0xffff60, 1);
            shap.graphics.drawRect(0, 0, 8, 8);
            shap.graphics.endFill();
            this.addChild(shap);//添加到显示列表
        }

        private draw(): void {
            if (this.parent == null) {
                return;
            }
            this.hpText.x = -this.hpText.width >> 1;
            this.hpText.y = -this.hpText.height >> 1;
        }

        //处理怪物走到目标点
        private gm_moveEnd(e: game.BaseEvent): void {
            if (e.object instanceof game.XFKSprite) {
                this.hp = this.hp - (<game.XFKSprite>e.object).Atk;

            }
        }
    }

}
 