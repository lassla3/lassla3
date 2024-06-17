import SvgColor from 'src/components/svg-color';
import { SiHotelsdotcom } from "react-icons/si";
// ----------------------------------------------------------------------

const icon = (name) => (
  
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
    
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Hotels',
    path: '/hotels',
    icon: <SiHotelsdotcom  size={20}/>,
  },
  
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
