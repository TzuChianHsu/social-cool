import React from 'react';

const Post =(props: any) =>{
  const { sidebar} = props;
  return (
      <div>
        {sidebar}
          <p> (Protected) Home page</p>
      </div>
  )
}

export default Post