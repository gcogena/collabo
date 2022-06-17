import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import "../styles/navbar.css"

interface NavParams {
    onPageClick: Function;
    clicked: string;
}

const Navbar: React.FC<NavParams> = ({ onPageClick, clicked }) => {
    return (
        <div className="wrapper">
            <div className="sidebar">
                <div className='logo'>
                   <h2>COLLABO 2.0</h2>
                </div>
                <ul>
                   {SidebarData.map((data, index) => {
                        return <Link to={ data.path } 
                            onClick={ () => onPageClick(data.title) }> 
                            <li key={ index } className={ clicked===data.title ? 'active' : ''} >
                                <span className="icon">{ data.icon }</span>
                                <span className="item">{ data.title }</span>
                             </li> </Link>
                     })}
                </ul>
            </div>

        </div>
            // <div className='nav-menu'>
            //     <div className='logo'>
            //         <h2>COLLABO</h2>
            //     </div>
            //     <div className='hr'></div>
            //     <ul className='nav-menu-items'>
            //         {SidebarData.map((data, index) => {
            //             return <Link to={ data.path } 
            //                 onClick={ () => onPageClick(data.title) }> 
            //                 <li key={ index } className={ clicked===data.title ? 'menu-item active' : data.class} >

            //                     { data.icon } { data.title }
            //                 </li> </Link>
            //         })}
            //     </ul>`
            // </div>
        

    )
}

export default Navbar
