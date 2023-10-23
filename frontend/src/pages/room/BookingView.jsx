import React from "react";

const BookingView = () => {
  return (
    <div className={`bg-white p-10 rounded-2xl space-y-8`}>
      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Booking Information</h3>
        <table>
          <tbody>
            <tr>
              <th className={`text-start`}>No:</th>
              <td>1</td>
            </tr>
            <tr>
              <th className={`text-start`}>Check In:</th>
              <td>10.10.23 10:12:34</td>
            </tr>
            <tr>
              <th className={`text-start`}>Check Out:</th>
              <td>10.10.23 10:12:34</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 className={`text-2xl font-semibold mb-3`}>Customer Information</h3>
        <table>
          <tbody>
            <tr>
              <th className={`text-start`}>Name:</th>
              <td>S.M. Khalid Mahmud</td>
            </tr>
            <tr>
              <th className={`text-start`}>Phone:</th>
              <td>01715738573</td>
            </tr>
            <tr>
              <th className={`text-start`}>Email:</th>
              <td>khalid@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingView;
