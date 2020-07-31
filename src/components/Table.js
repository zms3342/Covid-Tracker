import React from 'react'
import "../css/Table.css"

export default function Table({ countries }) {
    return (
        <div className="table">
            {
                countries.map(({country, cases})=>(
                    <tr>
                        <td>{country}</td>
                        <td><strong>{cases}</strong></td>
                    </tr>
                ))}
        </div>
    )
}
