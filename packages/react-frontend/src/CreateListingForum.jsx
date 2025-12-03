import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function NewItemFormPage() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [contactInfo, setContactInfo] = useState("");

  const [categories, setCategories] = useState({
    top: false,
    bottoms: false,
    accessories: false,
  });

  const [gender, setGender] = useState("");

  const isComplete =
    title.trim() !== "" &&
    imageFile !== null &&
    description.trim() !== "" &&
    location.trim() !== "" &&
    gender !== "" &&
    contactInfo.trim() !== "";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setSubmitted(false);
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setSubmitted(false);
  };

  const handleSubmitClick = async () => {
    //  if (!isComplete) {
    //  console.log("incomplete submit");
    //  return;
    //}

    let newTags = tags
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item !== "");
    newTags = newTags.filter((item, index) => newTags.indexOf(item) === index);

    const selectedCategories = Object.keys(categories).filter(
      (key) => categories[key],
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("contactInfo", contactInfo);
    formData.append("gender", gender);

    selectedCategories.forEach((c) => {
      formData.append("categories", c);
    });

    newTags.forEach((t) => {
      formData.append("tags", t);
    });

    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(
        "https://groupproject307-gefba7dfhhdpe0cc.westus3-01.azurewebsites.net/api/items",
        // fetch("http://localhost:4000/api/items",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Error:", err);
        alert("Failed to save item");
        return res.status;
      }

      const savedItem = await res.json();
      console.log("Saved item:", savedItem);

      setTitle("");
      setDescription("");
      setLocation("");
      setTags("");
      setImageFile(null);
      setSubmitted(true);
      setContactInfo("");
      setResetKey((k) => k + 1);
      setGender("");
      setCategories({
        top: false,
        bottoms: false,
        accessories: false,
      });
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
              key={resetKey}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-gray-900 file:text-white file:px-4 file:py-2 file:hover:opacity-90 file:cursor-pointer"
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
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
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="location"
            >
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
          {/* Gender Selector */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="gender">
              Gender
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Male</span>
              </label>

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Female</span>
              </label>

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="misc"
                  checked={gender === "misc"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Misc</span>
              </label>
            </div>
          </div>

          {/* Category checkboxes */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="top"
                  checked={categories.top}
                  onChange={handleCategoryChange}
                />
                <span>Top</span>
              </label>

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="bottoms"
                  checked={categories.bottoms}
                  onChange={handleCategoryChange}
                />
                <span>Bottoms</span>
              </label>

              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="accessories"
                  checked={categories.accessories}
                  onChange={handleCategoryChange}
                />
                <span>Accessories</span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              placeholder="Enter tags (seperated by commas) for others to find your item!"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-0 px-4 py-2.5 outline-none"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="contactInfo"
            >
              Email/Phone Number
            </label>
            <input
              id="contactInfo"
              type="text"
              placeholder="Enter email or phone number"
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
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
              disabled={!isComplete}
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
export { NewItemFormPage };
