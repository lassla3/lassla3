import React,{useEffect,useState,useRef,useMemo} from 'react'
import {reviewAsync} from "../../reduce/review"
import {useDispatch, useSelector} from "react-redux"
import { decode } from "base-64";
global.atob = decode;
import {jwtDecode} from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchReviewAsync} from "../../reduce/fetchReview"
import { StyleSheet,TextInput , Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';


const Reviews = ({route}) => {
// console.log(route);
const [reviews,setReviews]=useState([])
    const [review, setReview] = useState({
        stars: 1,
        content: '',
    });
    const [maxRating] = useState([1, 2, 3, 4, 5]);
    const [fresh,setFresh]=useState(false)

    const dispatch = useDispatch();
    // const reviews = useSelector(state => state.review.reviw) || [];
    console.log(reviews);
    useEffect(() => {
        
      const fetchUserId =  () => {
        // const userId = await tokenGeted();
        console.log('userId',route.params.hotel);
        dispatch(fetchReviewAsync(route.params.hotel))
          .then(data => {
            setReviews(data.payload);
            
          })
          .catch(error => console.log("Error fetching user data:", error)); 
      };
        // const x=dispatch(fetchReviewAsync(route.params.hotel ));
        // console.log(x.payload);
        // console.log(route.params.hotel);
        fetchUserId()
    }, []);

  

    const postReview = async () => {
        try {
            const userId = await tokenGeted();
            
            dispatch(reviewAsync({ userId:userId, hotelId:route.params.hotel, obj: review }));
        } catch (error) {
            console.log(error);
        }
    };

    const tokenGeted = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decoded = jwtDecode(token);
            console.log("role",decoded.role);

            return decoded.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const roleGeted = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decoded = jwtDecode(token);
            return decoded.role;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const handleInputChange = (name, value) => {
        setReview({ ...review, [name]: value });
    };

    const bottomSheetRef = useRef(null);
  
    const snapPoints = useMemo(() => ['7%', '70%'], []);
    const BottomSheetContent1 = () => (
        <View  style={{alignItems:"center"}}>
            <Text style={{color:"black",marginBottom:5,fontWeight:"bold",fontSize:20}}>New review</Text>
            <TextInput
                textAlignVertical="top"
                multiline={true}
                value={review.content}
                onChangeText={(text) => handleInputChange("content", text)}
                style={styles.input}
            />
        

            <View style={styles.ratingContainer}>
            <View style={{flexDirection:"row"}} >
                {maxRating.map((e, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => setReview({ ...review, stars: e })}
                    >
                        <Image
                            style={styles.ratingStar}
                            source={
                                e <= review.stars
                                    ? require("../../Photo/star_filled.png")
                                    : require("../../Photo/star_corner.png")
                            }
                        />
                    </TouchableOpacity>
                ))}
                 </View>
            </View>
           
            <TouchableOpacity style={styles.buttonContainer} onPress={postReview}>
                <Text style={styles.next}>Add</Text>
            </TouchableOpacity>
        </View>
      );

    
    // if(roleGeted()==="user"){
    //     return BottomSheetContent1()
    // }
    return (
        <>
          <ScrollView style={{height:260}}> 
            <View style={{paddingBottom:50}}>
              <Text style={{textAlign:"center",fontSize:20,color:"black",fontWeight:"bold",marginTop:10}}>All comments</Text>
              {reviews.map((e, i) => {
                
                
                return<View style={{marginBottom:20}}  key={i}>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Image
                  source={{uri:e.user.imgUrl}}
                  style={{width:40,height:40,borderRadius:100,marginTop:25,marginLeft:10}}
                  />
                  <Text style={{color:"black",fontSize:20,marginLeft:5,fontWeight:"bold"}}>{e.user.firstName} {e.user.lastName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"center",marginLeft:10 }}>
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <Image
                                        key={index}
                                        style={{ width: 20, height: 20 }}
                                        source={
                                            star <= e.stars
                                                ? require("../../Photo/star_filled.png")
                                                : require("../../Photo/star_corner.png")
                                        }
                                    />
                                ))}
                            </View>
                  </View>
                  <Text style={{color:"black",fontSize:18,marginLeft:60,marginTop:-25}}>{e.content}</Text>
                 
                </View>
})}
            </View>
          </ScrollView>
            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              style={styles.bottomSheet}
            >
              {BottomSheetContent1()}
            </BottomSheet>
        </>
      );
  
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa',
    },
    buttonContainer: {
        marginTop: 20,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 80,
        borderRadius: 30,
        borderStyle: "solid",
        backgroundColor: '#112678',
        textAlign:"center"
      },
      next: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
      },
    review:{
        backgroundColor:"#E0FFFF",
        alignItems:"center",
        width:350,
        height:230,
        borderRadius:20
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    activeDot: {
        color: 'white',
    },
    inactiveDot: {
        color: '#888',
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    titleText: {
        fontSize: 20,
        color: '#333',
    },
    captionText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#666',
    },
    divider: {
        marginHorizontal: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 3,
    },
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    tabItem: {
        alignItems: 'center',
        flex: 1,
    },
    tabLabel: {
        fontSize: 16,
        color: '#666',
    },
    selectedTabLabel: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    tabIndicator: {
        width: '100%',
        height: 3,
        backgroundColor: '#007BFF',
        marginTop: 2,
    },
    overviewContainer: {
      flex: 1,
      padding: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  overviewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    lineHeight: 20,
  },
  overviewDivider: {
    marginVertical: 16,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amenityItem: {
    alignItems: 'center',
  },
  amenityLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  galleryImage: {
    width: 250,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
  bottomSheet: {
    paddingHorizontal: 10,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '90%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius:20
  },
  ////////////////////
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#555',
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  detailsDivider: {
    marginVertical: 16,
  },
});

export default Reviews
