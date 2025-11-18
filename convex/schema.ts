// import { defineTable, v } from "convex/values";

// export const recipes = defineTable({
//   title: v.string(),
//   ingredients: v.array(v.string()),
//   instructions: v.string(),
//   authorId: v.id("users"),
//   createdAt: v.number(),
// })
//   .index("by_title", ["title"])  // pro full-text search
//   .index("by_author", ["authorId"]);

  // convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ingredients: defineTable({
    name: v.string(),
    unit: v.union(v.literal("g"), v.literal("ml")), // jednotky převedeny na g/ml pro DB
    nutrients: v.array(v.number()), // [kcal, tuk, sacharidy, protein] na 100 g / 100 ml, délka pole musí být definována jinde?
  }),
  meals: defineTable({
    name: v.string(),
    types: v.array(v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"))),
    picture: v.optional(v.string()),  // pro uložení storageId obrázku
    ingredients: v.array(
      v.object({
        ingredientId: v.id("ingredients"),
        amount: v.number(),
      })
    ),
    nutrients: v.array(v.number()), // [kcal, tuk, sacharidy, protein] na 1 porci, délka pole musí být definována jinde?

    preparation: v.object({
      firstStep: v.string(),
      secondStep: v.optional(v.string()),
      thirdStep: v.optional(v.string()),
      fourthStep: v.optional(v.string()),
    }),
    servings: v.number(),
  }),
});
