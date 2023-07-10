export const RecipeService = {
    getRecipes: (callback) => {
        $.ajax({
            url: "/recipes",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user_token"))
            },
            dataType: "application/json",
            success: (response) => {
                callback(response["data"]);
            },
            error: function() {
                callback(null);
            }
        });
    },

    getRecipeByName: (name, callback) => {
        $.ajax({
            url: "/recipeByName/" + name,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user_token"))
            },
            dataType: "json",
            success: function(response) {
                callback(response["data"]);
            },
            error: function() {
                callback(null);
            }
        });
    }
}