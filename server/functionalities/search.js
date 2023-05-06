// Function to implement search functionality
//we are not using this method in this application

const search = (query, queryStr) => {
    const keyword = queryStr.keyword
      ? {
        name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};
console.log(keyword);
    return query.find(keyword); // Assuming `query` is a MongoDB query object
  };
  
  

  module.exports = search;
  