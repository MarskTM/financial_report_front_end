import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Camera, CalendarIcon, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import dayjs from "dayjs";

import * as api from "@/redux/api/company";
import { RootState } from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/utils/route";

type Props = {};

const UserInfor: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.users);

  useEffect(() => {
    if (user.profile == undefined) {
      navigate(ROUTE.LOGIN.PATH);
    }
  }, []);

  const form = useForm({
    defaultValues: {
      name: user?.profile?.first_name + " " + user?.profile?.last_name,
      date: user?.profile?.birthdate,
      address: "123 Đường ABC, Quận XYZ, Hà Nội",
      phone: user?.profile?.phone,
      email: user?.profile?.email,
      password: "******",
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-10 pb-10">
        <CardTitle className="text-2xl">Thông tin</CardTitle>
        <div className="w-20 h-20 bg-slate-400 bg-muted rounded-full flex items-center justify-center mx-auto">
          <Camera className="h-10 w-10 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh:</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          // selected={dayjs(field.value, "dd/mm/yyyy")}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liên hệ:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} />
                      <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground transform -rotate-90" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} />
                      <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu:</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-20 flex justify-end">
              <Button className="text-xs items-center">
                Cập nhập thông tin
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </div>
  );
};

export default UserInfor;
