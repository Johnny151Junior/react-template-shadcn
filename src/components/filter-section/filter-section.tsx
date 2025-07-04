function FilterSection({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-2 md:gap-4">
        {children}
      </div>
    </div>
  );
}

export default FilterSection;
