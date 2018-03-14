package com.wanandroid.views;

import android.content.Context;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.LinearLayout;

/**
 * Created by weizhenbin on 2018/3/12.
 */

public class WebViewLayout extends LinearLayout {
    private WebView webView;
    private WebIndicator webIndicator;
    public WebViewLayout(Context context) {
        this(context,null);
    }

    public WebViewLayout(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs,0);
    }

    public WebViewLayout(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        setOrientation(VERTICAL);
        initIndicator();
        initWebView();
        this.addView(webIndicator,new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 6));
        this.addView(webView,new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }
    private class MyWebCromeClient extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            Log.d("MyWebCromeClient", "newProgress:" + newProgress);
            if (newProgress == 100) {
                //加载完毕进度条消失
                webIndicator.end();
            }
            super.onProgressChanged(view, newProgress);
        }
    }
    public void setUrl(String url){
        webView.loadUrl(url);
    }


    private void initIndicator(){
        if(webIndicator==null){
            webIndicator=new WebIndicator(getContext());
            webIndicator.start();
        }
    }

    private void initWebView(){
        if(webView==null){
            webView=new WebView(getContext());
            //支持javascript
            webView.getSettings().setJavaScriptEnabled(true);
            // 设置可以支持缩放
            webView.getSettings().setSupportZoom(true);
            // 设置出现缩放工具
            webView.getSettings().setBuiltInZoomControls(false);
            //扩大比例的缩放
            webView.getSettings().setUseWideViewPort(true);
            //自适应屏幕
            webView.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
            webView.getSettings().setLoadWithOverviewMode(true);
            webView.setWebChromeClient(new MyWebCromeClient());
        }
    }
}
