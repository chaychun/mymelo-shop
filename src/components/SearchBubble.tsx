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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchTerm("");
      productsDispatch({
        type: productActions.UPDATE_FILTER,
        filter: activeFilter.toUpperCase(),
        searchTerm: "",
      });
    }
  };

  function searchBox(className?: string) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 bg-neutral-100 border-neutral-300 rounded-lg px-2 h-11 shadow-xl border-none focus-within:border-neutral-400",
          className,
        )}
      >
        <Search color="var(--color-neutral-400)" />
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
          className="border-none shadow-none p-0 focus-visible:outline-none focus-visible:ring-transparent"
        />
      </div>
    );
  }

  if (isMulticolumn) {
    return searchBox("w-88");
  } else {
    return (
      <div className="fixed bottom-4 right-4 flex items-center gap-2 z-1">
        <AnimatePresence>
          {isExpanded && (
            <motion.form
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "calc(100vw - 6.25rem)", opacity: 1 }}
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
          className="z-1 flex items-center justify-center w-11 h-11 text-white bg-primary rounded-lg shadow-lg focus:outline-none hover:bg-neutral-800 transition-colors"
        >
          {isExpanded ?
            <X size={24} />
          : <Search size={24} />}
        </motion.button>
      </div>
    );
  }
}

export default SearchBubble;
