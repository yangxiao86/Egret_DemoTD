module game {
    export class XFKControls{
        public constructor() {  }

        private static dispatcher: egret.EventDispatcher = new egret.EventDispatcher();

        public static dispatchEvent(type: string, object: any): void {
            var event: game.BaseEvent = new game.BaseEvent(type);
            event.object = object;
            this.dispatcher.dispatchEvent(event);

            
        }

        public static addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {

            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        }

        public static removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void {

            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        }
    }
} 