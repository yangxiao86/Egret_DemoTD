module game {
    export class CommonFunction {
        
        public constructor() {
        }


        private static token: number = 0;
        public static get Token(): number {
            return this.token++;
        }

        public static GetDistance(p1: egret.Point, p2: egret.Point): number {

            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));

        }

        public static GetSpeed(targetP2: egret.Point, currentP1: egret.Point, SpeedNum:number):egret.Point {

            var speed: egret.Point = new egret.Point();
            var hypotenuse:number = game.CommonFunction.GetDistance(targetP2, currentP1);
            if (hypotenuse == 0)
            {
                speed.x = 0;
                speed.y = 0;
                return speed;
            }
            speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
            speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
            return speed;
        }


    }
} 