import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons"; 


const Footer = () => {
  return (
    <footer className="footer">
        <section className="sectionOne" >
            <div>
                <h3>We help you!</h3>
                <ul>
                    <li>Help Center</li>
                    <li>Return and Changes</li>
                    <li>Legal Information</li>
                    <li>Billing</li>
                    <li>My Delivery State</li>

                </ul>
            </div>

            <div>
                <h3>Be part of Bat.com</h3>
                <ul>
                    <li>Sell in Bat.com</li>
                    <li>Work with Us</li>
                    <li>Providers</li>
                </ul>
            </div>

            <div>
                <h3>Our Company</h3>
                <ul>
                    <li>Bat.com</li>
                    <li>History</li>
                </ul>
            </div>
        </section>

        <section className="sectionTwo">
            
            <div className="one">
                <div>
                    <button>
                        <FontAwesomeIcon icon={faFacebookF} color="#fff" /> 
                    </button>

                    <button>
                        <FontAwesomeIcon icon={faTwitter} color="#fff" />
                    </button>
                </div>

                <div>
                    <p>Terms and Conditions</p>
                    <p>Cookies Policy</p>
                    <p>Privacy Policy</p>
                </div>
            </div>

            <hr />

            <div className="two">
                <h3> <em>&#169;</em> All rights reserved</h3>
                <em>4001 S Chester Ave, Bakersfield, CA, 93307</em>
            </div>
        </section>
    </footer>
  )
}

export default Footer