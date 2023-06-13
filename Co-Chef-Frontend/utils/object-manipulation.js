export const checkAllPropertiesEqualMax = (obj) => {
    for (let key in obj) {
        if (key.includes("_max")) {
            const property = key.replace("_max", ""); // Remove "_max" to get the corresponding property name
            if (obj[property] !== obj[key]) {
                return false;
            }
        }
    }
    return true;
}