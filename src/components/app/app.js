import React, {Component} from 'react'

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component{

  maxId = 100;

  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make Awesome App'),
      this.createItem('Have a lunch')
    ]
  }
 
  // function for deleted item
  deleteItem = (id) =>{
    this.setState(({todoData})=>{
      const index = todoData.findIndex((item)=> item.id === id)
      const resultArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ]
      return {
        todoData: resultArray
      }
    })
  }


  createItem(label){
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }


  // function for added item
  onItemAdded = (label) =>{

    // create element
    const item = this.createItem(label)

    this.setState(({todoData})=>{
      const newArray = [
        ...todoData,
        item
      ]
      
      return {
        todoData: newArray
      }

    })

    this.maxId++;
  }

  onToggleProperty(arr, id, propName){

    const idx = arr.findIndex((el) => el.id === id );

    const oldItem = arr[idx]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }


  onToggleDone = (id) => {
    this.setState(({todoData})=>{
      return {todoData: this.onToggleProperty(todoData, id, 'done')}
    })
  }

  onToggleImportant = (id) => {
    this.setState(({todoData})=>{
      return {todoData: this.onToggleProperty(todoData, id, 'important')}
    })
  }


  render(){
    const { todoData } = this.state;
    const doneCount = todoData.filter((el)=>el.done).length
    const todoCount = todoData.length - doneCount
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={todoData} 
          onDelete = {(id) => this.deleteItem(id)}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
        />
        <ItemAddForm 
          onItemAdded = { (text) => this.onItemAdded(text)}
        />
      </div>
    );
  }
};
