import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ideaService } from "@services"; 
import IdeaCard from "./IdeaCard";

function List() {
  const [page, setPage] = useState(1);
  const limit = 5; 

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["ideas", page],
    queryFn: () => ideaService.getIdeas({ page, limit }),
    keepPreviousData: true,  
  });

  if (isLoading) return <div>Loading ideas...</div>;
  if (error) return <div>Error: Couldn't get the posts.</div>;

  return (
    <div className="w-1/2 my-4">
      {/* <h2 className="text-xl font-bold mb-4">Ideas</h2> */}
      <div className="space-y-2">
        {data?.ideas?.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />                     
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {data?.totalPages || 1}
        </span>

        <button
          disabled={!data?.hasNextPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isFetching && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
    </div>
  );
}

export default List;
