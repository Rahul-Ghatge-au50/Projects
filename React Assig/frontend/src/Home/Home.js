import { useContext, useEffect, useState, } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import './home.css';
import SearchIcon from '@mui/icons-material/Search';
import { Context } from "../Context/Context";
import axios from 'axios';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from "react-router-dom";

function Home() {

    const [products, setProducts] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [result, setResult] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [data, setData] = useState();
    const [added, setAdded] = useState(true);
    const navigate = useNavigate();


    const { user } = useContext(Context);
    //console.log(user);
    const userId = user.id;

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products));
        // console.log(products)

        const Obj = JSON.parse(localStorage.getItem('cart'));
        setData(Obj);
    }, []);


    const handleSearch = () => {
        fetch(`https://dummyjson.com/products/search?q=${searchItem}`)
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }

    const handlePriceFilter = () => {
        fetch(`https://dummyjson.com/products`)
            .then(res => res.json())
            .then(data => setProducts(data.products));

        let newArray = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].price > min && products[i].price < max) {
                newArray.push(products[i]);
            }
        }
        return setResult(newArray);
    }


    const handleShowCart = async () => {
        let cart = JSON.parse(localStorage.getItem('cart'));

        //console.log(res.data);
        if (cartProducts.length) {
            if (!cart) {
                const data = {
                    userId: userId,
                    products: cartProducts
                };
                const res = await axios.post('https://dummyjson.com/carts/add', (data));
                localStorage.setItem('cart', JSON.stringify(res.data))
            }
        }


        const Obj = JSON.parse(localStorage.getItem('cart'));
        setData(Obj);
        if (Obj) {
            navigate('/cart');
        } else {
            setAdded(false);
        }

    }


    const handleCartCount = (id, quantity) => {
        const product = {
            id,
            quantity,
        }

        setCartProducts((prev) => {
            return [...prev, product]
        })
        //console.log(cartProducts);
    }



    return (
        <>
            <Navbar />
            <div className="home-cont" >
                <div className="filter-cont" >
                    <input
                        type="text"
                        className="filter-Input"
                        placeholder="Min"
                        value={min}
                        onChange={(e) => setMin(e.target.value)} />
                    <input
                        type="text"
                        className="filter-Input"
                        placeholder="Max"
                        value={max}
                        onChange={(e) => setMax(e.target.value)} />
                    <button onClick={handlePriceFilter} className="filter-btn" >Filter</button>
                </div>
                <div className="home-search" >
                    <label htmlFor="search" className="search-label" >
                        <SearchIcon style={{ fontSize: '28px' }} />
                    </label>
                    <input
                        type="text"
                        id='search'
                        placeholder="Search..."
                        onChange={(e) => setSearchItem(e.target.value)} />
                    <button className="search-btn" onClick={handleSearch} >Search</button>
                </div>
                {!added ? <>
                    <div style={{display:'flex',alignItems:'center',color:'red'}} >
                        <p>Cart Empty</p>
                        <ShoppingCartOutlinedIcon
                            style={{ fontSize: '26px'}} />
                    </div>
                </>
                    : (
                        <div className="home-cart-cont" >
                            {
                                data ? (<>
                                    <div style={{ display: 'flex', gap: '8px', fontWeight: '500', alignItems: 'center' }} >
                                        <ShoppingCartOutlinedIcon
                                            style={{ fontSize: '26px', cursor: 'pointer' }}
                                            onClick={() => { navigate('/cart') }} />
                                        <p>Quan:{data.totalQuantity ? data.totalQuantity : " "} </p>
                                        <p>Prod:{data.totalProducts ? data.totalProducts : " "} </p>
                                        <p>Total: Rs{data.total ? data.total : " "}</p>
                                    </div>
                                </>) :
                                    (
                                        <>
                                            <div style={{ display: 'flex' }} >
                                                <ShoppingCartOutlinedIcon
                                                    style={{ fontSize: '26px' }}
                                                    onClick={() => { navigate('/cart') }} />
                                                <button className="cart-btn" onClick={handleShowCart} >My Cart</button>
                                            </div>
                                        </>
                                    )
                            }
                        </div>)}
            </div>
            <div className="home-card" >
                {
                    result.length ? result.map((item) => {
                        return <Card item={item} key={item.id} />
                    }) :
                        products.map((item) => {
                            return <Card item={item} key={item.id} handleCartCount={handleCartCount} />
                        })
                }
            </div>
        </>
    )
}
export default Home;
