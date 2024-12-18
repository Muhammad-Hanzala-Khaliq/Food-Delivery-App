import userModel from '../models/userModel.js'

//add items to usercart 
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId) //userID is get using middleware while requesting we will not send the id we will send the token and this middleware will convert the token in the userID
        let cartData = await userData.cartData; //cartData extract from userdata because we made field of cart data 
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1 //jub wo wala product present na hoga
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:'Added To Cart'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}


//removeItems from userCart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
          cartData[req.body.itemId] -= 1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'Removed From cart'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//fetch user cart data 
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}

export {addToCart,removeFromCart,getCart}


// if user will send itemId  we can add one entry in their cart
// when user will send the data they will use the token to authenticate them