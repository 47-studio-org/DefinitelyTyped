import * as bencode from "bencode";

bencode.byteLength("abcde"); // $ExpectType number
bencode.encodingLength("abcde"); // $ExpectType number
bencode.encode([1, 2, 3, 4], new Buffer([]), 1); // $ExpectType Buffer || Buffer<ArrayBufferLike>
bencode.decode(new Buffer("abcde"), 1, 3); // $ExpectType any
bencode.decode(new Buffer("abcde"), 1, 3, "utf-8"); // $ExpectType any
bencode.decode(new Buffer("abcde"), 1, "utf-8"); // $ExpectType any
bencode.decode(new Buffer("abcde"), "utf-8"); // $ExpectType any
