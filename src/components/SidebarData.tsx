import { BsClipboardData } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'

export const SidebarData = [
    {
        key: 'explore_page',
        title: 'Explore',
        path: '/',
        icon: <BiSearchAlt style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    },
    {
        key: 'datastories_page',
        title: 'Data Stories',
        path: '/data-stories',
        icon: <BsClipboardData style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    },
    {
        key: 'aboutus_page',
        title: 'About Us',
        path: '/about-us',
        icon: <FaUsers style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    }
]
