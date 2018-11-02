#!/bin/bash

PREFIX=client/android/app/src/main/jniLibs

mkdir -p $PREFIX/x86
mkdir -p $PREFIX/arm64_v8a
mkdir -p $PREFIX/armeabi-v7a

cp target/i686-linux-android/release/libcommon.so $PREFIX/x86/libcommon.so
cp target/aarch64-linux-android/release/libcommon.so $PREFIX/arm64_v8a/libcommon.so
cp target/armv7-linux-androideabi/release/libcommon.so $PREFIX/armeabi-v7a/libcommon.so
