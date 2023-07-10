export const RecipeService = {
    getRecipes: (callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/recipes",
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
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/recipeByName/" + name,
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