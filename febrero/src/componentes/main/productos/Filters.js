import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'



function Filters() {
    const state = useContext (GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productosAPI.category
    const [sort, setSort] = state.productosAPI.sort
    const [search, setSearch] = state.productosAPI.search

    const handleCategory = e =>{
        setCategory(e.target.value)
        setSearch('')
    }
    return (
    <div className='filter_menu'>
        <div className='row'>
            <span>Filters: </span>
            <select name="category" value={category} onChange={handleCategory}>
                <option value="">all products</option>
                {
                    categories.map(category=>(
                        <option value={"category=" + category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
        <input type="text" name={search} placeholder="enter" 
        onChange={e=> setSearch(e.target.value.toLocaleLowerCase())}/>
    </div>
  )
}

export default Filters