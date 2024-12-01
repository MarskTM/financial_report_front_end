import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE } from "@/utils/route";

const data = [
  {
    stt: 1,
    company: "Vinhomes",
    code: "VHM",
    price: 45.2,
    price_type: "up",
    type: "Bất động sản",
    views: "2156",
  },
  {
    stt: 2,
    company: "Vinamilk",
    code: "VNM",
    price: 87.6,
    price_type: "down",
    type: "Thực phẩm",
    views: "3245",
  },
  {
    stt: 3,
    company: "FPT",
    code: "FPT",
    price: 92.5,
    price_type: "up",
    type: "Công nghệ",
    views: "4512",
  },
  {
    stt: 4,
    company: "Hoa Phat",
    code: "HPG",
    price: 22.3,
    price_type: "up",
    type: "Sắt thép",
    views: "1893",
  },
  {
    stt: 5,
    company: "BIDV",
    code: "BID",
    price: 47.8,
    price_type: "down",
    type: "Ngân hàng",
    views: "3765",
  },
  {
    stt: 6,
    company: "PetroVietnam",
    code: "PVD",
    price: 18.9,
    price_type: "up",
    type: "Dầu khí",
    views: "2956",
  },
  {
    stt: 7,
    company: "Techcombank",
    code: "TCB",
    price: 35.4,
    price_type: "down",
    type: "Ngân hàng",
    views: "2176",
  },
  {
    stt: 8,
    company: "Masan Group",
    code: "MSN",
    price: 63.7,
    price_type: "up",
    type: "Hàng tiêu dùng",
    views: "4045",
  },
  {
    stt: 9,
    company: "Novaland",
    code: "NVL",
    price: 19.5,
    price_type: "down",
    type: "Bất động sản",
    views: "1587",
  },
  {
    stt: 10,
    company: "Vietcombank",
    code: "VCB",
    price: 94.2,
    price_type: "up",
    type: "Ngân hàng",
    views: "5721",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "up":
      return "bg-green-500/15 text-green-600";
    case "medium":
      return "bg-yellow-500/15 text-yellow-600";
    case "down":
      return "bg-red-500/15 text-red-600";
    default:
      return "bg-yellow-500/15 text-yellow-600";
  }
};

const getPriceColor = (price_type: string) => {
  switch (price_type) {
    case "up":
      return "text-green-600";
    case "down":
      return "text-red-600";
    default:
      return "text-yellow-600";
  }
};

interface Props {}

const EmterpriseTable: React.FC<Props> = ({}) => {
  return (
    <Card className="mb-10 border-none shadow-none h-[83vh] overflow-y-auto bg-white relative">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Doanh Nghiệp</CardTitle>
      </CardHeader>
      <CardContent className="h-[65vh] overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stt</TableHead>
              <TableHead>Doanh Nghiệp</TableHead>
              <TableHead>Mã CK</TableHead>
              <TableHead>Giá Sàn</TableHead>
              <TableHead>Loại Hình</TableHead>
              <TableHead>Lượt Xem</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="h-12">
                <TableCell>
                  <Link to={ROUTE.ENTERPRISE_DETAIL.PATH} className="w-full">
                    <span className="font-medium text-primary text-center">
                      {item.stt}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="w-64">
                  <Link to={ROUTE.ENTERPRISE_DETAIL.PATH} className="w-full">
                    <span className="font-medium text-primary">
                      {item.company}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={ROUTE.ENTERPRISE_DETAIL.PATH} className="w-full">
                    <Badge
                      className={`${getStatusColor(
                        item.price_type
                      )} hover:bg-slate-300 backdrop-blur-sm`}
                    >
                      {item.code}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={ROUTE.ENTERPRISE_DETAIL.PATH} className="w-full">
                    <span
                      className={`font-medium ${getPriceColor(
                        item.price_type
                      )}`}
                    >
                      {item.price}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="w-52">
                  <Link to={ROUTE.ENTERPRISE_DETAIL.PATH} className="w-full">
                    <Badge className="bg-slate-100 hover:bg-slate-300">
                      <span className="font-medium text-primary">
                        {item.type}
                      </span>
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={ROUTE.ENTERPRISE_DETAIL.PATH} className="w-full">
                    <div className="flex flex-row items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="font-medium text-primary text-center">
                        {item.views}
                      </span>
                    </div>
                  </Link>
                </TableCell>

                <TableCell className="!w-10">
                  <div className="flex justify-center gap-2">
                    <Link to={ROUTE.ENTERPRISE_DETAIL.PATH}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <div className="absolute right-4 bottom-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="hover:bg-slate-100 p-2 rounded-md">
              <Link to="">
                <ChevronLeft />
              </Link>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="hover:bg-slate-100 p-2 rounded-md">
              <Link to="">
                <ChevronRight />
              </Link>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};

export default EmterpriseTable;
