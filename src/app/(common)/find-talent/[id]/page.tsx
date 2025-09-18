import ApplicantProfile from "@/components/common/find-talent/applicant-profile";

export default function page() {
  return (
    <div className="pt-20">
      {/* <div className="bg-[#030306]">
        <Image
          src={heroImg.src}
          alt="Applicant Profile"
          width={1366}
          height={300}
          className="w-full h-44 lg:h-96 object-contain"
        />
      </div> */}
      <ApplicantProfile />
    </div>
  );
}
