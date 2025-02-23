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
          "flex items-center gap-3 bg-gradient-to-b from-pink-100 to-white rounded-lg px-2 h-14 two-column:h-11 shadow-lg shadow-pink-300/30",
          className,
        )}
      >
        <Search color="var(--color-rose-200)" size={isMulticolumn ? 24 : 28} />
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
          className="border-none shadow-none p-0 focus-visible:outline-none focus-visible:ring-transparent text-base selection:bg-rose-300 placeholder:text-rose-200 caret-rose-400 text-rose-900/70"
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
              animate={{
                width: "calc(100vw - 10rem)",
                opacity: 1,
              }}
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
          className="z-1 flex items-center justify-center w-14 h-14 text-white bg-rose-400 rounded-lg shadow-lg shadow-rose-600/50 focus:outline-none hover:bg-rose-500 transition-colors cursor-pointer"
        >
          {isExpanded ?
            <X size={28} />
          : <Search size={28} />}
        </motion.button>
      </div>
    );
  }
}

export default SearchBubble;
