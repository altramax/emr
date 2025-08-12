import { ChevronsRight, ChevronsLeft } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  //   if (totalPages <= 1) return null;

  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 text-black mt-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-xs  text-blue-500
          ${currentPage === 1 ? 'opacity-60 cursor-not-allowed' : 'hover:text-blue-600 hover:bg-gray-50'}`}
      >
        <ChevronsLeft size={23} />
      </button>

      {/* Page Numbers */}
      {createPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 rounded-lg border text-xs
              ${
                page === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-100'
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 text-xs text-blue-500
          ${currentPage === totalPages ? 'opacity-60 cursor-not-allowed' : 'hover:text-blue-600 hover:bg-gray-50'}`}
      >
        <ChevronsRight size={23} />
      </button>
    </div>
  );
}
