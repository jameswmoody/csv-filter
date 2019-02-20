'use strict';

const boom = require('boom');
const async = require('async');
const csvString = require('csv-string');

exports.filterCsv = function (csv, filterOpts, callback) {
    const csvArray = csvString.parse(csv);
    const firstRow = csvArray[0];
    let filteredCsv = [];
    let filterColumnIndex;
  
    if (filterOpts.hasHeader) {
      filteredCsv.push(firstRow);
    }

    if (typeof filterOpts.columnToFilter === 'string' && !parseInt(filterOpts.columnToFilter)) {
      filterColumnIndex = firstRow.indexOf(filterOpts.columnToFilter);
    } else {
      filterColumnIndex = parseInt(filterOpts.columnToFilter) - 1;
    }

    async.each(csvArray, function(row, callback) {
      if (row[filterColumnIndex] === filterOpts.filterCriteria) {
        filteredCsv.push(row);
      }
      callback();
    }, function(err) {
      filteredCsv = filteredCsv
        .join('\n');
      return callback(null, filteredCsv);
    });
}

// TODO: Write sort function
// exports.sortCsv = function (csv, sortOpts, callback) {
    // const csvArray = csvString.parse(csv);
    // const firstRow = csvArray[0];
    // const sortedCsv = [];
    // let sortColumnIndex;
// }
