import React from 'react';
import Navigation from "./Navigation"

function Header(){
    return(
        <header className="border-b p-3 flex justify-between item-center">
            <span className="font-bold">
                Matious Test
            </span>

            <Navigation/>
        </header>
    )
}

export default Header;