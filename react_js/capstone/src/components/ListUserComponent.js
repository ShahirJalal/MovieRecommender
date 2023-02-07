import React, {useState,useEffect} from 'react'
import UserService from '../services/UserService'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'

const ListUserComponent = () => {
      const [user, setUser] = useState([])
      const [currentPage, setCurrentPage] = useState (1);
      const [postsPerPage, setPostsPerPage] = useState (10)
            useEffect(() => {
                getUsers();
            }, [])
        const getUsers=()=> {
            UserService.getAllUsers().then((response)=> {
                setUser(response.data)
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
        const deleteUser=(userId)=> {
            UserService.deleteUser(userId).then((response)=> {     
                getUsers();          
            }).catch(error=>{
                console.log(error);
            })
        }
        const lastPostIndex = currentPage*postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const curentPosts=user.slice(firstPostIndex,lastPostIndex)
      return(
      <div className = "container">
           <h2 className = "text-center"> List Users </h2> 
           <Link to = "/add-User" className="btn btn-primary mb-2"> Add New User </Link>
           <table className="table table-bordered table-striped">
               <thead>
                    <tr>
                        <th> User Id </th>
                        <th> Email </th> 
                        <th> UserName </th> 
                        <th> UserPassword </th>
                        <th> Function </th>
                    </tr>
                </thead>
                  <tbody>
                    {
                        curentPosts.map( 
                         user =>
                            <tr key = {user.userId}> 
                            <td> {user.userId} </td> 
                            <td> {user.email} </td> 
                            <td> {user.userName} </td> 
                            <td>{user.userPassword}</td> 
                            <td>
                                <Link className='btn btn-info' to={`/edit-user/${user.userId}`}>Update</Link>
                                <button className='btn btn-danger' onClick={()=>deleteUser(user.userId)} 
                                style={{marginLeft:"10px"}}>Delete</button>
                            </td>
                          
                    </tr>
                    )
                    }
                  </tbody>
           </table>
           <Pagination 
                    totalPosts={user.length}
                    postsPerpage={postsPerPage}
                    setCurrentPage={setCurrentPage}>
                    </Pagination>
       </div>
               )
}
export default ListUserComponent