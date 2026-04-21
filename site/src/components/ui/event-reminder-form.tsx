"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface EventReminderFormProps {
  buttonText?: string;
  placeholder?: string;
  variant?: "dark" | "light"; 
  className?: string;
}

export function EventReminderForm({
  buttonText = "Remind me",
  placeholder = "Email address",
  variant = "dark",
  className,
}: EventReminderFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
       console.log("TODO: Wire to webhook pipeline for Event Reminders with:", email.trim());
       setEmail("");
    }
  };

  if (variant === "light") {
     return (
        <form onSubmit={handleSubmit} className={cn("flex gap-2 w-full", className)}>
           <input 
             type="email" 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder={placeholder} 
             className="flex-1 h-10 px-3 bg-uber-gray-50 border border-uber-gray-200 rounded-uber text-sm outline-none focus:border-uber-green" 
             required
           />
           <button type="submit" className="h-10 px-4 bg-uber-green text-uber-black text-sm font-medium rounded-uber hover:bg-[#3ce56d] transition-colors">
             {buttonText}
           </button>
        </form>
     );
  }

  // Dark Green version
  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder} 
        className="w-full h-12 px-4 bg-white border-0 rounded-uber text-[14px] outline-none text-uber-black mb-3 focus:ring-2 focus:ring-uber-black" 
        required
      />
      <button type="submit" className="w-full h-12 bg-uber-black text-white text-[14px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors">
        {buttonText}
      </button>
    </form>
  );
}
