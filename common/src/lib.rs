#[macro_use]
extern crate serde_derive;
extern crate bincode;


#[derive(Debug, Serialize, Deserialize)]
pub enum Packet {
    Text(String),
}

use bincode::{serialize, deserialize};

impl Packet {

    pub fn encode(&self) -> Vec<u8> {
        serialize(self).unwrap()     
    }

    pub fn decode(encoded: &[u8]) -> Self {
        deserialize(&encoded[..]).unwrap()
    }
}

#[cfg(feature = "jni")]
#[allow(non_snake_case)]
pub mod android {
    extern crate jni;

    use self::jni::JNIEnv;
    use self::jni::objects::{JClass, JString};
    use self::jni::sys::jstring;

    use std::io::prelude::*;
    use std::net::TcpStream;

    #[no_mangle]
    pub unsafe extern fn Java_com_client_RustLib_greeting(env: JNIEnv, _: JClass, name: JString) -> jstring {
        let name: String = env.get_string(name).unwrap().into();
        let response = format!("Hello {}!", name);
        env.new_string(response).unwrap().into_inner()
    }

    #[no_mangle]
    pub unsafe extern fn Java_com_client_RustLib_getPacket(env: JNIEnv, _: JClass, address: JString) -> jstring {
        let address: String = env.get_string(address).unwrap().into();
        let mut stream = TcpStream::connect(address).unwrap();
        let mut buffer = [0u8; 128];
        let _ = stream.read(&mut buffer);
        let packet = super::Packet::decode(&buffer);
        let response = format!("{:?}", packet);
        env.new_string(response).unwrap().into_inner()
    }
}

