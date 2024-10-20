/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.14.4.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as _types from "../_types.js";
import type * as activities from "../activities.js";
import type * as auth from "../auth.js";
import type * as channelMembers from "../channelMembers.js";
import type * as channels from "../channels.js";
import type * as documents from "../documents.js";
import type * as folders from "../folders.js";
import type * as helper from "../helper.js";
import type * as http from "../http.js";
import type * as lists from "../lists.js";
import type * as members from "../members.js";
import type * as messages from "../messages.js";
import type * as organizations from "../organizations.js";
import type * as presence from "../presence.js";
import type * as profile from "../profile.js";
import type * as requests from "../requests.js";
import type * as resendOTP from "../resendOTP.js";
import type * as spaces from "../spaces.js";
import type * as tasks from "../tasks.js";
import type * as userData from "../userData.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  _types: typeof _types;
  activities: typeof activities;
  auth: typeof auth;
  channelMembers: typeof channelMembers;
  channels: typeof channels;
  documents: typeof documents;
  folders: typeof folders;
  helper: typeof helper;
  http: typeof http;
  lists: typeof lists;
  members: typeof members;
  messages: typeof messages;
  organizations: typeof organizations;
  presence: typeof presence;
  profile: typeof profile;
  requests: typeof requests;
  resendOTP: typeof resendOTP;
  spaces: typeof spaces;
  tasks: typeof tasks;
  userData: typeof userData;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
