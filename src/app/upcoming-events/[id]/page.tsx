import React from 'react';
const DetailsPage = async ({ params,}: {params: Promise<{ id: string }>;}) => {
  const {id} = await params;
const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${id}`
);

const responseText = await res.text();
console.log("Status:", res.status);
console.log("Response:", responseText);

  return (
    <div>
      from details page
    </div>
  );
};

export default DetailsPage;