import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
    Command, CommandEmpty, CommandGroup, CommandInput, CommandItem
} from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

const ResponseList = ({
  open,
  setOpen,
  value,
  setValue,
  responses,
  userType,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: any;
  setValue: (value: string) => void;
  responses: any;
  userType: string;
}) => {
  const key = userType === "student" ? "rollNumber" : "orgName";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? userType === "student"
              ? value[key]
              : `${value["name"]}@${value[key].replace("_", " ")}`
            : "Select response..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search responses..." />
          <CommandEmpty>No Response found.</CommandEmpty>
          <CommandGroup>
            {responses?.map((response: any) => (
              <CommandItem
                key={response.id}
                onSelect={(currentValue: any) => {
                  setValue(response);
                  setOpen(false);
                }}
              >
                {userType == "student"
                  ? response[key]
                  : `${response["name"]}@${response[key]?.replace("_", " ")}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ResponseList;
