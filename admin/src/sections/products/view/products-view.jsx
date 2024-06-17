import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getAllHotels } from "../../../env"
import axios from 'axios';
import filledStar from '../../../../../client/src/Photo/star_filled.png'
import cornerStar from '../../../../../client/src/Photo/star_corner.png'
import "./hotels.css"

export default function ProductsView() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState("allHotels");

  const fetchHotels = async () => {
    try {
      const response = await axios.get(getAllHotels);
      console.log('hotels', response.data);
      setHotels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const switchView = (v) => {
    setAllHotels(v);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {allHotels === "allHotels" ? "All Hotels" : "Top Hotels"}
      </Typography>
      <button className='hotelsBtn'style={{marginRight:20}} onClick={() => switchView("allHotels")}>All Hotels</button>
      <button className='hotelsBtn' onClick={() => switchView("topHotels")}>Top Hotels</button>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        {hotels
          .filter(hotel => allHotels === "allHotels" || (allHotels === "topHotels" && hotel.rating === 5))
          .map((hotel) => (
            <Grid key={hotel.id} item xs={12} sm={6} md={3}>
              <Card style={{ borderWidth: 3, borderColor: "red" }}>
                <CardContent>
                  <img src={hotel.imgUrl} alt={hotel.name} style={{ width: '100%' }} />
                  <Typography variant="h6" style={{ textAlign: "center" }}>
                    {hotel.name}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <img
                        key={index}
                        style={{ width: 20, height: 20 }}
                        src={star <= hotel.rating ? filledStar : cornerStar}
                        alt="star"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
