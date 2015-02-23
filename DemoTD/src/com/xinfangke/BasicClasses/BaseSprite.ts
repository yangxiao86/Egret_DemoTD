module game {
    export class BaseSprite extends egret.Sprite implements game.IObject
    {

        public constructor() {
            super();
            this.id = game.CommonFunction.Token;
        }

        private id: number;

        public get ID(): number { return this.id; }
        /**
        * 类型
        */
        public Type: string = "sprite1";
        /**
        * 	精灵的移动速度
        */
        public MoveSpeed: number = 0.1;
        /**
        * 	精灵的血量
        */
        public Hp: number = 100;
        /**
        * 	攻击力
        */
        public Atk: number = 1;
        /**
        * 精灵方向 (默认为下)
        */
        private direction: string = "";

        public get Direction(): string {
            return this.direction;
        }

        public setHp(value): void {
            this.Hp = value;
            this.dispatchEvent(new egret.Event("gm_hpChange"));
        }
        /**
        *   设定朝向
        * @param p:要朝向的点
        */
        public setDirection(p: egret.Point): void
        {
            var xNum: number = p.x - this.x;
            var yNum: number = p.y - this.y;
            var tempDirection: string;
            if (xNum == 0) {
                if (yNum > 0) {
                    tempDirection = "down";
                }
                if (yNum < 0) {
                    tempDirection = "up";
                }
            }
            if (yNum == 0) {
                if (xNum > 0) {
                    tempDirection = "right";
                }
                if (xNum < 0) {
                    tempDirection = "left";
                }
            }
            if (tempDirection != this.direction) {

                this.direction = tempDirection;
                this.dispatchEvent(new egret.Event("gm_directionChange"));
            }
            return; 
        }

        /**
		 *	 虚方法，需要Override
		 *
		 */
        public OnUpdate(passTime: number): void {
            
        }
        public OnLoad(parent: egret.DisplayObjectContainer): void {

        }

        public OnRelease(): void {

        }

        public get Point(): egret.Point {
            return new egret.Point(this.x,this.y);
        }

    }
}