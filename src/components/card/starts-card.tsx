// StatsCard.tsx
import React from "react";

const StatsCard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Chart Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6">
        <div className="h-32 flex items-end space-x-4">
          {[400, 150, 300, 100, 400, 80, 250, 130].map((height, idx) => (
            <div
              key={idx}
              className="bg-white w-4 rounded-md"
              style={{ height: `${height / 4}px` }}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        <h2 className="text-gray-800 text-xl font-semibold">Active Users</h2>
        <p className="text-green-600 font-bold mb-4">(+23%) than last week</p>

        <div className="grid grid-cols-4 gap-4 text-center">
          {/* Users */}
          <div>
            <div className="text-pink-500 text-4xl font-bold">36K</div>
            <p className="text-gray-600 mt-1">Users</p>
          </div>

          {/* Clicks */}
          <div>
            <div className="text-blue-500 text-4xl font-bold">2M</div>
            <p className="text-gray-600 mt-1">Clicks</p>
          </div>

          {/* Sales */}
          <div>
            <div className="text-orange-500 text-4xl font-bold">$435</div>
            <p className="text-gray-600 mt-1">Sales</p>
          </div>

          {/* Items */}
          <div>
            <div className="text-red-500 text-4xl font-bold">43</div>
            <p className="text-gray-600 mt-1">Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
