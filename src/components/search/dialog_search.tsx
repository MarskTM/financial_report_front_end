import React, { ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {}

const DataTest = [
  {
    id: 1,
    name: "Ngân hàng TMCP cổ phần Đầu tư và Phát triển Việt Nam",
    code: "BIDV-BID10117",
    avata:
      "https://image.bnews.vn/MediaUpload/Org/2022/04/26/logo-bidv-20220426071253.jpg",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "HOSE",
  },
  {
    id: 2,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 3,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 4,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 4,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 4,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
];

const DialogSearch: React.FC<Props> = ({}) => {
  const [keySearch, setKeySearch] = React.useState("");

  const handelClick = (id: number) => {
	console.log("handelClick" + id);
  };

  return (
    <div>
      <Dialog defaultOpen={false}>
        <DialogTrigger className="w-full h-full">
          <Input
            type="search"
            placeholder="Type here..."
            className={`pr-8 transition delay-200 duration-200 ease-in-out bg-zinc-50 `}
            value={keySearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] lg:max-w-prose max-h-1/3 fixed top-1/3">
          <DialogHeader>
            <DialogTitle className="px-4 pt-4">
              <Input
                type="search"
                placeholder="Type here..."
                className={`pr-2 pl-8 transition delay-200 duration-200 ease-in-out bg-zinc-50 `}
                value={keySearch}
                onChange={(e) => setKeySearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-12 top-12 h-4 w-4 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </DialogTitle>
            <Separator />
          </DialogHeader>

          <div className="py-4 overflow-y-scroll max-h-72">
            {DataTest.map((item, index) => {
              if (
                item.name.includes(keySearch) ||
                item.code.includes(keySearch)
              ) {
                return (
                  <div
                    className="flex gap-4 hover:bg-slate-100 p-2"
                    key={index}
                    onClick={() => handelClick(item.id)}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={item.avata}
                        alt="Richard Davis"
                        className="h-16 w-16"
                      />
                      <AvatarFallback>{item.avata_alert}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-base font-semibold">{item.name}</h1>
                      <p className="text-muted-foreground">
                        {item.code} | {item.place}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogSearch;
