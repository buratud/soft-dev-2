import React from "react";
import Image from 'next/image'

const BinTypes = ({ bins }) => {
  const binTypeIcons = {
    red_bin: {
      iconUrl: '/static/red_bin.png',
      text: 'ขยะอันตราย',
    },
    yellow_bin: {
      iconUrl: '/static/yellow_bin.png',
      text: 'ขยะรีไซเคิล',
    },
    blue_bin: {
      iconUrl: '/static/blue_bin.png',
      text: 'ขยะทั่วไป',
    },
    green_bin: {
      iconUrl: '/static/green_bin.png',
      text: 'ขยะเปียก',
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex">
        {bins.map((binType) => (
          binTypeIcons[binType] && (
            <div key={binType} className="flex flex-col items-center justify-between rounded-lg shadow-lg p-2 m-1">
              <Image
                src={binTypeIcons[binType].iconUrl}
                alt={binType}
                width="100"
                height="100"
                className="w-8 h-8"
              />
              <p className="text-sm mt-1">{binTypeIcons[binType].text}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BinTypes;
