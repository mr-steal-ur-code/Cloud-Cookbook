type UserRole =
  | "tech"
  | "tester"
  | "member"
  | "nonmember"
  | "client"

type Claims = {
  admin?: boolean;
  member?: boolean;
  tester?: boolean;
  role?: UserRole;
  email?: string;
  user_id?: string;
}

type User = {
  firstName?: string,
  lastName?: string,
  avatar?: string,
  phoneNumber?: any;
  uid?: string;
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  email?: string;
  lastLoginAt?: string;
  photoURL?: string;
  settings?: Settings;
  zip?: string;
}

type ModalHandle = {
  dismiss: () => void;
};

type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "not-in"
  | "array-contains-any";

type WhereStatement = {
  key: string;
  conditional: WhereFilterOp;
  value: any;
}

type CookBook = {
  title: string;
  description?: string;
  recipe?: Recipe[];
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
}

type Recipe = {
  name?: string;
  photoURL?: string;
  recipeCategory?: RecipeCategory;
  dishCategory?: DishCategory;
  type?: RecipeType;
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
}

enum RecipeCategory {
  Italian = 'Italian',
  French = 'French',
  Chinese = 'Chinese',
  Indian = 'Indian',
  Mexican = 'Mexican',
  Japanese = 'Japanese',
  Thai = 'Thai',
  Mediterranean = 'Mediterranean',
  MiddleEastern = 'Middle Eastern',
  African = 'African',
  SouthAmerican = 'South American'
}

enum DishCategory {
  Appetizer = 'Appetizer',
  MainCourse = 'Main Course',
  SideDish = 'Side Dish',
  Dessert = 'Dessert',
  Salad = 'Salad',
  Soup = 'Soup',
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack'
}

enum RecipeType {
  Baking = 'Baking',
  Grilling = 'Grilling',
  SlowCooker = 'Slow Cooker',
  InstantPot = 'Instant Pot',
  Healthy = 'Healthy',
  ComfortFood = 'Comfort Food',
  Seasonal = 'Seasonal',
  Other = "Other",
  map = "map",
  values = "values"
}