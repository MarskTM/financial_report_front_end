"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Sector {
  name: string;
  count: number;
}

const sectors: Sector[] = [
  { name: "Technology", count: 1698 },
  { name: "Financial Services", count: 852 },
  { name: "E-commerce", count: 729 },
  { name: "Healthcare", count: 637 },
  { name: "Real Estate", count: 408 },
  { name: "Energy", count: 389 },
  { name: "Telecommunications", count: 271 },
  { name: "Consumer Goods", count: 241 },
  { name: "Industrial", count: 206 },
  { name: "Materials", count: 169 },
  { name: "Utilities", count: 151 },
  { name: "Transportation", count: 146 },
  { name: "Media", count: 113 },
  { name: "Agriculture", count: 94 },
  { name: "Education", count: 76 },
];

interface Props {}

const SidebarTrending: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSectors = sectors.filter((sector) =>
    sector.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-950">
          Loại Hình Kinh Doanh
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-none "
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 font-bold" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-none "
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4 font-bold" />
          </Button>
        </div>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder="Search for a sector..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredSectors.map((sector) => (
          <div
            key={sector.name}
            className="group flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-3 py-1 transition-colors hover:bg-gray-200"
          >
            <span className="text-xs font-medium text-gray-900">
              {sector.name}
            </span>
            <Badge
              variant="secondary"
              className="text-orange-100 bg-orange-400 group-hover:bg-orange-200"
            >
              {sector.count}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarTrending;