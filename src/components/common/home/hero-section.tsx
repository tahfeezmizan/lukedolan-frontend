import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroBg from "../../../../public/banner-img.png";
import cardImg from "../../../../public/hero-card.png";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center lg:items-end  justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto  px-4 sm:px-6 py-20 overflow-hidden">
        <div className="grid lg:grid-cols-6 gap-20 items-top">
          {/* Left Content */}
          <div className="col-span-4 text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                Find Your Next Role. Fast.
              </h1>
              <p className="text-lg sm:text-2xl text-gray-200">
                Roqit connects salons, barbers, and beauty creatives with fresh
                talent and opportunities. No stress. Just jobs that fit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/job"}>
                <Button
                  size="lg"
                  className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-none"
                >
                  Find Job
                </Button>
              </Link>
              <Link href={"/"}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-transparent hover:bg-green-800 border-2 border-green-900 hover:border-green-800 text-white px-6 py-4 text-lg font-medium rounded-none"
                >
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Job Card */}
          <div className="hidden  col-span-2 lg:flex justify-end items-end ">
            <Link href={"/job"}>
              <Image
                src={cardImg.src}
                alt="Senior Hair Stylist"
                width={350}
                height={380}
                className="object-cover w-full h-full "
              />
            </Link>
            {/* <Card className=" w-[350px] h-96 bg-white/5 backdrop-blur-sm p-5 text-white border-none">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={cardImg.src}
                  
                  alt="Senior Hair Stylist"
                  className="object-cover w-full h-96 "
                />
              </div>

              <div className="flex justify-end items-end ">
                <div className="">
                  <h3 className="text-xl font-semibold mb-3.5">
                    Senior Hair Stylist
                  </h3>
                  <p className="text-sm pr-5">
                    Track Real-Time Customer Visits, Online Bookings, And
                    Walk-Ins Throughout The Day. Stay On Top Of Client Activity
                    And Peak Hours.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-full p-2 "
                >
                  <ArrowRight className="w-4 h-6 -rotate-45" />
                </Button>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
}
