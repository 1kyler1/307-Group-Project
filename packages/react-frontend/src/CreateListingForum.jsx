// import React, { useState } from "react";

// export default function NewItemFormPage() {
//   const [title, setTitle] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const isComplete =
//     title.trim() !== "" &&
//     imageFile !== null &&
//     description.trim() !== "" &&
//     location.trim() !== "";

  

//   // const handleSubmitClick = () => {
//   //   if (!isComplete) return; // guard (should already be disabled)
//   //   setSubmitted(true);
//   // };
//   const handleSubmitClick = async () => {
//     if (!isComplete) return;
  
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("location", location);
//     if (imageFile) formData.append("image", imageFile); // this must match multer field name in backend
  
//     try {
//       const res = await fetch("/api/items", {
//         method: "POST",
//         body: formData, // no need to set headers, fetch handles it for FormData
//       });
  
//       if (!res.ok) {
//         const err = await res.json();
//         console.error("Error:", err);
//         alert("Failed to save item");
//         return;
//       }
  
//       const savedItem = await res.json();
//       console.log("Saved item:", savedItem);
  
//       // Reset form or show success message
//       setTitle("");
//       setDescription("");
//       setLocation("");
//       setImageFile(null);
//       setSubmitted(true);
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Network error saving item");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
//           Create New Item
//         </h1>

//         <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="title">
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               placeholder="Enter a concise title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none"
//             />
//           </div>

//           {/* Image */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="image">
//               Image
//             </label>
//             <input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-gray-900 file:text-white file:px-4 file:py-2 file:hover:opacity-90 file:cursor-pointer"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               placeholder="Describe your item..."
//               rows={5}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none resize-y"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="location">
//               Location
//             </label>
//             <input
//               id="location"
//               type="text"
//               placeholder="City, venue, or coordinates"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none"
//             />
//           </div>

//           {/* Submit */}
//           <div className="pt-2">
//             <button
//               type="button"
//               onClick={handleSubmitClick}
//               disabled={!isComplete || submitted}
//               className={`w-full rounded-2xl font-medium py-3 transition ${
//                 !isComplete || submitted
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-900 text-white hover:opacity-90"
//               }`}
//             >
//               {submitted ? "Submitted" : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function NewItemFormPage() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resetKey, setResetKey] = useState(0); // to clear file input

  const isComplete =
    title.trim() !== "" &&
    imageFile !== null &&
    description.trim() !== "" &&
    location.trim() !== "";

  // ✅ You were missing this function
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setSubmitted(false); // allow another submit after changing fields
  };

  const handleSubmitClick = async () => {
    if (!isComplete) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("/api/items", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Error:", err);
        alert("Failed to save item");
        return;
      }

      const savedItem = await res.json();
      console.log("Saved item:", savedItem);

      // Reset form + show success
      setTitle("");
      setDescription("");
      setLocation("");
      setImageFile(null);
      setSubmitted(true);

      // clears the file input (because file inputs are read-only)
      setResetKey((k) => k + 1);
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error saving item");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
          Create New Item
        </h1>

        {submitted && (
          <div className="mb-4 rounded-xl bg-green-100 text-green-700 px-4 py-2">
            Item saved!
          </div>
        )}

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a concise title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Image
            </label>
            <input
              key={resetKey}               // 🔁 forces input to reset after submit
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-gray-900 file:text-white file:px-4 file:py-2 file:hover:opacity-90 file:cursor-pointer"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your item..."
              rows={5}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none resize-y"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="City, venue, or coordinates"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmitClick}
              disabled={!isComplete}  // ✅ allow re-submit after success
              className={`w-full rounded-2xl font-medium py-3 transition ${
                !isComplete
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:opacity-90"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
