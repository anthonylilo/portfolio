import React, { useEffect } from "react";

const TablesData = ({ data, fetchData, handleDelete, handleEdit }) => {
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (data.length === 0) {
        return <p>No data.</p>;
    }

    const columns = Object.keys(data[0]);

    return (
        <table className="content-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={column}>
                                {column === "profile" || column === "description" ? (
                                    <div dangerouslySetInnerHTML={{ __html: item[column] }} />
                                ) : (
                                    item[column]
                                )}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => handleEdit(item.id)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablesData;
