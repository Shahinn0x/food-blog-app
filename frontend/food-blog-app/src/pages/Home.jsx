import React from 'react';
import f2 from '../assets/f4.jpg';


export default function Home() {
  return (
    <>
        <section className='home'>
            <div className="left">
                <h1>Food Recipe</h1>
                <h5>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </h5>
                <button>Share your recipe</button>
            </div>
            <div className='right'>
                <img src={f2} width="400px" height="300px"  object-fit="cover"></img>
            </div>
        </section>
        <div className="bg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L30,53.3C60,75,120,117,180,128C240,139,300,117,360,133.3C420,149,480,203,540,213.3C600,224,660,192,720,160C780,128,840,96,900,85.3C960,75,1020,85,1080,101.3C1140,117,1200,139,1260,149.3C1320,160,1380,160,1410,160L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
        </div>
    </>
  )
}
