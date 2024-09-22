"use client";

import { cn } from "@/lib/utils";
import { CheckCircledIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";

const FormError = ({ message }: { message: string }) => {
  const [show, setShow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleDismiss = () => {
    setShow(false);
  };

  if (!isVisible) return null;
  if (!message) return null;

  return (
    <div
      className={cn(
        "rounded-md bg-red-50 p-4 transition-all duration-300 ease-in-out",
        show
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform -translate-y-2"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircledIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={handleDismiss}
              type="button"
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <Cross1Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormError;
