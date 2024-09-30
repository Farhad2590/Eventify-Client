// import React from 'react';

const AdjustableParameter = ({ parameter, label, pricePerUnit, unit, defaultValue, value, onUpdate, onReset }) => (
    <div className="d-flex align-items-center flex-column mb-4" style={{ gap: ".5rem" }}>
        <div className="flex align-items-center justify-content-center mb-2" style={{ gap: ".5rem" }}>
            <div className="text-gray-600 dark:text-gray-300 mb-2 text-xl font-extrabold">{label}:</div>
            <button
                onClick={() => onUpdate(parameter, -1, pricePerUnit)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                -
            </button>
            <div>
                <span className="fs-3 text-xl font-extrabold">{value}</span> {unit}
            </div>
            <button
                onClick={() => onUpdate(parameter, 1, pricePerUnit)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                +
            </button>
        </div>
        <button
            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            onClick={() => onReset(parameter, defaultValue, pricePerUnit)}
        >
            Reset to Default
        </button>
    </div>
);

export default AdjustableParameter;