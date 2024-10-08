declare function Twitchat(anyVar: any): string;
declare namespace Twitchat {
    const environment: "production";
    // List of the events fired by Twitchat you can listen.
    type EventType =
        | "MESSAGE_READ"
        | "MESSAGE_NON_FOLLOWER"
        | "MESSAGE_DELETED"
        | "MESSAGE_FIRST"
        | "MESSAGE_FIRST_ALL_TIME"
        | "MESSAGE_WHISPER"
        | "FOLLOW"
        | "MENTION"
        | "POLL_PROGRESS"
        | "PREDICTION_PROGRESS"
        | "MENTION"
        | "CURRENT_TRACK"
        | "TRACK_ADDED_TO_QUEUE"
        | "RAFFLE_RESULT"
        | "COUNTDOWN_START"
        | "COUNTDOWN_COMPLETE"
        | "TIMER_START"
        | "TIMER_STOP"
        | "TIMER_OVERLAY_PRESENCE"
        | "WHEEL_OVERLAY_PRESENCE"
        | "EMERGENCY_MODE"
        | "CHAT_HIGHLIGHT_OVERLAY_PRESENCE"
        | "VOICEMOD_CHANGE"
        | "RAFFLE_CREATE"
        | "RAFFLE_STOP"
        | "VOICEMOD_CHANGE";
    // List of actions you can request Twitchat to perform.
    type ActionType =
        | "GREET_FEED_READ"
        | "GREET_FEED_READ_ALL"
        | "CHAT_FEED_READ"
        | "CHAT_FEED_READ_ALL"
        | "CHAT_FEED_PAUSE"
        | "CHAT_FEED_UNPAUSE"
        | "CHAT_FEED_SCROLL_UP"
        | "CHAT_FEED_SCROLL_DOWN"
        | "POLL_TOGGLE"
        | "PREDICTION_TOGGLE"
        | "BINGO_TOGGLE"
        | "RAFFLE_TOGGLE"
        | "VIEWERS_COUNT_TOGGLE"
        | "MOD_TOOLS_TOGGLE"
        | "CENSOR_DELETED_MESSAGES_TOGGLE"
        | "GET_CURRENT_TRACK"
        | "WHEEL_OVERLAY_START"
        | "GET_WHEEL_OVERLAY_PRESENCE"
        | "GET_CURRENT_TIMERS"
        | "GET_TIMER_OVERLAY_PRESENCE"
        | "SET_EMERGENCY_MODE"
        | "GET_CHAT_HIGHLIGHT_OVERLAY_PRESENCE"
        | "SET_CHAT_HIGHLIGHT_OVERLAY_MESSAGE"
        | "SHOW_CLIP"
        | "START_EMERGENCY"
        | "STOP_EMERGENCY"
        | "SHOUTOUT"
        | "STOP_TTS"
        | "ENABLE_STT"
        | "DISABLE_STT"
        | "CUSTOM_CHAT_MESSAGE";
}
export = Twitchat;
export as namespace Twitchat;
