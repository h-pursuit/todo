import React from 'react'
import './item-add-form.css'

const ItemAddForm = ({onItemAdded}) =>{
    return(
        <div>
            <button className='item-add-form btn btn-outline-primary'
                onClick = { () => onItemAdded('Text')}>
                Add Item
            </button>
        </div>
    )
}

export default ItemAddForm;