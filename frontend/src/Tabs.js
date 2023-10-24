import { useState } from 'react';
import Warehouse from './Warehouse.js';
import './TextFields.css';
//import Stack from 'react-bootstrap/'

//GUI

function Tabs() {
    //useState päivitetään sen mukaan mitä arvoja sinne pistetään
    const [toggleState, setToggleState] = useState("");
        //esimerkiksi joku index arvo, olkoon vaikka 1,2,3 jne...
        const toggleTab = (index) => {
            setToggleState(index);
        }
        //getActiveClass päivittyy tarkistamalla toggleStaten tilan, joka siten aktivoi välilehden. 
        //Rekistöröi indexin ja asettaa oman css-luokan.
        const getActiveClass = (index, className) =>
            toggleState === index ? className : "";

    return (

    <div className="container">
        <div className="tab-list">
            <div>
            <div name="dispatch-orders" className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}><h3>Dispatch orders</h3></div>
            <div name="order" className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}><h3>Orders</h3></div>
            <div name="warehouse" className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}><h3>Warehouses</h3></div>
            <div name="stock levels" className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}><h3>Stock levels</h3></div>
            <div name="loads" className={toggleState === 5 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(5)}><h3>Loads</h3></div>
            <div name="others" className={toggleState === 6 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(6)}><h3>...</h3></div>
            <div name="settings" className={toggleState === 7 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(7)}><h3>Settings</h3></div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(1, "active-content")}`}>
                    <p>
                        <Warehouse/>
                    </p>
                </div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(2, "active-content")}`}>
                    <h2>button</h2>
                </div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(3, "active-content")}`}>
                    <h2>toimii 3</h2>
                </div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(4, "active-content")}`}>
                    <h2>toimii 4</h2>
                </div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(5, "active-content")}`}>
                    <h2>toimii 5</h2>
                </div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(6, "active-content")}`}>
                    <h2>toimii 6</h2>
                </div>
            </div>

            <div className="content-container">
            <div className= {`content ${getActiveClass(7, "active-content")}`}>
                    <h2>toimii 7</h2>
                </div>
            </div>

    </div>

    

    </div>
    //TO-DO things

    )
}
export default Tabs;