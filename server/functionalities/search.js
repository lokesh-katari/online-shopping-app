// Function to implement search functionality
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
  