module game {

    export class XFKConfig {

        public constructor() { }

        private static ins: XFKConfig;

        public static get Ins(): XFKConfig {
            if (this.ins == null) this.ins = new XFKConfig();
            return this.ins;
        }
        /**
        * 昵称
        */
        public NickName: string;
        /**
        * 用户金钱
        */
        public Glob:number=0;
        /**
        * 当前怪物的进度
        */
        public Count: number = 0;

        public addGlob(value: number): void {
            this.Glob = this.Glob + value;
        }
    }
} 