import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DashboardPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DashboardPagination = ({
  page,
  totalPages,
  onPageChange,
}: DashboardPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="justify-end select-none hover:cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={
              page === 1
                ? "hover:cursor-default hover:bg-background hover:text-foreground opacity-50"
                : ""
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          const isNearCurrent =
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= page - 1 && pageNumber <= page + 1);

          if (isNearCurrent) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={page === pageNumber}
                  className={
                    page === pageNumber
                      ? "hover:cursor-default bg-accent hover:text-foreground"
                      : ""
                  }
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (
            (pageNumber === page - 2 && page > 3) ||
            (pageNumber === page + 2 && page < totalPages - 2)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && onPageChange(page + 1)}
            className={
              page === totalPages
                ? "hover:cursor-default hover:bg-background hover:text-foreground opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DashboardPagination;
