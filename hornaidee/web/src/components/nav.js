import { NavLink } from "react-router-dom";
import "./nav.scoped.css";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useState } from "react";

const Navbar = () => {
  const [isOpen_1, setIsOpen_1] = useState(false);
  const [isOpen_2, setIsOpen_2] = useState(false);
  const [isOpen_3, setIsOpen_3] = useState(false);
  const [isOpen_4, setIsOpen_4] = useState(false);
  const [isOpen_Profile, setIsOpen_Profile] = useState(false);
  const [isOpen_Categories, setIsOpen_Categories] = useState(false);
  const [isOpen_CategoriesEat, setIsOpen_CategoriesEat] = useState(false);
  return (
    <header className="main">
      <div className="leftside">
        <div className="logo">
          <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/"}>
            <img alt="logo" src="/LOGO.png" height={70} width={80} />
          </NavLink>
        </div>
      </div>
      <div className="middle">
        <div>
          {/* dropdown 1 */}
          <button
            className="dropdown"
            onClick={() => {
              setIsOpen_1((prev) => !prev);
              setIsOpen_2(false);
              setIsOpen_3(false);
              setIsOpen_4(false);
              setIsOpen_Profile(false);
              setIsOpen_Categories(false);
            }}
          >
            Blogs
            {!isOpen_1 ? (
              <span className="arrow">▼</span>
            ) : (
              <span className="arrow">▲</span>
            )}
          </button>

          {isOpen_1 && (
            <div className="dropdownContent">
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs"}>Main</NavLink>
                </span>
              </div>
              <div>
                <button
                  className="subdropdown"
                  onClick={() => setIsOpen_Categories((prev) => !prev)}
                >
                  <span>Categories</span>
                  {!isOpen_Categories ? (
                    <span className="arrow">▼</span>
                  ) : (
                    <span className="arrow">▲</span>
                  )}
                </button>
                {isOpen_Categories && (
                  <div className="subdropdownContent">
                    <div>
                      <span>
                        <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/cleaning"}>Cleaning</NavLink>
                      </span>
                    </div>
                    <div>
                      <span>
                        <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/decoration"}>Decorations</NavLink>
                      </span>
                    </div>
                    <div>
                      <span>
                        <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/story"}>
                          Story's DekHor
                        </NavLink>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/writeblog"}>Blogging</NavLink>
                </span>
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/blogger"}>Blogger</NavLink>
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* dropdown 2 */}
          <button
            className="dropdown"
            onClick={() => {
              setIsOpen_2((prev) => !prev);
              setIsOpen_3(false);
              setIsOpen_4(false);
              setIsOpen_1(false);
              setIsOpen_Profile(false);
            }}
          >
            Dorms
            {!isOpen_2 ? (
              <span className="arrow">▼</span>
            ) : (
              <span className="arrow">▲</span>
            )}
          </button>
          {isOpen_2 && (
            <div className="dropdownContent">
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms"}>Main</NavLink>
                </span>
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms"}>All Dorms</NavLink>
                </span>
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms"}>Add Dorm</NavLink>
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* dropdown 3 */}
          <button
            className="dropdown"
            onClick={() => {
              setIsOpen_3((prev) => !prev);
              setIsOpen_4(false);
              setIsOpen_2(false);
              setIsOpen_1(false);
              setIsOpen_Profile(false);
              setIsOpen_CategoriesEat(false);
            }}
          >
            Eats
            {!isOpen_3 ? (
              <span className="arrow">▼</span>
            ) : (
              <span className="arrow">▲</span>
            )}
          </button>

          {isOpen_3 && (
            <div className="dropdownContent">
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats"}>Main</NavLink>
                </span>
              </div>
              <div>
                <button
                  className="subdropdown"
                  onClick={() => setIsOpen_CategoriesEat((prev) => !prev)}
                >
                  <span>Categories</span>
                  {!isOpen_CategoriesEat ? (
                    <span className="arrow">▼</span>
                  ) : (
                    <span className="arrow">▲</span>
                  )}
                </button>
                {isOpen_CategoriesEat && (
                  <div className="subdropdownContent">
                    <div>
                      <span>
                        <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats/foodRecipe"}>Foods</NavLink>
                      </span>
                    </div>
                    <div>
                      <span>
                        <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats/dessertRecipe"}>Desserts</NavLink>
                      </span>
                    </div>
                    <div>
                      <span>
                        <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats"}>Drinks</NavLink>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats/addnewmenu"}>Add Recipe</NavLink>
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* dropdown 4 */}
          <button
            className="dropdown"
            onClick={() => {
              setIsOpen_4((prev) => !prev);
              setIsOpen_3(false);
              setIsOpen_2(false);
              setIsOpen_1(false);
              setIsOpen_Profile(false);
            }}
          >
            Markets
            {!isOpen_4 ? (
              <span className="arrow">▼</span>
            ) : (
              <span className="arrow">▲</span>
            )}
          </button>

          {isOpen_4 && (
            <div className="dropdownContent">
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market"}>Main</NavLink>
                </span>
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market/food"}>All Products</NavLink>
                </span>
              </div>
              <div>
                <span>
                  <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market/addproduct"}>Add Product</NavLink>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rightside">
        {/* dropdown Profile */}
        <button
          onClick={() => {
            setIsOpen_Profile((prev) => !prev);
            setIsOpen_4(false);
            setIsOpen_3(false);
            setIsOpen_2(false);
            setIsOpen_1(false);
          }}
        >
          <div>
            <img
              alt="Profile"
              src="/PersonCircle.svg"
              className="ProfileImage"
            />
          </div>
        </button>

        {isOpen_Profile && (
          <div className="dropdownContentProfile">
            <div>
              <img
                alt="Profile"
                src="/PersonCircle.svg"
                height={30} 
                width={30}
              />
              <span>
                <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/"}>My Profile</NavLink>
              </span>
            </div>
            <div>
              <img
                alt="Support"
                src="/support.png"
                height={30} 
                width={30}
              />
              <span>
                <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/"}>Support</NavLink>
              </span>
            </div>
            <div>
              <BsBoxArrowLeft size={25} className="logout" />
              <span className="logout">
                <NavLink to={"https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/"}>Log out</NavLink>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;
