import React, { useState, useRef, useContext } from 'react';
import "./Nav.scoped.css"
import { Link,useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineSearch, AiFillCloseSquare} from 'react-icons/ai'
import DropdownProfile from './DropdownProfile';
import { BsFillCaretDownFill } from "react-icons/bs";
import { General } from '../App';
import e from 'cors';


// Responsive Navbar
function Navbar(){
    const {session} = useContext(General);

    // code สำหรับเสิร์ชข้ามหน้า
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
          navigate(`/search?query=${searchQuery}`);
        }
    };
    
    //  Code to toggle Navbar
    const [active, setActive] = useState('menu_content')
    const showNav = () => {
        setActive('menu_content activeMenu')
    }
    const removeNav = () => {
        setActive('menu_content')
    }

    // Code to show search ไม่เกี่ยวกับข้ามหน้า อันนี้ตอนทำ responsive 
    const [show, setShow] = useState('search_blog')
    const showSearch = () => {
        setShow('search_blog activeSearch')
    }
    const removeSearch = () => {
        setShow('search_blog')
    }

    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    // ให้คลิกข้างนอกแล้ว Dropdown ก็ถือว่าปิด
    const dropDownRef = useRef();
    const dropRef = useRef();
    const dropDown2Ref = useRef();
    const drop2Ref = useRef();

    window.addEventListener('click', (e) => {
        if (e.target !== dropDownRef.current && e.target !== dropRef.current) {
            setOpen(false);
        }
    })
    
    window.addEventListener('click', (e) => {
        if (e.target !== dropDown2Ref.current && e.target !== drop2Ref.current) {
            setOpen2(false);
        }
    }) 

    return (
        <header className="Navbar">
            <Link to={"/home"}>
                <div className="logo">
                    <img id="logo" src="/DekHor.png" alt="" />
                </div> 
            </Link>
            <div className={show}>
                <form action="#" className='search-box' onSubmit={handleSearch}>
                    <input 
                        type="text"
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    <button type='submit' className='btn_search'>
                        <AiOutlineSearch className="search-icon" size={25} /> 
                    </button>
                </form>
            </div>
            <div className={active} >
                <li>
                    <a className="navigation" href="/home">Home</a>
                </li>
                <li>
                    <a className="drop" ref={dropRef} onClick={() => setOpen(!open)} href="#">Categories<BsFillCaretDownFill size={10} className='icon' /></a>
                    {open &&
                        <div className="Dropdown" ref={dropDownRef}>
                            <li><a className="navigation2" href="/decoration">Decoration</a></li>
                            <li><a className="navigation2" href="/cleaning">Cleaning</a></li>
                            <li><a className="navigation2" href="/cooking">Cooking</a></li>
                            <li><a className="navigation2" href="/story">Story's DekHor</a></li>
                        </div>
                    }
                </li>
                <li>
                    <a className="drop" ref={drop2Ref} onClick={() => setOpen2 (!open2)} href="#">Blog<BsFillCaretDownFill size={10} className='icon' /></a>
                    {open2 &&
                        <div className="Dropdown" ref={dropDown2Ref}>
                            <li><a className="navigation2" href="/writeblog">Blogging</a></li>
                            <li><a className="navigation2" href="/blogger">Blogger</a></li>
                        </div>
                    }
                </li>
                <li>
                    <NavLink className="login_blog">
                        {session ? <DropdownProfile/> : <Link to={"/login"}><button className='Login_btn'>Log in</button></Link>}
                    </NavLink>
                </li>
                <div className="closeNavBar" onClick={removeNav} >
                    <AiFillCloseSquare size={25} id='closeicon' />
                </div>
            </div>
            <AiOutlineMenu size={25} id='menu-icon' onClick={showNav} />

        </header>
    );
};
export default Navbar;