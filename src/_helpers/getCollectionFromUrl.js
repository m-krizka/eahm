export const getCollectionFromUrl = (url) => {
  return url.substr(1).split('/')[0];
};
