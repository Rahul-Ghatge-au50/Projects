import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function StarRating({rating}) {

    const star = [];
    for(let i=1; i<=5; i++){
        if(i <= rating){
            star.push(<StarIcon style={{color:'gold'}} />);
        }else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            star.push(<StarHalfIcon style={{color:'gold'}} />);
        }
        else{
            star.push(<StarBorderIcon style={{color:'gold'}}/>);
        }
    }

  return (
    <>
    {star}
    </>
  )
}

export default StarRating
