/*import { Day, Ingredient, Meal, MealType } from "../types";

export const ingredients: Ingredient[] = [
  { id: "1", name: "ovesné vločky", unit: "g", nutrients: [372, 5.7, 62, 14] },
  { id: "2", name: "mléko", unit: "ml", nutrients: [42, 1, 5, 3.4] }, 
  { id: "3", name: "med", unit: "g", nutrients: [304, 0, 82, 0.3] },
  { id: "4", name: "borůvky", unit: "g", nutrients: [57, 0.3, 14, 0.7] },
  { id: "5", name: "vejce", unit: "g", nutrients: [136, 9.3, 1.2, 12] },  
  { id: "6", name: "sůl", unit: "g", nutrients: [0, 0, 0, 0] },
  { id: "7", name: "chléb", unit: "g", nutrients: [265, 3.2, 49, 9] },
  { id: "8", name: "máslo", unit: "g", nutrients: [717, 81, 0.1, 0.9] },
  { id: "9", name: "jogurt", unit: "g", nutrients: [59, 3.3, 4.7, 3.5] }, 
  { id: "10", name: "oříšky", unit: "g", nutrients: [607, 54, 21, 17] }, 
  { id: "11", name: "avokádo", unit: "g", nutrients: [160, 16, 8, 2] }, 
  { id: "12", name: "mouka", unit: "g", nutrients: [364, 1, 76, 10] },
  { id: "13", name: "javorový sirup", unit: "ml", nutrients: [260, 0, 67, 0.1] },
  { id: "14", name: "kuřecí maso", unit: "g", nutrients: [165, 3.6, 0, 31] }, 
  { id: "15", name: "ledový salát", unit: "g", nutrients: [14, 0.1, 2.9, 1] },
  { id: "16", name: "olivový olej", unit: "ml", nutrients: [884, 100, 0, 0] },
  { id: "17", name: "těstoviny", unit: "g", nutrients: [371, 1.5, 75, 13] },
  { id: "18", name: "rajčatová omáčka", unit: "ml", nutrients: [29, 0.2, 6, 1.2] },
  { id: "19", name: "parmazán", unit: "g", nutrients: [431, 29, 4, 38] },
  { id: "20", name: "sýr", unit: "g", nutrients: [402, 33, 1.3, 25] }, 
  { id: "21", name: "rýže", unit: "g", nutrients: [362, 0.4, 80, 7] },
  { id: "22", name: "houby", unit: "g", nutrients: [22, 0.3, 3.3, 3.1] },
  { id: "23", name: "cibule", unit: "g", nutrients: [44, 0.1, 10, 1.2] }, 
  { id: "24", name: "losos", unit: "g", nutrients: [208, 13, 0, 20] },
  { id: "25", name: "brambory", unit: "g", nutrients: [77, 0.1, 17, 2] },
  { id: "26", name: "citronová šťáva", unit: "ml", nutrients: [17, 0.2, 5.4, 0.6] }, 
  { id: "27", name: "čočka", unit: "g", nutrients: [116, 0.4, 20, 9] }, 
  { id: "28", name: "ocet", unit: "ml", nutrients: [21, 0, 0.9, 0] },
  { id: "29", name: "bobkový list", unit: "g", nutrients: [0, 0, 0, 0] }, 
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
    nutrients:  [401.3, 6.0, 69.4, 17.61],
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
      { ingredientId: "5", amount: 100 },
      { ingredientId: "6", amount: 1 },
      { ingredientId: "7", amount: 100 },
      { ingredientId: "8", amount: 10 },
    ],
    nutrients:  [472.7, 20.6, 50.21, 21.09],
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
    nutrients:  [301.0, 21.15, 21.55, 10.38],
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
      { ingredientId: "11", amount: 100 },
      { ingredientId: "6", amount: 1 },
    ],
    nutrients:  [425.0, 19.2, 57.0, 11.0],
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
      { ingredientId: "5", amount: 100 },
      { ingredientId: "13", amount: 50 },
    ],
    nutrients: [274.75, 3.45, 49.8, 10.14],
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
    nutrients: [267.4, 13.7, 2.9, 32.0],
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
    nutrients:  [420.3, 5.85, 72.6, 18.3],
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
    nutrients: [573.55, 31.85, 49.66, 21.64],
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
      { ingredientId: "23", amount: 100 },
    ],
    nutrients:  [390.7, 6.3, 67.45, 15.0],
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
      { ingredientId: "26", amount: 50 },
    ],
    nutrients:  [360.95, 21.25, 18.36, 22.24],
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
      { ingredientId: "23", amount: 100 },
      { ingredientId: "28", amount: 50 },
      { ingredientId: "29", amount: 5 },
      { ingredientId: "6", amount: 5 },
    ],
    nutrients: [86.12, 0.28, 15.11, 5.92],
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
*/
