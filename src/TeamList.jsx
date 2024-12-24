import React, { useContext, useEffect, useState } from 'react'
import databaseService from './Apprwite/database';
import conf from './config/conf';
import { Query } from 'appwrite';
import { Link, useParams } from 'react-router';
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import AuthContext from './Apprwite/AuthProvider';

export default function TeamList() {
const {auction_id}= useParams();
const [players,setPlayers]= useState([]);

const [loading,setLoading]= useState(true);
useEffect(()=>{
    const fetchData=async ()=>{
            try {
                setLoading(true);
                const data= await databaseService.getDocuments(conf.appwritePlayerId,[Query.equal("auction_id",auction_id)]);
                console.log("Successfully get player")
                setPlayers(data);
            } catch (error) {
                setLoading(true);
                console.log("Error Getting Player",error)
               
            }finally{
                setLoading(false);
            }
    }
    fetchData();
},[])
const handleDelete= (id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          const deleteData = async()=>{
            try {
                setLoading(true);
               await databaseService.deleteDocument(conf.appwritePlayerId,id)  ;
                
            } catch (error) {
                setLoading(true);
                console.log("failled to delete player",error);
            }finally{
                setLoading(false);
            }
          }
          deleteData();
        }
      });
}




useEffect(()=>{
  const fetchData=async ()=>{
          try {
              setLoading(true);
              const data= await databaseService.getDocuments(conf.appwritePlayerId,[Query.equal("auction_id",auction_id)]);
              console.log("Successfully get player")
              setPlayers(data);
          } catch (error) {
              setLoading(true);
              console.log("Error Getting Player",error)
             
          }finally{
              setLoading(false);
          }
  }
  fetchData();
},[])

// get current team 
if(loading){
    return (<div className='bg-white h-screen w-full flex items-center justify-center'> Loading </div>)
}

  return (
    <div className="bg-slate-100 mt-20 p-10">
      <h2 className="text-2xl font-semibold mb-5">Player List</h2>
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Photo</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Base Price</th>
              <th className="py-2 px-4 border-b">Is Sold</th>
              <th className="py-2 px-4 border-b">Is Unsold</th>
              <th className="py-2 px-4 border-b">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.$id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <img
                    src={player.photo_url || 'https://via.placeholder.com/100'}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">{player.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{player.age || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{player.phone || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{player.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{player.category || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{player.position || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{player.base_price || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  {player.isSold ? 'Yes' : 'No'}
                </td>
                <td className="py-2 px-4 border-b">
                  {player.isUnSold ? 'Yes' : 'No'}
                </td>
                <td className="py-2 px-4 border-b"> <button  onClick={() => handleDelete(player.$id)} className='btn btn-sm mb-2'><ImBin></ImBin></button> 
                <Link to={`/auction/${auction_id}/player_edit/${player.$id}`} className='btn btn-sm'><FaEdit></FaEdit></Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
