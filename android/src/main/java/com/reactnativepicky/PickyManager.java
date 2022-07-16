package com.reactnativepicky;

import android.graphics.Color;

import androidx.annotation.NonNull;

import com.aigestudio.wheelpicker.WheelPicker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativepicky.events.ItemSelectedEvent;

import java.util.ArrayList;
import java.util.Map;

public class PickyManager extends SimpleViewManager<Picky> {
    public static final String REACT_CLASS = "Picky";

    private static final int DEFAULT_TEXT_SIZE = 25 * 2;
    private static final int DEFAULT_ITEM_SPACE = 14 * 2;

    @Override
    @NonNull
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    @NonNull
    public Picky createViewInstance(ThemedReactContext reactContext) {
      Picky picker = new Picky(reactContext);

      picker.setAtmospheric(true);

      picker.setCurved(true);

      picker.setVisibleItemCount(5);

      /**
       * ALIGN_CENTER = 0, ALIGN_LEFT = 1, ALIGN_RIGHT = 2;
       */
      picker.setItemAlign(0);

      return picker;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
      return MapBuilder.of(
        ItemSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onChange")
      );
    }

    @ReactProp(name="column")
    public void setColumn(Picky picker, int column) {
      if (picker != null) {
        picker.setColumn(column);
      }
    }

    @ReactProp(name="data")
    public void setData(Picky picker, ReadableArray items) {
      if (picker != null) {
        ArrayList valueData = new ArrayList<>();
        ArrayList<String> labelData = new ArrayList<>();
        for (int i = 0; i < items.size(); i ++) {
          ReadableMap itemMap = items.getMap(i);
          ReadableType valueType = itemMap.getType("value");
          if (valueType == ReadableType.String) {
            valueData.add(itemMap.getString("value"));
          } else if (valueType == ReadableType.Number) {
            valueData.add(itemMap.getDouble("value"));
          }

          labelData.add(itemMap.getString("label"));
        }
        picker.setValueData(valueData);
        picker.setData(labelData);
      }
    }

    @ReactProp(name="selectedIndex")
    public void setSelectedIndex(Picky picker, int index) {
        if (picker != null && picker.getState() == WheelPicker.SCROLL_STATE_IDLE) {
            picker.setSelectedItemPosition(index, false);
            picker.invalidate();
        }
    }

    @ReactProp(name="loop")
    public void setLoop(Picky picker, boolean loop) {
      if (picker != null) {
        picker.setCyclic(loop);
      }
    }

    @ReactProp(name="textColor")
    public void setTextColor(Picky picker, Integer color) {
        if (picker != null) {
            picker.setItemTextColor(color);
            picker.setSelectedItemTextColor(color);
        }
    }

    @ReactProp(name="textSize")
    public void setTextSize(Picky picker, int size) {
        if (picker != null) {
            picker.setItemTextSize((int) PixelUtil.toPixelFromDIP(size));
        }
    }

    @ReactProp(name="itemSpace")
    public void setItemSpace(Picky picker, int space) {
        if (picker != null) {
            picker.setItemSpace((int) PixelUtil.toPixelFromDIP(space));
        }
    }

    @ReactProp(name="hasCurtain")
    public void setHasCurtain(Picky picker, boolean hasCurtain) {
      if (picker != null) {
        picker.setCurtain(hasCurtain);
      }
    }

    @ReactProp(name="curtainColor")
    public void setCurtainColor(Picky picker, int color) {
      if (picker != null) {
        picker.setCurtainColor(color);
      }
    }

    @ReactProp(name="hasIndicator")
    public void setHasIndicator(Picky picker, boolean hasIndicator) {
      if (picker != null) {
        picker.setIndicator(hasIndicator);
      }
    }

    @ReactProp(name="indicatorColor")
    public void setIndicatorColor(Picky picker, int color) {
      if (picker != null) {
        picker.setIndicatorColor(color);
      }
    }

    @ReactProp(name="indicatorSize")
    public void setIndicatorSize(Picky picker, int size) {
      if (picker != null) {
        picker.setIndicatorSize(size);
      }
    }
}
