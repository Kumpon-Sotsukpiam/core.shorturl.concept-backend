export const removeWww = (host = '') => {
  return host.replace('www.', '');
};
export const addProtocol = (url: string): string => {
  const hasProtocol = /^\w+:\/\//.test(url);
  return hasProtocol ? url : `http://${url}`;
};
