module game {
    export class BaseEvent extends egret.Event{

        public constructor(type: string, bubbles?: boolean, cancelable?: boolean) {
            super(type,bubbles,cancelable);
        }

        public object: any;

        /**
        *  激活,创建一个子弹
        */
        static gm_activation_bullet: string = "gm_activation_bullet";
        /**
        *  移动结束(敌方到达目标点)
        */
        static gm_moveEnd: string = "gm_moveEnd";
        /**
        *  我方总部血量有变化触发
        */
        static gm_headquarters_hpChange: string = "gm_headquarters_hpChange";
        /**
        *  有敌方单位死亡时触发
        */
        static gm_monster_death: string = "gm_monster_death";
    }
} 