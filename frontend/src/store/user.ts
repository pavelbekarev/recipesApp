import { UserInfo } from "@vkontakte/vk-bridge";
import { createEvent, createStore } from "effector";
import { setUserServerFx } from "../api/user";

// хранилище пользователя.
export const $user = createStore<UserInfo | null>(null);
export const setUserVk = createEvent<UserInfo>();


$user.on(setUserVk, (_, user) => user);

// хранилище пользователя для отправки в базу данных.
export const $setUserOnServer = createStore<any>(null);

// отправка пользователя в базу данных.
$setUserOnServer.on(setUserServerFx.doneData, (_, user) => user);