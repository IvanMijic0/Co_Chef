let REMEMBER_CHARACTER = "";
let REMEMBER_DISH = "";

let USER_NAME = "";
let USER_EMAIL = "";
let USER_PASSWORD = "";

let CHAT_TEXT = "";

const NOODLE_RECIPE = {
    name: "noodle",
    recipeArr: [
        "Wash the vegetables",
        "3 onions, 1 green onion, 3 carrots, 2 mushrooms",
        "Add and stir noodles to pot",
        "Mix well 7 times"
    ],
    onion_num_max: 3,
    greenOnion_num_max: 1,
    carrot_num_max: 3,
    mushroom1_num_max: 1,
    noodles_num_max: 1,
    stir_num_max: 7,
    onion_num: 0,
    greenOnion_num: 0,
    carrot_num: 0,
    mushroom1_num: 0,
    noodles_num: 0,
    stir_num: 0
}

const CURRY_RECIPE = {
    name: "curry",
    recipeArr: [
        "Wash the vegetables",
        " 1 onion, 2 garlic cloves, 3 tomatoes and 1 red meat",
        "Mix vegetables 20 times",
        "Brown the meat for 10 seconds"
    ],
    onion_num_max: 1,
    garlic_num_max: 2,
    tomato_num_max: 3,
    redMeat_num_max: 1,
    stir_num_max: 20,
    onion_num: 0,
    garlic_num: 0,
    tomato_num: 0,
    redMeat_num: 0,
    stir_num: 0
}

const FISH_TACO_RECIPE = {
    name: "fishTaco",
    recipeArr: [
        "Wash the vegetables",
        " 2 onions, 2 tomatoes, 1 avocado, 1 green pepper",
        "Mix well 10 times",
        "Clean the fish and fry for 14 seconds"
    ],
    onion_num_max: 2,
    tomato_num_max: 2,
    avocado_num_max: 1,
    greenPepper_num_max: 1,
    fishCombined_max: true,
    stir_num_max: 10,
    onion_num: 0,
    tomato_num: 0,
    avocado_num: 0,
    greenPepper_num: 0,
    fishCombined: true,
    stir_num: 0
}