import React from "react";
import avatar from "./avatar.png";
import ContentLoader from "react-content-loader";

import ReactStars from "react-rating-stars-component";

const ReviewCard = (props) => {
  const reviews = props.reviews;
  const loading = props.loading;
  const error = props.loading;
  
    
  return (
    <>
      {loading ?(
        <>
        <ContentLoader/>
        </>
      ):(
        <>
          <h1 className="text-center text-xl py-2">Reviews</h1>
          {reviews ? (
            reviews.map((rev,id) => (
              <div key={id}>
               
                <div className="flex items-center justify-center py-3 ">
                  <div className="rounded-lg  border-gray-600 shadow-xl flex w-3/5 ">
                    <img className="h-24" src={avatar} alt="user" />
                    <div className="flex flex-col justify-center w-2/5">
                      <div className="font-semibold">{rev.name}</div>
                      <div>{rev.comment}</div>
                      <div>
                        <ReactStars
                          count={5}
                          isHalf={true}
                          size={24}
                          activeColor="#ffd700"
                          edit={false}
                          value={rev.rating}
                        />
                      </div>
                    </div>
                  </div>
                </div>
               
                </div>
            ))
          ) : (
            <>
              <h1>no reviews found for this product</h1>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReviewCard;
