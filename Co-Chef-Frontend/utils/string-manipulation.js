export const extractFileNameWithExtension = (path) => {
    return path.split("/").pop();
}

export const extractFileNameWithoutExtension = (filePath) => {
    const fileNameWithExtension = extractFileNameWithExtension(filePath);
    const fileNameWithoutExtension = fileNameWithExtension.split('.').slice(0, -1).join('.');
    const fileNameParts = fileNameWithoutExtension.split('_');
    return fileNameParts[0];
}