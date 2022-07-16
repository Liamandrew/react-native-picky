package com.reactnativepicky;

import com.aigestudio.wheelpicker.WheelPicker;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.reactnativepicky.events.ItemSelectedEvent;

import java.util.List;

public class Picky extends WheelPicker {

  private final EventDispatcher mEventDispatcher;
  private List<String> mValueData;
  private int mState;
  private int mColumn;

  public Picky(ReactContext reactContext) {
    super(reactContext);
    mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
    setOnWheelChangeListener(new OnWheelChangeListener() {
      @Override
      public void onWheelScrolled(int offset) {
      }

      @Override
      public void onWheelSelected(int index) {
        if (mValueData != null && index < mValueData.size()) {
          mEventDispatcher.dispatchEvent(
            new ItemSelectedEvent(getId(), mValueData.get(index), index, mColumn));
        }
      }

      @Override
      public void onWheelScrollStateChanged(int state) {
        mState = state;
      }
    });
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);
  }

  public void setValueData(List<String> data) {
    mValueData = data;
  }

  public void setColumn(int column) {
    mColumn = column;
  }

  public int getState() {
    return mState;
  }
}

