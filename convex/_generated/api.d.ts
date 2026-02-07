/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as buyers from "../buyers.js";
import type * as init from "../init.js";
import type * as legalDocuments from "../legalDocuments.js";
import type * as recommendations from "../recommendations.js";
import type * as reminders from "../reminders.js";
import type * as seedData_buyers from "../seedData/buyers.js";
import type * as seedData_legalDocuments from "../seedData/legalDocuments.js";
import type * as seedData_tutorials from "../seedData/tutorials.js";
import type * as tutorials from "../tutorials.js";
import type * as wasteEntries from "../wasteEntries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  buyers: typeof buyers;
  init: typeof init;
  legalDocuments: typeof legalDocuments;
  recommendations: typeof recommendations;
  reminders: typeof reminders;
  "seedData/buyers": typeof seedData_buyers;
  "seedData/legalDocuments": typeof seedData_legalDocuments;
  "seedData/tutorials": typeof seedData_tutorials;
  tutorials: typeof tutorials;
  wasteEntries: typeof wasteEntries;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
