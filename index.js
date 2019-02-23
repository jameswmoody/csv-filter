'use strict';

const async = require('async');
const csvString = require('csv-string');

exports.filter = function (csv, filterOpts, callback) {
    let csvArray;

    try {
      csvArray = csvString.parse(csv);
    } catch (e) {
      return callback(Error('Unable to parse CSV string. Make sure that a valid CSV string has been provided.'));
    }

    if (!filterOpts.columnToFilter) {
      return callback(Error('Must provide a column name or number to filter CSV rows by.'));
    }

    if (!filterOpts.filterCriteria) {
      return callback(Error('Must provide a criteria to filter CSV rows by.'));
    }
  
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

exports.sort = function (csv, sortOpts, callback) {
  let csvArray;

  try {
    csvArray = csvString.parse(csv);
  } catch (e) {
    return callback(Error('Unable to parse CSV string. Make sure that a valid CSV string has been provided.'));
  }

  if (!sortOpts.sortByColumn) {
    return callback(Error('Must provide a column name or number to sort CSV rows by.'));
  }

  if (!sortOpts.orderBy) {
    sortOpts.orderBy = 'ASC' // Set ascending as the default order
  }

  sortOpts.orderBy = sortOpts.orderBy
    .toUpperCase()
    .trim();

  if (sortOpts.orderBy !== 'ASC' && sortOpts.orderBy !== 'DESC') {
    return callback(Error(`Invalid value provided for 'orderBy'. Use 'ASC' or 'DESC' to sort by ascending or decending order respectively.`));
  }

  const firstRow = csvArray[0];
  let sortedCsv = [];
  let sortColumnIndex;

  if (sortOpts.hasHeader) {
    csvArray.shift()
  }

  if (typeof sortOpts.sortByColumn === 'string' && !parseInt(sortOpts.sortByColumn)) {
    sortColumnIndex = firstRow.indexOf(sortOpts.sortByColumn);
  } else {
    sortColumnIndex = parseInt(sortOpts.sortByColumn) - 1;
  }

  csvArray = csvArray.sort(function sortFunction(a, b) {
    if (a[sortColumnIndex] === b[sortColumnIndex]) {
        return 0;
    }
    else {
        return (a[sortColumnIndex] < b[sortColumnIndex]) ? -1 : 1;
    }
  });

  if (sortOpts.orderBy === 'DESC') {
    csvArray.reverse();
  }

  if (sortOpts.hasHeader) {
    csvArray.unshift(firstRow)
  }

  sortedCsv = csvArray
    .join('\n');

  return callback(null, sortedCsv);
}
