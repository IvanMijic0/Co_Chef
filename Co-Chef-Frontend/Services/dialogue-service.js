export const DialogueService = {
    getDefaultTextByActor: (actor, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getDefaultTextByActor/" + actor,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            dataType: "application/json",
            success: function(response) {
                callback(null, response["data"]);
            },
            error: function(xhr, status, error) {
                callback(error, null);
            }
        });
    },

    getSelectedTextByActor: (actor, callback) => {
        $.ajax({
            url: "https://shark-app-7dvmx.ondigitalocean.app/rest/getSelectedTextByActor/" + actor,
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", localStorage.getItem("user-token"))
            },
            dataType: "application/json",
            success: function(response) {
                callback(null, response["data"]);
            },
            error: function(xhr, status, error) {
                callback(error, null);
            }
        });
    },
}