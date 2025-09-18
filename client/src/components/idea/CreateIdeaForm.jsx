import React, { useState } from "react";
import Button from "../common/Button";
import { ideaService } from "@services";

function CreateIdeaForm({ isModal = false, closeModal  }) {

  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    try {
      await ideaService.postIdea(idea);
      setIdea("");
      if(isModal) closeModal();
    } catch (error) {
      console.error("Error submitting idea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isModal ? "" : "min-h-screen flex items-center justify-center px-4"}`}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-indigo-600 text-center">
          Post your idea
        </h1>
        <p className="text-gray-600 text-center text-sm mb-5">
          Got an idea? 
          <span className="mx-2 text-purple-600 font-medium">Share it</span> 
          and find collaborators to make it happen
        </p>

        <label
          htmlFor="idea"
          className="block text-sm font-medium text-gray-700"
        >
          Your Idea
        </label>
        <textarea
          id="idea"
          name="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={4}
          required
          placeholder="Share your idea..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Idea"}
        </Button> 
      </form>
    </div>
  );
}

export default CreateIdeaForm;
