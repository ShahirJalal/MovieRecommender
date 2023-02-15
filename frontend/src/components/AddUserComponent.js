import React,{useState,useEffect} from 'react'
import UserService from '../services/UserService'
import {Link, useNavigate, useParams }from 'react-router-dom'
const AddUserComponent=()=>{
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const navigate=useNavigate();
    const {userId}=useParams();
    
    const saveOrUpdateUser=(e)=>{
       e.preventDefault();

        const user={userId,email,userName,userPassword}
        console.log(userId);//validate data
        if(userId){
            UserService.updateUser(userId,user).then((response)=>{
                console.log(response.data) 
                navigate('/users')                
            }).catch(error=>{
                console.log(error)
            })

        }else{
            UserService.createUser(user).then((response)=>{
                console.log(response.data)
                navigate('/users')
            }).catch(error=>{
                console.log(error)
            })
        }

    }
    useEffect(() => {
        UserService.getUserbyId(userId).then((response)=>{
            console.log(response.data.email)
            setEmail(response.data.email)
            setUserName(response.data.userName)
            setUserPassword(response.data.userPassword)
        }).catch(error=>{
        console.log(error)
    })
    }, [])

    const title= () => {
        if(userId){
            return <h2 className = "text-center"> Update User</h2>
        }else{
            return <h2 className = "text-center"> Add User</h2>
        }
    }
    return(
        <div>
            <br></br>
            <div className = "container">
                <div className= "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                      {title()}
                        <div className= "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email  :</label>
                                    <input
                                            type="email"
                                            placeholder="Enter Email"
                                            name = "Email"
                                            className="form-control"
                                            value = {email}
                                            onChange ={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Username :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        name = "username"
                                        className="form-control"
                                        value = {userName}
                                        onChange ={(e) => setUserName(e.target.value)}
                                        >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Password"
                                        name = "userpassword"
                                        className="form-control"
                                        value = {userPassword}
                                        onChange ={(e) => setUserPassword(e.target.value)}>
                                    </input>
                                </div>
                             <button className="btn btn-success" onClick={(e)=>saveOrUpdateUser(e)}>Save User</button>
                             <Link to="/users" className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
              </div>
          </div>
     </div>
</div>
    )
}
export default AddUserComponent