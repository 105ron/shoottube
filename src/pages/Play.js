import React from 'react';
import { useParams } from 'react-router-dom';

function Play() {
  const { slug } = useParams();
  return (
    <div>
      play page
      {slug}
    </div>
  );
}

export default Play;
