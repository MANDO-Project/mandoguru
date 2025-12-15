'use client';

import type { Metadata } from "next";
import React, { useState, useEffect } from "react";

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";


// export const metadata: Metadata = {
//   title:
//     "Dashboard | Mandoscan",
//   description: "This is Next.js Home for Mandoscan Dashboard Template",
// };

interface UploadedFile {
  id: string;
  fileName: string;
  uploadDate: string;
  fileSize: number;
  status: string;
  estimatedCost?: number;
  errorMessage?: string;
}

export default function Ecommerce() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const handleStatusUpdate = (id: string, status: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.id === id ? { ...file, status } : file
      )
    );
  };
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
      <div> */}

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders 
          uploadedFiles={uploadedFiles}
          onStatusUpdate={handleStatusUpdate} />
      </div>

      {/* </div>
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}
    </div>
  );
}
