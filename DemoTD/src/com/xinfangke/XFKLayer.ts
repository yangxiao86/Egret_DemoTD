module game {
    export class XFKLayer {

        public constructor() {

        }

        private static ins: XFKLayer;

        public static get Ins(): XFKLayer {
            if (this.ins == null) this.ins = new XFKLayer();
            return this.ins;
        }

        public Stage: egret.DisplayObjectContainer;
        /**
        *  游戏基础层
        */
        public GameLayer: egret.DisplayObjectContainer;
        /**
        *  场景层。。懒得改名字了。
        */
        public BgLayer: egret.DisplayObjectContainer;
        /**
        *  精灵层
        */
        public NpcLayer: egret.DisplayObjectContainer;
        /**
        *  挂件层，主要是一些没办法归类的精灵
        */
        public DecorationLayer: egret.DisplayObjectContainer;
        /**
        *  官方的GUI
        */
        public GuiLayer: egret.gui.UIStage;
        /**
        *  游戏可能自己需要的UI
        */
        public UiLayer: egret.DisplayObjectContainer;
        /**
        *  加载进度
        */
        public LoadingView: LoadingUI =  new LoadingUI();

        public LoadingViewOnOff(): void{

            if (this.Stage.contains(this.LoadingView)) {
                this.Stage.removeChild(this.LoadingView);
            }
            else {
                this.Stage.addChild(this.LoadingView);
                this.LoadingView.x = (this.Stage.width - this.LoadingView.width) >> 1; //设置居中
            }
        }

        public SetLoadingView(current, total) {

            this.LoadingView.setProgress(current, total);
        }

        private init(): void {

            //游戏场景层，游戏场景相关内容可以放在这里面（可以单独提取出来）。
            this.GameLayer = new egret.DisplayObjectContainer();
            this.GameLayer.name = "gameLayer";
            this.Stage.addChild(this.GameLayer);

            this.BgLayer = new egret.DisplayObjectContainer();
            this.BgLayer.name = "bgLayer";
            this.GameLayer.addChild(this.BgLayer);

            this.NpcLayer = new egret.DisplayObjectContainer();
            this.NpcLayer.name = "NpcLayer";
            this.GameLayer.addChild(this.NpcLayer);

            this.DecorationLayer = new egret.DisplayObjectContainer();
            this.DecorationLayer.name = "DecorationLayer";
            this.GameLayer.addChild(this.DecorationLayer);

            this.UiLayer = new egret.DisplayObjectContainer();
            this.UiLayer.name = "UiLayer";
            this.Stage.addChild(this.UiLayer);

            //GUI的组件必须都在这个容器内部,UIStage会始终自动保持跟舞台一样大小。
            this.GuiLayer = new egret.gui.UIStage();
            this.GuiLayer.name = "GuiLayer";
            this.Stage.addChild(this.GuiLayer);

        }

        public OnLoad(parent: egret.DisplayObjectContainer): void {

            this.Stage = parent;
            this.init();
        }

    }
} 