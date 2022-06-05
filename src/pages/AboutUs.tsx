import "../styles/aboutus.css"
import collabo from '../images/about-collabo.jpg'; 
import profile_pic from '../images/profile.png'; 
import { useEffect } from 'react'

interface AboutUsParams {
    changeSidebar: Function;
}

const AboutUs: React.FC<AboutUsParams> = ({ changeSidebar }) => {
    useEffect(() => {
        changeSidebar('About Us')
    },[])

  return (
    <div className="page">
        <div className="header"></div>
        <div className="title">COLLABO</div>

        <div className="collabo">
            <div className="photo">
                <img className="collabo-pic" alt="collabo-header" src={ collabo }></img>
            </div>
            
            <div className="content">
                <h2>About Collabo</h2>
                <p>A data visualization tool that allows users to explore
the scientific communities in the Philippines by building a co-authorship network out of the author, abstract, and affiliation details of Filipino researchers whose
papers were published from 1960 to 2020 and displaying centrality measures, communities, and top
topics studied by each author. </p>
            </div>
        </div>

        <div className="color-div version">
            <div className="profile content">
                <h3>Collabo 1.0</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            <div className="profile content">
                <h3>Collabo 2.0</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>

        <div className="meet-the-team">
            <div className="team-title">
                <h2>Meet the Team</h2>
            </div>
            
            <div className="team">
                <div className="profile">
                    <img className="profile_pic" alt="profile1" src={ profile_pic }></img>
                    <h4>Name</h4>
                </div>
                <div className="profile">
                    <img className="profile_pic" alt="profile2" src={ profile_pic }></img>
                    <h4>Name</h4>
                </div>
                <div className="profile">
                    <img className="profile_pic" alt="profile3" src={ profile_pic }></img>
                    <h4>Name</h4>
                </div>
                <div className="profile">
                    <img className="profile_pic" alt="profile4" src={ profile_pic }></img>
                    <h4>Name</h4>
                </div>
                <div className="profile">
                    <img className="profile_pic" alt="profile5" src={ profile_pic }></img>
                    <h4>Name</h4>
                </div>
            </div>
        </div>
        
        <div className="footer">
            <h5>© Collabo 2022</h5>
        </div>
    </div>
    
  )
}

export default AboutUs