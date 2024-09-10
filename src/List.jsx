export default function List() {
    const list = ['moon','sun','jupitr','earth','mars']
    
    const afli = list.map(star => <li>{star}</li>)
    return(
        <ul>{afli}</ul>
    )

}