// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   useGetMeQuery,
//   useUpdateProfileMutation,
// } from "@/redux/features/userApi";
// import { ApiError, Education } from "@/types/types";
// import { Edit, Plus, Save, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Swal from "sweetalert2";

// interface EducationData {
//   degreeTitle: string;
//   major: string;
//   instituteName: string;
//   cgpa: string;
//   scale: string;
//   yearOfPassing: string;
//   duration: string;
// }

// export function EducationForm() {
//   const [formData, setFormData] = useState<EducationData>({
//     degreeTitle: "",
//     major: "",
//     instituteName: "",
//     cgpa: "",
//     scale: "",
//     yearOfPassing: "",
//     duration: "",
//   });

//   const [educations, setEducations] = useState<EducationData[]>([]);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const [updateProfile, { isLoading }] = useUpdateProfileMutation();
//   const {
//     data: userData,
//     refetch,
//     isLoading: isUserLoading,
//   } = useGetMeQuery("");

//   // console.log("Educations",userData);

//   useEffect(() => {
//     // console.log("Full user data received:", userData);
//     if (userData) {
//       if (userData?.profile?.education) {
//         if (Array.isArray(userData?.profile?.education)) {
//           const formattedEducations = userData?.profile?.education.map(
//             (edu: Education) => ({
//               degreeTitle: edu.degreeTitle?.toString() || "",
//               major: edu.major?.toString() || "",
//               instituteName: edu.instituteName?.toString() || "",
//               cgpa: edu.cgpa?.toString() || "",
//               scale: edu.scale?.toString() || "",
//               yearOfPassing: edu.yearOfPassing?.toString() || "",
//               duration: edu.duration?.toString() || "",
//             })
//           );

//           console.log("Formatted educations for state:", formattedEducations);
//           setEducations(formattedEducations);
//         }
//       } else {
//         console.log("No education data found in userData.data");
//       }
//     } else {
//       console.log("No userData or userData.data available");
//     }
//   }, [userData]);

//   // Debug effect to track educations state
//   useEffect(() => {
//     console.log("Current educations state:", educations);
//   }, [educations]);

//   const handleInputChange = (field: keyof EducationData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Check if current form is valid
//   const isFormValid = () => {
//     return (
//       formData.degreeTitle.trim() !== "" &&
//       formData.major.trim() !== "" &&
//       formData.instituteName.trim() !== "" &&
//       formData.cgpa.trim() !== "" &&
//       formData.scale.trim() !== "" &&
//       formData.yearOfPassing.trim() !== "" &&
//       formData.duration.trim() !== ""
//     );
//   };

//   // Check if save button should be enabled (has at least one education)
//   const isSaveEnabled = () => {
//     return educations.length > 0;
//   };

//   const handleAddEducation = () => {
//     if (!isFormValid()) {
//       toast.error("Please fill in all fields before adding education");
//       return;
//     }

//     if (editingIndex !== null) {
//       // Update existing education
//       const updatedEducations = [...educations];
//       updatedEducations[editingIndex] = formData;
//       setEducations(updatedEducations);
//       setEditingIndex(null);
//       toast.success("Education updated successfully!");
//     } else {
//       // Add new education
//       setEducations((prev) => [...prev, formData]);
//       toast.success("Education added successfully!");
//     }

//     // Reset form after adding/updating
//     setFormData({
//       degreeTitle: "",
//       major: "",
//       instituteName: "",
//       cgpa: "",
//       scale: "",
//       yearOfPassing: "",
//       duration: "",
//     });
//   };

//   const handleEditEducation = (index: number) => {
//     setFormData(educations[index]);
//     setEditingIndex(index);
//   };

//   const handleDeleteEducation = async (index: number) => {
//     console.log("handleDeleteEducation called with index:", index);
//     console.log("Current educations length:", educations.length);

//     if (index < 0 || index >= educations.length) {
//       console.error("Invalid index for deletion:", index);
//       toast.error("Invalid education selected for deletion");
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won’t be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         console.log("Proceeding with deletion...");

//         const newEducations = [...educations];
//         newEducations.splice(index, 1);

//         console.log("New educations after deletion:", newEducations);

//         // Update local state first for immediate UI feedback
//         setEducations(newEducations);

//         const educationsForAPI = newEducations.map((edu) => ({
//           degreeTitle: edu.degreeTitle,
//           major: edu.major,
//           instituteName: edu.instituteName,
//           cgpa: edu.cgpa,
//           scale: edu.scale,
//           yearOfPassing: edu.yearOfPassing,
//           duration: edu.duration,
//         }));

//         console.log("Sending updated educations to API:", educationsForAPI);

//         const response = await updateProfile({
//           body: { education: educationsForAPI },
//         }).unwrap();

//         console.log("Delete API response:", response);
//         toast.success("Education deleted and saved to database!");

//         if (editingIndex === index) {
//           setEditingIndex(null);
//           setFormData({
//             degreeTitle: "",
//             major: "",
//             instituteName: "",
//             cgpa: "",
//             scale: "",
//             yearOfPassing: "",
//             duration: "",
//           });
//         } else if (editingIndex !== null && editingIndex > index) {
//           setEditingIndex(editingIndex - 1);
//         }

//         await refetch();
//       } catch (error: ApiError | any) {
//         console.error("Delete API error:", error);
//         setEducations(educations);

//         let errorMessage = "Failed to delete education from database";
//         if (error?.data?.message) {
//           errorMessage = error.data.message;
//         }
//         toast.error(errorMessage);
//       }
//     }
//   };

//   const handleSave = async () => {
//     if (!isSaveEnabled()) {
//       toast.error("Please add at least one education before saving");
//       return;
//     }

//     try {
//       console.log("Saving educations to database:", educations); // Debug log

//       // Convert string values back to appropriate types for API
//       const educationsForAPI = educations.map((edu) => ({
//         degreeTitle: edu.degreeTitle,
//         major: edu.major,
//         instituteName: edu.instituteName,
//         cgpa: parseFloat(edu.cgpa) || 0,
//         scale: parseFloat(edu.scale) || 0,
//         yearOfPassing: parseInt(edu.yearOfPassing) || 0,
//         duration: edu.duration,
//       }));

//       console.log("Formatted educations for API:", educationsForAPI);

//       const response = await updateProfile({
//         body: { education: educationsForAPI },
//       }).unwrap();

//       toast.success("Education information saved successfully!");
//       console.log("Education saved to database - API response:", response);

//       // Force refetch to ensure we have the latest data
//       const refreshedData = await refetch();
//       console.log("Refreshed data after save:", refreshedData); // Debug log
//     } catch (error: ApiError | any) {
//       toast.error(
//         error?.data?.message || "Failed to save education information"
//       );
//       console.error("Save education error:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingIndex(null);
//     setFormData({
//       degreeTitle: "",
//       major: "",
//       instituteName: "",
//       cgpa: "",
//       scale: "",
//       yearOfPassing: "",
//       duration: "",
//     });
//   };

//   return (
//     <div className="space-y-8">
//       {/* Level of Education Section */}
//       <div>
//         <h3 className="text-3xl font-semibold text-gray-900 mb-4">
//           Level of Education
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="space-y-2">
//             <Label
//               className="text-lg font-medium text-gray-900"
//               htmlFor="degreeTitle"
//             >
//               Qualification Type
//             </Label>
//             <Input
//               id="degreeTitle"
//               value={formData.degreeTitle}
//               onChange={(e) => handleInputChange("degreeTitle", e.target.value)}
//               placeholder="e.g. NVQ Level 2 in Barbering"
//               className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label
//               className="text-lg font-medium text-gray-900"
//               htmlFor="major"
//             >
//               Level / Year Completed
//             </Label>
//             <Input
//               id="major"
//               value={formData.major}
//               onChange={(e) => handleInputChange("major", e.target.value)}
//               placeholder="e.g. Level 3 (Completed 2022)"
//               className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="space-y-2">
//             <Label
//               className="text-lg font-medium text-gray-900"
//               htmlFor="instituteName"
//             >
//               Institution / Training Provider
//             </Label>
//             <Input
//               id="instituteName"
//               value={formData.instituteName}
//               onChange={(e) =>
//                 handleInputChange("instituteName", e.target.value)
//               }
//               placeholder="e.g. London Hair Academy or City & Guilds"
//               className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label
//               className="text-lg font-medium text-gray-900"
//               htmlFor="yearOfPassing"
//             >
//               Year of Passing
//             </Label>
//             <Input
//               id="yearOfPassing"
//               value={formData.yearOfPassing}
//               onChange={(e) =>
//                 handleInputChange("yearOfPassing", e.target.value)
//               }
//               placeholder="e.g. 2022"
//               className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
//             />
//           </div>

//           {/* <div className="space-y-2">
//             <Label className="text-lg font-medium text-gray-900" htmlFor="cgpa">
//               CGPA
//             </Label>
//             <Input
//               id="cgpa"
//               value={formData.cgpa}
//               onChange={(e) => handleInputChange("cgpa", e.target.value)}
//               placeholder="3.00"
//               className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
//             />
//           </div> */}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="space-y-2">
//             <Label
//               className="text-lg font-medium text-gray-900"
//               htmlFor="duration"
//             >
//               Duration / Hours
//             </Label>
//             <Input
//               id="duration"
//               value={formData.duration}
//               onChange={(e) => handleInputChange("duration", e.target.value)}
//               placeholder="e.g. 6 months full-time or 120 hours"
//               className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <Button
//           onClick={handleAddEducation}
//           type="button"
//           disabled={!isFormValid()}
//           className={`px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${
//             isFormValid()
//               ? "bg-green-600 hover:bg-green-700 text-white"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           <Plus className="h-4 w-4" />
//           {editingIndex !== null ? "Update Education" : "Add Education"}
//         </Button>

//         {editingIndex !== null && (
//           <Button
//             onClick={handleCancelEdit}
//             type="button"
//             className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 text-lg font-medium rounded-lg"
//           >
//             Cancel Edit
//           </Button>
//         )}

//         <Button
//           onClick={handleSave}
//           type="button"
//           disabled={!isSaveEnabled() || isLoading}
//           className={`px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${
//             isSaveEnabled() && !isLoading
//               ? "bg-green-900 hover:bg-green-800 text-white"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           <Save className="h-4 w-4" />
//           {isLoading ? "Saving..." : "Save All Education"}
//         </Button>
//       </div>

//       {/* Added Education List */}
//       {(educations.length > 0 || isUserLoading) && (
//         <div className="mt-8">
//           <h4 className="text-2xl font-semibold text-gray-900 mb-4">
//             {isUserLoading
//               ? "Loading education data..."
//               : `Added Education (${educations.length})`}
//           </h4>

//           {isUserLoading ? (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full"></div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {educations.map((education, index) => (
//                 <div
//                   key={`education-${index}`}
//                   className={`border rounded-lg p-6 bg-white shadow-sm ${
//                     editingIndex === index
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <h5 className="text-lg font-semibold text-gray-900">
//                         {education.degreeTitle}
//                       </h5>
//                       <p className="text-gray-600 mb-2">{education.major}</p>
//                       <p className="text-gray-700 font-medium mb-1">
//                         {education.instituteName}
//                       </p>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                         <span>
//                           <strong>CGPA:</strong> {education.cgpa}/
//                           {education.scale}
//                         </span>
//                         <span>
//                           <strong>Year:</strong> {education.yearOfPassing}
//                         </span>
//                         <span>
//                           <strong>Duration:</strong> {education.duration}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex gap-2 ml-4">
//                       <Button
//                         onClick={() => handleEditEducation(index)}
//                         size="sm"
//                         variant="outline"
//                         className="p-2"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         onClick={() => handleDeleteEducation(index)}
//                         size="sm"
//                         variant="outline"
//                         className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useAddEducationMutation,
  useGetMeQuery,
  useDeleteEducationMutation,
} from "@/redux/features/userApi";
import LoadingSpinner from "@/lib/loading-spinner";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Swal from "sweetalert2";

interface EducationData {
  degreeTitle: string;
  major: string;
  instituteName: string;
  yearOfPassing: string;
  duration: string;
  certificate?: File | null | undefined;
}

export function EducationForm() {
  const { register, handleSubmit, reset, setValue } = useForm<EducationData>({
    defaultValues: {
      degreeTitle: "",
      major: "",
      instituteName: "",
      yearOfPassing: "",
      duration: "",
      certificate: null,
    },
  });

  // Get user data
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery("");

  const [addEducation, { isLoading }] = useAddEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const education = userData?.profile?.education;

  const onSubmit = async (data: EducationData) => {
    const formData = new FormData();
    formData.append("degreeTitle", data.degreeTitle);
    formData.append("major", data.major);
    formData.append("instituteName", data.instituteName);
    formData.append("yearOfPassing", data.yearOfPassing);
    formData.append("duration", data.duration);
    if (data.certificate) {
      formData.append("certificate", data.certificate);
    }

    try {
      const res = await addEducation({ body: formData }).unwrap();

      if (res?.success) {
        toast.success("Education added successfully!");
        reset();
        refetch(); // Refresh the data to show the new education
      }

      console.log("Education added successfully:", res);
    } catch {
      console.log("error");
    }

    // If you want to see the file details specifically
    if (data.certificate) {
      // If you want to log as base64 (for images)
      if (data.certificate.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // console.log("Certificate as Base64:", e.target?.result);
        };
        reader.readAsDataURL(data.certificate);
      }
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("certificate", file);
  };

  // Handle delete education
  // const handleDeleteEducation = async (index: number) => {
  //   try {
  //     const res = await deleteEducation({ index }).unwrap();
  //     console.log("Delete", index, res);

  //     if (res?.success) {
  //       toast.success("Education deleted successfully!");
  //       refetch(); // Refresh the data to reflect the deletion
  //     }

  //     console.log("Education deleted successfully:", res);
  //   } catch (error) {
  //     console.log("Error deleting education:", error);
  //     toast.error("Failed to delete education");
  //   }
  // };
  const handleDeleteEducation = async (title: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteEducation({ title }).unwrap();

        if (res?.success) {
          Swal.fire(
            "Deleted!",
            "Education has been deleted successfully.",
            "success"
          );
          refetch();
        }

        console.log("Education deleted successfully:", res);
      } catch (error) {
        console.log("Error deleting education:", error);
        Swal.fire("Error!", "Failed to delete education.", "error");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Level of Education Section */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Level of Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="degreeTitle"
            >
              Qualification Type
            </Label>
            <Input
              id="degreeTitle"
              {...register("degreeTitle", { required: true })}
              placeholder="e.g. NVQ Level 2 in Barbering"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="major"
            >
              Level / Year Completed
            </Label>
            <Input
              id="major"
              {...register("major", { required: true })}
              placeholder="e.g. Level 3 (Completed 2022)"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="instituteName"
            >
              Institution / Training Provider
            </Label>
            <Input
              id="instituteName"
              {...register("instituteName", { required: true })}
              placeholder="e.g. London Hair Academy or City & Guilds"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="yearOfPassing"
            >
              Year of Passing
            </Label>
            <Input
              id="yearOfPassing"
              {...register("yearOfPassing", { required: true })}
              placeholder="e.g. 2022"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="certificate"
            >
              Upload Certificate
            </Label>
            <Input
              id="certificate"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="mt-1 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="duration"
            >
              Duration / Hours
            </Label>
            <Input
              id="duration"
              {...register("duration", { required: true })}
              placeholder="e.g. 6 months full-time or 120 hours"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Add Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex gap-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4" />
          {isLoading ? "Adding..." : "Add Education"}
        </Button>
      </form>

      {/* Education Display List */}
      {(education?.length > 0 || isUserLoading) && (
        <div>
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">
            {isUserLoading ? (
              <LoadingSpinner />
            ) : (
              `Added Education (${education?.length})`
            )}
          </h4>

          {isUserLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {education?.map((p: EducationData, index: number) => (
                <div
                  key={`portfolio-${index}`}
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {p?.degreeTitle}
                      </h5>
                      <p className="text-gray-600 mb-2">{p?.instituteName}</p>
                      <div className="grid grid-cols-8 gap-3 mt-3">
                        {/* {p?.certificate?.map((img: string, idx: number) => ( */}
                        <Image
                          key={`edu-cert-${index}`}
                          src={getImageUrl(p?.certificate?.toString() || "")}
                          alt={p?.degreeTitle}
                          width={200}
                          height={200}
                          className="w-40 h-32 object-cover rounded-md border"
                        />
                        {/* ))} */}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteEducation(p?.degreeTitle);
                        }}
                        size="sm"
                        variant="outline"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
