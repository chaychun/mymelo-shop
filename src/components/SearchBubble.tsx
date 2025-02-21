import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import useProducts from "@/hooks/useProducts";
import { Input } from "./ui/input";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";

type PropsType = {
  activeFilter: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBubble({ activeFilter, searchTerm, setSearchTerm }: PropsType) {
  const { productsDispatch, productActions } = useProducts();

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMulticolumn = useMediaQuery("(min-width: 896px)");

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const clearSearch = () => {
    setSearchTerm("");
    productsDispatch({
      type: productActions.UPDATE_FILTER,
      filter: activeFilter.toUpperCase(),
      searchTerm: "",
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      clearSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        if (isMulticolumn) {
          clearSearch();
        } else {
          toggleExpand();
        }
        break;
      case "Enter":
        (e.target as HTMLInputElement).blur();
        break;
      default:
        break;
    }
  };

  function searchBox(className?: string) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 bg-neutral-100 border-1 border-neutral-300 rounded-lg px-2 h-16 two-column:h-11 shadow-xl focus-within:border-neutral-400 two-column:border-none",
          className,
        )}
      >
        <Search
          color="var(--color-neutral-400)"
          size={isMulticolumn ? 24 : 32}
        />
        <Input
          ref={inputRef}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            productsDispatch({
              type: productActions.UPDATE_FILTER,
              filter: activeFilter.toUpperCase(),
              searchTerm: e.target.value,
            });
          }}
          onBlur={searchTerm === "" ? toggleExpand : () => {}}
          onKeyDown={handleKeyDown}
          className="border-none shadow-none p-0 focus-visible:outline-none focus-visible:ring-transparent text-lg"
        />
      </div>
    );
  }

  if (isMulticolumn) {
    return searchBox("w-88 text-base");
  } else {
    return (
      <div className="fixed bottom-4 right-4 flex items-center gap-2 z-1">
        <AnimatePresence>
          {isExpanded && (
            <motion.form
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "calc(100vw - 7.5rem)", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {searchBox()}
            </motion.form>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleExpand}
          className="z-1 flex items-center justify-center w-16 h-16 text-white bg-primary rounded-lg shadow-lg focus:outline-none hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          {isExpanded ?
            <X size={32} />
          : <Search size={32} />}
        </motion.button>
      </div>
    );
  }
}

export default SearchBubble;
