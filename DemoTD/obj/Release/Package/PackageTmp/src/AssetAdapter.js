var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject, oldContent) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }

        var content = source;
        if (source.prototype) {
            content = new source();
        }
        if (content instanceof egret.DisplayObject || content instanceof egret.Texture) {
            compFunc.call(thisObject, content, source);
        } else if (typeof (source) == "string") {
            if (RES.hasRes(source)) {
                RES.getResAsync(source, onGetRes, this);
            } else {
                RES.getResByUrl(source, onGetRes, this);
            }
        } else {
            compFunc.call(thisObject, content, source);
        }
    };
    return AssetAdapter;
})();
