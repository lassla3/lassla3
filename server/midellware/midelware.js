const chekSignup=(req,res,next)=>{
    const {firstName,lastName,email,password,location,phoneNumber,imgUrl}=req.body
    if(!firstName){
        return res.status(400).json('write your firstName')
    }
    if(!lastName){
        return res.status(400).json('write your lastName')
    }
    if(!email || !isValidEmail(email)){
        
        return res.status(400).json('Please provide a valid email address')
    }
    if(!password || password.length<8 ){
        return res.status(400).json('Password must be at least 8 characters long')
    }
    
    if(!phoneNumber){
        return res.status(400).json('select your phoneNumber')
    }
    if(!imgUrl){
        return res.status(400).json('select your imgUrl')
    }
  
    next()

}
function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function isValidPassword(password) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(password);
}

module.exports=chekSignup