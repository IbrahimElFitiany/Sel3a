import React from 'react';
import StarRatings from 'react-star-ratings';

const StarRating = ({ rating }) => {
  return (
    <div className='pt-3 flex items-center gap-x-3'>
      
      <h1 className='pt-0.5 text-white text-2xl'>{rating}</h1>

      <StarRatings
        rating={rating}
        starRatedColor="#5FD47E"
        starEmptyColor="#808080"
        numberOfStars={5}
        starDimension="18px"
        starSpacing="1px" 
        isAggregateRating={true}
      />
    </div>
  );
};

export default StarRating;
