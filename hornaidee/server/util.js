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

exports.calculateDistance = function (lat1, lon1, lat2, lon2) {
    const earthRadius = 6371e3; // Earth radius in meters
  
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const dLat = lat2Rad - lat1Rad;
    const dLon = (lon2 - lon1) * Math.PI / 180;
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    return distance;
  }