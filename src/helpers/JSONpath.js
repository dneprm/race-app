/**
 *  get JSON path for static data files
 *  from "static" folder
 *
 */
export const JSONpath = function () {
  let hostName = window.location.hostname;
  const host = window.location.host;
  const httpType = window.location.href.split('//')[0];

  if (hostName === 'localhost') {
    hostName = `${host}`;
  }

  return `${httpType}//${hostName}/static`;
};
