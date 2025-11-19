import React, { useState } from "react";
import { TextEncoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function NewItemFormPage() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const isComplete =
    title.trim() !== "" &&
    imageFile !== null &&
    description.trim() !== "" &&
    location.trim() !== "";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setSubmitted(false);
  };

  const handleSubmitClick = async () => {
    if (!isComplete) return;

    let newTags = tags
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item !== "");
    newTags = newTags.filter((item, index) => newTags.indexOf(item) === index);
    //console.log(newTags);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    newTags.forEach((t) => {
      formData.append("tags", t);
    });
    if (imageFile) formData.append("image", imageFile);
    //console.log(formData);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
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
      setTags("");
      setImageFile(null);
      setSubmitted(true);

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
export default NewItemFormPage;