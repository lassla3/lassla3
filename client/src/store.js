
import { configureStore } from '@reduxjs/toolkit';
  import editeSlice from './SliceAction/editProfile';
  import signUpSlice from './SliceAction/authentication/signUpAction';
  import signInSlice from './SliceAction/authentication/signInAction';
  import getOneSlice from "./SliceAction/getOne"
  import reservation from './SliceAction/reservation'
  import reviewSlice from "./SliceAction/review"
  import getRoomByCategory from './SliceAction/getRoomByCategory';
  import negotiation from './SliceAction/negotiation';
  import compairePrice from './SliceAction/comparPrice';
  import OwnerProfile from './SliceAction/OwnerProfile';
  import Rooms from './SliceAction/Rooms'
  import AllHotels from './SliceAction/AllHotels';
  import HotelSlice from './SliceAction/HotelsSlice'
  import getNegotiations from './SliceAction/getNegociation'
  import getOwner from './SliceAction/getUserwhereHotelId'
  import favoriteSlice from './SliceAction/favoriteHotel'
  import getFavoriteSlice from './SliceAction/getFavorite'
  import getReservationn from './SliceAction/getReservation'
const store = configureStore({
  reducer: {
    userSignUp:signUpSlice,
    userSignIn:signInSlice,
    edite:editeSlice,
    getOne:getOneSlice,
    reservation:reservation,
    getRoomByCategory:getRoomByCategory,
    comparPrice:compairePrice,
    negotiation:negotiation,
    OwnerProfile:OwnerProfile,
    Rooms:Rooms,
    review:reviewSlice,
    allHotels:AllHotels,
    hotelSlice:HotelSlice,
    getNegotiations:getNegotiations,
    getOwner:getOwner,
    favoriteSlice:favoriteSlice,
    getFavoriteSlice:getFavoriteSlice,
    getReservationn:getReservationn
}
});


export default store;