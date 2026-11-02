import EventDetailsClient from "./EventDetailsClient";


const DetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${id}`
  );

  const responseText = await res.json();

  console.log("Status:", res.status);
  console.log("Response:", responseText);

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Event not found!
        </h2>
      </div>
    );
  }

  return <EventDetailsClient event={responseText} />;
};

export default DetailsPage;