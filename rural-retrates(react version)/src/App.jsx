// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Services from "./components/Services ";
// import HomeStays from "./components/Homestays";
// import FAQs from "./components/FAQ1";
// import Contact from "./components/Contact ";
// import Login from "./components/Login ";
// import Footer from "./components/Footer";
// import FAQ1 from "./components/FAQ1"


// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <main className="p-6">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/homestays" element={<HomeStays />} />
//           <Route path="/faq" element={<FAQ1/>} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </main>
//       <Footer/>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const[qry,seyQry] = useState("")
  useEffect(()=>{
    const timer = setTimeout(()=>{
     if(qry){
      console.log("searching qry .......");
     }
      
    },1000);
    return ()=>clearTimeout(timer)
  },[qry])
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>count ++</button><br />
      <button onClick={()=>setCount(count-1)}>count --</button><br />
      <button onClick={()=>setCount(0)}>reset</button>


<input type="text" name="" id="" value={qry} onChange={(e)=>seyQry(e.target.value)} />
<button onClick={()=>alert("qry is :  "+qry)}>show</button>

    </>
  )
}

export default App
