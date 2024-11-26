'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TimelinePeriod {
  years: string
  title: string
  description: string
  image: string
  active?: boolean
}

const timelinePeriods: TimelinePeriod[] = [
  {
    years: "1981 - 1990",
    title: "Ngân hàng Đầu tư và Xây dựng Việt Nam",
    description: `Giai đoạn "Ngân hàng Đầu tư và Xây dựng Việt Nam" gắn với một thời kỳ sôi nổi của đất nước - chuẩn bị và tiến hành công cuộc đổi mới (1981 - 1990), thực hiện tốt nhiệm vụ trong tâm là phục vụ nền kinh tế, cùng với cả nền kinh tế chuyển sang hoạt động theo cơ chế kinh tế thị trường.`,
    image:
      "https://bidv.com.vn/wps/wcm/connect/41a6ec31-5640-4f7c-a8a5-ede66855d822/img_lichsuphattrien_1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-41a6ec31-5640-4f7c-a8a5-ede66855d822-p6jJJlu",
  },
  {
    years: "1990 - 2012",
    title: "Ngân hàng Đầu tư và Phát triển Việt Nam",
    description:
      "Giai đoạn phát triển và mở rộng hoạt động ngân hàng thương mại.",
    image:
      "https://bidv.com.vn/wps/wcm/connect/da8d8e9c-5505-4eb9-b36d-7bb12a82c42a/th%E1%BB%A7y+%C4%91i%E1%BB%87n+h%C3%B2a+b%C3%ACnh.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-da8d8e9c-5505-4eb9-b36d-7bb12a82c42a-p6n35BL",
  },
];

interface props{}

const HistoricalTimeline: React.FC<props> = () => {
  const [currentPeriod, setCurrentPeriod] = useState(0);

  const handlePrevious = () => {
    setCurrentPeriod((current) =>
      current > 0 ? current - 1 : timelinePeriods.length - 1
    );
  };

  const handleNext = () => {
    setCurrentPeriod((current) =>
      current < timelinePeriods.length - 1 ? current + 1 : 0
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8">
        Lịch sử phát triển
      </h1>

      <div className="relative mt-10">
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg"
          aria-label="Previous period"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute left-[45%] top-1/2 -translate-y-1/2 z-40 bg-white/80 rounded-full p-2 shadow-lg"
          aria-label="Next period"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video">
            <img
              src={timelinePeriods[currentPeriod].image}
              alt="Historical photograph"
              className="object-cover rounded-lg w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              {timelinePeriods.map((period, index) => (
                <div
                  key={period.years}
                  className={`text-2xl font-bold ${
                    index === currentPeriod
                      ? "text-primary"
                      : "text-muted-foreground/30"
                  }`}
                >
                  {period.years}
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold">
              {timelinePeriods[currentPeriod].title}
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              {timelinePeriods[currentPeriod].description}
            </p>

            <div className="flex gap-4 pt-4">
              <Button variant="link" className="text-primary">
                Xem chi tiết
              </Button>

              <Button
                variant="default"
                className="bg-[#006D75] hover:bg-[#005A61]"
              >
                Phòng truyền thông BIDV
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {timelinePeriods.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPeriod(index)}
              className={`w-8 h-1 rounded-full transition-colors ${
                index === currentPeriod ? "bg-primary" : "bg-muted"
              }`}
              aria-label={`Go to period ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoricalTimeline;