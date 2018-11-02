ARCHS_ANDROID = aarch64-linux-android armv7-linux-androideabi i686-linux-android

android: $(ARCHS_ANDROID)
	mkdir -p client/android/app/src/main/jniLibs
	sh copy_android.sh

.PHONY: $(ARCHS_ANDROID) run-android
$(ARCHS_ANDROID): %:
	cargo build --target $@ --release

run-android:
	cd client; react-native run-android
