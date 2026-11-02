"use client";

import { useRef } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import FieldHint from "@/components/ui/FieldHint";
import { useSession } from "@/lib/auth-client";

export default function CreateEventForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");



const {data:session ,isPending}=useSession()

if(isPending){
  return (
<div className="flex justify-center items-center h-[85vh]">

Loading

</div>



  )
}

const user=session?.user

console.log("Logged in user:", user);
console.log("User Email:", user?.email);





  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const event = Object.fromEntries(formData.entries());


    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`, {


      method: "POST",
      headers: {
        "COntent-Type": "application/json"
      },
      body: JSON.stringify({ ...event, userEmail: user?.email }),

    })

 const data = await result.json()

    //console.log("Event Data:", event);
    if (data.acknowledged) {
      toast.success("Event-Created successfully!");
    }

   

 console.log("Event Data:", event);
 console.log(data);
  };

  // Clear form
  const handleClear = () => {
    formRef.current?.reset();
    toast("Form cleared.");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Event Title */}
      <div>
        <Label htmlFor="event-title">Event Title</Label>

        <Input
          id="event-title"
          name="title"
          type="text"
          placeholder="e.g. Clean Dhaka, Green Bangladesh"
          required
        />

        <FieldHint>
          Keep it short and specific — up to 70 characters.
        </FieldHint>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="event-description">Description</Label>

        <Textarea
          id="event-description"
          name="description"
          placeholder="Describe your event, volunteer activities and what participants should bring..."
          required
        />

        <FieldHint>
          Include the plan, preparation needed and expected outcome.
        </FieldHint>
      </div>

      {/* Event Type */}
      <div>
        <Label htmlFor="event-type">Event Type</Label>

        <Select
          id="event-type"
          name="category"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select an event type
          </option>
          <option value="Plantation">Plantation</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Donation">Donation</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
        </Select>

        <FieldHint>
          Choose the category that best fits the activity.
        </FieldHint>
      </div>

      {/* Thumbnail Image */}
      <div>
        <Label htmlFor="event-thumbnail">
          Thumbnail Image URL
        </Label>

        <Input
          id="event-thumbnail"
          name="image"
          type="url"
          placeholder="https://example.com/event-image.jpg"
          required
        />

        <FieldHint>
          Use a landscape photo — cards crop to 16:10.
        </FieldHint>
      </div>

      {/* Location and Date */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="event-location">Location</Label>

          <Input
            id="event-location"
            name="location"
            type="text"
            placeholder="e.g. TSC, Dhaka University, Dhaka"
            required
          />

          <FieldHint>
            Include the area or landmark volunteers will look for.
          </FieldHint>
        </div>

        <div>
          <Label htmlFor="event-date">Event Date</Label>

          <Input
            id="event-date"
            name="date"
            type="date"
            min={minDate}
            required
          />

          <FieldHint>
            Only future dates are allowed.
          </FieldHint>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleClear}
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            className="h-4 w-4"
          />
          Clear Form
        </Button>

        <Button
          type="submit"
          variant="outline"
          size="lg"
        
      className="border border-forest px-6 py-3 text-base dark:border-forest-light"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="h-4 w-4"
          />
          Submit Event
        </Button>
      </div>
    </form>
  );
}