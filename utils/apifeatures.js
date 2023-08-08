
function search(queryStr){

    const keyword = queryStr.keyword
    ?{
        name:{
            $regex:queryStr.keyword,
            $options:"i"
        }
    }
    : {};
    return keyword
}



module.exports={
    search
}