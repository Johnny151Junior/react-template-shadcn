import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input component
import React from "react";
import { debounce } from "@/utils/debounce";

type Props = {
  placeholder?: string;
  onChange: (value: string) => void;
};

// Debounce the onChange function to avoid excessive API calls
export function FilterSearchInput({ placeholder = "Search", onChange }: Props) {
  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchValue = (event.target as HTMLInputElement).value.trim(); // Trim whitespace
      onChange(searchValue);
    }
  };

  return (
    <Input
      onChange={debounce((e) => onChange(e.target.value))}
      onKeyDown={onSearch}
      placeholder={placeholder}
    />
  );
}
