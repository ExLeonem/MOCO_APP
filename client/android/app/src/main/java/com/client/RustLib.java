package com.client;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RustLib extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("common");
    }

    public RustLib(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RustLib";
    }

    private static native String greeting(final String pattern);
    @ReactMethod
    public void greeting(String to, Promise promise) {
        Log.d("RustLib", "sayHello");
        promise.resolve(greeting(to));
    }
}
