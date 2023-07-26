
function search(query,queryStr){
    const keyword = queryStr.keyword
    ?{
        name:{
            $regex:queryStr.keyword,
            $options:"i"
        }
    }
    : {};
    return query.find({...keyword})
}

function filter(query,queryStr){
    const queryCopy={...queryStr}
    console.log(queryCopy);

    //removing some feilds for category
    const removeFields=["keyword","page","limit"]
    removeFields.forEach(key=>delete queryCopy(key))
    console.log(queryCopy);
}

module.exports={
    search,
    filter
}