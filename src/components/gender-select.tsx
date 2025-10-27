"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface GenderSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function GenderSelect({ value, onValueChange }: GenderSelectProps) {
  const genderOptions = [
    { value: "everyone", label: "Everyone", icon: "⚧️" },
    { value: "female", label: "Female", icon: "♀️" },
    { value: "male", label: "Male", icon: "♂️" },
    { value: "couple", label: "Couple", icon: "🧑‍🤝‍🧑" },
  ];

  const selectedOption = genderOptions.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="bg-transparent">
          {selectedOption && (
            <>
              <span className="mr-2">{selectedOption.icon}</span>
              {selectedOption.label}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {genderOptions.map((option) => (
          <DropdownMenuItem key={option.value} onSelect={() => onValueChange(option.value)}>
            <span className="mr-2">{option.icon}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
