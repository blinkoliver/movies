export const Fetch = (url, params) => {
  return fetch(url).then(response => response.json());
};
