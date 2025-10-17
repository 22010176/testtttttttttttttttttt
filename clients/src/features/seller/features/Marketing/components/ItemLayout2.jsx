function ItemLayout2({ title, description, statsData = [] }) {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-500">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-gray-600 text-sm">{stat.label}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500">
              so với {stat.change} trước <span className="text-gray-600">{stat.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemLayout2;