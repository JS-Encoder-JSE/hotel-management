const AuthoInfoPrint = ({ hotelInfo, isHotelSuccess }) => {
  // if (!hotelInfo || hotelInfo.length === 0 || !hotelInfo[0]) {
  //   return <div>Loading...</div>; // Or handle the loading state appropriately
  // }

  const info = isHotelSuccess && hotelInfo[0] ? hotelInfo[0] : [];
 

  return (
    <div className="py-2">
      <h2 className="font-bold">Invoice From</h2>
      <div className="flex gap-4 items-center">
        <div>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Address</p>
        </div>
        {isHotelSuccess && (
          <div>
            <p>: {info.name}</p>
            <p>: {info.email}</p>
            <p>: {info.phone_no}</p>
            <p>: {info.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthoInfoPrint;
