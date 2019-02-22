# csv-filter-sort

Filter CSV rows using criteria for columns values and save the result as a new CSV.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Reference

#### `filterCsv(csv, filterOptions, callback)`

**Parameters:**

| Name            | Type     | Description                                         |
| --------------- | -------- | --------------------------------------------------- |
| `csv`           | String   | A string that respesents the CSV to filter.         |
| `filterOptions` | Object   | An object containing the filter configuration.      |
| `callback`      | String   | The function to run once the CSV has been filtered. |

**`csv`:** A comma seperated list of values with each comma representing a new column. Use `\n` to represent the end of a row.

```
'Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n'22222,Main St,Chicago,IL,60605'
```

**`filterOptions`:** An object containing options to be included within the filter configuration. Valid options include `hasHeader` (BOOLEAN), `columnToFilter` (STRING), `filterCriteria`, (STRING).

```
{
    hasHeader: true,
    columnToFilter: 'City',
    filterCriteria: 'Chicago'
}
```

## Examples

```
const csv = 'Address Number,Address Street,City,State,Zip\n' +
            '11111,De Anza Blvd,Cupertino,CA,95014\n' +
            '22222,Main St,Chicago,IL,60605\n' +
            '22211,Michigan Ave,Chicago,IL,60607\n' +
            '33333,Woodward Ave,Detroit,MI,48048\n' +
            '44444,Mission St,San Francisco,CA,95001\n';
const opts = {
    hasHeader: true,
    columnToFilter: 'City',
    filterCriteria: 'Chicago'
}

filterCsv(csv, filterOptions, function (err, filteredCsv) {
    if (err) {
        return err;
    }
    return filteredCsv;
});

// Output: 'Address Number,Address Street,City,State,Zip\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607\n'
```

## Running the tests

In the command line, run `npm run mocha` or `npm run test` to begin the test suite.

## Authors

* **James W Moody** - [jameswmoody](https://github.com/jameswmoody)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
