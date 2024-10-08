import { play } from "sound-play";

// $ExpectType Promise<{ stdout: string | Buffer; stdin: string | Buffer; }> || Promise<{ stdout: string | Buffer<ArrayBufferLike>; stdin: string | Buffer<ArrayBufferLike>; }>
play("file.mp3");

// $ExpectType Promise<{ stdout: string | Buffer; stdin: string | Buffer; }> || Promise<{ stdout: string | Buffer<ArrayBufferLike>; stdin: string | Buffer<ArrayBufferLike>; }>
play("file.mp3", 0.5);

// @ts-expect-error
play(0.5, "file.mp3");

// @ts-expect-error
play("file.mp3", "another string");
