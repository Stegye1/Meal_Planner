
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
 
  ingredients: defineTable({
    name: v.string(),
    unit: v.union(v.literal("g"), v.literal("ml")), // hlavní jednotka
    // Alternativní jednotky (volitelné) – např. "lžíce", "lžička", "špetka"
    altUnits: v.optional(
      v.array(
        v.object({
          name: v.string(),
          unitsPerAltUnit: v.number(), // převod altUnit na unit
        }),
      ),
    ),
    // Výživové hodnoty na 100 g / 100 ml)
    nutrients: v.object({
      kcal: v.number(),
      protein: v.number(),
      fat: v.number(),
      carbohydrates: v.number(),
      sugar: v.number(),
      fiber: v.number(),
    }),
  }).index("by_name", ["name"]),


  meals: defineTable({
    name: v.string(),
    types: v.array(
      v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner")),
    ),
    pictureStorageId: v.optional(v.id("_storage")), 

    
  ingredients: v.array(
    v.object({
      ingredientId:v.id("ingredients"),
      amount: v.number(), 
      altUnitIndex: v.optional(v.number())  // když není zadaný, platí základní jednotka
    })
  ),


    // výživové hodnoty přepočtené na 1 porci
    nutrients: v.object({
      kcal: v.number(),
      protein: v.number(),
      fat: v.number(),
      carbohydrates: v.number(),
      sugar: v.number(),
      fiber: v.number(),
    }),

    
    preparation: v.object({
      firstStep: v.string(),
      secondStep: v.optional(v.string()),
      thirdStep: v.optional(v.string()),
      fourthStep: v.optional(v.string()),
    }),
    servings: v.number(),
    authorId: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_name", ["name"]),

  // 🔗 JOIN TABULKA pro vyhledávání jídel podle ingrediencí
  mealIngredients: defineTable({
    mealId: v.id("meals"),
    ingredientId: v.id("ingredients"),
  })
    .index("by_meal", ["mealId"])
    .index("by_ingredient", ["ingredientId"]),
});




// původní schema s polem čísel pro nutrients
/*
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
    picture: v.optional(v.string()), // pro uložení storageId obrázku
    ingredients: v.array(
      v.object({
        ingredientId: v.id("ingredients"),
        amount: v.number(),
      }),
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
*/
