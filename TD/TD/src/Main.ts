/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");

        //层管理
        game.XFKLayer.Ins.OnLoad(this.stage);

        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.loadingView.x = (egret.StageDelegate.getInstance()._stageWidth - this.loadingView.width) >> 1; //设置居中
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
        RES.loadGroup("scene1");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            /*
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
            */
        }
        else if (event.groupName == "scene1") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }
    /**
    * 资源组加载出错
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " 中有加载失败的项目");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建场景界面
     */
    private createScene(): void {

        var button1: egret.gui.Button = new egret.gui.Button();
        button1.right = 0;
        button1.top = 0;
        button1.label = "关卡1";
        button1.name = "scene1";
        button1.height = 40;
        button1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        var button2: egret.gui.Button = new egret.gui.Button();
        button2.right = 0;
        button2.top = 45;
        button2.label = "关卡2";
        button2.name = "scene2";
        button2.height = 40;
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        var button3: egret.gui.Button = new egret.gui.Button();
        button3.horizontalCenter = 0;
        button3.top = 0;
        button3.label = "开始";
        button3.name = "isStop";
        button3.height = 40;
        button3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonStop, this);
        //在GUI范围内一律使用addElement等方法替代addChild等方法。

        game.XFKLayer.Ins.GuiLayer.addElement(button1);
        game.XFKLayer.Ins.GuiLayer.addElement(button2);
        game.XFKLayer.Ins.GuiLayer.addElement(button3);

        game.ModuleManager.Instance.IsStop = this._isStop;
        button1.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));

    }

    private scene: game.XFKScene;

    private onButtonClick(event: egret.TouchEvent): void {
        if (this.scene) { this.scene.OnRelease(); }
        this.scene = new game.XFKScene();
        this.scene.OnLoad(event.target.name);
    }

     /**
     *  是否暂停游戏
     */
    private _isStop: boolean = true;

    private onButtonStop(event: egret.TouchEvent): void {
        if (this._isStop) {
            event.target.label = "暂停";
        }
        else{
            event.target.label = "开始";
        }
        this._isStop = !this._isStop;
        game.ModuleManager.Instance.IsStop = this._isStop;
    }
}


