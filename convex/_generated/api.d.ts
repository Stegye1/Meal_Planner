/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as mutations_addIngredient from "../mutations/addIngredient.js";
import type * as mutations_addRecipe from "../mutations/addRecipe.js";
import type * as mutations_deleteImage from "../mutations/deleteImage.js";
import type * as mutations_generateUploadUrl from "../mutations/generateUploadUrl.js";
import type * as mutations_updateIngredient from "../mutations/updateIngredient.js";
import type * as mutations_updateRecipe from "../mutations/updateRecipe.js";
import type * as queries_getAllIngredients from "../queries/getAllIngredients.js";
import type * as queries_getAllRecipes from "../queries/getAllRecipes.js";
import type * as queries_getImageUrl from "../queries/getImageUrl.js";
import type * as queries_getIngredient from "../queries/getIngredient.js";
import type * as queries_getRecipe from "../queries/getRecipe.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "mutations/addIngredient": typeof mutations_addIngredient;
  "mutations/addRecipe": typeof mutations_addRecipe;
  "mutations/deleteImage": typeof mutations_deleteImage;
  "mutations/generateUploadUrl": typeof mutations_generateUploadUrl;
  "mutations/updateIngredient": typeof mutations_updateIngredient;
  "mutations/updateRecipe": typeof mutations_updateRecipe;
  "queries/getAllIngredients": typeof queries_getAllIngredients;
  "queries/getAllRecipes": typeof queries_getAllRecipes;
  "queries/getImageUrl": typeof queries_getImageUrl;
  "queries/getIngredient": typeof queries_getIngredient;
  "queries/getRecipe": typeof queries_getRecipe;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
