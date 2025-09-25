import { Day, Meal, MealType } from "./types";

export const meals: Meal[] = [
  {
    id: 1,
    name: "Ovesná kaše",
    types: ["breakfast"],
    ingredients: ["ovesné vločky", "mléko", "med", "ovoce"],
  },
  {
    id: 2,
    name: "Chléb s vejci natvrdo",
    types: ["breakfast"],
    ingredients: ["vejce", "sůl", "chléb", "máslo"],
  },
  {
    id: 3,
    name: "Jogurt s oříšky",
    types: ["breakfast"],
    ingredients: ["jogurt", "oříšky", "med"],
  },
  {
    id: 4,
    name: "Chléb s avokádem",
    types: ["breakfast", "lunch", "dinner"],
    ingredients: ["chléb", "avokádo", "sůl"],
  },
  {
    id: 5,
    name: "Palačinky",
    types: ["breakfast"],
    ingredients: ["mouka", "mléko", "vejce", "javorový sirup"],
  },

  {
    id: 6,
    name: "Kuřecí salát",
    types: ["lunch", "dinner"],
    ingredients: ["kuřecí maso", "salát", "olivový olej"],
  },
  {
    id: 7,
    name: "Těstoviny s omáčkou",
    types: ["lunch"],
    ingredients: ["těstoviny", "rajčatová omáčka", "parmazán"],
  },
  {
    id: 8,
    name: "Grilovaný sýr toast",
    types: ["lunch", "dinner"],
    ingredients: ["chléb", "sýr", "máslo"],
  },
  {
    id: 9,
    name: "Rizoto",
    types: ["lunch", "dinner"],
    ingredients: ["rýže", "houby", "parmazán", "cibule"],
  },
  {
    id: 10,
    name: "Losos s bramborami",
    types: ["lunch", "dinner"],
    ingredients: ["losos", "brambory", "máslo", "citron"],
  },
  {
    id: 11,
    name: "Čočka na kyselo",
    types: ["lunch", "dinner"],
    ingredients: ["čočka", "cibule", "ocet", "bobkový list", "sůl"],
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
