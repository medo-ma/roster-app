import './App.css'
import { AppBar, Toolbar, List, ListItem, ListItemText, Box } from '@mui/material';
function Header(){
    return(
        <header>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            <meta name="viewport" content="initial-scale=1, width=device-width" />

            <nav>
                <ul className="headerUl" >
                    <li><a>Roster</a></li>
                </ul>
            </nav>
            
        </header>
    )

}
export default Header