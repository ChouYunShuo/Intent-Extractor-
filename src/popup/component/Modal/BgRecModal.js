import React,{useRef, useState} from "react";
import { CSVLink } from "react-csv";

const AutoRecModal = ({showModal, setshowModal,bgrecord,setrecording,isAutoRecording,autoEventsArray}) =>{
    const modalRef = useRef()

    async function updateRecord(){
        setshowModal(cur=>!cur)
        setrecording(cur=>!cur)
        bgrecord()
    }
   

    const closeModal = e=>{
        if (modalRef.current === e.target){
            setshowModal(false)
        }
    }

    if (showModal){
        return (
            <div ref = {modalRef} onClick = {closeModal} className="bg-black absolute inset-0 z-20 bg-opacity-50 flex justify-center items-end">
                {isAutoRecording ? 
                <StopRecModal setshowModal = {setshowModal} stopRecord = {updateRecord} autoEventsArray={autoEventsArray}/>
                :<StartRecModal setshowModal = {setshowModal} startRecord = {updateRecord}/>}
            </div>
        
        )
    }
    return null
    
    
}
function StartRecModal({setshowModal,startRecord}){
    return(
        <div className="bg-nav  w-10/12 mb-8 h-48 rounded-2xl shadow-lg px-4" >
                    <div className="flex text-stone-100 justify-between pt-4 ">
                        <div className="text-lg">Auto Record Tasks</div>
                        <svg onClick={()=>{setshowModal(cur=>!cur)}} className="pt-1 w-6 h-6 cursor-pointer hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="mt-4 text-sm text-stone-200">Start recording and task extractions in background.</div>
                    <div className="mt-8 pt-1 flex justify-between gap-4 text-base">
                        <button onClick={()=>{setshowModal(cur=>!cur)}} className="bg-secondary w-32 h-10 rounded hover:bg-[#6f6f87]" >Cancel</button>
                        <button onClick={()=>{
                            startRecord()
                        }} className="bg-body w-32 h-10 rounded hover:bg-[#2a2a38]">Start</button>
                    </div> 
                </div>
    )
}

const eventHeaders = [
    { label: "Input", key: "inputs" },
    { label: "Time", key: "time" },
    { label: "Type", key: "type" },
    { label: "Title", key: "title" },
    { label: "Text", key: "text" },
    { label: "Url", key: "url" },
];


const getCurTime = ()=>{
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const strTime = dateLocal.toISOString().slice(0, 16).replace("T", " ");
    return strTime
}



function StopRecModal({setshowModal,stopRecord,autoEventsArray}){
    const csvReport = {
        data: autoEventsArray,
        headers: eventHeaders,
        filename: `Auto_Events_${getCurTime()}.csv`
    };
    return(
        <div className="bg-nav  w-10/12 mb-8 h-48 rounded-2xl shadow-lg px-4" >
                    <div className="flex text-stone-100 justify-between pt-4 ">
                        <div className="text-lg">Stop Record Tasks</div>
                        <svg onClick={()=>{setshowModal(cur=>!cur)}} className="pt-1 w-6 h-6 cursor-pointer hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="mt-4 text-sm text-stone-200">Stop background recording and download results to a CSV file</div>
                    <div className="mt-8 pt-1 flex justify-between gap-4 text-base">
                        <button onClick={()=>{setshowModal(cur=>!cur)}} className="bg-secondary w-32 h-10 rounded hover:bg-[#6f6f87]" >Cancel</button>
                        <CSVLink {...csvReport}>
                            <button onClick={()=>{
                                stopRecord()
                            }} className="bg-red-500 w-32 h-10 rounded hover:bg-red-600">Download</button>
                        </CSVLink>
                        
                    </div> 
                </div>
    )
}
export default AutoRecModal 