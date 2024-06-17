import PropTypes, { func } from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {getAllHotels} from "../../env"

import Chart, { useChart } from 'src/components/chart';
import axios from 'axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader,handleHotelSelection,func, chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return value.toFixed(0);
          }
          return value;
        },
      },
    },
    ...options,
  });

const [hotels,setHotels]=useState([])

const [displayCount, setDisplayCount] = useState(5);
const [searchTerm, setSearchTerm] = useState('');
// console.log('id',hotelId);

  const fetchAllHotels=async()=>{
    try{
      const response=await axios.get(getAllHotels)
      setHotels(response.data)
    }
    catch(err){
      console.log(err);
    }

  }
  useEffect(()=>{
    fetchAllHotels()
    ,[]})

  return (
    <Card {...other}>
    <CardHeader title={title} subheader={subheader} />
  
    <FormControl variant="filled" sx={{ m: 1, width: 200 }}>
  <InputLabel id="demo-simple-select-filled-label">Search for Hotels</InputLabel>
  <Select
    labelId="demo-simple-select-filled-label"
    id="demo-simple-select-filled"
    value="" // Ensures the Select component is controlled
  >
    <MenuItem value="">
      <input
        placeholder="Search"
        style={{ height: 30 }}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => { setSearchTerm(event.target.value); event.stopPropagation(); }}
      />
    </MenuItem>
    {hotels
      .filter(hotel => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, displayCount)
      .map(hotel => (
        <MenuItem key={hotel.id} onClick={() => func(hotel.id)}>
          {hotel.name}
        </MenuItem>
      ))}
    <MenuItem style={{ justifyContent: "space-between" }} value="">
      <Button onClick={(event) => { event.stopPropagation(); setDisplayCount(displayCount + 5); }}>See more</Button>
      <Button onClick={(event) => { event.stopPropagation(); setDisplayCount(displayCount - 5); }}>See less</Button>
    </MenuItem>
  </Select>
</FormControl>

  
    <Box sx={{ p: 3, pb: 1 }}>
      <Chart
        dir="ltr"
        type="line"
        series={series}
        options={chartOptions}
        width="100%"
        height={364}
      />
    </Box>
  </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
