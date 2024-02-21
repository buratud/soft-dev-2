import React from 'react'
import "./Card.scoped.css"
import { BiSolidPencil } from "react-icons/bi";
import { Link } from 'react-router-dom'

const Card = (props) => {
    const { img, title, Blogger, Categories, id } = props;
    return (
        <Link to={`/${Categories}/${id}`}>
            <div className="singleDest">
                <div className="dastImage">
                    <img src={img} alt="" />
                </div>
                <div className="destFooter">
                    <div className="destText">
                        <h4>
                            {title}
                        </h4>
                        <span className="userwrite">
                            <span className="name"><BiSolidPencil size={20} className="icon_pencil" />
                                {Blogger}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;