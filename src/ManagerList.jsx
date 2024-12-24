import React, { useEffect, useState } from 'react'
import databaseService from './Apprwite/database';
import conf from './config/conf';
import { Query } from 'appwrite';
import { Link, useParams } from 'react-router';
import { ImBin } from "react-icons/im";
import { FaTelegramPlane } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function ManagerList() {
  const { auction_id } = useParams();
  const [managers, setManagers] = useState([]);
  const [teams, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getDocuments(conf.appwriteManagerId, [Query.equal("auction_id", auction_id)]);
        console.log("Successfully get manager")
        setManagers(data);
      } catch (error) {
        setLoading(true);
        console.log("Error Getting manager", error)

      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const data = await databaseService.getDocuments(conf.appwriteTeamId, [Query.equal("auction_id", auction_id)]);
        console.log("Successfully get team")
        setTeam(data);
      } catch (error) {
        setLoading(true);
        console.log("Error Getting team", error)

      } finally {
        setLoading(false);
      }
    }
    fetchTeamData();
  }, [])

  // get all team here

  const handleDelete = (id) => {
    console.log("deleting,", id)
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
        const deleteData = async () => {
          try {
            setLoading(true);
            await databaseService.deleteDocument(conf.appwriteManagerId, id);

          } catch (error) {
            setLoading(true);
            console.log("failled to delete manager", error);
          } finally {
            setLoading(false);
          }
        }
        deleteData();
      }
    });
  }
  const handleSetTeam = async (e, id) => {
    e.preventDefault();
    const teamId = e.target.team.value;
  
    const selectedTeam = teams.find((team) => team.$id === teamId);
    const selectedManager = managers.find((manager) => manager.$id === id);
  
    const managerUpdate =
      teamId !== "no-team"
        ? {
            isGotTeam: true,
            team_id: teamId,
            team_name: selectedTeam?.team_name || null,
          }
        : {
            isGotTeam: false,
            team_id: null,
            team_name: null,
          };
  
    const teamUpdate =
      teamId !== "no-team"
        ? {
            is_sold: true,
            manager_name: selectedManager?.name || null,
            manager_id: id,
          }
        : {
            is_sold: false,
            manager_name: null,
            manager_id: null,
          };
  
    try {
      // Update the previous team if the manager was assigned to one
      if (teamId === "no-team" && selectedManager.team_id) {
        await databaseService.updateDocument(conf.appwriteTeamId, selectedManager.team_id, {
          is_sold: false,
          manager_name: null,
          manager_id: null,
        });
      }
  
      // Update the selected team if a valid team is chosen
      if (teamId !== "no-team") {
        await databaseService.updateDocument(conf.appwriteTeamId, teamId, teamUpdate);
      }
  
      // Update the manager's information
      await databaseService.updateDocument(conf.appwriteManagerId, id, managerUpdate);
  
      // Refetch the updated data to ensure consistency
      const updatedManagers = await databaseService.getDocuments(conf.appwriteManagerId, [
        Query.equal("auction_id", auction_id),
      ]);
      const updatedTeams = await databaseService.getDocuments(conf.appwriteTeamId, [
        Query.equal("auction_id", auction_id),
      ]);
  
      setManagers(updatedManagers);
      setTeam(updatedTeams);
  
      Swal.fire("Success", "Team assignment updated successfully", "success");
    } catch (error) {
      console.error("Error updating team assignment:", error);
      Swal.fire("Error", "Failed to update team assignment", "error");
    }
  };
  
  

  if (loading) {
    return (<div className='bg-white h-screen w-full flex items-center justify-center'> Loading </div>)
  }
  return (
    <div className="bg-slate-100 mt-20 p-10">
      <h2 className="text-2xl font-semibold mb-5">manager List</h2>
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">

              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Team</th>
              <th className="py-2 px-4 border-b">Delete </th>
              <th className="py-2 px-4 border-b">Invite</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.$id} className="hover:bg-gray-100 text-center">

                <td className="py-2 px-4 border-b ">{manager.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{manager.phone || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{manager.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  <form onSubmit={(e)=>handleSetTeam(e,manager.$id)}>
                    <select name="team" id="selectteam">
                      <option disabled >Select a Team</option>

                      {
                        teams.map((team) => (
                          <option
                            key={team.$id}
                            value={team.$id}
                            disabled={team.is_sold}
                          >
                            {team.team_name}
                          </option>
                        ))
                      }
                      <option value="no-team" >NO Team</option>
                    </select>
                    <button type='submit' className='btn btn-sm'>Set</button>
                  </form>
                </td>
                <td className="py-2 px-4 border-b"><button onClick={() => handleDelete(manager.$id)} className=' btn btn-sm  text-center'> <ImBin></ImBin></button></td>
                <td className="py-2 px-4 border-b"><button className=' btn btn-sm  text-center'> <FaTelegramPlane></FaTelegramPlane></button></td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
