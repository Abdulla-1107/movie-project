import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Category = () => {
    const [params, setParams] = useSearchParams()

    const [filterName, setFilterName] = useState(params.get("filter") || "")

    const handleFilter = (name) => {
        setParams({
            filter: name
        })
    }

    useEffect(() => {
        console.log("fetch");
    }, [filterName])

  return (

    <div className='container flex justify-center items-center gap-3.5 py-3'>
        <div className={`cursor-pointer category ${filterName === "All" ? "active" : ""}`} onClick={() => handleFilter("All")}>All</div>
        <div className={`cursor-pointer category ${filterName === "Old" ? "active" : ""}`} onClick={() => handleFilter("Old")}>Old</div>
        <div className={`cursor-pointer category ${filterName === "New" ? "active" : ""}`} onClick={() => handleFilter("New")}>New</div>
    </div>
  )
}

export default Category