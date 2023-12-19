const AuthoInfoPrint = ({ hotelInfo, isHotelSuccess }) => {
  // if (!hotelInfo || hotelInfo.length === 0 || !hotelInfo[0]) {
  //   return <div>Loading...</div>; // Or handle the loading state appropriately
  // }

  const info = isHotelSuccess && hotelInfo[0] ? hotelInfo[0] : [];

  return (
    <div className="py-2">
      <h2 className="font-bold">Invoice From</h2>
      <div className="flex items-center">
        <div>
          <div className="flex gap-2">
            <p>Hotel Name</p>
            <p>: {info?.name}</p>
          </div>

          <div className="flex gap-[3.4rem]">
            <p>Email</p>
            <p className="">: {info?.email}</p>
          </div>

          <div className="flex gap-[3rem]">
            <p>Phone</p>
            <p>: {info?.phone_no}</p>
          </div>

          <div className="flex gap-[2.2rem]">
            <p>Address</p>
            <p>: {info?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthoInfoPrint;
