import { createBrowserHistory } from 'history';
import { format as formatDateFNS, fromUnixTime } from 'date-fns'
import axios from 'axios';

import { googleMapsConfig } from './constants';
import { CompareFunction, ObjectKeys } from './types';

/**
 * Change the window title to "Trackee - argument"
 * @global
 * @static
 * @category General Utility
 * @param {string} newTitle the new title of the tab
 */
function changeTitle(newTitle: string) {
  document.title = `Trackee - ${newTitle}`;
}

/**
 * Convert object with keys to array
 * takes in {key1: value, key2: value} and return [{__objectKey__:key1, value},{__objectKey__:key2, value}}]
 *
 * @global
 * @static
 * @category General Utility
 * @param {object} inputObject object with keys like {objectkey1: value, objectkey2: value}
 * @param {boolean} includeKey returns the array with an included key i.e. {__objectKey__:key, ...originalObject}
 *
 * @return {array} array of keys and values
 */
function flatternObjectToArray(inputObject: ObjectKeys, includeKey: boolean = false): Array<any> {
  const outputArray = [];
  for (const objectKey in inputObject) {
    if (includeKey)
      outputArray.push({ ...inputObject[objectKey], __objectKey__: objectKey });
    else outputArray.push({ ...inputObject[objectKey] });
  }

  return outputArray;
}

/**
 * Copy text to clipboard
 * @global
 * @static
 * @category General Utility
 * @param {string} inputText the text to copy to clipboard
 */
function copyToClipboard(inputText: string): void {
  if (!navigator.clipboard) {
    console.error('Clipboard not available on this browser');
    return;
  }

  navigator.clipboard.writeText(inputText).then(
    () => console.log('Copying to clipboard was successful!'),
    (error) => console.error('Could not copy text: ', error)
  );
}

let _geoCoderCount = 0;
const _addressCache = new Map();
/**
 * Returns a promise for the name of the an approximate
 * location converted with Google's geocoder API
 *
 * @global
 * @static
 * @category General Utility
 *
 * @param {number} lat latitude for geo position
 * @param {number} lng longitude for geo position
 *
 * @return {Promise<string>} name of approximate location
 */
const approximateAddress = async (lat: number, lng: number): Promise<string> => {
  // Searching for address in cache
  if (_addressCache.has(`${lat},${lng}`)) {
    return await _addressCache.get(`${lat},${lng}`);
  }

  // setting axios request
  const requestURL = googleMapsConfig.geoCodingURL;
  const requestConfig = {
    params: {
      latlng: `${lat},${lng}`,
      key: googleMapsConfig.apiKey
    },
  }

  // return axios output wrapped around a promise
  return await axios.get(requestURL, requestConfig)
    .then(response => response.data)
    .then(data => data?.results[0]?.formatted_address) // grab data from cache
    .then(address => {
      // write cache async
      setTimeout(() => {
        console.info(`geocoder count: ${++_geoCoderCount}`);
        _addressCache.set(`${lat},${lng}`, address);
      }, 0);
      return address;
    })
    .catch(error => console.error(error));
}

/**
 * returns if a string exist in another string without considering about
 * capitalization or non alphabets/digits
 *
 * @global
 * @static
 * @category General Utility
 *
 * @param {string} searchTerm the search term
 * @param {string} searchString the search string
 *
 * @return {boolean} item found
 */
const fuzzySearch = (searchTerm: string, searchString: string) => {
  searchTerm = searchTerm.replace(/[^a-zA-Z0-9]+/g, '');
  if (searchTerm === '') return true;
  searchString = searchString.replace(/[^a-zA-Z0-9]+/g, '');
  return searchString.toLowerCase().includes(searchTerm.toLowerCase());
}

/**
 * returns a new reference of a sorted array
 *
 * @global
 * @static
 * @category General Utility
 *
 * @param {Array<any>} arrayInput unsorted input
 * @param {CompareFunction} sortFn function to sort by
 *
 * @return {Array<any>} new sorted array reference
 */
const immutableSort = (arrayInput: Array<any>, sortFn: CompareFunction): Array<any> => {
  return [...arrayInput].sort(sortFn);
}

/**
 * parses the job data from firebase
 *
 * @global
 * @static
 * @category General Utility
 *
 * @param {firebase.database.DataSnapshot} dataSnapshot job data snapshot directly taken from database
 *
 * @return {Array<any>} new sorted array reference
 */
function parseJobData(dataSnapshot: firebase.database.DataSnapshot | undefined): Array<any> {
  const normalizedData: Array<any> = [];
  if (dataSnapshot) {
    const snapshotClone = Object.assign({}, dataSnapshot);

    // iterate all contractors
    flatternObjectToArray(snapshotClone, true).map((contractorSnapshot) => {
      // contractor information
      const name = contractorSnapshot.name;
      const phoneNo = contractorSnapshot.phoneNo;
      const contractorID = contractorSnapshot.__objectKey__;
      // iterate all jobs
      flatternObjectToArray(contractorSnapshot.jobList, true).map(
        (jobSnapshot) => {
          // grab the last known location

          const locationArray = immutableSort(flatternObjectToArray(jobSnapshot.location).map((location) => Object.assign({}, {
            lat: location.lat,
            lng: location.lon,
            dateTime: location.dateTime,
          })), (a, b) => { return a.dateTime - b.dateTime });

          normalizedData.push({
            name: name,
            phoneNo: phoneNo,
            contractorID: contractorID,
            jobID: jobSnapshot.__objectKey__,
            company: jobSnapshot.company,
            dateTimeEnd: jobSnapshot.dateTimeEnd,
            dateTimeStart: jobSnapshot.dateTimeStart,
            locations: locationArray,
          });
          return null;
        }
      );
      return null;
    });
  };
  return normalizedData;
}

/**
 * coverts a timestamp into a formatted date time string
 *
 * @global
 * @static
 * @category General Utility
 *
 * @param {number} timestamp timestamp input
 * @param {boolean} includeSeconds show seconds
 * @param {boolean} includeYears show years
 *
 * @return {string} formated date time in string
 */
function timestampConversion(timestamp: number, includeSeconds: boolean = false, includeYears: boolean = false): string {
  if (!timestamp) {
    return 'No Date Time';
  }
  return formatDateFNS(fromUnixTime(timestamp / 1000), `d MMM ${(includeYears) ? `yyyy ` : ``}- HH:mm${(includeSeconds) ? `:ss ` : ` `}a`);
}

const history = createBrowserHistory();

export {
  changeTitle,
  history,
  copyToClipboard,
  flatternObjectToArray,
  parseJobData,
  timestampConversion,
  approximateAddress,
  immutableSort,
  fuzzySearch,
};
