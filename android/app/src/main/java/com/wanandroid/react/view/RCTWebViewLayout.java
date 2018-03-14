package com.wanandroid.react.view;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.wanandroid.views.WebViewLayout;

/**
 * Created by weizhenbin on 2018/3/12.
 */

public class RCTWebViewLayout extends ViewGroupManager<WebViewLayout> {
    @Override
    public String getName() {
        return "RCTWebViewLayout";
    }

    @Override
    protected WebViewLayout createViewInstance(ThemedReactContext reactContext) {
        return new WebViewLayout(reactContext.getCurrentActivity());
    }

    @ReactProp(name = "source")
    public void source(WebViewLayout webViewLayout,String url){
        webViewLayout.setUrl(url);
    }


}
