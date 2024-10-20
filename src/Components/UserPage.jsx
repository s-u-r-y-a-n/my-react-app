import { useState } from 'react';
import NavBar from './NavBar';
import HomePage from './HomePage';

const UserPage = () => {
    const [currentComponent, setCurrentComponent] = useState(<HomePage />); 

    function handleClick(component) {
        console.log('Component clicked:', component); 
        setCurrentComponent(component);
    }

    return (
        <>
            <NavBar onLinkClick={handleClick} />
            <div>
                {currentComponent} {/* Render the current component */}
            </div>
        </>
    );
}

export default UserPage;