server_src := $(wildcard server/src/*rs)
server_src += server/Cargo.toml

client_src := $(wildcard client/*.js)


target/release/server: $(server_src)
	cargo build -p server --release

android: $(client_src)
	cd client; react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

.PHONY: android run-android run-server

run-android: android
	cd client; react-native run-android

run-server: target/release/server
	./target/release/server
