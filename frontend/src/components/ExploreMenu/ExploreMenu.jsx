import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quis praesentium vel non adipisci vitae, veniam amet architecto! Explicabo, aperiam magnam! Accusamus aspernatur iusto nam.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return <div onClick={() => setCategory(prev=> prev === item.menu_name?"All":item.menu_name) } key={index} className='explore-menu-list-item'>
                <img className={category === item.menu_name?"active":""} src={item.menu_image} alt="item-img" />
                <p>{item.menu_name}</p>
            </div>
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu