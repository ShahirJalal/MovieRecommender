import React from "react"


const Pagination=({totalPosts,postsPerpage,setCurrentPage})=>{
    let pages=[];
    for (let i=1;i<=Math.ceil(totalPosts/postsPerpage);i++){
        pages.push(i)
    }
    return(
        <div>
            {pages.map((page,index)=>{
                return <button className = "btn btn-secondary btn-sm text-white" style={{border: "1px solid white"}} key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
        })}
        </div>
    );
};
export default Pagination;