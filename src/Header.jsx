
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

            <h1>
                this is the header
            </h1>
            <nav>
                <ul>
                    <li><a href="#"><h1>home</h1></a></li>
                    <li><a href="#"><h1>reverse</h1></a></li>
                </ul>
            </nav>
            <hr></hr>
        </header>
    )

}
export default Header