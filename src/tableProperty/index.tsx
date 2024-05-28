import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

function createData(
  country: string,
  calories: number,
  terenossID: string,
  taxes: number,
  city: string,
  address: string,
  latitude: number,
  longitude: number,
  acres: number,
  sqMeters: number,
) {
  return {
    country,
    calories,
    terenossID,
    taxes,
    city,
    address,
    latitude,
    longitude,
    acres,
    sqMeters,
  };
}

const row = createData(
  'Columbia',
  159,
  'T001',
  20,
  'New York',
  '123 Main St',
  40.7128,
  -74.006,
  1,
  4047,
);

export default function VerticalTable() {
  return (
    <TableContainer component={Paper} className="border-none p-4">
      <Table
        aria-label="vertical table"
        className="w-full table-auto border-collapse"
      >
        <TableBody>
          <TableRow>
            <TableCell className="border-0 bg-gray-200 p-2 font-bold">
              Country
            </TableCell>
            <TableCell className="border-0 p-2">{row.country}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">
              Calories
            </TableCell>
            <TableCell className="p-2">{row.calories}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">
              Terenoss ID
            </TableCell>
            <TableCell className="p-2">{row.terenossID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">Taxes</TableCell>
            <TableCell className="p-2">{row.taxes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">City</TableCell>
            <TableCell className="p-2">{row.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">Address</TableCell>
            <TableCell className="p-2">{row.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">
              Latitude
            </TableCell>
            <TableCell className="p-2">{row.latitude}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">
              Longitude
            </TableCell>
            <TableCell className="p-2">{row.longitude}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">Acres</TableCell>
            <TableCell className="p-2">{row.acres}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="bg-gray-200 p-2 font-bold">
              Sq. Meters
            </TableCell>
            <TableCell className="p-2">{row.sqMeters}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
