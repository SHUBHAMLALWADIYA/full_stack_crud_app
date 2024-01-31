import React, { useEffect, useState } from 'react'
import axios from "axios"

function Home() {
    const [blogData,setBlogData]=useState([])


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
            <button >Edit</button>
            <button >Delete</button>
          </div>
  ))}
  
      </>
    );
  
}

export default Home

// import React, { useEffect, useState } from 'react';

// function Home() {
//   const [blogData, setBlogData] = useState([]);

//   const getAllBlogFromApi = async () => {
//     try {
//       const response = await fetch(
//         "https://blue-green-greyhound-wear.cyclic.app/notes/",
//         {
//           method: 'GET',
//           credentials: 'include' // equivalent to withCredentials: true
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error fetching blog data: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log(data);
//       setBlogData(data);
//     } catch (error) {
//       console.error("Error fetching blog data:", error.message);
//     }
//   };

//   useEffect(() => {
//     getAllBlogFromApi();
//   }, []);

//   return (
//     <>
//       {blogData.map((item, index) => (
//         <div key={index}>
//           <h1>{item.title}</h1>
//           <p>{item.description}</p>
//           <button>Edit</button>
//           <button>Delete</button>
//         </div>
//       ))}
//     </>
//   );
// }

// export default Home;