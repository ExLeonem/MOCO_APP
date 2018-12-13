server_src := $(wildcard server/src/*rs)
server_src += server/Cargo.toml

#migrations := $(wildcard server/migrations/*/*)

client_src := $(wildcard client/*.js)


server/target/release/server: $(server_src) server/database.sqlite server/src/schema.rs
	cd server; cargo build --release

server/src/schema.rs: server/database.sqlite #$(migrations)
	cd server; diesel print-schema --database-url database.sqlite > src/schema.rs

android: $(client_src)
	cd client; react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

.PHONY: android run-android run-server test-server server

server: server/target/release/server

test-server: $(server_src)
	cd server; cargo test -p server

run-android: android
	cd client; react-native run-android

run-server: server/target/release/server
	cd server; ./target/release/server
