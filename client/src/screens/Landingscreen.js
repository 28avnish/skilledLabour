import React, {useEffect}  from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState } from 'react'

const Landingscreen = () => {
    useEffect(() => {
        AOS.init();
      }, [])

  return (
    <div className='row landing justify-content-center  '>

        <div className='col-md-9 my-auto text-center ' style={{borderRight:"8px solid whitesmoke"}}>

           <h2 style={{color:"whitesmoke",fontSize:"100px",
        }}> SkilledLabour </h2>
           <h1  style={{color:"whitesmoke"}}> "Unlocking Potential, Empowering Skilled Hands"</h1>
           <Link to="/home">
            <button className='btn landingbtn' style={{color:"black"}}><b> Get Started </b></button>
           </Link>
        </div>
    </div>
  )
}

export default Landingscreen