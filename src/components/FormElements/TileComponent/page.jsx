import React from 'react'

const TileComponent = ({ data, selected = [], onClick }) => {
    return data && data.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-1">
          {data.map((dataItem) => (
            <label
              onClick={() => onClick(dataItem)}
              className={`cursor-pointer ${
                selected &&
                selected.length &&
                selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                  ? "bg-indigo-700 text-white rounded-lg"
                  : ""
              }`}
              key={dataItem.id}
            >
              <span
                className={`btn btn-outline btn-info${
                  selected &&
                  selected.length &&
                  selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                    ? "text-white"
                    : ""
                }`}
              >
                {dataItem.label}
              </span>
            </label>
          ))}
        </div>
      ) : null;
}

export default TileComponent
