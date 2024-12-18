import { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets';
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
   const [cartItems,setCartsItem] = useState({});

   const url = "http://localhost:4000"
   const [token,setToken] = useState("");
   const [food_list,setFoodList] = useState([])
   const addToCart = async(itemId) =>{
         if(!cartItems[itemId]){
            setCartsItem((prev) => ({...prev,[itemId]:1}))
         }else{
            setCartsItem((prev) => ({...prev,[itemId]:prev[itemId]+1}))
         }
         if(token){
            await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
         }
   }
   const removeFromCart = async(itemId) =>{
        setCartsItem((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if(token){
         await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}})
        }
   }
   const getTotalCart = () => {
      let totalAmount = 0;
      for(const item in cartItems){
         if(cartItems[item]>0){
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price* cartItems[item]
         }
    
      }
      return totalAmount;
    };
    const fetchFoodList = async () => {
       const response = await axios.get(url+"/api/food/list");
       setFoodList(response.data.data)
    }
    const loadCartData = async (token) => {
      const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
      setCartsItem(response.data.cartData)
    }
    useEffect(()=>{
 
   
     async function localData() {
       await fetchFoodList();
      //  await loadCartData(localStorage.getItem("token"))
       if(localStorage.getItem("token")){
         setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
        }
     }
     localData()
    },[])
   const contextValue = {
      food_list,
      cartItems,
      setCartsItem,
      addToCart,
      removeFromCart,
      getTotalCart,
      url,
      token,
      setToken,


   };
  

   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   );
};

export default StoreContextProvider;
