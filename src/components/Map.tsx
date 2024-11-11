import React from 'react';

export const Map = () => {
  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-64">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=79.1550%2C12.9670%2C79.1700%2C12.9770&amp;layer=mapnik&amp;marker=12.972124%2C79.162913"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Nexify Store</h3>
        <p className="text-sm text-gray-600">Katpadi Road, Vellore - 632014</p>
      </div>
    </div>
  );
};

// import React from 'react';

// export const Map = () => {
//   return (
//     <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden">
//       <div className="h-64">
//         <iframe
//           src="https://www.openstreetmap.org/export/embed.html?bbox=79.1600%2C12.9710%2C79.1658%2C12.9732&amp;layer=mapnik&amp;marker=12.972124%2C79.162913"
//           width="100%"
//           height="100%"
//           frameBorder="0"
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </div>
//       <div className="p-4 bg-gray-50">
//         <h3 className="font-semibold text-gray-900">Nexify Store</h3>
//         <p className="text-sm text-gray-600">Katpadi Road, Vellore - 632014</p>
//       </div>
//     </div>
//   );
// };