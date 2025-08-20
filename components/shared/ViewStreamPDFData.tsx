import React from 'react'
import { ResumeFeedbackProps } from '@/types';


interface ViewStreamPDFDataProps {
  streamData: ResumeFeedbackProps | null;
}

const ViewStreamPDFData: React.FC<ViewStreamPDFDataProps> = ({ streamData }) => {
  console.log({streamData});
  return (
    <div className="p-2 bg-gray-100 rounded-lg overflow-y-auto w-[300px] max-h-[600px]">
      
    </div>
  )
}

export default ViewStreamPDFData