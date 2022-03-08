import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

const row = d => {
	d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
  d['Total Dead and Missing'] = +d['Total Dead and Missing'];
  d['Reported Date'] = new Date(d['Reported Date']);
  return d;
}


export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);}, []);

  return data;
};