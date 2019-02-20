'use strict'
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

const csvFilter = require('..').filterCsv;

describe('CSV filter function', function () {
    let csv;

    beforeEach(function () {
        csv = 'Address Number,Address Street,City,State,Zip\n' +
                    '11111,De Anza Blvd,Cupertino,CA,95014\n' +
                    '22222,Main St,Chicago,IL,60605\n' +
                    '22211,Michigan Ave,Chicago,IL,60607\n' +
                    '33333,Woodward Ave,Detroit,MI,48048\n' +
                    '44444,Mission St,San Francisco,CA,95001\n';
    });

    it('should filter CSV based on critria when column name is provided', function (done) {
        const filterOpts = {
            hasHeader: true,
            columnToFilter: 'City',
            filterCriteria: 'Chicago'
        }
        csvFilter(csv, filterOpts, function (err, filteredCsv) {
            assert.ifError(err);
            expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607');
            done();
        });
    });

    it('should filter CSV based on critria when column number string is provided', function (done) {
        const filterOpts = {
            hasHeader: true,
            columnToFilter: '4',
            filterCriteria: 'CA'
        }
        csvFilter(csv, filterOpts, function (err, filteredCsv) {
            assert.ifError(err);
            expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001');
            done();
        });
    });

    it('should filter CSV based on critria when column number integer is provided', function (done) {
        const filterOpts = {
            hasHeader: true,
            columnToFilter: 4,
            filterCriteria: 'CA'
        }
        csvFilter(csv, filterOpts, function (err, filteredCsv) {
            assert.ifError(err);
            expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001');
            done();
        });
    });

    it('should filter CSV with no header row', function (done) {
        csv = csv.split('\n');
        csv.shift()
        csv = csv.join('\n');
        const filterOpts = {
            hasHeader: false,
            columnToFilter: '4',
            filterCriteria: 'CA'
        }
        csvFilter(csv, filterOpts, function (err, filteredCsv) {
            assert.ifError(err);
            expect(filteredCsv).to.equal('11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001');
            done();
        });
    });

    it('should return error if no CSV string is provided', function (done) {
        const filterOpts = {
            hasHeader: false,
            columnToFilter: '4',
            filterCriteria: 'CA'
        }
        csvFilter(null, filterOpts, function (err, filteredCsv) {
            expect(filteredCsv).to.not.be.ok;
            expect(err.message).to.equal('Unable to parse CSV string. Make sure that a valid CSV string has been provided.')
            done();
        });
    });

    it('should return error if invalid CSV string is provided', function (done) {
        const filterOpts = {
            hasHeader: false,
            columnToFilter: '4',
            filterCriteria: 'CA'
        }
        csvFilter([1,2,3], filterOpts, function (err, filteredCsv) {
            expect(filteredCsv).to.not.be.ok;
            expect(err.message).to.equal('Unable to parse CSV string. Make sure that a valid CSV string has been provided.')
            done();
        });
    });

    it('should return error if no column is provided', function (done) {
        const filterOpts = {
            hasHeader: true,
            columnToFilter: null,
            filterCriteria: 'CA'
        }
        csvFilter(csv, filterOpts, function (err, filteredCsv) {
            expect(filteredCsv).to.not.be.ok;
            expect(err.message).to.equal('Must provide a column name or number to filter CSV by.')
            done();
        });
    });

    it('should return error if no criteria is provided', function (done) {
        const filterOpts = {
            hasHeader: true,
            columnToFilter: '4',
            filterCriteria: null
        }
        csvFilter(csv, filterOpts, function (err, filteredCsv) {
            expect(filteredCsv).to.not.be.ok;
            expect(err.message).to.equal('Must provide a criteria to filter CSV by.')
            done();
        });
    });
});
