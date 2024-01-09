"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

export default function page() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  console.log(register("title"));
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3 "
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            setError("");
          } catch (error) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Desription" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}
