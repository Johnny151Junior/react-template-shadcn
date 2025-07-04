import { cn } from "@/lib/utils";
import type { SortOrder } from "./filter.type";

const SortButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm font-medium border rounded-md transition-colors",
      active
        ? "bg-gray-800 text-white border-gray-800"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    )}
  >
    {children}
  </button>
);

export const SortControl = ({
  currentSort,
  onSort,
  children,
}: {
  currentSort: SortOrder;
  onSort: (key: SortOrder) => void;
  children: React.ReactNode;
}) => {
  const isActive = !!currentSort;
  const orderIndicator = isActive ? (currentSort === "asc" ? "↑" : "↓") : "";

  return (
    <SortButton
      onClick={() => {
        onSort(
          !currentSort ? "desc" : currentSort === "desc" ? "asc" : undefined
        );
      }}
      active={isActive}
    >
      {children} {orderIndicator}
    </SortButton>
  );
};
