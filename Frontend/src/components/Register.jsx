import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';


function Register() {
  const [formData , setFormData] = useState({
    teamName : "",
    teamLeader : "",
    teamLeaderEmail : "",
    teamSize : "",
    events : [],
    domain : "",
    collegeName : "",
    teamMembers : []

  })

  const eventsList = ["Hackathon", "Design-a-thon", "Poster Presentation", "ProjectExpo"];  
  const domainList = ["Web Development", "AI/ML", "Blockchain", "Cybersecurity"];


  const handleChangeInData = (e) => {
    const {name,value,type,checked} = e.target;
    if (type === 'checkbox') {
      // console.log(checked)
      setFormData((prev) => ({
        ...prev,
        events : checked 
        ? [...prev.events,value]
        : prev.events.filter((event) => event !== value) //removing the event if it is not selected
      }))
    }else if (name === 'teamSize') {
      const size = parseInt(value, 10) || 0;
      setFormData((prev) => {
        const updatedMembers = Array.from({ length: size }, (_, index) => ({
          name: prev.teamMembers[index]?.name || "",
          year: prev.teamMembers[index]?.year || "",
          phone: prev.teamMembers[index]?.phone || "",
          email: prev.teamMembers[index]?.email || "",
        }));
        return { ...prev, teamSize: value, teamMembers: updatedMembers };
      });
    }
    
    else{

    // checking if it is working
    // console.log(name,value)

    setFormData((prev) => ({
      ...prev,
      [name] : value
    }))
  }
  }
  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedMembers = [...prev.teamMembers];
      updatedMembers[index] = { ...updatedMembers[index], [name]: value };
      return { ...prev, teamMembers: updatedMembers };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:5000/api/v1/register',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await response.json();
      if (response.ok) {
        console.log("Registration Successful:", data);
        alert("Team Registered Successfully!");
      } else {
        console.error("Error:", data);
        alert(data.message || "Something went wrong");
      }
    }catch(err){
      console.log(err)
    }


    console.log(formData)
  }



  return (
    <div className='flex justify-center p-20 flex-col'>

      <div className='text-3xl text-amber-500 '>Registration Form</div>
      <form onSubmit={handleSubmit} method='POST'>
      {/* form begins */}
      <div className='flex flex-col p-5'>

        {/* team name */}
        <div className='flex flex-col p-2'>
          <label htmlFor="teamName" className='font-bold text-2xl'>Team Name</label>
          <input type="text" name="teamName" id="teamName" onChange={handleChangeInData} value={formData.teamName} placeholder='Enter Team Name' className='border-2 rounded-md h-10 w-75 p-3' required />
        </div>

        {/* team leader */}
        <div className='flex flex-col p-2'>
          <label htmlFor="teamLeader" className='font-bold text-2xl'>Team Leader Name</label>
          <input type="text" name="teamLeader" id="teamLeader" onChange={handleChangeInData} value={formData.teamLeader} placeholder='Enter Team Leader Name' className='border-2 rounded-md h-10 w-75 p-3' required />
        </div>
        
        {/* team leader email */}
        <div className='flex flex-col p-2'>
          <label htmlFor="teamLeaderEmail" className='font-bold text-2xl'>Team Leader Email</label>
          <input type="email" name="teamLeaderEmail" id="teamLeaderEmail" onChange={handleChangeInData} value={formData.teamLeaderEmail} placeholder='Enter Team Leader Email' className='border-2 rounded-md h-10 w-75 p-3' required />
        </div>

        {/* Team Size */}
        <div className='flex flex-col p-2'>
          <label htmlFor="teamSize" className='font-bold text-2xl'>Team Size</label>
          <input type="number" name="teamSize" id="teamSize" onChange={handleChangeInData} value={formData.teamSize} placeholder='Enter Team Size' className='border-2 rounded-md h-10 w-75 p-3' required />
        </div>

        {/* Event */}
        <div className='flex flex-col p-2'>
          <legend className='font-bold text-2xl '>Select Events</legend>
          {eventsList.map((event,index) => (
            <label key={index} className='block'>
              <input 
                type='checkbox'
                name = 'events'
                value={event}
                checked={formData.events.includes(event)}
                onChange={handleChangeInData}
                
              />
              {event}
            </label>
          ))}
        </div>

        {/* Domain */}
        <div className='flex flex-col p-2'>
          <label htmlFor="domain" className='font-bold text-2xl'>Select Domain</label>
          <select name="domain" id="domain" value={formData.domain} onChange={handleChangeInData} className='border-2 rounded-md h-full w-75 p-3' required>
            <option value="">Select a domain</option>
            {domainList.map((domain, index) => (
              <option key={index} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        {/* College / University */}
        <div className='flex flex-col p-2'>
          <label htmlFor="collegeName" className='font-bold text-2xl'>College Name</label>
          <input type="text" name="collegeName" id="collegeName" onChange={handleChangeInData} value={formData.collegeName} placeholder='Enter College Name' className='border-2 rounded-md h-10 w-75 p-3' required />
        </div>

        {/* Team Member Details (Based on team size we will render that many inputs for name , year , phn no , email and store it as a array of team info) */}
        <div className='flex flex-col p-2'>
          <legend className='font-bold text-2xl'>Team Member Details</legend>

          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className='border p-3 rounded-md mb-3'>
              <p className='font-bold text-xl mb-2'>Member {index + 1}</p>

              <div className='flex flex-col p-2'>
                <label htmlFor={`teamMemberName-${index}`} className='font-bold text-lg'>Team Member Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id={`teamMemberName-${index}`} 
                  onChange={(e) => handleTeamMemberChange(index, e)} 
                  value={formData.teamMembers[index]?.name || ''} 
                  placeholder='Enter Team Member Name' 
                  className='border-2 rounded-md h-10 w-full p-3' 
                  required 
                />
              </div>

              <div className='flex flex-col p-2'>
                <label htmlFor={`teamMemberYear-${index}`} className='font-bold text-lg'>Year</label>
                <input 
                  type="text" 
                  name="year" 
                  id={`teamMemberYear-${index}`} 
                  onChange={(e) => handleTeamMemberChange(index, e)} 
                  value={formData.teamMembers[index]?.year || ''} 
                  placeholder='Enter Year' 
                  className='border-2 rounded-md h-10 w-full p-3' 
                  required 
                />
              </div>

              <div className='flex flex-col p-2'>
                <label htmlFor={`teamMemberPhone-${index}`} className='font-bold text-lg'>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id={`teamMemberPhone-${index}`} 
                  onChange={(e) => handleTeamMemberChange(index, e)} 
                  value={formData.teamMembers[index]?.phone || ''} 
                  placeholder='Enter Phone Number' 
                  className='border-2 rounded-md h-10 w-full p-3' 
                  required 
                />
              </div>

              <div className='flex flex-col p-2'>
                <label htmlFor={`teamMemberEmail-${index}`} className='font-bold text-lg'>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id={`teamMemberEmail-${index}`} 
                  onChange={(e) => handleTeamMemberChange(index, e)} 
                  value={formData.teamMembers[index]?.email || ''} 
                  placeholder='Enter Email' 
                  className='border-2 rounded-md h-10 w-full p-3' 
                  required 
                />
              </div>

          </div>
        ))}
      </div>
      </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md">
          Submit
        </button>

        </form>

      
      </div>
    
  )
}

export default Register