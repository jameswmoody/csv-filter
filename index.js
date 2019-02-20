'use strict';

const boom = require('boom');
const csvString = require('csv-string');

exports.filterCsv = function (csv, filterOpts, callback) {
    const csvArray = csvString.parse(csv);
    const firstRow = csvArray[0];
    const filteredCsv = [];
    let filterColumnIndex;
  
    if (filterOpts.hasHeader) {
      filteredCsv.push(firstRow);
    }
  
    if (typeof filterOpts.columnToFilter === 'string' && !parseInt(filterOpts.columnToFilter)) {
      filterColumnIndex = firstRow.indexOf(filterOpts.columnToFilter);
      csvArray.forEach(function(row) {
        if (row[filterColumnIndex] === filterOpts.filterCriteria) {
          filteredCsv.push(row);
        }
      });
    } else {
      filterColumnIndex = parseInt(filterOpts.columnToFilter) - 1;
      csvArray.forEach(function(row) {
        if (row[filterColumnIndex] === filterOpts.filterCriteria) {
          filteredCsv.push(row);
        }
      });
    }
    return callback(null, filteredCsv);
}


// TODO: Write sort function
// exports.sortCsv = function (csv, sortOpts, callback) {
    // const csvArray = csvString.parse(csv);
    // const firstRow = csvArray[0];
    // const sortedCsv = [];
    // let sortColumnIndex;
// }
