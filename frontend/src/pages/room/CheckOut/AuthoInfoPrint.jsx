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
          <div className="grid grid-cols-2">
            <p>Name</p>
            <p>: {info?.name}</p>
          </div>

          <div className="grid grid-cols-2">
            <p>Email</p>
            <p>: {info?.email}</p>
          </div>

          <div className="grid grid-cols-2">
            <p>Phone</p>
            <p>: {info?.phone_no}</p>
          </div>

          <div className="grid grid-cols-2">
            <p>Address</p>
            <p>: {info?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthoInfoPrint;
