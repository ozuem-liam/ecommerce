import './SideDrawer.css'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function SideDrawer({ show, click }) {
    const sidedrawerClass = ["sidedrawer"];

    if(show) {
        sidedrawerClass.push("show");
    }

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
    }
    return <div className={sidedrawerClass.join(" ")}>
        <ul className="sidedrawer_links" onClick={click}>
            <li>
                <Link to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                <span>
                    Cart <span className="sidedrawer_cartbadge">{getCartCount()}</span>
                </span>
                </Link>
            </li>
            <li>
                <Link to="/">shop</Link>
            </li>
        </ul>
    </div>
}

export default SideDrawer
