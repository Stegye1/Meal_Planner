import { Day, Ingredient, Meal, MealType } from "./types";

export const ingredients: Ingredient[] = [
  { id: "1", name: "ovesné vločky", unit: "g" },
  { id: "2", name: "mléko", unit: "ml" },
  { id: "3", name: "med", unit: "g" },
  { id: "4", name: "borůvky", unit: "g" },
  { id: "5", name: "vejce", unit: "ks" },
  { id: "6", name: "sůl", unit: "g" },
  { id: "7", name: "chléb", unit: "g" },
  { id: "8", name: "máslo", unit: "g" },
  { id: "9", name: "jogurt", unit: "g" },
  { id: "10", name: "oříšky", unit: "g" },
  { id: "11", name: "avokádo", unit: "ks" },
  { id: "12", name: "mouka", unit: "g" },
  { id: "13", name: "javorový sirup", unit: "ml" },
  { id: "14", name: "kuřecí maso", unit: "g" },
  { id: "15", name: "ledový salát", unit: "g" },
  { id: "16", name: "olivový olej", unit: "ml" },
  { id: "17", name: "těstoviny", unit: "g" },
  { id: "18", name: "rajčatová omáčka", unit: "ml" },
  { id: "19", name: "parmazán", unit: "g" },
  { id: "20", name: "sýr", unit: "g" },
  { id: "21", name: "rýže", unit: "g" },
  { id: "22", name: "houby", unit: "g" },
  { id: "23", name: "cibule", unit: "ks" },
  { id: "24", name: "losos", unit: "g" },
  { id: "25", name: "brambory", unit: "g" },
  { id: "26", name: "citron", unit: "ks" },
  { id: "27", name: "čočka", unit: "g" },
  { id: "28", name: "ocet", unit: "ml" },
  { id: "29", name: "bobkový list", unit: "ks" },
];

      
const preparationPlaceholder = `Smíchejte všechny suroviny podle receptu, vařte nebo pečte podle typu jídla. Tento text později nahradíme konkrétním postupem pro každý recept.`;

export const meals: Meal[] = [
  
  {
    id: "kase1",
    name: "Ovesná kaše s borůvkami",
    types: ["breakfast"],
    servings: 1,
    imageUrl: "/pictures/meals/oatmeal-blueberry.webp",
    ingredients: [
      { ingredientId: "1", amount: 50 },
      { ingredientId: "2", amount: 300 },
      { ingredientId: "3", amount: 20 },
      { ingredientId: "4", amount: 50 },
    ],
    preparation: {
      firstStep: "Smíchejte ovesné vločky s mlékem v hrnci. Přiveďte k varu a poté snižte teplotu. Vařte za občasného míchání dokud kaše nezhoustne.",
      secondStep: "Podávejte s medem a čerstvými borůvkami."
    }
  },
  {
    id: "chleb2",
    name: "Chléb s vejci natvrdo",
    types: ["breakfast"],
    servings: 1,
    imageUrl: "/pictures/meals/egg-sandwich.webp",
    ingredients: [
      { ingredientId: "5", amount: 2 },
      { ingredientId: "6", amount: 1 },
      { ingredientId: "7", amount: 100 },
      { ingredientId: "8", amount: 10 },
    ],
    preparation: {
      firstStep: "Vejce vložte do hrnce s vodou a přiveďte k varu. Vařte 10 minut, poté je ochlaďte studenou vodou a oloupejte.",
      secondStep: "Chléb namažte máslem. Na chléb položte nakrájená vejce, osolte podle chuti. Můžete ozdobit bylinkami."
    }
  },
  {
    id: "jogurt3",
    name: "Jogurt s oříšky",
    types: ["breakfast"],
    servings: 1,
    imageUrl: null,
    ingredients: [
      { ingredientId: "9", amount: 150 },
      { ingredientId: "10", amount: 30 },
      { ingredientId: "3", amount: 10 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "chleb4",
    name: "Chléb s avokádem",
    types: ["breakfast", "lunch", "dinner"],
    servings: 1,
    imageUrl: null,
    ingredients: [
      { ingredientId: "7", amount: 100 },
      { ingredientId: "11", amount: 1 },
      { ingredientId: "6", amount: 1 },
    ],
    preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "palacinky5",
    name: "Palačinky s javorovým sirupem",
    types: ["breakfast"],
    servings: 4,
    imageUrl: null,
    ingredients: [
      { ingredientId: "12", amount: 200 },
      { ingredientId: "2", amount: 250 },
      { ingredientId: "5", amount: 2 },
      { ingredientId: "13", amount: 50 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "salat6",
    name: "Kuřecí salát",
    types: ["lunch", "dinner"],
    servings: 2,
    imageUrl: null,
    ingredients: [
      { ingredientId: "14", amount: 200 },
      { ingredientId: "15", amount: 200 },
      { ingredientId: "16", amount: 20 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "testoviny7",
    name: "Těstoviny s omáčkou",
    types: ["lunch"],
    servings: 2,
    imageUrl: null,
    ingredients: [
      { ingredientId: "17", amount: 180 },
      { ingredientId: "18", amount: 150 },
      { ingredientId: "19", amount: 30 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "toast8",
    name: "Grilovaný sýr toast",
    types: ["lunch", "dinner"],
    servings: 1,
    imageUrl: null,
    ingredients: [
      { ingredientId: "7", amount: 100 },
      { ingredientId: "20", amount: 50 },
      { ingredientId: "8", amount: 15 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "rizoto9",
    name: "Rizoto",
    types: ["lunch", "dinner"],
    servings: 2,
    imageUrl: null,
    ingredients: [
      { ingredientId: "21", amount: 150 },
      { ingredientId: "22", amount: 100 },
      { ingredientId: "19", amount: 40 },
      { ingredientId: "23", amount: 1 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "losos10",
    name: "Losos s bramborami",
    types: ["lunch", "dinner"],
    servings: 2,
    imageUrl: null,
    ingredients: [
      { ingredientId: "24", amount: 200 },
      { ingredientId: "25", amount: 200 },
      { ingredientId: "8", amount: 20 },
      { ingredientId: "26", amount: 1 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
  {
    id: "cocka11",
    name: "Čočka na kyselo",
    types: ["lunch", "dinner"],
    servings: 4,
    imageUrl: null,
    ingredients: [
      { ingredientId: "27", amount: 250 },
      { ingredientId: "23", amount: 1 },
      { ingredientId: "28", amount: 50 },
      { ingredientId: "29", amount: 2 },
      { ingredientId: "6", amount: 5 },
    ],
     preparation: {
      firstStep: preparationPlaceholder
    }
  },
];



export const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];

export const DefaultWeekPlan = {
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {},
  Sunday: {},
};
