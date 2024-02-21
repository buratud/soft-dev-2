import React from 'react';
import './footer.scoped.css';
import { REACT_APP_MAIN_URL } from "../config";

export default function Footer() {
  return (
      <div className={"footerframe"}>
          <img src={`${REACT_APP_MAIN_URL}/DekhorlogoTrans.png`} width={96} height={96} alt="logo" />
          <div className={"footercontent"}> 
              <div className={"footernavbox"}>
                  <a className={"footernav"} href={`${REACT_APP_MAIN_URL}/`}>Home</a>
                  <a className={"footernav"} href={`${REACT_APP_MAIN_URL}/blogs`}>Blogs</a>
                  <a className={"footernav"} href={`${REACT_APP_MAIN_URL}/dorms`}>Dorms</a>
                  <a className={"footernav"} href={`${REACT_APP_MAIN_URL}/markets`}>Markets</a>
              </div>
              <div className={"footercontactbox"}>
                  <b>Contact Us</b>
                  <div className={"footercontact"}> 
                      <img src={`${REACT_APP_MAIN_URL}/EmailFtico.png`} alt="email" width={20} height={20} /> Email : contact@dekhorsuperapp.com 
                  </div>
                  <div className={"footercontact"}>
                      <img src={`${REACT_APP_MAIN_URL}/FBftico.png`} alt="FB" width={20} height={20} /> Facebook : DekHor Super App 
                  </div>
                  <div className={"footercontact"}>
                      <img src={`${REACT_APP_MAIN_URL}/phonecallico.png`} alt="phone" width={20} height={20} /> 02-XXX-XXXX 
                  </div>
              </div>
          </div>
          <div className={"footerline"}></div>
          <div className={"footerend"}>
              <div>Copyright © 2024 DekHor Super App. All rights reserved.</div>
              <div>Made with ❤️ by Cpr.E Year 2</div>
          </div>
      </div>
  );
}

