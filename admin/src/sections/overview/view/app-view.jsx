import { faker } from '@faker-js/faker';
import React,{useState,useEffect} from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './appView.css'

import Iconify from 'src/components/iconify';
import { FaUsers } from "react-icons/fa";
import { SiHiltonhotelsandresorts } from "react-icons/si";
import { ImTicket } from "react-icons/im";
import { MdStar } from "react-icons/md";


import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';


import axios from 'axios';
import {getAllUser,getAllHotels,allClient,allOwner,getReservationByHotelId,allReservation,allReviews,deleteRev} from '../../../env'

// ----------------------------------------------------------------------

export default function AppView() {

  const[userCout,setUserCount]=useState(0)

  const[hotelsCount,setHotelCount]=useState(0)
  // console.log("hotels",hotelsCount);
  const [client,setClient]=useState(0)
  const [owner,setOwner]=useState(0)
  const [reservationCount,setReservationCount]=useState(0)
  const [reviews,setReviews]=useState([])
  const [searchTerm, setSearchTerm] = useState('');
const [displayCount, setDisplayCount] = useState(5);
const [reservations,setReservation]=useState([])
const [reservationData,setReservationData]=useState([])
console.log("count",reservationCount);
console.log("reservation",reservationData);

const handleHotelSelection = (id) => {
  fetchReservationByHotelId(id);
};
console.log('id',);
  useEffect(()=>{
    fetch()
    fetchHotels();
    fetchClient()
    fetchOwner()
    fetchReservation()
    fetchReviews()
    // fetchReservationByHotelId()
  },[])
   const fetch=async()=>{
    try {
      const response=await axios.get(getAllUser)
      setUserCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }
   const fetchReviews=async()=>{
    try {
      const response=await axios.get(allReviews)
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchHotels = async () => {
    try {
      const response = await axios.get(getAllHotels);
      setHotelCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReservation = async () => {
    try {
      const response = await axios.get(allReservation);
      setReservationCount(response.data.length);
      setReservation(response.data)
    } catch (error) {
      console.log(error);
    }
  };


  const fetchClient = async () => {
    try {
      const response = await axios.get(allClient);
      setClient(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOwner = async () => {
    try {
      const response = await axios.get(allOwner);
      setOwner(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOne=async(_id)=>{
    try {
      const response=await axios.delete(`${deleteRev}/${_id}`)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchReservationByHotelId = async (_id) => {
    try {
      const response = await axios.get(`${getReservationByHotelId}/${_id}`);
      let allReservations = [];
  console.log('hhhhhhhhhhhhhhhhhhhh',response.data);
      response.data.room.forEach(room => {
        allReservations = allReservations.concat(room.reservation);
      });
  
      const filteredData = countReservationsByMonth(allReservations, 2024);
      setReservationData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const countReservationsByMonth=(reservations, year)=> {
    
    const monthlyReservations = new Array(12).fill(0);
  
    // Iterate through each reservation
    reservations.forEach(reservation => {
      // Create a Date object from the startDate
      const startDate = new Date(reservation.startDate);
  
      // Check if the reservation's start date is in the specified year
      if (startDate.getFullYear() === year) {
        // Get the zero-based month (0 for January, 1 for February, etc.)
        const month = startDate.getMonth();
  
        // Increment the count for the corresponding month
        monthlyReservations[month]++;
      }
    });
  
    return monthlyReservations;
  }
  //room[0].reservation[0].endDate

  const hotelRatings = ['5 stars hotels', '4 stars hotels', '3 stars hotels', '2 stars hotels', '1 stars hotels'];

  const reservationCounts = reservations.reduce((counts, res) => {
    const rating = res.room.hotel.rating;
    if (!counts[rating]) {
      counts[rating] = 0;
    }
    counts[rating]++;
    return counts;
  }, {});
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} style={{width:385}}>
          <AppWidgetSummary
            title="Number of hotels"
            total={hotelsCount}
            color="success"
            icon={<SiHiltonhotelsandresorts size={70} color='#7CB9E8'/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} style={{width:385}}>
          <AppWidgetSummary
            title="Number of users"
            total={userCout}
            color="info"
            icon={<FaUsers size={70} color='#112678'/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} style={{width:385}}>
        
  <AppWidgetSummary
    title="Number of reservations"
    total={reservationCount} 
    icon={<ImTicket size={70} color='rgb(255, 171, 0)' />}
  />
</Grid>

        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Monthly reservation"
            func={handleHotelSelection}
            chart={{
              labels: [
                '01/02/2024',
                '02/02/2024',
                '03/02/2024',
                '04/02/2024',
                '05/02/2024',
                '06/02/2024',
                '07/02/2024',
                '08/02/2024',
                '09/02/2024',
                '10/02/2024',
                '11/02/2024',
                '12/02/2024',
                '01/02/2025'
              ],
              series: [
                {
                  name: 'Clients reserved',
                  type: 'column',
                  fill: 'solid',
                  data: reservationData,
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'Owner', value: owner},
                { label: 'Clinet', value: client }
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}


        <Grid xs={12} md={6} lg={8}>
        {/* <input className='inputSearch'
    placeholder='Search by name' 
    onClick={(event) => { event.stopPropagation()}}
    onChange={(event) => { setSearchTerm(event.target.value); event.stopPropagation()}}></input> */}
  <AppNewsUpdate
    title="Reviews"
    header={
    <input style={{marginLeft:23,marginTop:10}} className='inputSearch'
      placeholder='Search by name' 
      onClick={(event) => { event.stopPropagation()}}
      onChange={(event) => { setSearchTerm(event.target.value); event.stopPropagation()}}
    />
  }
    list={reviews.filter(rev => rev.user.firstName||rev.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, displayCount).map((rev) => ({
      id: rev.id,
      title: (
        <>
          {rev.user.firstName} {rev.user.lastName}{' '}
          {[...Array(rev.stars)].map((_, i) => (
            <MdStar key={i} color='#FFD700' />
          ))}
        </>
      ),
      description: rev.content,
      image: rev.user.imgUrl,
      postedAt: rev.hotel.name,
    }))}
    onDelete={async(id)=>{await deleteOne(id);fetchReviews()}}
    
  />
  <Button onClick={(event) => { event.stopPropagation(); setDisplayCount(displayCount + 5) }}>See more</Button>
  <Button onClick={(event) => { event.stopPropagation(); setDisplayCount(displayCount -5) }}>See less</Button>
</Grid>

<Grid xs={12} md={6} lg={4}>
  <AppOrderTimeline
    title="Reservation rate"
    list={hotelRatings.map((rating, index) => ({
      id: index,
      title: `${reservationCounts[5 - index] || "No"} reservations for ${rating}`,
      type: `order${index + 1}`,
      // time: reservationCounts[5 - index] || 0,
    }))}
  />
</Grid>
        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

       

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}