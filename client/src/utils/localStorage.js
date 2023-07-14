export const getSavedRestaurantIds = () => {
  const savedRestaurantIds = localStorage.getItem('saved_restaurants')
    ? JSON.parse(localStorage.getItem('saved_restaurants'))
    : [];

  return savedRestaurantIds;
};

export const saveRestaurantIds = (restaurantIdArr) => {
  if (restaurantIdArr.length) {
    localStorage.setItem('saved_restaurants', JSON.stringify(restaurantIdArr));
  } else {
    localStorage.removeItem('saved_restaurants');
  }
};

export const removeRestaurantId = (restaurantId) => {
  const savedRestaurantIds = localStorage.getItem('saved_restaurants')
    ? JSON.parse(localStorage.getItem('saved_restaurants'))
    : null;

  if (!savedRestaurantIds) {
    return false;
  }

  const updatedSavedRestaurantIds = savedRestaurantIds?.filter((savedRestaurantId) => savedRestaurantId !== restaurantId);
  localStorage.setItem('saved_restaurants', JSON.stringify(updatedSavedRestaurantIds));

  return true;
};

export const getSavedVenueIds = () => {
  const savedVenueIds = localStorage.getItem('saved_venues')
    ? JSON.parse(localStorage.getItem('saved_venues'))
    : [];

  return savedVenueIds;
};

export const saveVenueIds = (venueIdArr) => {
  if (venueIdArr.length) {
    localStorage.setItem('saved_venues', JSON.stringify(venueIdArr));
  } else {
    localStorage.removeItem('saved_venues');
  }
};

export const removeVenueId = (venueId) => {
  const savedVenueIds = localStorage.getItem('saved_venues')
    ? JSON.parse(localStorage.getItem('saved_venues'))
    : null;

  if (!savedVenueIds) {
    return false;
  }

  const updatedSavedVenueIds = savedVenueIds?.filter((savedVenueId) => savedVenueId !== venueId);
  localStorage.setItem('saved_venues', JSON.stringify(updatedSavedVenueIds));

  return true;
};

export const getSavedAdventureIds = () => {
  const savedAdventureIds = localStorage.getItem('saved_adventures')
    ? JSON.parse(localStorage.getItem('saved_adventures'))
    : [];

  return savedAdventureIds;
};

export const saveBookIds = (adventureIdArr) => {
  if (adventureIdArr.length) {
    localStorage.setItem('saved_adventures', JSON.stringify(adventureIdArr));
  } else {
    localStorage.removeItem('saved_adventures');
  }
};

export const removeAdventureId = (adventureId) => {
  const savedAdventureIds = localStorage.getItem('saved_adventures')
    ? JSON.parse(localStorage.getItem('saved_adventures'))
    : null;

  if (!savedAdventureIds) {
    return false;
  }

  const updatedSavedAdventureIds = savedAdventureIds?.filter((savedRestaurantId) => savedRestaurantId !== adventureId);
  localStorage.setItem('saved_adventures', JSON.stringify(updatedSavedAdventureIds));

  return true;
};