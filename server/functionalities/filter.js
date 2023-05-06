//we are not using this method in this application
const filter=(query,queryStr)=>{
    console.log(queryStr);
    const queryCopy={...queryStr};
    console.log(queryCopy);
    const removeFields  = ["keyword","page","limit"];
    removeFields.forEach((key)=>delete queryCopy[key])
    console.log(queryCopy);
    
    let query1 =JSON.stringify(queryCopy)
    // queryStr=query1.replace(/\b(gt|gte|lt|lte)\b/g,key=>{`$${key}`});//an arrow function should return in a singlr line without {} so it return a undefinerd value
    const querySt = query1.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

    console.log(querySt);
    console.log(queryStr);  
    const parsedJson =(JSON.parse(querySt));
    console.log(parsedJson);
    return  query.find(parsedJson)
    }
    
    module.exports=filter;

