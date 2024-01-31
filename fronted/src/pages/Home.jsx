import React, { useEffect, useState } from 'react'
import axios from "axios"

function Home() {
    const [data,setData]=useState([])


    const getAllBlogFromApi = async () => {
      try {
        const response = await axios.get(
          "https://blue-green-greyhound-wear.cyclic.app/notes/",
          { withCredentials: true }
        );
        console.log(response.data);
         setBlogData(response.data);
  
      } catch (error) {
        console.error("Error fetching blog data:", error.response);
      }
    };
  
    useEffect(() => {
      getAllBlogFromApi();
    }, []);
  
    
    return (
      <>
        {blogData.map((item,index)=>(
          <div  key={index}>
  
            <h1 >{item.title}</h1>
            <p >{item.description}</p>
            <button onClick={modalOpen}>Edit</button>
            <button  className={styles.btn}>Delete</button>
          </div>
  ))}
  
      </>
    );
  
}

export default Home