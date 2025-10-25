"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const countries = [
    { value: "worldwide", label: "Worldwide", flag: "🌍" },
    { value: "united-states", label: "United States", flag: "🇺🇸" },
    { value: "india", label: "India", flag: "🇮🇳" },
    { value: "brazil", label: "Brazil", flag: "🇧🇷" },
    { value: "indonesia", label: "Indonesia", flag: "🇮🇩" },
    { value: "pakistan", label: "Pakistan", flag: "🇵🇰" },
    { value: "nigeria", label: "Nigeria", flag: "🇳🇬" },
    { value: "bangladesh", label: "Bangladesh", flag: "🇧🇩" },
    { value: "russia", label: "Russia", flag: "🇷🇺" },
    { value: "mexico", label: "Mexico", flag: "🇲🇽" },
    { value: "japan", label: "Japan", flag: "🇯🇵" },
]

export function CountrySelect() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("worldwide")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
            <Globe className="mr-2 h-4 w-4" />
          {countries.find((country) => country.value === value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.flag} <span className="ml-2">{country.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}