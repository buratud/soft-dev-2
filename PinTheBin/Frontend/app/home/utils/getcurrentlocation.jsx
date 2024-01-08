export const getCurrentLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          successCallback(userLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);
          errorCallback(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      errorCallback('Geolocation is not supported by this browser.');
    }
  };