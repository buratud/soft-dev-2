exports.getMimeTypeFromBase64 = function (base64String) {
    const mimeType = base64String.match(/^data:(.*?);base64/)[1];
    return mimeType;
}

exports.getFileExtensionFromMimeType = function (mimeType) {
    const parts = mimeType.split('/');

    return parts[1] || null;
}

exports.getRawBase64 = function (base64String) {
    return base64String.split(',')[1];
}

exports.isImage = function (mimeType) {
    return mimeType.startsWith('image');
}