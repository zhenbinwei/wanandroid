/*
 * Copyright (C)  Justson(https://github.com/Justson/AgentWeb)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.wanandroid.views;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.LinearInterpolator;

/**
 * @author cenxiaozhong
 * @since 1.0.0
 */
public class WebIndicator extends View {

    /**
     * 进度条颜色
     */
    private int mColor;
    /**
     * 进度条的画笔
     */
    private Paint mPaint;
    /**
     * 正常进度条动画
     */
    private Animator mAnimator;

    /**
     * 标志当前进度条的状态
     */
    private int TAG = 0;
    public static final int UN_START = 0;
    public static final int STARTED = 1;
    public static final int FINISH = 2;


    private float mCurrentProgress = 0F;

    public WebIndicator(Context context) {
        this(context, null);
    }

    public WebIndicator(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public WebIndicator(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs, defStyleAttr);
    }

    private void init(Context context, AttributeSet attrs, int defStyleAttr) {

        mPaint = new Paint();
        mColor = Color.parseColor("#1e90ff");
        mPaint.setAntiAlias(true);
        mPaint.setColor(mColor);
        mPaint.setDither(true);
        mPaint.setStrokeCap(Paint.Cap.SQUARE);

    }

    public void setColor(int color) {
        this.mColor = color;
        mPaint.setColor(color);
    }

    public void setColor(String color) {
        this.setColor(Color.parseColor(color));
    }



    @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawRect(0, 0, mCurrentProgress / 100 * Float.valueOf(this.getWidth()), this.getHeight(), mPaint);
    }

    public void start(){
        if (getVisibility() == View.GONE) {
            this.setVisibility(View.VISIBLE);
        }
        mCurrentProgress = 0f;
        startAnim(false);
    }

    public void setProgress(float progress) {
        if (getVisibility() == View.GONE) {
            setVisibility(View.VISIBLE);
        }
        if (progress < 95f){
            return;
        }
        if (TAG != FINISH) {
            startAnim(true);
        }
    }
    private void hide() {
        if (getVisibility() == View.VISIBLE) {
            setVisibility(View.GONE);
        }
        if(mAnimator!=null){
            mAnimator.cancel();
        }
    }

    public void end(){
        startAnim(true);
    }

    private synchronized void startAnim(boolean isFinished) {


        float v = isFinished ? 100 : 95;


        if (mAnimator != null && mAnimator.isStarted()) {
            mAnimator.cancel();
        }

        if (!isFinished) {
            ValueAnimator mAnimator = ValueAnimator.ofFloat(mCurrentProgress, v);
            mAnimator.setInterpolator(new LinearInterpolator());
            mAnimator.setDuration(4*1000);
            mAnimator.addUpdateListener(mAnimatorUpdateListener);
            mAnimator.start();
            this.mAnimator = mAnimator;
        } else {
            if(mAnimator!=null){
                mAnimator.cancel();
            }
            ValueAnimator endAnimator = null;
                endAnimator = ValueAnimator.ofFloat(mCurrentProgress, v);
                endAnimator.setDuration(300);
                endAnimator.setInterpolator(new AccelerateInterpolator());
                endAnimator.addUpdateListener(mAnimatorUpdateListener);
            endAnimator.addListener(mAnimatorListenerAdapter);
            endAnimator.start();
            mAnimator = endAnimator;
        }
    }

    private ValueAnimator.AnimatorUpdateListener mAnimatorUpdateListener = new ValueAnimator.AnimatorUpdateListener() {
        @Override
        public void onAnimationUpdate(ValueAnimator animation) {
            float t = (float) animation.getAnimatedValue();
            WebIndicator.this.mCurrentProgress = t;
            WebIndicator.this.invalidate();
        }
    };

    private AnimatorListenerAdapter mAnimatorListenerAdapter = new AnimatorListenerAdapter() {
        @Override
        public void onAnimationEnd(Animator animation) {
            doEnd();
        }
    };

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();

        /**
         * animator cause leak , if not cancel;
         */
        if (mAnimator != null && mAnimator.isStarted()) {
            mAnimator.cancel();
            mAnimator = null;
        }
    }

    private void doEnd() {
        mCurrentProgress=50;
        hide();
    }
}
