package com.reactnativepicky.events;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class ItemSelectedEvent extends Event<ItemSelectedEvent> {

  public static final String EVENT_NAME = "pickyItemSelected";

  private final Object mValue;
  private final int mColumn;
  private final int mIndex;

  public ItemSelectedEvent(int viewTag, Object value, int index, int column) {
    super(viewTag);
    mValue = value;
    mIndex = index;
    mColumn = column;
  }

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

//  @Override
//  public WritableMap getEventData() {
//    WritableMap eventData = Arguments.createMap();
//
//    Class mValueClass = mValue.getClass();
//    if (mValueClass == Integer.class) {
//      eventData.putInt("data", (Integer) mValue);
//    } else if (mValueClass == String.class) {
//      eventData.putString("data", mValue.toString());
//    }
//
//    return eventData;
//  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
  }

  private WritableMap serializeEventData() {
    WritableMap eventData = Arguments.createMap();

    Class mValueClass = mValue.getClass();
    if (mValueClass == Integer.class) {
      eventData.putInt("value", (Integer) mValue);
    } else if (mValueClass == Double.class) {
      eventData.putDouble("value", (Double) mValue);
    } else if (mValueClass == String.class) {
      eventData.putString("value", mValue.toString());
    }

    eventData.putInt("index", mIndex);
    eventData.putInt("column", mColumn);

    return eventData;
  }
}
