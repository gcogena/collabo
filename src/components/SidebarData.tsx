import { BsClipboardData } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { MdOutlineTopic } from 'react-icons/md'

export const SidebarData = [
    {
        key: 'explore_authors_page',
        title: 'Explore',
        path: '/',
        icon: <BiSearchAlt style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    },
    {
        key: 'explore_topics_page',
        title: 'Topics',
        path: '/topics',
        icon: <MdOutlineTopic style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    },
    {
        key: 'data_stories_page',
        title: 'Data Stories',
        path: '/data-stories',
        icon: <BsClipboardData style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    },
    {
        key: 'about_us_page',
        title: 'About Us',
        path: '/about-us',
        icon: <FaUsers style={{ fontSize: "14pt", marginRight:"5px"}}/>,
        class: 'menu-item'
    }
]
